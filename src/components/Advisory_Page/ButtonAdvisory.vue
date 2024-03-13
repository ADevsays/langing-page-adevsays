<script lang="ts" setup>
import MasterCard from '@icons/MasterCard.vue';
import createPayButton from 'src/helpers/createPayButton';
import { handleModal, insertCalendlyWidget } from 'src/utils/actionsModal';
import { checkIfPaymentIsExpired } from 'src/utils/checkPayment';

const handleClick =()=>{
    const checkPayment = checkIfPaymentIsExpired();
    if(!checkPayment){
        createPayButton();
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
        id="buttonAdvisory"
        type="button" 
        class="relative text-black mt-4 flex justify-between font-bold py-4 items-center gap-0 w-full bg-gradient-to-br from-yellow-300 text-sm md:text-base transition to-orange-500 hover:from-yellow-400 hover:to-orange-600 rounded-lg px-2 md:px-4">
        <span class="flex items-center justify-center w-full gap-4">
            Agenda tu asesoría por $20
            <MasterCard/>

        </span>
    </button>
</template>
