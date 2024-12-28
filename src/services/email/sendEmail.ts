import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
import { htmlTemplateEmail } from 'src/utils/htmlTemplateEmail';
dotenv.config();

console.log(brevo)

const apiInstance = new brevo.TransactionalEmailsApi() as any;
const apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Función para enviar un email transaccional
export async function sendEmail(email:string, name:string) {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.subject = "Compra de DevJourney";
        sendSmtpEmail.htmlContent = htmlTemplateEmail(name);
        sendSmtpEmail.sender = { "name": "Adevsays", "email": "oficial@adevsays.com" };
        sendSmtpEmail.to = [{email, name}];
        sendSmtpEmail.headers = {"X-Mailin-TrackLinks": "false"};
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email enviado con éxito', );
        return response;
    } catch (error) {
        console.error('Error enviando email:', error);
        throw error;
    }
}

