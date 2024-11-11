import kafka from "@repo/kafka";
import client from "@repo/db";

const TOPIC_NAME = "zap-events"

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
            messages: pendingRows.map(row => ({
                value: row.zapRunId
            }))
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