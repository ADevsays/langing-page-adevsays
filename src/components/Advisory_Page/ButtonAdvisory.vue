<script lang="ts" setup>
import MasterCard from '@icons/MasterCard.vue';
import keyCouponUse from 'src/consts/keyCouponUse';
import createPayButton from 'src/helpers/createPayButton';
import { getFromLocal } from 'src/helpers/getFromLocal';
import parsedToken from 'src/helpers/parsedToke';
import { handleModal, insertCalendlyWidget } from 'src/utils/actionsModal';
import { checkIfPaymentIsExpired } from 'src/utils/checkPayment';
import { ref } from 'vue';

const currentPrice = ref("20");

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
</script>

<template>
    <button
        @click="handleClick"
        type="button" 
        class="relative text-black mt-4 flex justify-between font-bold py-4 items-center gap-0 w-full bg-gradient-to-br from-yellow-300 text-sm md:text-base transition to-orange-500 hover:from-yellow-400 hover:to-orange-600 rounded-lg px-2 md:px-4">
        <span class="flex items-center justify-center w-full gap-4">
            Agenda tu asesoría por $20
            <MasterCard/>

        </span>
    </button>
</template>
