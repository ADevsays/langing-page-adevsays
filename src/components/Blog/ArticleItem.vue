<script lang="ts" setup>
const props = defineProps<{
    item: {
        title:string,
        description:string,
        tags:string[],
        date:string,
        slug:string,
        img:string
    }
}>();
const { item} = props;

</script>
<template>
    <div 
        class="w-full rounded-lg h-auto bg-black hover:scale-[1.02] transition">
        <a :href="`/blog/${item.slug}`">
            <div class="w-full overflow-hidden rounded-t-lg min-h-[120px]">
                <img
                    class="size-full min-h-[120px] object-contain rounded-lg rounded-b-none hover:rotate-2 hover:scale-110 transition-transform"
                    :transition:name="`${item.title}-blog-item`"
                    :src="item.img"
                    :alt="item.description"
                />
            </div>
            <div class="p-5 pt-8">
                <h3 class="text-white font-bold text-lg">
                    {{item.title}}
                </h3>
                <p 
                    class="text-base text-gray-400 my-2">
                    {{item.description}}
                </p>
            </div>
        </a>

        <footer class="flex justify-between p-5 pt-0">
            <div class="flex items-center gap-2 m-0 p-0">
                <a v-for="tag in item.tags" class="text-sm text-yellow-400 hover:opacity-65">
                    {{tag}}
                </a>
            </div>
            <span class="flex justify-center items-center text-xs">{{item.date}}</span>
        </footer>
    </div>
</template>
