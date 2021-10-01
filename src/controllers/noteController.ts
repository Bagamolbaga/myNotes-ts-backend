import { Request, Response } from "express"
import { Note } from "../models/models"
import { INote } from "../models/types"

export const NoteController = {
    create: async (req: Request, res: Response) => {
        const {title, text, tags, group_id, user_id} = req.body
        const note: INote = await Note.create({title, text, tags, user_id, group_id})
        return res.json(note)
    },

    get: async (req: Request, res: Response) => {
        const {user_id} = req.query
        const notes: INote[] = await Note.findAll({where: {user_id}})
        return res.json(notes)
    },

    edit: async (req: Request, res: Response) => {
        const {note_id, newTitle, newText, newTags, toFixed, toUnFixed} = req.body

        let updatedNote
        if (toFixed) {
            updatedNote = await Note.update(
                {
                    fixed: true
                },
                {
                    where: {id: note_id}
                }
            )
        } else if (toUnFixed) {
            updatedNote = await Note.update(
                {
                    fixed: false
                },
                {
                    where: {id: note_id}
                }
            )
        } else {
            updatedNote = await Note.update(
                {
                    title: newTitle,
                    text: newText,
                    tags: newTags
                },
                {
                    where: {id: note_id}
                }
            )
        }
        return res.json(updatedNote)
    },

    delete: async (req: Request, res: Response) => {
        const { note_id } = req.query
        const deleteNote = await Note.destroy({where: {id: note_id}})
        return res.json(deleteNote)
    }
}
