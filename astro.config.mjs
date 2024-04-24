import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [vue(), tailwind()],
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {enabled:true}
  })
});