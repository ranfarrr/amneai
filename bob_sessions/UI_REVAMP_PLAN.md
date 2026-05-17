# amneAI UI Revamp Plan

## 🎯 Goal
Transform the card gallery into a URL-first interface with dropdown suggestions, making it feel like a professional analysis tool rather than just a showcase.

---

## 📋 Changes Overview

### 1. **Replace Card Gallery with URL Input Bar**

**Current:**
```
[Card 1] [Card 2] [Card 3]
```

**New:**
```
┌─────────────────────────────────────────────────────┐
│ 🔍 Enter GitHub Repository URL...          [Analyze]│
│                                                      │
│ ▼ Try these examples:                               │
│   • APIlot - AI API Navigator                       │
│   • TOEIC Learner - Educational Platform            │
│   • Galaxium Travels - IBM Demo Project             │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Detailed Component Design

### **A. URL Input Component (`RepoInput.jsx`)**

**Features:**
- Large search-style input field
- GitHub icon on the left
- "Analyze" button on the right
- Dropdown appears on focus/click
- Auto-complete from pre-cached repos
- Validates GitHub URL format

**Layout:**
```jsx
<div className="max-w-4xl mx-auto mb-12">
  <div className="relative">
    {/* Main Input */}
    <div className="flex items-center bg-slate-800 rounded-xl border-2 border-slate-700 focus-within:border-primary transition-all">
      <Github className="ml-4 text-slate-400" />
      <input 
        type="text"
        placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
        className="flex-1 bg-transparent px-4 py-4 text-slate-100"
      />
      <button className="mr-2 px-6 py-2 bg-primary rounded-lg">
        Analyze
      </button>
    </div>

    {/* Dropdown Suggestions */}
    {showDropdown && (
      <div className="absolute w-full mt-2 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl">
        <div className="p-3 text-sm text-slate-400 border-b border-slate-700">
          Try these examples:
        </div>
        {repositories.map(repo => (
          <div className="p-4 hover:bg-slate-700 cursor-pointer">
            <div className="font-semibold text-slate-100">{repo.name}</div>
            <div className="text-sm text-slate-400">{repo.description}</div>
            <div className="text-xs text-primary mt-1">{repo.data.metadata.repoUrl}</div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
```

---

### **B. Analysis Results View**

**Add GitHub Link in Header:**
```jsx
<div className="flex items-center justify-between mb-8">
  <div>
    <h2 className="text-4xl font-bold text-slate-100 mb-2">
      {selectedRepo.name}
    </h2>
    <p className="text-lg text-slate-400">{selectedRepo.description}</p>
  </div>
  
  {/* GitHub Link */}
  <a 
    href={selectedRepo.data.metadata.repoUrl}
    target="_blank"
    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
  >
    <Github className="w-5 h-5" />
    <span>View on GitHub</span>
  </a>
</div>
```

---

### **C. Enterprise Modal (`EnterpriseModal.jsx`)**

**Triggers when:**
- User enters a custom GitHub URL (not in pre-cached list)
- In production environment only

**Design:**
```jsx
<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
  <div className="bg-slate-800 rounded-xl p-8 max-w-2xl border border-slate-700">
    <div className="flex items-center gap-3 mb-4">
      <Building className="w-8 h-8 text-primary" />
      <h3 className="text-2xl font-bold text-slate-100">
        Enterprise Feature
      </h3>
    </div>
    
    <p className="text-slate-300 mb-6">
      Live repository analysis requires running amneAI locally with Bob Shell integration.
    </p>

    <div className="bg-slate-900 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-semibold text-primary mb-2">Quick Setup:</h4>
      <code className="text-sm text-slate-300">
        git clone https://github.com/ranfarrr/amneai<br/>
        cd amneai<br/>
        npm install<br/>
        npm run dev
      </code>
    </div>

    <div className="flex gap-3">
      <button className="flex-1 px-4 py-2 bg-primary rounded-lg">
        View Documentation
      </button>
      <button className="px-4 py-2 bg-slate-700 rounded-lg">
        Close
      </button>
    </div>
  </div>
</div>
```

---

## 🎬 User Flow

### **Scenario 1: Pre-cached Repo**
1. User clicks input field
2. Dropdown shows 3 examples
3. User clicks "APIlot"
4. URL auto-fills: `https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator`
5. Analysis cards appear immediately (no loading)

### **Scenario 2: Custom URL (Production)**
1. User types: `https://github.com/facebook/react`
2. User clicks "Analyze"
3. Enterprise Modal appears
4. Shows setup instructions

### **Scenario 3: Custom URL (Local)**
1. User types: `https://github.com/facebook/react`
2. User clicks "Analyze"
3. Loading spinner appears
4. Backend calls Bob Shell
5. Analysis cards appear with results

---

## 🎨 Visual Enhancements

### **1. URL Input Animations**
```css
/* Input focus effect */
.url-input:focus-within {
  transform: scale(1.02);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

/* Dropdown slide-in */
.dropdown-enter {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **2. Card Entrance Stagger**
- Already implemented with `animationDelay`
- Keep the smooth slide-up effect

### **3. Loading State**
```jsx
{loading && (
  <div className="flex flex-col items-center justify-center py-20">
    <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
    <p className="text-slate-400">Analyzing repository...</p>
    <p className="text-sm text-slate-500">This may take 1-2 minutes</p>
  </div>
)}
```

---

## 📦 New Components to Create

1. **`src/components/RepoInput.jsx`**
   - URL input field
   - Dropdown with suggestions
   - Validation logic

2. **`src/components/modals/EnterpriseModal.jsx`**
   - Modal overlay
   - Setup instructions
   - Close/Documentation buttons

3. **`src/utils/validation.js`**
   - GitHub URL validation
   - Check if URL is in pre-cached list

4. **`src/hooks/useEnvironment.js`**
   - Detect production vs local
   - Return `IS_PRODUCTION` boolean

---

## 🔧 Implementation Order

### Phase 1: URL Input (30 min)
1. Create `RepoInput.jsx` component
2. Add dropdown with pre-cached repos
3. Handle selection and URL filling
4. Add GitHub icon and styling

### Phase 2: Enterprise Modal (20 min)
1. Create `EnterpriseModal.jsx`
2. Add environment detection
3. Trigger modal for custom URLs in production
4. Style with instructions

### Phase 3: Integration (15 min)
1. Update `App.jsx` to use new components
2. Add GitHub link to analysis header
3. Test all flows
4. Polish animations

### Phase 4: Polish (15 min)
1. Add loading states
2. Improve transitions
3. Test responsiveness
4. Final touches

**Total Time: ~80 minutes**

---

## ✅ Success Criteria

- [ ] URL input is prominent and beautiful
- [ ] Dropdown shows pre-cached examples clearly
- [ ] Selecting cached repo loads instantly
- [ ] Custom URL triggers enterprise modal (production)
- [ ] GitHub link visible in analysis view
- [ ] All animations smooth and professional
- [ ] Mobile responsive
- [ ] No bugs or console errors

---

## 🎯 Final Result

**Home Page:**
```
┌──────────────────────────────────────────────────────┐
│  amneAI - Your Codebase, Explained                   │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Understand Any Codebase in Minutes                  │
│  AI-powered analysis that transforms complex repos   │
│                                                       │
│  ┌─────────────────────────────────────────────┐    │
│  │ 🔍 Enter GitHub URL...          [Analyze]   │    │
│  │                                              │    │
│  │ ▼ Try these examples:                       │    │
│  │   • APIlot - AI API Navigator               │    │
│  │   • TOEIC Learner - Educational Platform    │    │
│  │   • Galaxium Travels - IBM Demo             │    │
│  └─────────────────────────────────────────────┘    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Analysis Page:**
```
┌──────────────────────────────────────────────────────┐
│  APIlot                          [🔗 View on GitHub] │
│  AI-powered API documentation navigator              │
├──────────────────────────────────────────────────────┤
│  [Summary Card]                                      │
│  [Architecture Card]                                 │
│  [Data Flow Card]                                    │
│  [Key Files Card]                                    │
│  [Entry Points Card]                                 │
│  [⚠️ Gotchas Card]                                   │
│  [Dependencies Card]                                 │
└──────────────────────────────────────────────────────┘
```

---

Ready to implement? 🚀