import express from 'express';
import "dotenv-safe/config.js"
import { Sequelize } from 'sequelize'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// database setup
const seq = new Sequelize(process.env.DATABASE_URL)

app.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running at port: ${process.env.PORT}`)
})