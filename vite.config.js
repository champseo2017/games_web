import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@features': path.resolve(__dirname, './src/features'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@lib': path.resolve(__dirname, './src/lib'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@types': path.resolve(__dirname, './src/types'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
});
