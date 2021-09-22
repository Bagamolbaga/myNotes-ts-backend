import { UserController } from './../controllers/userController';
import { Router } from "express"

const router: Router = Router()

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.auth)
router.post('/send-email-reset-password', UserController.sendEmailresetPassword)
router.post('/reset-password', UserController.resetPassword)

export default router