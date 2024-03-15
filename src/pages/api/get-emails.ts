import type { APIRoute } from "astro";
import validateOriginAPI from "src/helpers/validateOriginAPI";
import { getEmails } from "src/services/googleSheets/getEmails";
export const prerender=false;

export const GET: APIRoute = async({request})=>{
    const allowedDomains = validateOriginAPI(request);
    if(!allowedDomains) return new Response("Unauthorized", {status: 401});
    try {
        const emails = await getEmails();
        const emailsData = new Response(JSON.stringify(emails));
        allowedDomains.forEach((domain)=>{
            emailsData.headers.set('Access-Control-Allow-Origin', domain);
        });
        return emailsData;
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error:"Something was wrong"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}