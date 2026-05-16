# amneAI - AI-Powered Codebase Onboarding Tool

**Built for IBM BOB Hackathon 2026 at lablab.ai**

Transform GitHub repositories into beautiful, interactive onboarding dashboards using Bob Shell AI analysis.

![amneAI Demo](https://via.placeholder.com/800x400?text=amneAI+Demo)

## 🎯 What is amneAI?

amneAI helps developers understand new codebases quickly by providing:
- **Summary** - Quick overview of what the project does
- **Architecture** - Frontend/Backend breakdown with technologies
- **Data Flow** - Step-by-step user/data flow visualization
- **Key Files** - 5 most important files with explanations
- **Entry Points** - Where to start for common tasks
- **Gotchas** - Security concerns, technical debt, and pitfalls
- **Dependencies** - External services, packages, and requirements

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Bob Shell (for live analysis)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ranfarrr/amneai
cd amneai
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**

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

## 📊 Deployment Modes

### Mode 1: Production (Deployed Site)
- ✅ Pre-cached JSON files for instant demo
- ✅ Zero backend - Pure static site
- ✅ Enterprise Modal for custom URLs
- 🌐 Deployed on Vercel/Netlify

### Mode 2: Local Demo (Video Recording)
- ✅ Express backend with Bob Shell integration
- ✅ Live repository analysis
- ✅ Git clone + AI analysis workflow
- 🎥 Perfect for demo videos

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (React 19 + Vite 8 + Tailwind CSS 4 + Lucide Icons)   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Frontend Logic                         │
│  • RepoInput Component (URL + Dropdown)                 │
│  • Environment Detection (Prod vs Local)                │
│  • Pre-cached Data (3 repositories)                     │
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
              │              │  Bob Shell AI   │
              │              │  Analysis       │
              │              └─────────────────┘
              │                         │
              └─────────────┬───────────┘
                            ▼
              ┌─────────────────────────┐
              │  Interactive Dashboard  │
              │  (7 Card Components)    │
              └─────────────────────────┘
```

## 🎨 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide Icons** - Beautiful, consistent icons

### Backend (Local Only)
- **Express.js** - Minimal web framework
- **Bob Shell** - IBM's AI coding assistant
- **fs-extra** - Enhanced file system operations
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
amneai/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   ├── cards/
│   │   │   ├── BaseCard.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── ArchitectureCard.jsx
│   │   │   ├── DataFlowCard.jsx
│   │   │   ├── KeyFilesCard.jsx
│   │   │   ├── EntryPointsCard.jsx
│   │   │   ├── GotchasCard.jsx
│   │   │   └── DependenciesCard.jsx
│   │   ├── modals/
│   │   │   └── EnterpriseModal.jsx
│   │   └── RepoInput.jsx
│   ├── data/
│   │   ├── apilot.json
│   │   ├── toeic-learner.json
│   │   ├── galaxium-travels.json
│   │   └── index.js
│   ├── hooks/
│   │   └── useEnvironment.js
│   ├── utils/
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server.js
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3001
```

**Backend (.env)**
```env
PORT=3001
CORS_ORIGINS=http://localhost:3000
NODE_ENV=development
```

## 🎯 Pre-cached Examples

1. **APIlot** - AI-powered API documentation navigator
   - Tech: React + Vite + n8n + Firecrawl + vLLM
   - URL: https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator

2. **Interactive TOEIC Learner** - 3-phase progressive learning platform
   - Tech: React 18 + Vite + Tailwind
   - URL: https://github.com/ranfarrr/interactive-toeic-learner

3. **Galaxium Travels** - Interplanetary flight booking system (IBM Demo)
   - Tech: FastAPI + React + TypeScript + SQLite
   - URL: https://github.com/IBM/galaxium-travels

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
npx vercel
```

3. **Configure environment**
- Set `NODE_ENV=production`
- No backend needed (static site)

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy**
```bash
npx netlify deploy --prod --dir=dist
```

## 🎬 Demo Video

[Link to demo video will be added]

## 🏆 Hackathon Submission

**IBM BOB Hackathon 2026 at lablab.ai**

### Problem Statement
Developers waste hours understanding new codebases, leading to:
- Slow onboarding for new team members
- Difficulty maintaining legacy code
- Security vulnerabilities from misunderstanding architecture

### Solution
amneAI uses Bob Shell AI to automatically analyze repositories and generate beautiful, interactive onboarding dashboards that help developers understand codebases 10x faster.

### Key Features
- ✅ Instant analysis of GitHub repositories
- ✅ Beautiful, animated UI with dark theme
- ✅ 7 comprehensive analysis sections
- ✅ Pre-cached examples for instant demo
- ✅ Enterprise-ready with local installation option

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Randy Faraday**
- GitHub: [@ranfarrr](https://github.com/ranfarrr)
- Project: Built for IBM BOB Hackathon 2026

## 🙏 Acknowledgments

- IBM for Bob Shell and the hackathon opportunity
- lablab.ai for hosting the event
- The open-source community for amazing tools

---

**Made with ❤️ and Bob Shell**