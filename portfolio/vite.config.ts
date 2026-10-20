import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base relativa: o build funciona em qualquer subpasta (GitHub Pages, Vercel, etc.)
export default defineConfig({
  plugins: [react()],
  base: "./",
});
