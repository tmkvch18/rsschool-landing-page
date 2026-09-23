import { defineConfig } from "vite";

export default defineConfig({
  base: "/rsschool-landing-page/",
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html",
        menu: "menu.html",
      },
    },
  },
});
