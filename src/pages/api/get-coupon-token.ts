import type { APIRoute } from "astro";
import validateOriginAPI from "src/helpers/validateOriginAPI";
import { getCouponTokens } from "src/services/googleSheets/tokenCouponActions";
export const prerender=false;


export const GET: APIRoute = async({request})=>{
    const allowedDomains = validateOriginAPI(request);
    if(!allowedDomains) return new Response("Unauthorized", {status: 401});
    try {
        const coupon = await getCouponTokens();
        const tokens = new Response(JSON.stringify(coupon));
        allowedDomains.forEach((domain)=>{
            tokens.headers.set('Access-Control-Allow-Origin', domain);
        });
        return tokens;
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error:"Something was wrong"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}