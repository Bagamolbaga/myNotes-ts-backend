import { Router } from "express"

const router: Router = Router()


const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.auth)

module.exports = router