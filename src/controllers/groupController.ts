import { Request, Response } from "express"
import { Group } from "../models/models"
import { IGroup } from "../models/types"

export const GroupController = {
    create: async (req: Request, res: Response) => {
        const {title, user_id} = req.body
        const group: IGroup = await Group.create({title, user_id})
        return res.json(group)
    },

    get: async (req: Request, res: Response) => {
        const {user_id} = req.query
        const group: IGroup[] = await Group.findAll({where: {user_id}})
        return res.json(group)
    }
}
