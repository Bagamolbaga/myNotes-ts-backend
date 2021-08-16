import { Request, Response } from "express"
const {User} = require('../models/models.ts')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const createJwt = (id: any, name: any, avatar: any) => {
    return jwt.sign({id, name, avatar}, process.env.JWT_HASH, {expiresIn: '240h'})
}

const UserController = {
    registration: async (req: Request, res: Response) => {
        const {name, password, img} = req.body

        if (!name || !password) {
            return res.json({message: 'Введите данные'})
        }

        const userBd = await User.findOne({where:{name}})
        if (userBd) {
            return res.json({message: 'Логин занят'})
        }

        const mdPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, password: mdPassword, avatar: img})
        const token = createJwt(user.id, user.name, user.avatar)
        return res.json({token})
    },

    login: async (req: Request, res: Response) => {
        const {name, password} = req.body
        if (!name || !password) {
            return res.json({message: 'Введите данные'})
        }

        const userBd = await User.findOne({where:{name}})
        if (!userBd) {
            return res.json({message: 'Пользователь не найден'})
        }

        const checkPassword = bcrypt.compareSync(password, userBd.password)
        if(!checkPassword) {
            return res.json({message: 'Неверный логин или пароль'})
        }

        const token = createJwt(userBd.id, userBd.name, userBd.avatar)
        return res.json({token})
    },

    auth: async (req: Request, res: Response) => {
        if (req.method === 'OPTIONS'){

        }

        try {
            const reqToken = req.headers.authorization?.split(' ')[1]
            if (!reqToken) {
                return res.json({message: 'Не авторизован'})
            }

            const decodeToken = jwt.verify(reqToken, process.env.JWT_HASH)
            const user = decodeToken

            const token = createJwt(user.id, user.name, user.avatar)

            res.json({token})
            
        } catch (e) {
            res.json({message: 'Не авторизован2'})
        }
    }
}

module.exports = UserController