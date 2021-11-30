const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiEach = require('chai-each')
const server = require('../src/index.js')
const moment = require('moment')
const {v4} = require('uuid')

chai.should()

chai.use(chaiHttp)
chai.use(chaiEach)

describe('Fetch orders', () => {
    it("Should have correct data types", (done) => {
        chai.request(server)
            .get('/products')
            .end((err, response) => {
                console.log(response.body)
                response.should.have.status(200)
                response.body.should.be.a('object')

                response.body.should.have.property('success')
                response.body.should.have.property('data')
                response.body.should.have.property('errors')

                response.body.success.should.be.a('boolean')
                response.body.data.should.be.a('array')
                response.body.errors.should.be.a('array')

                done()
            })
    })

    it("Should have correct values", (done) => {
        chai.request(server)
            .get('/products')
            .end((err, response) => {
                response.should.have.status(200)
                
                response.body.success.should.eq(true)
                response.body.data.should.not.have.length(0)
                response.body.errors.should.have.length(0)

                response.body.data.forEach(product => {
                    expect(product).to.have.keys(['id', 'name', 'image_link', 'price', 'createdAt', 'updatedAt'])
                    expect(product.id).to.be.a('string')
                    expect(product.name).to.be.a('string')
                    expect(product.image_link).to.be.a('string')
                    expect(product.price).to.be.a('number')
                    expect(moment(product.createdAt).isValid()).to.eq(true)
                    expect(moment(product.updatedAt).isValid()).to.eq(true)
                });

                done()
            })
    })
});

describe('Create order', () => {
    it('Should create a new order', (done) => {
        chai.request(server)
            .get('/products')
            .end((productsErr, productsResponse) => {
                // create random order

                const email = `${v4()}@gmail.com`

                chai.request(server)
                    .post('/checkout')
                    .set('Content-Type', 'application/json')
                    .send({
                        email,
                        name: 'Jozko',
                        surname: 'Mrkvicka',
                        street: 'Mrkvova',
                        houseNumber: '123',
                        city: 'Bratislava',
                        psc: '12345',
                        cart: [
                            {
                                id: productsResponse.body.data[0].id,
                                quantity: 2
                            },
                            {
                                id: productsResponse.body.data[1].id,
                                quantity: 3
                            }
                        ]
                    })
                    .end((err, response) => {
                        response.should.have.status(200)

                        response.body.should.be.a('object')

                        response.body.should.have.property('success')
                        response.body.should.have.property('data')
                        response.body.should.have.property('errors')

                        response.body.success.should.be.a('boolean')
                        response.body.data.should.be.a('array')
                        response.body.errors.should.be.a('array')
                        
                        response.body.success.should.eq(true)
                        response.body.data.should.have.length(1)
                        response.body.errors.should.have.length(0)

                        // check order data
                        const order = response.body.data[0]

                        expect(order).to.have.keys(['id', 'user_id', 'status', 'street', 
                            'houseNumber', 'city', 'psc', 'createdAt', 'updatedAt', 
                            'order_items', 'user'])
                        expect(order.id).to.be.a('string')
                        expect(order.user_id).to.be.a('string')
                        expect(order.status).to.be.a('string')
                        expect(order.street).to.be.a('string')
                        expect(order.houseNumber).to.be.a('string')
                        expect(order.city).to.be.a('string')
                        expect(order.psc).to.be.a('string')
                        expect(order.createdAt).to.be.a('string')
                        expect(order.updatedAt).to.be.a('string')
                        expect(order.order_items).to.be.a('array')
                        expect(order.user).to.be.a('object')
                        expect(order.user).to.have.keys(['firstName', 'lastName', 'email'])
                        expect(order.user.firstName).to.be.a('string')
                        expect(order.user.lastName).to.be.a('string')
                        expect(order.user.email).to.be.a('string')

                        expect(order.status).to.eq('unpaid')
                        expect(order.street).to.eq('Mrkvova')
                        expect(order.houseNumber).to.eq('123')
                        expect(order.city).to.eq('Bratislava')
                        expect(order.psc).to.eq('12345')
                        expect(moment(order.createdAt).isValid()).to.be.true
                        expect(moment(order.updatedAt).isValid()).to.be.true
                        expect(order.order_items).to.have.length(2)
                        expect(order.user.firstName).to.eq('Jozko')
                        expect(order.user.lastName).to.eq('Mrkvicka')
                        expect(order.user.email).to.eq(email)

                        order.order_items.forEach(order_item => {
                            expect(order_item).to.be.a('object')
                            expect(order_item).to.have.keys(['id', 'product_id', 'order_id', 'quantity', 'price', 'createdAt', 'updatedAt'])
                            expect(order_item.id).to.be.a('string')
                            expect(order_item.product_id).to.be.a('string')
                            expect(order_item.order_id).to.be.a('string')
                            expect(order_item.quantity).to.be.a('number')
                            expect(order_item.price).to.be.a('number')
                            expect(order_item.createdAt).to.be.a('string')
                            expect(order_item.updatedAt).to.be.a('string')

                            expect(order_item.product_id).to.be.oneOf([productsResponse.body.data[0].id, productsResponse.body.data[1].id])
                            expect(order_item.order_id).to.eq(order.id)
                            expect(order_item.quantity).to.be.oneOf([2, 3])
                            expect(order_item.price).to.be.oneOf([productsResponse.body.data[0].price, productsResponse.body.data[1].price])

                            expect(moment(order_item.createdAt).isValid()).to.be.true
                            expect(moment(order_item.updatedAt).isValid()).to.be.true
                        })

                        done()
                    });
            });
    });

    it('Should set order status as paid', (done) => {
        chai.request(server)
            .get('/admin/orders')
            .end((ordersErr, ordersResponse) => {
                const unpaidOrders = ordersResponse.body.data.filter(product => product.status === 'unpaid')

                if (unpaidOrders.length === 0) {
                    done('No unpaid products found')
                    return
                }

                const unpaidOrder = unpaidOrders[0]

                chai.request(server)
                    .put(`/admin/orders/${unpaidOrder.id}`)
                .end((err, response) => {
                    response.body.should.be.a('object')

                    response.body.should.have.property('success')
                    response.body.should.have.property('data')
                    response.body.should.have.property('errors')

                    response.body.success.should.be.a('boolean')
                    response.body.data.should.be.a('array')
                    response.body.errors.should.be.a('array')

                    response.body.success.should.eq(true)
                    response.body.data.should.have.length(1)
                    response.body.errors.should.have.length(0)

                    const order = response.body.data[0]

                    expect(order).to.be.a('object')
                    expect(order).to.have.keys(['id', 'user_id', 'status', 'street', 'houseNumber', 'city', 'psc', 'createdAt', 'updatedAt'])
                    expect(order.id).to.be.a('string')
                    expect(order.user_id).to.be.a('string')
                    expect(order.status).to.be.a('string')
                    expect(order.street).to.be.a('string')
                    expect(order.houseNumber).to.be.a('string')
                    expect(order.city).to.be.a('string')
                    expect(order.psc).to.be.a('string')
                    expect(order.createdAt).to.be.a('string')
                    expect(order.updatedAt).to.be.a('string')

                    expect(order.id).to.eq(unpaidOrder.id)
                    expect(order.user_id).to.eq(unpaidOrder.user_id)
                    expect(order.status).to.eq('paid')
                    expect(order.street).to.eq(unpaidOrder.street)
                    expect(order.houseNumber).to.eq(unpaidOrder.houseNumber)
                    expect(order.city).to.eq(unpaidOrder.city)
                    expect(order.psc).to.eq(unpaidOrder.psc)
                    expect(order.createdAt).to.eq(unpaidOrder.createdAt)

                    expect(moment(order.createdAt).isValid()).to.be.true
                    expect(moment(order.updatedAt).isValid()).to.be.true

                    done()
                })
            })
    })

    it('Should fail to create a new order', (done) => {
        // https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
        let f = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
        let cartesian = (a, b, ...c) => b ? cartesian(f(a, b), ...c) : a;

        const email = `${v4()}@gmail.com`

        const entries = cartesian(
            [{ email, valid: true }, { email: 'gmail.com', valid: false }],
            [{ name: 'Jozko', valid: true }, { name: 'jozko', valid: false }],
            [{ surname: 'Mrkvicka', valid: true }],
            [{ street: 'Mrkvova', valid: true },],
            [{ houseNumber: '12/3a', valid: true }, { houseNumber: 'abc*', valid: false }],
            [{ city: 'Bratislava', valid: true }, { city: 'bratislava', valid: false }],
            [{ psc: '12345', valid: true }, { psc: 'abc', valid: false }],
            [{ cart: [{ id: `${v4()}`, quantity: 0 }], valid: false }]
        )

        const errorMessage = {
            email: 'e-mail has incorrect format',
            name: 'name has incorrect format',
            surname: 'surname has incorrect format',
            street: 'street has incorrect format',
            houseNumber: 'houseNumber has incorrect format',
            city: 'city has incorrect format',
            psc: 'psc has incorrect format',
            cart: 'cart contains incorrect data'
        }

        entries.forEach((entry) => {
            const payload = Object.assign({}, ...entry.map(property => {
                const { valid, ...rest } = property

                return rest
            }))

            if (entry.map(property => property.valid).every(item => item === true)) {
                return
            }

            chai.request(server)
                .post('/checkout')
                .send(payload)
                .end((err, response) => {
                    response.body.should.be.a('object')

                    response.body.should.have.property('success')
                    response.body.should.have.property('data')
                    response.body.should.have.property('errors')

                    response.body.success.should.be.a('boolean')
                    response.body.data.should.be.a('array')
                    response.body.errors.should.be.a('array')

                    response.body.success.should.eq(false)
                    response.body.data.should.have.length(0)
                    response.body.errors.should.not.have.length(0)

                    expect(response.body.errors).each.have.property('field')
                    expect(response.body.errors).each.have.property('message')
                    expect(response.body.errors).each.have.property('value')

                    if (entry.map(property => property.valid).every(item => item === true)) {
                        response.should.have.status(500)
                    }
                    else {
                        response.should.have.status(400)

                        const errorProperties = entry.map(property => {
                            const { valid, ...rest } = property

                            return !valid ? rest : {}
                        })

                        errorProperties.forEach(property => {
                            for (const [key, value] of Object.entries(property)) {

                                expect(response.body.errors).to.deep.include.members([{
                                    field: key,
                                    message: errorMessage[key],
                                    value: value
                                }])
                            }
                        })
                    }
                })
        })

        done()
    })
});