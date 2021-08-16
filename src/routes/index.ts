//const Router = require('express')
import { Router } from "express"
const router: Router = Router()

const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const noteRouter = require('./noteRouter')


router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/note', noteRouter)

module.exports = router