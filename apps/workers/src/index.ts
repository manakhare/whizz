import dotenv from "dotenv"
import client from "@repo/db"
import kafka from "@repo/kafka"
import JsonObject from "@repo/db"
import sendEmail from "./services/email"
import { parse } from "./services/parse"
import { IAction, ICommentBody, IEmailMetadata, IPhonepeMetadata, IWebhookMetadata } from "../types"

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

            // console.log("------MESSAGE VALUE-------", message.value.toString());

            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage===0 ? 1 : parsedValue.stage;

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

            if (zapRunDetails?.zap.status === undefined || zapRunDetails?.zap?.status === "INACTIVE") {
                // console.log("Zap is not active");
                return;
            }
        

            const zapActions = zapRunDetails?.zap.actions
            

            const currentAction = zapRunDetails?.zap.actions.find( x => {
                return x.sortingOrder === stage
            });


            if(!currentAction) {
                console.log("current action not found");
                return;
            }
            
            // send email
            if(currentAction.type.id === "gmail") {
                const emailMetadata  = currentAction.metadata as unknown as typeof JsonObject;
                const { senderEmail, receiverEmail, body } = emailMetadata as unknown as IEmailMetadata;
                const webhookMetadata = zapRunDetails?.metadata as unknown as IWebhookMetadata;
                const { userName, userEmail, receiverName, commentBody } = webhookMetadata;
                const commentBodyData = parse(commentBody);
                
                const sendmail = await sendEmail({userName, userEmail, body, commentBodyData})
                console.log("Send mail: ", sendmail);
                
                console.log(`Sending email to ${receiverEmail==='webhook' ? commentBodyData.email : receiverEmail} from ${senderEmail==='webhook' ? userEmail : senderEmail}`);
            }

            // send money
            if(currentAction.type.id === "phonepe") {
                const paymentMetadata = currentAction.metadata as unknown as typeof JsonObject;
                const { fromUPI, toUpi, amount } = paymentMetadata as unknown as IPhonepeMetadata;
                const webhookMetadata = zapRunDetails?.metadata as unknown as IWebhookMetadata;
                const { userName, userEmail, receiverName, commentBody } = webhookMetadata;
                const commentBodyData = parse(commentBody);

                
                const from = fromUPI === 'webhook' ? commentBodyData?.senderUpiId : fromUPI;
                const to = toUpi === 'webhook' ? commentBodyData?.upiId : toUpi;
                const amountValue = amount === 'webhook' ? commentBodyData?.amount : amount;
                
                console.log(`Sending money from ${from} to ${to} of amount ${amountValue}`);
            }

            const lastStage = (zapRunDetails?.zap.actions?.length || 1); //1
            
            if(lastStage !== stage) {
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
