//const Router = require('express')
import { Router } from "express"
const router: Router = Router()

import userRouter from './userRouter'
import groupRouter from './groupRouter'
import noteRouter from './noteRouter'



router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/note', noteRouter)

export default router