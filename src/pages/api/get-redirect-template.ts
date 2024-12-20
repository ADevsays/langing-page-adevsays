import type { APIRoute } from "astro";
export const prerender=false;

export const GET: APIRoute = async()=>{
    const targetUrl = "https://drive.google.com/file/d/1DOdvt4lK0plTSm2OJJU-V1JWK0FTbR2F/view?usp=drive_link"
    return new Response(null, {
        status: 302, 
        headers:{
            Location: targetUrl,
            "Content-Type": "text/html; charset=utf-8", 
        }
    })
}