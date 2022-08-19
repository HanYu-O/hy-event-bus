import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            name:'hy-event-bus',
            entry: 'src/index.ts'
        }
    }
})