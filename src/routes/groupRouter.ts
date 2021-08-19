import { Router } from "express"
import { GroupController } from "../controllers/groupController"
import { isAuth } from "../middleware/isAuth"

const router: Router = Router()

router.use(isAuth)

router.post('/', GroupController.create)
router.get('/', GroupController.get)

export default router
