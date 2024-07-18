<script lang="ts" setup>
const props = defineProps<{
    time: string,
    label:string
}>();
</script>

<template>
    <div class="flex flex-col justify-center w-full text-sm md:w-[70px] md:text-base">
        <span class="tabular-nums">
            {{ props.time}}
        </span>
        <span class="text-center text-xs">{{ props.label }}</span>
    </div>
</template>
