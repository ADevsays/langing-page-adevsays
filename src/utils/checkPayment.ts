import keyPayment from "src/consts/keyPaymentData";
import { deleteFromLocal } from "src/helpers/deleteFromLocal";
import { getFromLocal } from "src/helpers/getFromLocal";
import { saveInLocal } from "src/helpers/saveInLocal";

const objPayment:CheckPayment = {
    expiration: 0,
    payment: false,
    quantity: "0",
    useCoupon: false,
    setExpiration: function(){
        const now = new Date().getTime();
        this.expiration =  now + (2 * 60 * 60 * 1000);
    }
}

export function savePayment(quantity: string){
    objPayment.payment = true;
    objPayment.quantity = quantity;
    objPayment.setExpiration();
    const encripted = btoa(JSON.stringify(objPayment));
    saveInLocal(keyPayment, encripted);
}

export function checkIfPaymentIsExpired(){
    const now = new Date().getTime();
    const stringObjSave = getFromLocal(keyPayment);
    if(!stringObjSave) return;
    const objPaymentSave = JSON.parse(atob(stringObjSave));
    const isExpired = now >= objPaymentSave.expiration;
    if(isExpired) deleteFromLocal(keyPayment);
    return objPaymentSave;
}