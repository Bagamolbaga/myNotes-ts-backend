import { Router } from "express"
import { NoteController } from "../controllers/noteController"

const router: Router = Router()


router.post('/', NoteController.create)
router.get('/', NoteController.get)
router.put('/', NoteController.edit)
router.delete('/', NoteController.delete)

export default router
