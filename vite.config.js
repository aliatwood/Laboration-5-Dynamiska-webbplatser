import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  base: '/Laboration-4-Grafiska-effekter-med-CSS/',
  plugins: [
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
    }),
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        sass: resolve(__dirname, "src/sass.html"),
        animering: resolve(__dirname, "src/animering.html")
      }
    }
  }
});
