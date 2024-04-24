import keyCouponUse from "src/consts/keyCouponUse";
import createPayButton from "src/helpers/createPayButton";
import { getFromLocal } from "src/helpers/getFromLocal";
import parsedToken from "src/helpers/parsedToke";
import { handleModal, insertCalendlyWidget } from "src/utils/actionsModal";
import { checkIfPaymentIsExpired } from "src/utils/checkPayment";
import { ref } from "vue";

export function useHandleOpenPayment(){
    const currentPrice = ref("19");

    const handleClick =()=>{
        const checkPayment = checkIfPaymentIsExpired();
        const saveCoupon = getFromLocal(keyCouponUse);
        if(saveCoupon){
            const realTimeCoupon = parsedToken(saveCoupon);
            currentPrice.value = realTimeCoupon.price;
        }
        if(!checkPayment){
            createPayButton(currentPrice.value);
            handleModal("#paypalModal", 800);
            return;    
        }
        if(checkPayment.payment){
            insertCalendlyWidget("#widgetCalendly");
            handleModal("#modalCalendly", 1500);
        }
    }
    return {handleClick, currentPrice};
}