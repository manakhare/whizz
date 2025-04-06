require("dotenv").config();
import nodemailer from "nodemailer";
import { ICommentBody } from "../../types";

// ------ZAPRUN DETAILS-------- {
//     id: '7aef0914-a616-4176-b4b8-4f1162fbbd60',
//     metadata: {
//       userName: 'Mana Khare',
//       commentId: '1',
//       userEmail: 'mana@gmail.com',
//       commentBody: '{name:"Shivam", upiId: "shivam@upi", amount: "1000", email: "shivam@gmail.com" }',
//       githubUsername: 'manakhare'
//     },
//     zapId: 'c93ecec5-bea3-4d84-968c-3744f1cc84a2',
//     zap: {
//       id: 'c93ecec5-bea3-4d84-968c-3744f1cc84a2',
//       zap_name: 'Untitled',
//       userId: 1,
//       triggerId: '6b281984-c07d-4807-b6a6-45757244c698',
//       lastModified: 2025-04-03T16:01:37.314Z,
//       status: 'INACTIVE',
//       actions: [ [Object] ]
//     }
//   }

// CURRENT ACTION ---- {
//     id: 'd3888be5-4b4d-4325-b88e-8ea932da0495',
//     zapId: 'c93ecec5-bea3-4d84-968c-3744f1cc84a2',
//     actionId: 'phonepe',
//     metadata: { toUpi: 'webhook', amount: 'webhook', fromUPI: 'manakhare@upi' },
//     sortingOrder: 1,
//     type: {
//       id: 'phonepe',
//       name: 'Phonepe',
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7C7cl9ufztQRxoH-y_biXvwoAf5bynbtnA&s'
//     }
//   }


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: process.env.SMTP_ENDPOINT,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD
//     }
// })

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

interface EmailData {
    userName: string;
    userEmail: string;
    receiverName: string;
    receiverEmail: string;
    subject: string;
    body: string;
}

interface IEmailMetadataProps {
    userName: string | undefined;
    // receiverName: string | undefined;
    // receiverEmail: string | undefined;
    userEmail: string | undefined;
    commentBodyData?: ICommentBody;
    body: string | undefined;
}

const sendEmail = async ({userName, userEmail, body, commentBodyData} : IEmailMetadataProps) => {
    try {
        // const bodyData = body?.split('\n').map((line: string) => `<p>${line}</p>`).join(' ') || " ";
        const bodyData = body?.split('\n').map((line: string) => `<p>${line}</p>`);
        const mailOptions = {
            from: userEmail==='webhook' ? commentBodyData?.email : userEmail,
            to: commentBodyData?.email,
            subject: `Hello ${commentBodyData?.name}, ${userName} has sent you a message`,
            text: `${bodyData?.map((line: string) => line.replace(/<p>|<\/p>/g, '')).join('\n')}`,
            html: `<b>Sent you amount of ${commentBodyData?.amount}</b>`,
        };

        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent: ", info.messageId);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
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
