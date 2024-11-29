import {Request, Response, NextFunction} from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization as string;

    try {
        const payload = await jwt.verify(token, JWT_SECRET as string);
        console.log("---------PAYLOAD---------", payload);
        
        
        //@ts-ignore
        req.id = payload.userId;
        //@ts-ignore
        // const id = req.id ;
        // console.log("Req id ---: ",id);
        
        next();

    } catch (error) {
        return res.status(403).json({
            message: "You are not logged in."
        })
    }
}