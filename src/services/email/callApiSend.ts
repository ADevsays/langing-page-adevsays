export default async function callSendEmail(data: {name:string, email:string}){
    try {
        const response = await fetch("/api/post-send-nodemailer", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        
        const json = await response.json();

        console.log(json);

        return json;
    } catch (error) {
        throw error;
    }
}