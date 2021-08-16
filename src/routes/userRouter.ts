import { UserController } from './../controllers/userController';
import { Router } from "express"

const router: Router = Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.auth)

export default router