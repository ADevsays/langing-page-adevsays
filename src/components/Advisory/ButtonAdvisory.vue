<script lang="ts" setup>
import MasterCard from '@icons/MasterCard.vue';
import {useHandleOpenPayment} from "../../composables/useHandleOpenPayment";

const {handleClick, currentPrice} = useHandleOpenPayment();
</script>

<template>
    <button
        @click="handleClick"
        type="button" 
        class="relative text-black mt-4 flex justify-between font-bold py-4 items-center gap-0 w-full bg-gradient-to-br from-yellow-300 text-sm md:text-base transition to-orange-500 hover:from-yellow-400 hover:to-orange-600 rounded-lg px-2 md:px-4">
        <span class="flex items-center justify-center w-full gap-4">
            Agenda tu asesoría por ${{currentPrice}}
            <MasterCard/>
        </span>
    </button>
</template>
