<script lang="ts" setup>
type KeyColor = 'yellow' | 'blue';

const props = defineProps<{
    label?: string,
    link: string,
    color: KeyColor
}>();


const labelToUse = props.label || 'Agenda una asesoría';
const colors = {
    yellow: 'from-yellow-200 via-yellow-300 to-yellow-400 group-hover:from-yellow-200 group-hover:via-yellow-300 group-hover:to-yellow-400 text-white hover:text-gray-900',
    blue: ' from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white text-white'
};

const colorToUse: KeyColor = props.color || 'blue';
const colorSelected = colors[colorToUse];

</script>

<template>
    <a id="disabledLink" :href="link" :class="`bg-gradient-to-br ${colorSelected} relative cursor-pointer md:w-auto
        w-full inline-flex items-center justify-center p-0.5 mb-2 *:overflow-hidden text-sm font-medium text-gray-900
        rounded-lg group mt-1.5`">
        <span
            class="relative px-3 py-2 md:w-auto w-full text-center transition-all ease-in duration-75  bg-gray-900 rounded-md group-hover:bg-opacity-0 text-base">
            {{ labelToUse }}
        </span>
        <span>
            <slot />
        </span>
    </a>
</template>
