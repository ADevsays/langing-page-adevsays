import type { APIRoute } from "astro";
import validateOriginAPI from "src/helpers/validateOriginAPI";
import { connectGoogleSheets } from "src/services/googleSheets/connectGoogleSheets";
export const prerender=false;


export const GET: APIRoute = async({request})=>{
    const allowedDomains = validateOriginAPI(request);
    if(!allowedDomains) return new Response("Unauthorized", {status: 401});
    try {
        await connectGoogleSheets();
        const response = new Response(JSON.stringify({msg:"Correct connection"}));
        allowedDomains.forEach((domain)=>{
            response.headers.set('Access-Control-Allow-Origin', domain);
        });
        return response;
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error:"Something was wrong"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

}