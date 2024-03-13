<script lang="ts" setup>
import { changeClass } from "src/helpers/changeClass";
import ButtonAdvisory from "./ButtonAdvisory.vue";
import { onMounted, ref } from "vue";
import Loader from "@components/Loader.vue";

const heroImg = ref<null | HTMLImageElement>(null);


onMounted(()=>{
    if(heroImg.value){
        heroImg.value.src = "/resources/advisory/Character.webp";
    }
});
   
</script>

<template>
    <section class="pt-40 pb-20 w-full z-20 lg:px-[9rem] px-6 flex lg:flex-row flex-col items-start justify-start gap-0 lg:gap-12 min-h-[550px]">
        <div class="[background:radial-gradient(125%_125%_at_50%_10%,#030712_58%,#CC0E0E_120%)]  flex flex-col xl:flex-row gap-20 h-auto relative p-4 pb-20 pt-8 lg:top-0 lg:py-20 lg:px-12 top-[-50px] rounded-xl">
            <aside class="text-center xl:text-left w-fit">
                <h1 class="font-bold text-xl md:text-4xl lg:pt-0 lg:pb-0 pt-8 pb-4 text-pretty">
                    Avanza sin <span class="text-yellow-400">límites</span>, resuelve tus dudas junto a un <span class="text-yellow-400">profesional</span>
                    ahora. 
                </h1>
                <p class="text-gray-300 text-sm text-pretty md:text-lg py-4 w-full">
                    Agenda una asesoría conmigo para resolver tus inquietudes y darte soluciones.
                </p>
            <div class="lg:max-w-fit w-full lg:px-0 px-2">
                <ButtonAdvisory/>
            </div>
            </aside>
            <aside class="object-contain aspect-video relative w-full draw-border animate-fade-in-up animate-delay-500">
                <img
                    ref="heroImg" 
                    id="img"
                    lazy="loading"
                    class="h-full w-full rounded-lg shadow-sm object-cover shadow-yellow-300" 
                    alt="Imagen del personaje de Adevsays pero con estilo futurista">
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
        bottom: 0;
        right: 0;
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