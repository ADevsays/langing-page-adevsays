<script setup lang="ts">
import { ref, onMounted } from 'vue';
const props = defineProps<{
    img: string,
    title: string, 
    description: string,
    link:string,
    date:string
}>();

const image = ref<HTMLElement | null>(null);

const options = {
    root: null,
    rootMargin: '800px',
    threshold: 0
};

onMounted(() => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentImg = entry.target as HTMLImageElement;
                currentImg.src = props.img;
                observer.unobserve(currentImg);
            }
        });
    }, options);

    if (!image.value) return;
    observer.observe(image.value);
});

</script>

<template>
    <a id="content-card"
        :href="props.link"
        target="_blank"
        class="w-full rounded-md bg-black bg-opacity-30 box-border cursor-pointer hover:scale-[1.01] transition-transform">
        <div>
            <img loading="lazy" ref="image"
                src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                alt="Miniatura del video 'Desarrollador analiza el algoritmo de tiktok de Adevsays'"
                class="size-full min-h-[80px] border-2 rounded-lg rounded-b-none border-yellow-400 object-cover">
        </div>
        <div class="p-4 pt-5 h-full max-h-[230px] relative">
            <h4 class="font-bold dark:text-white">
                {{ props.title }}
            </h4>
            <p class="my-2 text-sm ">
                Entretenimiento
            </p>
            <article class="overflow-clip h-[80px] mt-3">
                <p class="text-gray-400 ">
                    {{ props.description }}
                </p>
            </article>
            <span class="bottom-[10px] right-[10px] text-sm absolute bg-gray-800 p-1 rounded-md px-3">{{ props.date }}</span>
        </div>
    </a>
</template>

<style>
#content-card {
    animation: appear-card linear both;
    animation-timeline: view();
    animation-range: entry 25% cover 33%;
}

@keyframes appear-card {
    from {
        opacity: 0;
        transform: translateY(-200);
        transform: scale(0.5);
    }

    to {
        opacity: 1;
        transform: translateY(0);
        transform: scale(1);
    }
}

@media (min-width: 758px) {
    #content-card {
        animation: none;
    }
}
</style>