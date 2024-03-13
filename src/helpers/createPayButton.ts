import { createPaypalButton } from "src/services/paypal/connectPaypal";

export default async function createPayButton(price:string = "20.00"){
    console.log(price)
    const paypalContainer = document.querySelector("#paypalContainer") as HTMLElement;
    if(!paypalContainer) return;
    const res = await fetch("/api/get-paypal-id");
    const {id} = await res.json();
    await createPaypalButton(id, paypalContainer, price);
}