import { Router } from "express"

const router: Router = Router()

const groupController = require('../controllers/groupController')

router.post('/', groupController.create)
router.get('/', groupController.get)

module.exports = router
