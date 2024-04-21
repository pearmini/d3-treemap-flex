import { defineConfig } from "vitepress";
import config from "genji-theme-vitepress/config";

export default defineConfig({
  title: "d3-treemap-flex",
  extends: config,
  base: "/d3-treemap-flex/",
  cleanUrls: true,
  head: [["link", { rel: "icon", type: "image/png", href: "/logo.svg" }]],
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com/pearmini/d3-treemap-flex" }],
  },
});
