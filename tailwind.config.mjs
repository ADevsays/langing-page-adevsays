/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
			  'tiktok-light': '#69C9D0',
			  'tiktok-dark': '#EE1D52',
			  'youtube-red': '#FF0000',
			  'youtube-dark': '#000000',
			},
		  },
	},
	plugins: [animations],
}
