import type { APIRoute } from "astro";
export const prerender=false;

export const GET: APIRoute = async()=>{
    const targetUrl = "https://t.me/+H6MJPG3Xd-1hY2Qx";
    return new Response(null, {
        status: 302, 
        headers:{
            Location: targetUrl,
            "Content-Type": "text/html; charset=utf-8", 
        }
    })
}