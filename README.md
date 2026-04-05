# NY 2026.14 班级展示网站

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)

这是为 NY 2026.14 班制作的轻量展示网站模板，基于 React + TypeScript + Vite，包含首页、视频专区、文章（Markdown）渲染与若干 UI 组件。

## 快速开始

要求

- Node.js >= 18
- npm >= 9

安装依赖

```bash
npm install
```

开发

```bash
npm run dev
```

生产构建

```bash
npm run build
npm run preview
```

项目要点（简述）

- 视频播放：`public/videos/` 放置 MP4，组件位于 `src/components/VideoPlayer.tsx` 与 `src/components/VideoList.tsx`。
- 文章（Markdown）：`src/content/blog/*.md`，通过 `src/data/articles.ts` 读取并在 `src/views/BlogArticleView.tsx` 渲染。
- 样式：集中在 `src/styles/`，使用 CSS 变量，支持响应式断点。

目录概览

- `public/`：静态资源（images, videos 等）
- `src/components/`：复用组件
- `src/views/`：页面视图（Home、Video、Blog 等）
- `src/content/blog/`：Markdown 文章源

如何添加视频

1. 将 `xxx.mp4` 放到 `public/videos/`
2. 在 `src/components/VideoList.tsx` 的视频数组中新增项：

```ts
{ id: 11, src: 'videos/xxx.mp4', title: '标题', description: '简介' }
```

如何添加文章

1. 在 `src/content/blog/` 新建 `my-article.md`，包含 frontmatter（title, date, image 等）
2. 运行或构建后自动加载

注意事项

- 浏览器自动播放策略：组件会尝试优先有声播放，若被策略阻止会静音重试。


联系方式

- 仓库: https://github.com/mukunjin/ny202614_new

Made for NY 2026.14
