import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { htmlTemplateEmail } from "src/utils/htmlTemplateEmail";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, 
  auth: {
    user: process.env.BREVO_USER, 
    pass: process.env.BREVO_PASS,       
  },
  headers: {
    "X-Mailin-Track": "false", 
    "X-Mailin-TrackLinks": "false", 
  },
});

export async function sendEmail(email:string, name:string){
    const html = htmlTemplateEmail(name);
    const mailOptions = {
        from: '"Adevsays" oficial@adevsays.com',
        to: email,
        subject: "Compra de DevJourney",
        html,
    };

    console.log(mailOptions, process.env.BREVO_HOST)
      
    await transporter.sendMail(mailOptions, (error:Error, info:{response:string}) => {
        if (error) {
            return console.error("Error:", error);
        }
        console.log("Correo enviado:", info.response);
    });
}