import { Request, Response } from "express"
import { Note } from "../models/models"
import { INote } from "../models/types"

export const NoteController = {
    create: async (req: Request, res: Response) => {
        const {headerImg, title, text, tags, group_id, user_id} = req.body
        const note: INote = await Note.create({headerImg, title, text, tags, user_id, group_id})
        return res.json(note)
    },

    get: async (req: Request, res: Response) => {
        const {user_id} = req.query
        const notes: INote[] = await Note.findAll({where: {user_id}})
        return res.json(notes)
    },

    edit: async (req: Request, res: Response) => {
        const {newHeaderImg, note_id, newTitle, newText, newTags, newGroupId, toFixed, toUnFixed} = req.body

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
                    headerImg: newHeaderImg,
                    title: newTitle,
                    text: newText,
                    tags: newTags,
                    group_id: newGroupId
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
