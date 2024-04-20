import { createPaypalButton } from "src/services/paypal/connectPaypal";

export default async function createPayButton(price:string = "19.00"){
    const paypalContainer = document.querySelector("#paypalContainer") as HTMLElement;
    if(!paypalContainer) return;
    await createPaypalButton(paypalContainer, price);
}