import type { APIRoute } from "astro";
import validateOriginAPI from "src/helpers/validateOriginAPI";
import { saveCouponToken } from "src/services/googleSheets/tokenCouponActions";
export const prerender=false;

export const POST: APIRoute = async({request})=>{
    const allowedDomains = validateOriginAPI(request);
    if(!allowedDomains) return new Response("Unauthorized", {status: 401});
    try {
        const body = await new Response(request.body).json();
        const response = await saveCouponToken(body);
        if(!response) throw new Error("Error to connect google sheet and save token");
        const successfull = new Response(JSON.stringify({msg:"Successfull", body}));
        allowedDomains.forEach((domain)=>{
            successfull.headers.set('Access-Control-Allow-Origin', domain);
        });
        return successfull;
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error:"Something was wrong"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}