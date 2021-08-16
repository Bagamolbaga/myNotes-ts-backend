import dotenv from 'dotenv'
dotenv.config()
//const express = require('express')
import express, { Express } from "express"
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')


const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5080

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server robit ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()