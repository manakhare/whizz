import {Kafka} from "kafkajs";

const kafka = new Kafka({
    clientId: "zapier_kafka",
    brokers: ['localhost:9092'],
})

export default kafka;