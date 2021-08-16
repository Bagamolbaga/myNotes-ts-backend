import dotenv from 'dotenv'
import express, { Express } from "express"
import sequelize from './db'
import cors from 'cors'
import router from './routes/index'
import fileUpload from 'express-fileupload'
import path from 'path'

dotenv.config()
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