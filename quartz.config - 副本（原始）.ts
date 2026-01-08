import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    // 1. 网站基本信息
    pageTitle: "增值税法实施合辑",// 网站标题
    pageTitleSuffix: "",
    enableSPA: true, // 启用单页应用模式
    enablePopovers: true, // 开启悬停预览
    analytics: { //集成分析工具
      provider: "plausible",
    },
    locale: "en-US",
     // 2. 你的域名配置 (关键)
    baseUrl: "vat.cntaxes.cn",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    // 3. 外观主题
    theme: {
      fontOrigin: "googleFonts", //字体
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk", // 标题字体
        body: "Source Sans Pro",// 正文字体
        code: "IBM Plex Mono", //代码字体
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  // 4. 插件系统 (控制内容处理流程)
  plugins: {
    transformers: [ // 这里可以配置数学公式、图表等解析
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    // 过滤器：可以用来排除某些不想发布的笔记
      // 例如：排除标记为 "draft" 的笔记
      // Filters.draft()
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time 注释掉CustomOgImages以加快构建速度
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
