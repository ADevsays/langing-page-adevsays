import type { APIRoute } from "astro";
import validateOriginAPI from "src/helpers/validateOriginAPI";
import { getCoupon } from "src/services/googleSheets/getCoupon";
export const prerender=false;


export const GET: APIRoute = async({request})=>{
    const allowedDomains = validateOriginAPI(request);
    if(!allowedDomains) return new Response("Unauthorized", {status: 401});
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