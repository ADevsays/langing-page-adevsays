export default function parsedToken(token:string){
    return JSON.parse(atob(token));
}