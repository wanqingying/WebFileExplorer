import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./client",
  resolve: {
    alias: {
      client: path.resolve(__dirname, "client"),
    },
  },
  publicDir: "./client/public",
  build: {
    outDir: "./dist",
  },
  server: {
    port: 3400,
  },
});
