const express = require('express');
const cors = require('cors');
require("dotenv-safe/config.js")

const {
    validateEmail,
    validateName,
    validateSurname,
    validateStreet,
    validateHouseNumber,
    validateCity,
    validatePsc,
} = require('./utils/utils')

const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))

// database setup
const { sequelize } = require('./models/index.js')


app.get('/products', (_, res) => {
    sequelize.models.product.findAll()
        .then(products => {
            return res.json({
                success: true,
                data: products,
                errors: []
            });
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        });
});

app.post('/checkout', async (req, res) => {
    const { email, name, surname, street, houseNumber, city, psc, cart } = req.body;

    // validate data
    errors = []

    if (!validateEmail(email)) {
        errors.push({
            field: 'email',
            message: 'e-mail has incorrect format'
        })
    }

    if (!validateName(name)) {
        errors.push({
            field: 'name',
            message: 'name has incorrect format'
        })
    }

    if (!validateSurname(surname)) {
        errors.push({
            field: 'surname',
            message: 'surname has incorrect format'
        })
    }

    if (!validateStreet(street)) {
        errors.push({
            field: 'street',
            message: 'street has incorrect format'
        })
    }

    if (!validateHouseNumber(houseNumber)) {
        errors.push({
            field: 'houseNumber',
            message: 'houseNumber has incorrect format'
        })
    }

    if (!validateCity(city)) {
        errors.push({
            field: 'city',
            message: 'city has incorrect format'
        })
    }

    if (!validatePsc(psc)) {
        errors.push({
            field: 'psc',
            message: 'psc has incorrect format'
        })
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        })
    }


    class JsonError extends Error {
        constructor(data) {
            super('');
            this.data = data
        }
    }

    const transaction = await sequelize.transaction();

    try {
        // create user
        const user = await new Promise((resolve, reject) => {
            sequelize.models.user.create({
                firstName: name,
                lastName: surname,
                email
            })
                .then(user => {
                    if (!user) {
                        reject(`Error while creating a new user`)
                        return
                    }
                    resolve(user)
                })
                .catch(err => reject(err))
        })
            .catch(err => {
                const payload = err.errors.map((err) => ({
                    field: err.path,
                    message: err.message
                }))

                throw new JsonError(payload)
            })

        // create order
        const order = await new Promise((resolve, reject) => {
            sequelize.models.order.create({
                user_id: user.id,
                status: 'unpaid',
                street,
                houseNumber,
                city,
                psc
            })
                .then(order => {
                    if (!order) {
                        reject(`Error while creating a new order`)
                        return
                    }
                    resolve(order)
                })
                .catch(err => reject(err))
        })
            .catch((err) => {
                throw new Error(err.message)
            });



        // put items from cart into order
        await cart.reduce(async (promise, cartItem) => {
            await promise
            const product = await new Promise((resolve, reject) => {
                sequelize.models.product.findByPk(cartItem.id)
                    .then(product => {
                        if (!product) {
                            reject(`Product with id: ${cartItem.id} not found`)
                            return
                        }

                        resolve(product)
                    })
                    .catch(err => reject(err))
            })
                .catch(err => {
                    throw new Error(err.message)
                });

            await sequelize.models.order_item.create({
                order_id: order.id,
                product_id: product.id,
                quantity: cartItem.quantity,
                price: product.price
            })
                .catch((err) => {
                    throw new Error(err.message)
                });
        }, Promise.resolve())

        await transaction.commit()
    }
    catch (err) {
        console.log(err)
        await transaction.rollback()

        if (err instanceof JsonError) {
            return res.status(400).json({
                success: false,
                errors: err.data,
                data: []
            })
        }

        return res.status(500).json({
            success: false,
            errors: [{ message: err.message }],
            data: []
        })
    }

    return res.json({
        success: true,
        errors: [],
        data: []
    })
});

app.get('/admin/orders', (req, res) => {
    sequelize.models.order.findAll({ include: [
        { model: sequelize.models.order_item, attributes: ['quantity', 'price', 'product_id'], 
            include: [{model: sequelize.models.product, attributes: ['price', 'image_link', 'name']}] }
    ] })
        .then(async orders => {
            return res.json({
                success: true,
                data: orders,
                errors: []
            })
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        })
});

app.put('/admin/orders/:id', (req, res) => {
    const orderId = req.params.id;

    sequelize.models.order.findByPk(orderId)
    .then(async order => {
        if(!order) {
            return res.status(400).json({
                success: false,
                data: [],
                errors: [{ message: 'Incorrect id' }]
            })
        }

        order.status = 'paid'

        await order.save()

        return res.json({
            success: true,
            data: [order],
            errors: []
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            data: [],
            errors: [{ message: err.message }]
        })
    })
});

app.get('/admin/ads', (req, res) => {
    sequelize.models.ad.findAll()
        .then(ads => {
            return res.json({
                success: true,
                data: ads,
                errors: []
            })
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        })
});

app.post('/admin/ads', (req, res) => {
    const { link, imageLink } = req.body;

    sequelize.models.ad.create({
        link,
        image_link: imageLink
    })
        .then(ad => {
            return res.json({
                success: true,
                data: [ad],
                errors: []
            });
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        });
});

app.put('/admin/ads/:id', (req, res) => {
    const { link, image_link } = req.body;
    const id = req.params.id;

    const errors = []

    try {
        url = new URL(link);
    } catch (_) {
        errors.push({field: 'link', message: 'invalid format'})
    }

    try {
        url = new URL(image_link);
    } catch (_) {
        errors.push({ field: 'image_link', message: 'invalid format' })
    }


    if(errors.length > 0) {
        return res.status(400).json({
            success: false,
            data: [],
            errors
        })
    }

    sequelize.models.ad.findByPk(id)
        .then(async ad => {
            ad.link = link
            ad.image_link = image_link
            ad.counter = 0

            await ad.save()

            return res.json({
                success: true,
                data: [ad],
                errors: []
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        });
});

app.delete('/admin/ads/:id', (req, res) => {
    const id = req.params.id;

    sequelize.models.ad.findByPk(id)
        .then(async ad => {
            await ad.destroy()

            return res.json({
                success: true,
                data: [],
                errors: []
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                data: [],
                errors: [{ message: err.message }]
            })
        })
});

app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running at port: ${process.env.PORT}`)

    testDatabaseConnection()
})

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connection has been established")
    }
    catch (err) {
        console.log("Unable to connect to database")
    }
}