import {google} from "googleapis";
import type { APIRoute } from "astro";
export const prerender=false;

export const POST: APIRoute = async ({request})=>{
    try{
        const {email} = await new Response(request.body).json();
        if(!email) throw new Error('No email send');
        
        const credentials = Buffer.from(import.meta.env.GOOGLE_CREDENTIALS , 'base64').toString('utf-8');
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(credentials),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    
        const sheets = google.sheets({ version: 'v4', auth});

        const sheet = await sheets.spreadsheets.values.get({
            spreadsheetId: '1IWTQ18Hai6cV-dsRbtFJiT0XFgKIVLR42H1dpmZVaPs',
            range: 'Hoja 1'
        });

        const rows = sheet.data.values;
        if (rows?.some(row => row[0] === email)) {
            throw new Error('Email already exists');
        }

        //@ts-ignore
        await sheets.spreadsheets.values.append({
            spreadsheetId: '1IWTQ18Hai6cV-dsRbtFJiT0XFgKIVLR42H1dpmZVaPs',
            range: 'Hoja 1',
            valueInputOption: 'USER_ENTERED', 
            insertDataOption: 'INSERT_ROWS',
            resource:{
                values:[[email]]
            }
          },
        );
    
        return new Response(JSON.stringify({success: `The email ${email} was be saved in Google Sheet`}),{
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    }catch(e){
        console.error(e);

        return new Response(JSON.stringify({error: "Have been error"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}