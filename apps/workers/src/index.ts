import dotenv from "dotenv"
import client from "@repo/db"
import kafka from "@repo/kafka"
import JsonObject from "@repo/db"
import sendEmail from "./services/email"

dotenv.config();

async function main() {
    const consumer = kafka.consumer({ groupId: "main-worker"});
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: process.env.TOPIC_NAME as string, fromBeginning: true });

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            });
            
            if(!message.value?.toString()) return;

            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage;

            const zapRunDetails = await client.zapRun.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            })

            const currentAction = zapRunDetails?.zap.actions.find( x => x.sortingOrder === stage);

            if(!currentAction) {
                console.log("current action not found");
                return;
            }

            const zapRunMetadata = zapRunDetails?.metadata;

            // send email
            if(currentAction.type.id === "email") {
                console.log("Sending mail...");
                
            //     const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
            //     const to = parse((currentAction.metadata as JsonObject))?.body as string, zapRunMetadata);
            //     console.log(`Sending out email to ${to} with body ${body}`);
            //     await sendEmail(to, body);
            }

            // send money

            // await new Promise(r => setTimeout(r, 500));

            const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; //1
            console.log(lastStage);
            console.log(stage);
            
            if(lastStage != stage) {
                console.log("Pushing back to the queue");
                
                await producer.send({
                    topic: process.env.TOPIC_NAME as string,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            }

            console.log("Processing done");
            
            await consumer.commitOffsets([{
                topic: process.env.TOPIC_NAME as string,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])
        } 
    })
}

main();
