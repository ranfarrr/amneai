# amneAI Project - Session Handoff Document

**Date:** 2026-05-16  
**Project:** amneAI - AI-Powered Codebase Onboarding Tool  
**Target:** IBM BOB Hackathon 2026 at lablab.ai (24-hour timeline)  
**Current Status:** Frontend Complete, UI Revamp Planned, Backend Pending

---

## 🎯 Project Overview

**amneAI** is a web application that analyzes GitHub repositories using Bob Shell and presents the analysis as beautiful, interactive onboarding dashboards. It helps both AI-assisted coders and new developers understand codebases quickly.

### Core Concept
1. User provides GitHub repository URL
2. Bob Shell clones and analyzes the repo using predefined prompts
3. Results displayed as interactive cards: Summary, Architecture, DataFlow, KeyFiles, EntryPoints, Gotchas, Dependencies

---

## 📊 Current Project State

### ✅ COMPLETED

#### 1. Project Setup
- **Tech Stack:** React 19 + Vite 8 + Tailwind CSS 4 + Lucide Icons
- **Location:** `/Users/randyfaraday/Desktop/BOB project - amneAI`
- **Package Manager:** npm
- **Dev Server:** `npm run dev` (runs on port 3000)

#### 2. Configuration Files
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind v4 config (simplified)
- `postcss.config.js` - Uses `@tailwindcss/postcss` (required for v4)
- `package.json` - All dependencies installed

#### 3. Real Data Created (3 Repositories)
All analyzed using Bob Shell with comprehensive prompts:

**a. APIlot** (`src/data/apilot.json`)
- User's project: AI-powered API documentation navigator
- Tech: React + Vite + n8n + Firecrawl + vLLM
- URL: https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator

**b. Interactive TOEIC Learner** (`src/data/toeic-learner.json`)
- User's project: 3-phase progressive learning platform
- Tech: React 18 + Vite + Tailwind
- URL: https://github.com/ranfarrr/interactive-toeic-learner

**c. Galaxium Travels** (`src/data/galaxium-travels.json`)
- IBM's demo project: Interplanetary flight booking system
- Tech: FastAPI + React + TypeScript + SQLite
- URL: https://github.com/IBM/galaxium-travels

**Data Index:** `src/data/index.js` exports all repositories

#### 4. Components Built

**Layout:**
- `src/components/layout/Header.jsx` - App header with branding

**Cards (All Complete):**
- `src/components/cards/BaseCard.jsx` - Reusable card wrapper
- `src/components/cards/SummaryCard.jsx` - Project summary
- `src/components/cards/ArchitectureCard.jsx` - Frontend/Backend breakdown
- `src/components/cards/DataFlowCard.jsx` - Numbered step-by-step flow
- `src/components/cards/KeyFilesCard.jsx` - 5 most important files
- `src/components/cards/EntryPointsCard.jsx` - Where to start for tasks
- `src/components/cards/GotchasCard.jsx` - ⚠️ Warnings and pitfalls (orange styling)
- `src/components/cards/DependenciesCard.jsx` - Services, packages, requirements

**Main App:**
- `src/App.jsx` - Currently shows card gallery, needs UI revamp (see below)
- `src/main.jsx` - React entry point
- `src/index.css` - Tailwind imports + custom styles

#### 5. Styling & Animations
- **Theme:** Dark mode (slate-900 background)
- **Colors:** Primary green (#10b981), Secondary blue (#3b82f6), Warning orange (#f59e0b)
- **Animations:** Fade-in, slide-up with stagger delays
- **Responsive:** Grid layout for cards

#### 6. Documentation
- `TECHNICAL_SPEC.md` - Full technical specification (424 lines)
- `UI_REVAMP_PLAN.md` - Detailed UI redesign plan (329 lines)
- `SESSION.md` - This file

---

## 🚧 PENDING WORK

### Priority 1: UI Revamp (Next Task)
**Goal:** Replace card gallery with URL-first interface

**Changes Needed:**
1. **Create `src/components/RepoInput.jsx`**
   - Large URL input field with GitHub icon
   - Dropdown showing 3 pre-cached examples
   - "Analyze" button
   - Auto-fill URL when selecting cached repo
   - Validate GitHub URL format

2. **Create `src/components/modals/EnterpriseModal.jsx`**
   - Modal overlay for custom URLs (production only)
   - Shows setup instructions for local installation
   - "View Documentation" and "Close" buttons

3. **Create `src/utils/validation.js`**
   - `isValidGitHubUrl(url)` - Regex validation
   - `isCachedRepo(url)` - Check if URL in pre-cached list

4. **Create `src/hooks/useEnvironment.js`**
   - Detect production vs local environment
   - Return `IS_PRODUCTION` boolean

5. **Update `src/App.jsx`**
   - Replace card gallery with RepoInput component
   - Add GitHub link button in analysis header
   - Integrate EnterpriseModal
   - Handle URL submission logic

**See `UI_REVAMP_PLAN.md` for detailed implementation guide**

### Priority 2: Express Backend (Local Only)
**Goal:** Enable live repository analysis for video demo

**Tasks:**
1. Create `server.js` in project root
2. Install dependencies: `express`, `cors`, `child_process`
3. Implement `/analyze` endpoint:
   ```javascript
   POST /analyze
   Body: { repoUrl: "https://github.com/user/repo" }
   
   Process:
   1. Validate GitHub URL
   2. Clone to temp directory: git clone ${repoUrl} /tmp/${timestamp}
   3. Run Bob Shell: cd /tmp/${timestamp} && bob -p "..."
   4. Parse Bob output to JSON
   5. Return structured JSON
   6. Cleanup temp directory
   ```

4. Add environment detection in frontend
5. Test full flow locally

**Bob Shell Command (Verified Working):**
```bash
cd /path/to/repo && bob -p "Analyze this codebase and provide a comprehensive onboarding guide. Return ONLY a valid JSON object..."
```

### Priority 3: Deployment
**Goal:** Deploy to Vercel/Netlify

**Tasks:**
1. Create `.gitignore` (exclude node_modules, dist, .env)
2. Test production build: `npm run build`
3. Deploy to Vercel (recommended) or Netlify
4. Set up custom domain (optional)
5. Test deployed site

### Priority 4: Final Polish
1. Add loading states
2. Improve mobile responsiveness
3. Add error handling
4. Create demo video
5. Write README.md

---

## 🔧 Technical Details

### Bob Shell Integration
**Command Syntax (Tested & Working):**
```bash
cd /path/to/repo && bob -p "your prompt here"
```

**Prompt Template:**
```
Analyze this codebase and provide a comprehensive onboarding guide. 
Return ONLY a valid JSON object with no additional text, markdown fences, or explanation.

Required structure:
{
  "metadata": { "repoName": "...", "repoUrl": "...", "analyzedAt": "...", "language": "...", "framework": "..." },
  "summary": "1-2 sentence description",
  "architecture": { "frontend": {}, "backend": {} },
  "dataFlow": ["step 1", "step 2"],
  "keyFiles": [{ "file": "path", "reason": "why" }],
  "entryPoints": { "add_feature": "where", "fix_bug": "where" },
  "gotchas": ["pitfall 1", "pitfall 2"],
  "dependencies": { "external_services": [], "npm_packages": {}, "runtime_requirements": [] }
}

Include exactly 5 keyFiles. Focus on helping new developers understand the codebase quickly.
```

### Environment Variables
**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001  # Local backend URL
```

**Backend (.env):**
```
PORT=3001
CORS_ORIGINS=http://localhost:3000
```

### Deployment Strategy
**Production (Vercel/Netlify):**
- Static site with pre-cached JSON
- No backend (Enterprise Modal for custom URLs)
- Fast, reliable, always works

**Local (Video Demo):**
- Express backend running
- Bob Shell integration active
- Live repository analysis

---

## 📁 Project Structure

```
/Users/randyfaraday/Desktop/BOB project - amneAI/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx ✅
│   │   ├── cards/
│   │   │   ├── BaseCard.jsx ✅
│   │   │   ├── SummaryCard.jsx ✅
│   │   │   ├── ArchitectureCard.jsx ✅
│   │   │   ├── DataFlowCard.jsx ✅
│   │   │   ├── KeyFilesCard.jsx ✅
│   │   │   ├── EntryPointsCard.jsx ✅
│   │   │   ├── GotchasCard.jsx ✅
│   │   │   └── DependenciesCard.jsx ✅
│   │   └── modals/
│   │       └── EnterpriseModal.jsx ❌ (TO BUILD)
│   ├── data/
│   │   ├── apilot.json ✅
│   │   ├── toeic-learner.json ✅
│   │   ├── galaxium-travels.json ✅
│   │   └── index.js ✅
│   ├── hooks/
│   │   └── useEnvironment.js ❌ (TO BUILD)
│   ├── utils/
│   │   └── validation.js ❌ (TO BUILD)
│   ├── App.jsx ✅ (NEEDS UPDATE)
│   ├── main.jsx ✅
│   └── index.css ✅
├── public/
├── server.js ❌ (TO BUILD)
├── package.json ✅
├── vite.config.js ✅
├── tailwind.config.js ✅
├── postcss.config.js ✅
├── TECHNICAL_SPEC.md ✅
├── UI_REVAMP_PLAN.md ✅
└── SESSION.md ✅ (THIS FILE)
```

---

## 🎯 Next Steps (In Order)

### Immediate (Next Session):
1. **Switch to Code mode**
2. **Build RepoInput component** (30 min)
   - URL input with dropdown
   - Pre-cached repo suggestions
   - GitHub icon and styling

3. **Build EnterpriseModal** (20 min)
   - Modal overlay
   - Setup instructions
   - Environment detection

4. **Update App.jsx** (15 min)
   - Replace gallery with RepoInput
   - Add GitHub link to analysis view
   - Integrate modal

5. **Test UI revamp** (15 min)
   - Run `npm run dev`
   - Test all flows
   - Fix any bugs

### After UI Revamp:
6. **Build Express backend** (if time permits)
7. **Deploy to Vercel**
8. **Create demo video**
9. **Write README**

---

## 💡 Important Notes

### Tailwind CSS v4 Gotcha
- Must use `@tailwindcss/postcss` package (not `tailwindcss` directly)
- CSS import: `@import "tailwindcss";` (not `@tailwind base;`)
- Already fixed and working

### Bob Shell Syntax
- Correct: `cd ${tempDir} && bob -p "..."`
- Tested and verified working

### User Preferences
- No fake/placeholder data - all examples must be real
- Focus on Gotchas section (important for judges)
- Premium, polished UI (not hackathon prototype)
- Dark theme with professional styling

### Time Constraints
- 24-hour hackathon timeline
- Prioritize working demo over complex features
- Deploy early, iterate if time permits

---

## 🚀 Quick Start Commands

```bash
# Install dependencies (if needed)
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Kill dev server
pkill -f "vite"
```

---

## 📞 Context for Next Session

**What to tell the next Bob instance:**

"Hi Bob! I'm continuing work on amneAI, a codebase analysis tool for the IBM BOB Hackathon. The frontend is complete with all card components working. Please read SESSION.md for full context. 

We need to implement the UI revamp next - replacing the card gallery with a URL input bar and dropdown. See UI_REVAMP_PLAN.md for detailed specs. 

Start by creating the RepoInput component with dropdown suggestions for the 3 pre-cached repos. Let's build this step by step."

---

## ✅ Checklist

- [x] Project setup complete
- [x] 3 real repositories analyzed
- [x] All card components built
- [x] Animations working
- [x] Dark theme applied
- [ ] URL input component
- [ ] Enterprise modal
- [ ] GitHub link in header
- [ ] Express backend
- [ ] Deployment
- [ ] Demo video
- [ ] Documentation

---

**End of Session Handoff**