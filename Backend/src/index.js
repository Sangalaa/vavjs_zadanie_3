import express from 'express';
import "dotenv-safe/config.js"
import { Sequelize, DataTypes } from 'sequelize'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// database setup
const seq = new Sequelize(process.env.DATABASE_URL)
seq.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running at port: ${process.env.PORT}`)

    testDatabaseConnection()
})

const testDatabaseConnection = async () => {
    try {
        await seq.authenticate()
        console.log("Database connection has been established")
    }
    catch(err) {
        console.log("Unable to connect to database")
    }
}