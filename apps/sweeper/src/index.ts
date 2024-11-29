import kafka from "@repo/kafka";
import client from "@repo/db";
import express from "express";

const app = express();

const TOPIC_NAME = "whizz-events"

async function main() {
    const producer = kafka.producer();
    
    await producer.connect();

    while(1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        })

        producer.send({
            topic: TOPIC_NAME,
            // messages: pendingRows.map(row => ({
            //     value: row.zapRunId
            // }))
            messages: pendingRows.map(row => {
                return {
                    value: JSON.stringify({ zapRunId: row.zapRunId, stage: 0 })
                }
            })
        })

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(row => row.id)
                }
            }
        })
    }
}

main();


// app.listen(8002, () => {
//     console.log('Sweeper is listening on PORT 8002');
// })
