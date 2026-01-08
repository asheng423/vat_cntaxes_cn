import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 * 调整为与附件HTML文档一致的税务/商务风格
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "增值税法实施合辑",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true, // 修正了你原文中的 typo (popowers -> popovers)
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN",
    baseUrl: "vat.cntaxes.cn",
    ignorePatterns: ["private", "templates", ".obsidian", "0-辅助", "5-附件"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // 附件HTML中使用了 Helvetica Neue, Helvetica, Arial
        header: "Helvetica Neue, Helvetica, Arial, sans-serif",
        body: "Helvetica Neue, Helvetica, Arial, sans-serif", 
        code: "Consolas, Monaco, 'Courier New', monospace", // 附件中代码风格
      },
      colors: {
        lightMode: {
          // --- 核心调整：根据附件CSS变量定制颜色 ---
          // 原CSS: --note-border-color: #ff9800; (橙色)
          // 原CSS: --blockquote-border: rgb(239, 112, 96); (红橙色)
          // 原CSS: --strong-color: #e95f59; (深红)
          
          light: "#ffffff", // 背景改为纯白，更像文档
          lightgray: "#f8f9fa", // 极浅灰，用于代码块背景
          gray: "#6c757d", // 中性灰
          darkgray: "#495057", // 深灰
          dark: "#343a40", // 深炭灰
          
          // --- 关键色：替换为附件中的橙红色系 ---
          secondary: "#e95f59", // 主要强调色 (对应附件中的深红/橙边框)
          tertiary: "#ff9800", // 次要强调色 (对应附件中的亮橙色)
          highlight: "rgba(239, 112, 96, 0.15)", // 悬浮/高亮背景
          textHighlight: "#e95f5988", // 文本高亮
        },
        darkMode: {
          // 暗色模式保持深蓝/深灰，避免橙色刺眼
          light: "#1a1d20",
          lightgray: "#2d3033",
          gray: "#d1d5db",
          darkgray: "#e5e7eb",
          dark: "#f3f4f6",
          secondary: "#f97316", // 暗色模式下的橙色
          tertiary: "#fb923c",
          highlight: "rgba(249, 115, 22, 0.2)",
          textHighlight: "#fb923c88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        // 附件中代码风格偏暗色
        theme: {
          light: "github-dark", // 在亮色模式下使用深色代码主题，更像文档
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
    ogImages: {
    font: "Inter, sans-serif", // Inter 是 Quartz 推荐的开源字体
  },
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
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config