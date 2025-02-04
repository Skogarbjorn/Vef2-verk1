import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

export default defineConfig({
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: Object.fromEntries(
				fs.readdirSync('src/templates')
					.filter(file => file.endsWith('.html'))
				    .map(file => [file.replace('.html', ''), path.resolve('src/templates', file)])
			)
		}
	}
})

