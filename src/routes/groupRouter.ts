import { Router } from "express"
import { GroupController } from "../controllers/groupController"

const router: Router = Router()


router.post('/', GroupController.create)
router.get('/', GroupController.get)

export default router
