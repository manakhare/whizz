import client from "@repo/db";
import { JWT_SECRET } from "../config";
import { Request, Response } from "express";
import { WhizzCreateSchema } from "@repo/types";

export const CreateWhizz = async (req: Request, res: Response): Promise<any> => {

    try {
        //@ts-ignore
        const id: string = req.id;
        const body = req.body;

        const parsedData = WhizzCreateSchema.safeParse(body);

        if (parsedData.error) {
            return res.status(411).json({
                message: "Incorrect inputs!"
            })
        }

        const newWhizz = await client.$transaction(async (tx: any) => {


            const existingTrigger = await tx.availableTrigger.findUnique({
                where: { id: parsedData?.data?.availableTriggerId }
            });

            const allTriggers = await tx.availableTrigger.findMany({});


            if (!existingTrigger) {

                return res.status(400).json({
                    message: "Invalid triggerId. It does not exist in AvailableTrigger."
                });
            }


            const zap = await tx.zap.create({
                data: {
                    userId: parseInt(id),
                    triggerId: "",
                    actions: {
                        create: parsedData?.data?.actions.map((x: any, index: any) => ({
                            actionId: x.availableActionId as string,
                            metadata: x.actionMetadata,
                            sortingOrder: index + 1,
                        }))
                    },
                    status: parsedData?.data?.status,
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


        return res.status(201).json(JSON.parse(JSON.stringify(newWhizz)));


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while creating the Whizz. Please try again!"
        })

    }
}


export const GetWhizzes = async (req: Request, res: Response): Promise<any> => {
    try {
        //@ts-ignore
        const id: string = req.id;
        const allWhizzes = await client.zap.findMany({
            where: {
                userId: parseInt(id)
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        })

        return res.status(200).json({
            allWhizzes
        })

    } catch (error) {
        return res.status(404).json({
            message: "Something went wrong while fetching the Whizzes!"
        })
    }
}


export const UpdateWhizz = async (req: Request, res: Response): Promise<any> => {
    try {
        //@ts-ignore
        const id = req.id;
        const body = req.body;

        console.log(body);


        const whizz = await client.zap.update({
            where: {
                userId: id,
                id: body.id
            },
            data: {
                zap_name: body.whizz_name,
                status: body.status
            }
        })

        return res.status(200).json({
            message: "Updated name and status successfully",
            whizz
        })

    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong while updating the zap_name"
        })
    }
}


export const GetTriggers = async (req: Request, res: Response): Promise<any> => {

    try {
        const availableTriggers = await client.availableTrigger.findMany({});

        return res.json({
            availableTriggers
        })

    } catch (error) {
        return res.status(404).json({
            message: "Cannot find triggers!"
        })
    }
}


export const GetActions = async (req: Request, res: Response): Promise<any> => {

    try {
        const availableActions = await client.availableAction.findMany({});

        return res.json({
            availableActions
        });

    } catch (error) {
        return res.status(404).json({
            message: "Cannot find triggers!"
        })
    }
}


export const DeleteWhizz = async (req: Request, res: Response): Promise<any> => {
    try {
        const whizzId = req.params.id;
        const triggerId = req.params.triggerId;
        //@ts-ignore
        const id = req.id;

        console.log("Whizz ID: ", whizzId);


        const deletedWhizz = await client.zap.delete({
            where: {
                userId: id,
                id: whizzId,
                triggerId: triggerId
            }
        })

        console.log(deletedWhizz);


        return res.status(200).json({
            message: "Delete successful",
            data: deletedWhizz
        })



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong while deleting whizz."
        })
    }
}