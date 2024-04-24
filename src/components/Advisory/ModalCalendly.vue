<script lang="ts" setup>
import { closeModal } from "src/utils/actionsModal";

const handleClick = ()=>{
    closeModal("#modalCalendly");
}

</script>

<template>
    <div id="modalCalendly" class="w-full fixed hidden inset-0 h-screen z-[999] justify-center items-center bg-black bg-opacity-70 pt-14 overflow-hidden">
        <div id="widgetCalendly" class="w-[600px] h-full rounded-lg">
            <div class="calendly-inline-widget" data-url="https://calendly.com/adevsaysoficial/60min?&embed_type=PopupText&hide_gdpr_banner=1&background_color=121212&text_color=f0f0f0&primary_color=fff000 " style="min-width:300px;height:640px;background-color:transparent"></div>
        </div> 
        <button @click="handleClick" id="closeModalCalendly" class="absolute top-[12px] right-[10px]">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
            </span>
        </button>   
    </div>
</template>
