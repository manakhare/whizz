require("dotenv").config();
import { Request, Response } from "express";
import client from "@repo/db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { SignInType, SignUpType } from "@repo/types";
import { SALT_ROUNDS, JWT_SECRET } from "../config";


export const SignUp = async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    // console.log("body", body);
    
    const parsedData = SignUpType.safeParse(body);

    // check if inputs are correct
    if (parsedData.error) {
        // console.log("parsedData", parsedData);
        
        res.status(411).json({
            message: "User input validation failed. Please check your inputs and try again!"
        })
    }

    // hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(parsedData?.data?.password as string, parseInt(SALT_ROUNDS as string));

    try {
        const userExists = await client.user.findUnique({
            where: {
                email: parsedData.data?.email as string
            }
        })
        if (userExists) {
            return res.status(409).json({ message: "User already exists. Please sign in." })
        }
        // save user data in DB
        const user = await client.user.create({
            data: {
                email: parsedData.data?.email as string,
                username: parsedData.data?.username as string,
                password: hashedPassword
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "Something went wrong while creating account"
            })
        }

        // sign the user id and create a authentication token
        const token = await jwt.sign({ userId: user.id }, JWT_SECRET as string);

        return res.status(201).json({
            token: token,
            data: {
                userId: user.id,
                username: user.username,
                email: user.email
            }
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong while creating your account. Please try again later!"
        })
    }

}

export const SignIn = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const parsedData = SignInType.safeParse(body);
    
        if(parsedData.error) {
            res.status(411).json({
                message: "Input error. Please check your inputs and try again!"
            })
        }
    
        const user = await client.user.findUnique({
            where: {
                email: parsedData.data?.email
            }
        })
    
        if(!user) {
            return res.status(404).json({
                message: "User does not exist. Please sign up."
            })
        }
    
        // verify password
        const verifyPassword = await bcrypt.compare(parsedData.data?.password as string, user?.password as string);
    
        if(!verifyPassword) {
            return res.status(401).json({
                message: "Wrong password. Please try again."
            })
        }
    
        const token = await jwt.sign({ userId: user?.id }, JWT_SECRET as string);
    
        return res.status(200).json({
            message: "Successfully signed in",
            token: token,
            data: {
                username: user?.username,
                email: user?.email,
                userId: user?.id
            }
        })
        
    } catch (error) {
        
        res.status(400).json({
            message: "Something went wrong. Please try again!"
        })
    }

    

}