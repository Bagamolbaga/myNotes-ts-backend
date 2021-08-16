import { Router } from "express"
import userRouter from './userRouter'
import groupRouter from './groupRouter'
import noteRouter from './noteRouter'

const router: Router = Router()

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/note', noteRouter)

export default router