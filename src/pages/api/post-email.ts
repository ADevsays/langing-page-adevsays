import type { APIRoute } from "astro";
import { insertEmail } from "src/services/googleSheets/insertEmail";
export const prerender=false;

export const POST: APIRoute = async ({request})=>{
    try{
        const {email} = await new Response(request.body).json();
        if(!email) throw new Error('No email send');
        const response = await insertEmail(email);
        if(!response)  throw new Error('Email already exists');

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