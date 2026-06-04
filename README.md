# 🧠 Aitobi Analytics — AI & Data Consultancy Site

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Framer](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue) ![Notion](https://img.shields.io/badge/Notion%20API-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Mailchimp](https://img.shields.io/badge/Mailchimp-FFE01B?style=for-the-badge&logo=mailchimp&logoColor=black)

**Professional brand site for AI & data analytics consulting** — a React + Vite SPA with an automated Notion-to-web blog pipeline, animated UI, and newsletter integration.

---

## 💫 Overview

Single-page application showcasing AI solutions architecture, agentic AI, data strategy, and BI/analytics services — backed by 14+ years of data & analytics leadership across financial services and enterprise tech. Content is fully data-driven from a single `data.json`, and blog articles publish automatically from Notion.

## ✨ Features

- **Notion-powered blog engine** — write in Notion, set Status → Published, run one command; the article (with cover images) syncs to the site
- **Animated UI** — Framer Motion micro-interactions, shimmer buttons, particle effects, marquee logos, custom cursor
- **Portfolio case studies** — including the [Beast Games Content Intelligence Platform](https://github.com/umair-tareen/beast-games-analysis)
- **Newsletter** — Mailchimp subscription on a dedicated route
- **Single source of truth** — all site content lives in `src/data.json`

## ⚡ Quick Start

```bash
npm install
npm run dev          # Vite dev server -> http://localhost:5173
npm run build        # production build -> dist/
npm run preview      # preview the production build
```

### Blog sync (optional — requires a Notion integration token)

```bash
# NOTION_TOKEN must be set in your environment
npm run fetch-blog   # pulls Published articles + cover images from Notion
npm run build        # rebuild with new content
```

## 🏗️ Structure

```
src/main.jsx          # React root
src/App.jsx           # routes: / and /newsletter
src/pages/Home.jsx    # homepage composition
src/data.json         # all site content (hero, services, portfolio, blog, contact)
scripts/              # Notion blog fetcher
public/images/        # logos, project shots, blog covers
```

## 🛠️ Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 + Vite 6 |
| Styling | Tailwind CSS 3, SASS |
| Animation | Framer Motion, custom components |
| UI primitives | Radix UI, Lucide, Iconify |
| Routing | React Router DOM 6 |
| Content | Notion API (blog), Mailchimp (newsletter) |

---

## 🌐 Connect

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/umairtareen/) [![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?logo=TikTok&logoColor=white)](https://www.tiktok.com/@quantify.life) [![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/UAT_34) [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/umair-tareen)

*Built by Umair Tareen*
