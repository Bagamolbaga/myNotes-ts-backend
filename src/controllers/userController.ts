import { Request, Response } from "express"
import { Op } from 'sequelize'
import { User } from '../models/models'
import { IUser } from "../models/types"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { transporter } from '../nodemailer'

const createJwt = (id: number, name: string, email: string, avatar: string) : string => {
    return jwt.sign({id, name, email, avatar}, process.env.JWT_HASH!, {expiresIn: '240h'})
}

const createJwtForResetPassword = (id: number) : string => {
    return jwt.sign({id}, process.env.JWT_HASH!, {expiresIn: '1h'})
}

export const UserController = {
    registration: async (req: Request, res: Response) => {
        const {name, email, password, img} = req.body

        if (!name || !password || !email) {
            return res.json({message: 'Введите данные'})
        }

        const userBdName = await User.findOne({where:{name}})
        if (userBdName) {
            return res.json({message: 'Логин занят'})
        }

        const userBdEmail = await User.findOne({where:{email}})
        if (userBdEmail) {
            return res.json({message: 'Email занят'})
        }

        const mdPassword = await bcrypt.hash(password, 5)
        const user: IUser = await User.create({name, email, password: mdPassword, avatar: img})
        const token = createJwt(user.id, user.name, user.email, user.avatar)
        return res.json({token})
    },

    login: async (req: Request, res: Response) => {
        const {nameOrEmail, password} = req.body
        if (!nameOrEmail || !password) {
            return res.json({message: 'Введите данные'})
        }

        const userBd: IUser | null = await User.findOne({where:{[Op.or]: [{name: nameOrEmail}, {email: nameOrEmail}]}})
        if (!userBd) {
            return res.json({message: 'Пользователь не найден'})
        }

        const checkPassword = bcrypt.compareSync(password, userBd.password)
        if(!checkPassword) {
            return res.json({message: 'Неверный логин или пароль'})
        }

        const token = createJwt(userBd.id, userBd.name, userBd.email, userBd.avatar)
        return res.json({token})
    },

    auth: async (req: Request, res: Response) => {
        try {
            const reqToken = req.headers.authorization?.split(' ')[1]
            if (!reqToken) {
                return res.json({message: 'Не авторизован'})
            }

            const decodeToken: any = jwt.verify(reqToken, process.env.JWT_HASH!)

            const token = createJwt(decodeToken.id, decodeToken.name, decodeToken.email, decodeToken.avatar)

            res.json({token})
            
        } catch (e) {
            res.json({message: 'Не авторизован'})
        }
    },

    sendEmailresetPassword: async (req: Request, res: Response) => {
        const { nameOrEmail } = req.body
        
        if (!nameOrEmail) {
            return res.json({message: 'Введите почту'})
        }

        const userBd: IUser | null = await User.findOne({where:{[Op.or]: [{name: nameOrEmail}, {email: nameOrEmail}]}})
        if (!userBd) {
            return res.json({message: 'Пользователь не найден'})
        }

        const tokenId = createJwtForResetPassword(userBd.id)
        
        const data = {
            from: 'mynotes.mynotes@yandex.ru',
            to: userBd.email,
            subject: 'MyNotes reset password',
            html: `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions.
                                                </p>
                                                <a href="${process.env.NODE_ENV === 'production' ? `https://my-notes-lyvqj9v3x-bagamolbaga.vercel.app/user/reset-password/${tokenId}` : `http://localhost:3000/user/reset-password/${tokenId}`}"
                                                    style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>`
        }

        transporter.sendMail(data, (err: any, dataRes: any) => {
            if (err) {
                return res.status(400).json({message: err})
            }

            return res.status(200).json({message: dataRes})
        })
    },

    resetPassword: async(req: Request, res: Response) => {
        const { tokenId, newPass } = req.body

        const decodedTokenId: any = jwt.verify(tokenId, process.env.JWT_HASH!)

        const mdNewPassword = await bcrypt.hash(newPass, 5)

        const updatedUser = await User.update(
            {
                password: mdNewPassword
            },
            {
                where: {id: decodedTokenId.id}
            }
        )

        return res.status(200).json(updatedUser)
    }
}
