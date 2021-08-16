import { Request, Response } from "express"
import { User } from '../models/models'
import { IUser } from "../models/types"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createJwt = (id: number, name: string, avatar: string) => {
    return jwt.sign({id, name, avatar}, process.env.JWT_HASH!, {expiresIn: '240h'})
}

export const UserController = {
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
        const user: IUser = await User.create({name, password: mdPassword, avatar: img})
        const token = createJwt(user.id, user.name, user.avatar)
        return res.json({token})
    },

    login: async (req: Request, res: Response) => {
        const {name, password} = req.body
        if (!name || !password) {
            return res.json({message: 'Введите данные'})
        }

        const userBd: IUser | null = await User.findOne({where:{name}})
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

            const decodeToken: any = jwt.verify(reqToken, process.env.JWT_HASH!)

            const token = createJwt(decodeToken.id, decodeToken.name, decodeToken.avatar)

            res.json({token})
            
        } catch (e) {
            res.json({message: 'Не авторизован2'})
        }
    }
}
