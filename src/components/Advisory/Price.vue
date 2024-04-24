<script setup lang="ts">
const props = defineProps<{
    className?:string
}>();
</script>

<template>
    <span 
        :class="`${props.className} md:scale-[1.2] price-form font-bold bg-red-600 text-white h-6 w-10 flex justify-start ps-1.5 items-center  text-xs`"
        >
        $19
    </span>
</template>

<style scoped>
    .price-form{
        clip-path: polygon(0% 0%, 100% 0, 76% 50%, 100% 100%, 0% 100%);
    }
</style>