import { defineConfig } from 'vite';

export default defineConfig({
    // Root directory of the project
    root: './',
    build: {
        // Output directory for the production build
        outDir: 'dist',
        // Ensure index.html is the entry point
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    server: {
        port: 8000,
    },
});
