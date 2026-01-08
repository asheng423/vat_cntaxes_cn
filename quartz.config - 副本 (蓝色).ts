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
    enablePopowers: true, // 开启悬停预览
    analytics: { //集成分析工具
      provider: "plausible",
    },
    locale: "zh-CN", // 更改为中文
     // 2. 你的域名配置 (关键)
    baseUrl: "vat.cntaxes.cn",
    ignorePatterns: ["private", "templates", ".obsidian","0-辅助","5-附件"],
    defaultDateType: "modified",
    // 3. 外观主题 - 蓝色商务风格
    theme: {
      fontOrigin: "googleFonts", //字体
      cdnCaching: true,
      typography: {
        header: "Inter", // 现代商务风格字体
        body: "Inter",// 正文字体
        code: "Fira Code", //代码字体
      },
      colors: {
        lightMode: {
          light: "#f8fafc", // 浅蓝色背景
          lightgray: "#e2e8f0", // 浅灰蓝
          gray: "#94a3b8", // 中灰蓝
          darkgray: "#475569", // 深灰蓝
          dark: "#0f172a", // 深蓝灰
          secondary: "#2563eb", // 商务蓝
          tertiary: "#3b82f6", // 亮蓝
          highlight: "rgba(37, 99, 235, 0.15)", // 蓝色高亮
          textHighlight: "#2563eb88", // 文本高亮
        },
        darkMode: {
          light: "#0f172a", // 深蓝背景
          lightgray: "#334155", // 深灰蓝
          gray: "#64748b", // 中灰蓝
          darkgray: "#cbd5e1", // 浅灰蓝
          dark: "#e2e8f0", // 浅灰
          secondary: "#3b82f6", // 亮蓝
          tertiary: "#60a5fa", // 浅亮蓝
          highlight: "rgba(59, 130, 246, 0.2)", // 暗色模式蓝色高亮
          textHighlight: "#3b82f688", // 暗色模式文本高亮
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