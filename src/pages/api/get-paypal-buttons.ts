import type { APIRoute } from "astro";

const PAYPAL_API = import.meta.env.PAYPAL_API_KEY;

export const GET: APIRoute = async({request})=>{
    const domain = request.headers.get('origin');
    console.log(request.headers)
    return new Response(JSON.stringify({
        domain
    }));
}