import client from "@repo/db";
import { JWT_SECRET } from "../config";
import {Request, Response} from "express";
import { WhizzCreateSchema } from "@repo/types";

export const CreateWhizz = async (req: Request, res: Response): Promise<any> => {

    try {
        //@ts-ignore
        const id : string = req.id;
        const body = req.body;

        console.log(body);
        
        // {
        //     availableActionTriggerId: 1,
        //     actions: [
        //         {
        //             availableActionId: 'email',
        //             actionMetadata: [Object],
        //             sortingOrder: 2
        //         }, 
        //         {
        //             availabeActionId: 'send-phonepe',
        //             actionMetadata: [Object],
        //             sortingOrder: 3
        //         }
        //     ]
        // }
        
    
        const parsedData = WhizzCreateSchema.safeParse(body);
        console.log(parsedData.error);
        
    
        if(parsedData.error) {
            return res.status(411).json({
                message: "Incorrect inputs!"
            })
        }

        const newWhizz = await client.$transaction(async tx => {
            const zap = await tx.zap.create({
                data: {
                    userId: parseInt(id),
                    triggerId: "",
                    actions: {
                        create: parsedData?.data?.actions.map((x, index) => ({
                            actionId: x.availableActionId as string,
                            sortingOrder: index + 1,
                        }))
                    }
                }
            });

            const trigger = await tx.trigger.create({
                data: {
                    triggerId: parsedData?.data?.availableTriggerId,
                    zapId: zap.id,
                }
            });

            await tx.zap.update({
                where: {
                    id: zap.id
                },
                data: {
                    triggerId: trigger.id
                }
            });

            return zap.id;
        })
    
        // const newWhizz = await client.zap.create({
        //     data: {
        //         userId: parseInt(id),
        //         zap_name: parsedData.data.zap_name as string || "Untitled",
        //         actions: {
        //             create: parsedData.data?.actions.map((action, index) => ({
        //                 actionId: action.availableActionId,
        //                 metadata: action.actionMetadata,
        //                 sortingOrder: index
        //             }))
        //         },
        //         trigger: {
        //             create: {
        //                 triggerId: parsedData.data.availableTriggerId,
        //                 metadata: parsedData.data.triggerMetadata
        //             }
        //         }
        //     }, 
        //     include: {
        //         actions: true,
        //         trigger: true
        //     }
        // })
    
        return res.status(201).json({
            newWhizz
        })
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Something went wrong while creating the Whizz. Please try again!"
        })

    }
}

export const GetWhizzes = async (req: Request, res: Response) : Promise<any> => {
    try {
        //@ts-ignore
        const id: string = req.id;
        const allWhizzes = await client.zap.findMany({
            where: {
                userId: parseInt(id)
            }
        })

        res.status(200).json({
            allWhizzes
        })
        
    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong while fetching the Whizzes!"
        })
    }
}


export const GetTriggers = async (req: Request, res: Response) => {
    
    try {
        const availableTriggers = await client.availableTrigger.findMany({});

        res.json({
            availableTriggers
        })

    } catch (error) {
        res.status(404).json({
            message: "Cannot find triggers!"
        })
    }
}

export const GetActions = async (req: Request, res: Response) => {

    try {
        const availableActions = await client.availableAction.findMany({});

        res.json({
            availableActions
        });

    } catch (error) {
        res.status(404).json({
            message: "Cannot find triggers!"
        })
    }
}