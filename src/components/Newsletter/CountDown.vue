<script lang="ts" setup>
import {reactive, onMounted} from "vue";
import ItemCountDown from "./ItemCountDown.vue";

interface Time {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

const time: Time = reactive({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
});

const getFutureTimeStamp = () => {
    const today = new Date();
    
    // Ajusta la fecha al día 22 del mes actual
    const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
    
    return futureDate.getTime();
};

onMounted(()=>{
    const FUTURE_TIMESTAMP = getFutureTimeStamp();    
    const formatTime =(time:number)=>{
        return Math.floor(time).toString().padStart(2, "0");
    }
    if(FUTURE_TIMESTAMP < Date.now()) return;
    
    function setupTime(){
        const SECONDS = 1000;
        const MINUTES = SECONDS * 60;
        const HOURS = MINUTES * 60;
        const DAYS = HOURS * 24;
        const difference = FUTURE_TIMESTAMP -  Date.now();
        time.days = formatTime(difference / DAYS);
        time.hours = formatTime((difference % DAYS) / HOURS );
        time.minutes = formatTime((difference % HOURS) / MINUTES );
        time.seconds = formatTime((difference % MINUTES) / SECONDS );

        requestAnimationFrame(setupTime);
    }
    setupTime();
});

</script>

<template>
    <div class="w-full box-border animate-blurred-fade-in text-gray-300 flex font-bold border rounded-lg py-3 border-gray-700 justify-center">
        <ItemCountDown :time="time.days" label="Días"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.hours" label="Horas"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.minutes" label="Minutos"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.seconds" label="Segundos"/>
    </div>
</template>