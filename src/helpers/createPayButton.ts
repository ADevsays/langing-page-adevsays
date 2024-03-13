import { createPaypalButton } from "src/services/paypal/connectPaypal";

export default async function createPayButton(price:string = "20.00"){
    const paypalContainer = document.querySelector("#paypalContainer") as HTMLElement;
    if(!paypalContainer) return;
    await createPaypalButton(paypalContainer, price);
}