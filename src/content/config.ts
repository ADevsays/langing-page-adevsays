import {defineCollection, z} from "astro:content";

const article = defineCollection({
    type:"content",
    schema:z.object({
        img:z.string(),
        title:z.string(),
        slug:z.string(),
        description:z.string(),
        tags:z.string().array(),
        date:z.string(),
        sponsor: z.string().array()
    })
});
export const collections = {article};