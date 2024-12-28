export default async function cryptoPayment(data: {email:string, name:string}){
    try {
        const response = await fetch("/api/post-crypto-payment", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
    
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}