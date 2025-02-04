import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	root: './',
	server: {
		open: true,
		watch: {
			usePolling: true,
		},
	},
	build: {
		minify: false,
		outDir: './dist',
		emptyOutDir: false,
	},
});

