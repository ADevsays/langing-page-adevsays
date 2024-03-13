import keyCouponUse from "src/consts/keyCouponUse";
import { getFromLocal } from "src/helpers/getFromLocal";
import { saveInLocal } from "src/helpers/saveInLocal";
import { createFingerPrint } from "./fingerPrint";

interface ArgumentCheckUsed{
    couponName:string,
    expirationTime:number,
    price?:string 
}

export async function saveCouponInSheet({couponName, expirationTime, price}:ArgumentCheckUsed){
    const token = await createFingerPrint();
    const response = await fetch("/api/post-token-coupon", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({token, couponName, expirationTime, price})
    })
    const tokenData = await response.json();
    return tokenData;
}

async function checkUserHaveToken(userToken:string){
    const response = await fetch("api/get-coupon-token");
    const tokens  = await response.json() as TokenCoupon[];
    const userCouponToken = tokens.find(({token})=> token === userToken) as TokenCoupon;
    if(!userCouponToken) return null;
    return userCouponToken;
}

export async function reloadTokenIfExists(){
    const fingerPrint = await createFingerPrint();
    const stringDataCouponUsed = getFromLocal(keyCouponUse);
    if(stringDataCouponUsed) return false;
    const userToken = await checkUserHaveToken(fingerPrint);
    if(!userToken) return false;
    const sendData = {
        couponName:userToken.couponName, 
        expirationTime:userToken.expirationTime,
        price: userToken.price
    };
    await checkUsedCoupon(sendData);    
    return {isUsed:true, price: userToken.price};
}

export async function checkUsedCoupon({couponName, expirationTime, price}:ArgumentCheckUsed){
    const stringDataCouponUsed = getFromLocal(keyCouponUse);
    if(!stringDataCouponUsed){
        const fingerPrint = await createFingerPrint();
        const token = btoa(`${couponName}-${fingerPrint}`);
        const couponStateData = {
            isUsed: true,
            token, 
            expirationTime,
            price: price
        };
        saveInLocal(keyCouponUse, btoa(JSON.stringify(couponStateData)));
        return {isUsed:false};
    }
    const objCouponDataSave = JSON.parse(atob(stringDataCouponUsed));
    return objCouponDataSave;
}