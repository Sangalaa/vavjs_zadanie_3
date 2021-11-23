const express = require('express');
const cors = require('cors');
require("dotenv-safe/config.js")

const app = express()
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended:true }))

// database setup
const { sequelize } = require('./models/index.js')


app.get('/products', (req, res) => {
    sequelize.models.product.findAll().then(products => {
        return res.json(products);
    });
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
    catch(err) {
        console.log("Unable to connect to database")
    }
}