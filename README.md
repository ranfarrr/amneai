# amneAI — Your Codebase, Explained.

**Built for IBM Bob Hackathon 2026 at lablab.ai**

> _"I built a website with AI. It works perfectly. But when my friend asked me to modify it — I couldn't explain my own code."_

amneAI turns any GitHub repository into a structured, plain-English codebase guide — so you actually understand what's in your code.

## 🎬 See It In Action

**1. Paste any GitHub URL**
![Landing Page](screenshots/01-landing.jpg)

**2. Watch IBM Bob Shell analyze the entire repo in real-time**
![Analysis Terminal](screenshots/02-terminal.jpg)

**3. Get a structured, interactive codebase guide**
![Summary & Architecture](screenshots/03-summary.jpg)

![Key Files & Entry Points](screenshots/04-key-files.jpg)

![Gotchas & Dependencies](screenshots/05-gotchas.jpg)

---

## 🎯 What is amneAI?

Paste a GitHub URL. Get a 7-section interactive dashboard that explains your codebase in human-readable language:

| Section | What You Learn |
|---------|---------------|
| 📋 **Summary** | What does this app actually do? |
| 🏗️ **Architecture** | What are the main parts and how do they connect? |
| 🔀 **Data Flow** | How does information move through the app? |
| 📖 **Key Files** | Which files should I read first? |
| 🚀 **Entry Points** | I want to add a feature — where do I start? |
| ⚠️ **Gotchas** | What will confuse me? (And why it exists) |
| 🔌 **Dependencies** | What does this app need to run? |

**Zero jargon. Instant understanding.**

## 💡 Why amneAI?

- **73% of new code is AI-generated** (GitHub, 2025) — developers build faster than they can understand
- You can't Google something you don't know exists — amneAI asks the right questions for you
- Unlike chat responses that disappear, amneAI gives you a **persistent, shareable guide**

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (React 19 + Vite 8 + Tailwind CSS 4 + Lucide Icons)   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
    ┌─────────────────┐      ┌─────────────────┐
    │  Production     │      │  Local Mode     │
    │  (Static Site)  │      │  (Backend API)  │
    └─────────────────┘      └─────────────────┘
              │                         │
              │                         ▼
              │              ┌─────────────────┐
              │              │  Express Server │
              │              │  (Port 3001)    │
              │              └─────────────────┘
              │                         │
              │                         ▼
              │              ┌─────────────────┐
              │              │  Git Clone Repo │
              │              └─────────────────┘
              │                         │
              │                         ▼
              │              ┌─────────────────┐
              │              │  IBM Bob Shell  │
              │              │  (bob -p)       │
              │              └─────────────────┘
              │                         │
              └─────────────┬───────────┘
                            ▼
              ┌─────────────────────────┐
              │  Interactive Dashboard  │
              │  (7 Card Components)    │
              └─────────────────────────┘
```

**How it works:**
1. **Clone** — Express backend clones the GitHub repository
2. **Analyze** — IBM Bob Shell reads every file with full context awareness via `bob -p`
3. **Render** — React dashboard displays the structured codebase guide via SSE streaming

Unlike standard RAG, Bob Shell processes the **entire** repository architecture natively — no chunking, no embedding, no retrieval loss.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- IBM Bob Shell (for live analysis)

### Installation

```bash
git clone https://github.com/ranfarrr/amneai.git
cd amneai
npm install
```

**Option A: Frontend Only (Pre-cached Examples)**
```bash
npm run dev
```
Visit http://localhost:3000

**Option B: Full Stack (Live Analysis)**
```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend
npm run server
```

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 8 + Tailwind CSS 4 + Lucide Icons |
| **Backend** | Express.js + Server-Sent Events (SSE) |
| **AI Engine** | IBM Bob Shell (`bob -p` — full repo context analysis) |
| **Built With** | IBM Bob IDE (Enterprise Plan) |

> **Note:** All code for this project was written using IBM Bob IDE during the hackathon. Bob task session reports are included in the `bob_sessions/` directory.

## 📊 Pre-cached Examples

| Project | Stack | Repository |
|---------|-------|-----------|
| **APIlot** | React + Vite + n8n + Firecrawl + vLLM | [ranfarrr/APIlot-Inteligent-API-Navigator](https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator) |
| **Interactive TOEIC Learner** | React 18 + Vite + Tailwind | [ranfarrr/interactive-toeic-learner](https://github.com/ranfarrr/interactive-toeic-learner) |
| **Galaxium Travels** | FastAPI + React + TypeScript + SQLite | [IBM/galaxium-travels](https://github.com/IBM/galaxium-travels) |

## 📁 Project Structure

```
amneai/
├── src/
│   ├── components/
│   │   ├── layout/Header.jsx
│   │   ├── cards/          # 7 analysis section cards
│   │   ├── modals/EnterpriseModal.jsx
│   │   ├── RepoInput.jsx
│   │   └── TerminalDisplay.jsx
│   ├── data/               # Pre-cached analysis JSONs
│   ├── hooks/useEnvironment.js
│   ├── utils/
│   ├── App.jsx
│   └── index.css
├── server.js               # Express backend + Bob Shell integration
├── bob_sessions/           # IBM Bob task reports (required for judging)
└── package.json
```

## 🔧 Environment Variables

```env
# Backend (.env)
PORT=3001
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development
```

## 🏆 Hackathon Submission

**IBM Bob Hackathon 2026 — lablab.ai**

### The Problem
AI lets anyone build software. AI doesn't help you **understand** what you built. The gap between what we build and what we understand is growing every day.

### The Solution
amneAI uses IBM Bob Shell to analyze entire repositories with full context awareness and generate structured, plain-English codebase guides — so developers can recover understanding of code they've lost context on.

### IBM Bob Usage
- **IBM Bob IDE** — Used to write, debug, and orchestrate the entire application
- **IBM Bob Shell** — Powers the backend analysis engine (`bob -p`) that reads repositories

### Key Features
- ✅ Instant codebase analysis of any GitHub repository
- ✅ 7 comprehensive analysis sections in plain English
- ✅ Real-time SSE streaming with live terminal output
- ✅ Pre-cached examples for instant demonstration
- ✅ Beautiful, animated dark-theme dashboard

## 📝 License

MIT License

## 👨‍💻 Author

**Randy Faraday** — [@ranfarrr](https://github.com/ranfarrr)

Built solo in 48 hours. Powered by IBM Bob.

---

**Made with ❤️ using IBM Bob IDE + IBM Bob Shell**