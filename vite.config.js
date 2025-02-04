import { defineConfig } from 'vite';

export default defineConfig({
	root: '.',
	server: {
		open: '/dist/index.html',
	},
	build: {
		outDir: './dist',
	},
});

