import type { APIRoute } from 'astro';
import crypto from 'crypto';
import dotenv from "dotenv";
import callSendEmail from 'src/services/email/callApiSend';

dotenv.config();

export const prerender=false;
const API_KEY = process.env.CRYPTOMUS_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  const rawBody = await request.text(); 
  const { sign } = JSON.parse(rawBody);

  if (!sign) {
    return new Response(JSON.stringify({ message: "Invalid sign" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const url = new URL(request.url); 
  const email = url.searchParams.get('email') || ""; 
  const name = url.searchParams.get('name') || "";
  
  const data = JSON.parse(rawBody);
  delete data.sign;

  const calculatedSign = crypto
    .createHash("md5")
    .update(Buffer.from(JSON.stringify(data)).toString("base64") + API_KEY)
    .digest("hex");

  if (sign !== calculatedSign) {
    return new Response(JSON.stringify({ message: "Invalid sign" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await callSendEmail({name, email});

  return new Response(null, {
    status: 302, 
    headers:{
        Location: "htttps://adevsays.com/minimarket/devjourney/success",
        "Content-Type": "text/html; charset=utf-8", 
    }
  });
};
