<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
const currentCount = ref(0);
const props = defineProps<{
    maxCount:number,
    socialMedia:string
}>();

const socialColors = {
    instagram: "from-orange-400 via-red-500 to-pink-500",
    tiktok: "from-tiktok-light via-black to-tiktok-dark",
    youtube: "from-youtube-red to-youtube-dark"
}

onMounted(() => {
    const incrementCounter = () => {
        if (!props.maxCount) return;
        if (currentCount.value <= props.maxCount) {
            currentCount.value += 7;
            requestAnimationFrame(incrementCounter);
        }else{
            currentCount.value = props.maxCount;
        }
    };
    incrementCounter();
});
type KeySocialColors = 'instagram' | 'tiktok' | 'youtube';
const keySocialColor = props.socialMedia.toLowerCase() as KeySocialColors;
const currentGradient = computed(()=> socialColors[keySocialColor]);

</script>

<template>
<div :class="`bg-gradient-to-br ${currentGradient} z-20 text-xl h-[90px] select-none hover:scale-105 transition-transform p-2 px-4 rounded-lg flex-col flex justify-center items-center shadow`">
        <span class="font-bold">
            {{ currentCount }}
        </span>
        <span class="text-sm text-gray-200 font-semibold">{{socialMedia}}</span>
    </div>
</template>

