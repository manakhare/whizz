require("dotenv").config();
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_ENDPOINT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})


const sendEmail = async () => {
    try {
        await transporter.sendMail({
            from: "manakhare5@gmail.com",
            to: "kharemana31@gmail.com",
            subject: "Test",
            text: "Hello"
        })
    } catch (error) {
        console.log(error);
    }
}

transporter.verify((error, success) => {
    if(error) {
        console.log(error);  
    }
    else {
        console.log("Server is ready to take our message");
    }
})

export default sendEmail;
