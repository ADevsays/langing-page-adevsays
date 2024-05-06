<script setup lang="ts">
import ArticleItem from "./ArticleItem.vue";
import {ref, onMounted} from "vue";

const props = defineProps<{
    item1: ArticleBlog,
    item2: ArticleBlog,
}>();
const {item1, item2} = props;

const isMobile = ref(true);

onMounted(()=>{
    isMobile.value = window.innerWidth <= 1020;

    window.addEventListener("resize", ()=>{
        isMobile.value = window.innerWidth <= 1020;
    });
})

</script>

<template>
    <div v-if="isMobile" class="flex flex-col gap-8 mt-8">
        <ArticleItem :item="item1"/>
        <ArticleItem :item="item2"/>
    </div>
</template>