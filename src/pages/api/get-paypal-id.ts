import type { APIRoute } from "astro";
export const prerender=false;

const PAYPAL_API = import.meta.env.PAYPAL_API_KEY;

export const GET: APIRoute = async({request})=>{
    const allowedDomains = ["https://adevsays.com", "https://adevsays.vercel.app/asesoria", "http://localhost", "https://www.adevsays.com/asesoria"];
    const domain = request.headers.get('origin') || "http://localhost";
    if(!allowedDomains.includes(domain)){
        return new Response("Unauthorized", {status: 401});
    }

    const res = new Response(JSON.stringify({
        id: PAYPAL_API
    }));
    allowedDomains.forEach((domain)=>{
        res.headers.set('Access-Control-Allow-Origin', domain);
    });
    return res;
}