// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import icon from 'astro-icon';

import remarkDirective from "remark-directive"; /* handle ::: directives as nodes */
import { remarkAdmonitions } from "./src/plugins/remark-admonitions"; /* add admonitions */

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://kongliu.net',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), mdx()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'material-theme-lighter',
        dark: 'material-theme-darker',
      },
    },
    remarkPlugins: [remarkDirective, remarkAdmonitions],
  }
});