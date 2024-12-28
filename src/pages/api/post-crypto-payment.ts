import type { APIRoute } from 'astro';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

export const prerender=false;
const MERCHANT_ID = process.env.CRYPTOMUS_MERCHANT_ID;
const API_KEY = process.env.CRYPTOMUS_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const {email, name} = await new Response(request.body).json();
  
    const payload = {
      amount: "14.99",
      currency: "USD",
      order_id: crypto.randomBytes(12).toString("hex"),
      url_callback: `https://adevsays.com/api/post-crypto-webhook?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`,
    };
  
    const sign = crypto
      .createHash("md5")
      .update(Buffer.from(JSON.stringify(payload)).toString("base64") + API_KEY)
      .digest("hex");
  
    const headers = new Headers({
      "Content-Type": "application/json",
      "merchant": MERCHANT_ID!,
      "sign": sign,
    });
  
    const response = await fetch("https://api.cryptomus.com/v1/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: `Have been a error with payment ${error}`}),{
      status: 500,
      headers: { 'Content-Type': 'application/json' },
  });
  }
};