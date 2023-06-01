import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
    test: {
        coverage: {
            reporter: ["text", "html"]
        },
        watch: false,
        environment: 'happy-dom',
    },
    plugins: [vue()],
})
