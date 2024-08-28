import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, "src/main/index.ts"),
          worker: resolve(__dirname, "src/main/workers/network.worker.ts"),
        },
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    assetsInclude: ["**/*.obj"],
    resolve: {
      alias: {
        "@renderer": resolve("./src/renderer/src/"),
        "@resources": resolve("./resources/"),
        "@workers": resolve("./src/main/workers/"),
      },
    },
    plugins: [react(), tsconfigPaths()],
  },
});
