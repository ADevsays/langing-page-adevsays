<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Loader from "@components/UI/Loader.vue";
import { useHandleOpenPayment } from "src/composables/useHandleOpenPayment";
import Price from "@components/Advisory/Price.vue";

const heroImg = ref<null | HTMLImageElement>(null);


onMounted(()=>{
    if(heroImg.value){
        heroImg.value.src = "/resources/advisory/Character.webp";
    }
});

const {handleClick} = useHandleOpenPayment();
   
</script>

<template>
    <section class="pt-40 pb-6 lg:pb-20 w-full z-20 lg:px-[9rem] px-6 flex lg:flex-row flex-col items-start justify-start gap-0 lg:gap-12 min-h-[550px]">
        <div class="[background:radial-gradient(125%_125%_at_50%_10%,#030712_58%,#CC0E0E_120%)] md:min-w-full flex flex-col xl:flex-row gap-8 h-auto relative p-4 pb-12 px-5 pt-8 lg:top-0 lg:py-20 lg:px-12 top-[-50px] rounded-xl">
            <aside class="pt-2 lg:max-w-[520px] aspect-video relative w-full draw-border ">
                <img
                    ref="heroImg" 
                    id="img"
                    lazy="loading"
                    class="animate-fade-in-up animate-delay-300 size-full rounded-lg shadow-sm object-cover shadow-yellow-300" 
                    alt="Imagen del personaje de Adevsays pero con estilo futurista">
            </aside>
            <aside class="text-left w-fit">
                <h1 class="font-bold text-2xl relative md:text-4xl lg:pt-0 lg:pb-0 pb-4 ">
                    Asesoría <span class="text-yellow-400">personal</span> con <span class="text-yellow-400">Adevsays</span>
                    <Price class-name="absolute top-[38px] md:top-[10px] right-[4px] md:right-0  lg:right-[20px] lg:top-[-32px]"/>
                </h1>
                <div class="text-gray-300 text-sm text-pretty md:text-lg pt-6 pb-8 w-full">
                    <p>
                        Soluciona tus problemas en una llamada <span class="font-bold">1 a 1</span> conmigo de <span class="font-bold">1:30 de duración</span>.
                        Podemos hablar para:
                    </p>
                    <ul class="ms-4 mt-3 list-disc text-sm md:text-base">
                        <li>Mejorar tu código.</li>
                        <li>Solucionar un problema específico.</li>
                        <li>Enseñarte algo nuevo.</li>
                    </ul>
                </div>
            <div class="w-full lg:max-w-[97%] relative flex justify-between items-center">
                <Price/>
                <button @click="handleClick" class="text-sm p-2 bg-gradient-to-br from-yellow-300 md:text-base transition to-orange-500 hover:from-yellow-400 hover:to-orange-600  rounded-lg px-3 border-black border-2 bg-yellow-400 text-black font-semibold">¡Agendar ahora!</button>
            </div>
            </aside>
        </div>
    </section>
    <div id="loader-modal" class=" hidden w-full h-screen absolute inset-0 bg-black bg-opacity-70 justify-center items-center z-[999]">
        <Loader/>
    </div>
</template>

<style>
      #img {
        transition: box-shadow 0.3s ease;
    }
    .draw-border::before,
    .draw-border::after {
        border: 0 solid transparent;
        border-radius: 7px;
        box-sizing: border-box;
        content: "";
        pointer-events: none;
        position: absolute;
        width: 0;
        height: 0;
        bottom: -4px;
        right: 2px;
    }
    .draw-border::before {
        border-bottom-width: 4px;
        border-left-width: 4px;
    }
    .draw-border::after {
        border-top-width: 4px;
        border-right-width: 4px;
    }
    .draw-border:hover {
        color: #ffe593;
    }
    .draw-border:hover::before,
    .draw-border:hover::after {
        border-color: #fde047;
        transition:
            border-color 0s,
            width 0.25s,
            height 0.25s;
        width: 100%;
        height: 100%;
    }
    .draw-border:hover::before {
        transition-delay: 0s, 0s, 0.25s;
    }
    .draw-border:hover::after {
        transition-delay: 0s, 0.25s, 0s;
    }
</style>