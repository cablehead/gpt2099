import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
