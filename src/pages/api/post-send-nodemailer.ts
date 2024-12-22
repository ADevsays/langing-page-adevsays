import type { APIRoute } from "astro";
import { sendEmail } from "src/services/email/sendEmail";
export const prerender=false;

export const POST: APIRoute = async ({request})=>{
    console.log("call")
    try {
        const {email, name} = await new Response(request.body).json();
        await sendEmail(email, name);
        return new Response(JSON.stringify({success: `The email ${email} was be send`}),{
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({error: `Have been a error with email ${error}`}),{
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}