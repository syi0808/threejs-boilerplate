import { parse } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          if (parse(asset.name).name.includes("/assets/")) {
            return "assets/[name][extname]";
          }
          return "assets/[name].[hash][extname]";
        },
      },
    },
  },
});
