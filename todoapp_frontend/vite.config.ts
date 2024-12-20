/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // Configuration options
    server: {
        port: 8080,
        open: true,
    },
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tests/setup.js",
        include: ['src/**/*.test.tsx', 'src/**/*.spec.tsx'],
        exclude: [
          'node_modules',
          'dist',
        ],
       
    }
});