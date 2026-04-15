// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import icon from 'astro-icon';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx(), sitemap(), icon()],
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                // 将 @ 映射到 src 目录
                '@': path.resolve(__dirname, './src'),
            },
        },
    }
});