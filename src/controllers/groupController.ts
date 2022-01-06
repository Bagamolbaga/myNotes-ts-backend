import { Request, Response } from "express"
import { Group } from "../models/models"
import { IGroup } from "../models/types"

export const GroupController = {
    create: async (req: Request, res: Response) => {
        const {title, color, user_id} = req.body
        const group: IGroup = await Group.create({title, color, user_id})
        return res.json(group)
    },

    get: async (req: Request, res: Response) => {
        const {user_id} = req.query
        const group: IGroup[] = await Group.findAll({where: {user_id}})
        return res.json(group)
    },

    delete: async (req:Request, res: Response) => {
        const { group_id } = req.query
        const deleteGroup = await Group.destroy({where: {id: group_id}})
        return res.json(deleteGroup)
    }
}
