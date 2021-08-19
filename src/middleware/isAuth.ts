import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqToken: string|undefined = req.headers.authorization?.split(' ')[1]
        const user = jwt.verify(reqToken!, process.env.JWT_HASH!)
        if(reqToken && user !== undefined){
            next()
        }
    } catch {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
}