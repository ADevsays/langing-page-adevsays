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

onMounted(()=>{

    const FUTURE_TIMESTAMP = 1709614800000;
    
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
    <div class="w-full animate-blurred-fade-in py-16 md:py-20 box-border px-16 font-bold text-3xl md:text-5xl justify-center mt-3 flex gap-2 md:gap-6 border rounded-lg lg:max-w-[800px] lg:my-12">
        <ItemCountDown :time="time.days" label="Días"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.hours" label="Horas"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.minutes" label="Minutos"/>
        <span aria-hidden="true">:</span>
        <ItemCountDown :time="time.seconds" label="Segundos"/>
    </div>
</template>