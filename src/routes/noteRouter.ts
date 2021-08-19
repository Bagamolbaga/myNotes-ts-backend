import { Router } from "express"
import { NoteController } from "../controllers/noteController"
import { isAuth } from '../middleware/isAuth'

const router: Router = Router()

router.use(isAuth)

router.post('/', NoteController.create)
router.get('/', NoteController.get)
router.put('/', NoteController.edit)
router.delete('/', NoteController.delete)

export default router
