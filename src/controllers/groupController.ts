import { Request, Response } from "express"
const {Group} = require('../models/models')
import { IGroup } from "../models/types"

const GroupController = {
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

module.exports = GroupController