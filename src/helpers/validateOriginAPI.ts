export default function validateOriginAPI(request:Request){
    const allowedDomains = ["https://www.adevsays.com", "https://www.adevsays.vercel.app", "http://localhost", "http://localhost:4321"];
    const domain = request.headers.get('origin') || "http://localhost";
    if(!allowedDomains.includes(domain)){
        return null;
    }
    return allowedDomains;
}