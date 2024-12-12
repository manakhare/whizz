import express, {Request, Response} from "express";
import client from "@repo/db";
import kafka from "@repo/kafka";

const app = express();

app.post("/hooks/:userId/:zapId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const metadata = req.body

    try {
        await client.$transaction(async (tx) => {
            const newZapRun = await tx.zapRun.create({
                data: {
                    zapId: zapId || "",
                    metadata: metadata
                }
            })
    
            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: newZapRun.id || ""
                }
            })
    
        })
    
        res.status(201).json({
            message: "The zap is being processed"
        })
    
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong while entering the zap in outbox table"
        })
    }

})

// app.listen(8001, () => {
//     console.log("Listening to hooks at port 8001"); 
// })