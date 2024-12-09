require("dotenv").config();
import { Request, Response } from "express";
import client from "@repo/db";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { SignInType, SignUpType } from "@repo/types";
import { SALT_ROUNDS, JWT_SECRET } from "../config";

export const SignUp = async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    const parsedData = SignUpType.safeParse(body);

    // check if inputs are correct
    if (parsedData.error) {
        res.status(411).json({
            message: "User input validation failed. Please check your inputs and try again!"
        })
    }

    // hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(parsedData?.data?.password as string, parseInt(SALT_ROUNDS as string));

    try {
        // save user data in DB
        const user = await client.user.create({
            data: {
                email: parsedData.data?.email as string,
                username: parsedData.data?.username as string,
                password: hashedPassword
            }
        })

        if (!user) {
            res.status(400).json({
                message: "Something went wrong while creating account"
            })
        }

        // sign the user id and create a authentication token
        const token = await jwt.sign({ userId: user.id }, JWT_SECRET as string);

        res.status(201).json({
            token: token,
            data: {
                userId: user.id,
                username: user.username,
                email: user.email
            }
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
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
            res.status(404).json({
                message: "User does not exist. Please sign up."
            })
        }
    
        // verify password
        const verifyPassword = await bcrypt.compare(parsedData.data?.password as string, user?.password as string);
    
        if(!verifyPassword) {
            res.status(401).json({
                message: "Wrong password. Please try again."
            })
        }
    
        const token = await jwt.sign({ userId: user?.id }, JWT_SECRET as string);
    
        res.status(200).json({
            message: "Successfully signed in",
            token: token,
            data: {
                username: user?.username,
                email: user?.email,
                userId: user?.id
            }
        })
        
    } catch (error) {
        console.log(error);
        
        // res.status(400).json({
        //     message: "Something went wrong. Please try again!"
        // })
    }

    

}