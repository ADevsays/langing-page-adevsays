import type { APIRoute } from "astro";
import { getCoupon } from "src/services/googleSheets/getCoupon";
export const prerender=false;


export const GET: APIRoute = async({request})=>{
    const allowedDomains = ["https://www.adevsays.com", "https://www.adevsays.vercel.app", "http://localhost", "http://localhost:4321"];
    const domain = request.headers.get('origin') || "http://localhost";
    if(!allowedDomains.includes(domain)){
        return new Response("Unauthorized", {status: 401});
    }
    try {
        const coupon = await getCoupon();
        const couponData = new Response(JSON.stringify(coupon));
        allowedDomains.forEach((domain)=>{
            couponData.headers.set('Access-Control-Allow-Origin', domain);
        });
        return couponData;
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error:"Something was wrong"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}