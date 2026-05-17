# Enterprise Mode - Simple JSON Upload Approach

**Project:** amneAI - AI-Powered Codebase Onboarding Tool  
**Feature:** Enterprise Mode (JSON Upload)  
**Approach:** Generate JSON locally, upload to website  
**Date:** 2026-05-16

---

## Executive Summary

This is a **simplified Enterprise Mode** approach for the hackathon deployment. Instead of building a complex CLI tool, users will:

1. **Install Bob Shell** locally on their machine
2. **Run Bob Shell** to analyze their repository and generate JSON
3. **Upload the JSON** to the amneAI website (Vercel deployment)
4. **View results** in the same beautiful dashboard

**Benefits:**
- ✅ Simple to implement (1-2 days instead of 4 weeks)
- ✅ No backend needed on Vercel (stays static)
- ✅ Works for hackathon demo
- ✅ Can be enhanced later with CLI tool

---

## Architecture

### Current Architecture (3 Pre-cached Repos)
```
User → Select Repo → Load JSON from src/data/ → Display Dashboard
```

### New Architecture (Enterprise Mode)
```
User → Click "Analyze Custom Repo" → See Instructions Modal
  ↓
User installs Bob Shell locally
  ↓
User runs: bob -p "prompt" > analysis.json
  ↓
User uploads analysis.json to website
  ↓
Website validates and displays dashboard
```

---

## Implementation Plan

### Phase 1: Update EnterpriseModal (1-2 hours)

**Current State:**
[`src/components/modals/EnterpriseModal.jsx`](src/components/modals/EnterpriseModal.jsx:1) shows basic setup instructions.

**New Requirements:**
1. Show Bob Shell installation instructions
2. Provide the exact Bob Shell command to run
3. Show example of generated JSON
4. Add "Upload JSON" button (for future Phase 2)

**Updated Modal Content:**

```jsx
// src/components/modals/EnterpriseModal.jsx

<div className="modal-content">
  <h2>Analyze Your Custom Repository</h2>
  
  {/* Step 1: Install Bob Shell */}
  <div className="step">
    <h3>Step 1: Install Bob Shell</h3>
    <p>Download and install Bob Shell from IBM:</p>
    <a href="https://bob.ibm.com/download?bob=shell" target="_blank">
      https://bob.ibm.com/download?bob=shell
    </a>
    <p>Verify installation:</p>
    <code>bob --version</code>
  </div>
  
  {/* Step 2: Navigate to Your Repository */}
  <div className="step">
    <h3>Step 2: Navigate to Your Repository</h3>
    <code>cd /path/to/your/repository</code>
  </div>
  
  {/* Step 3: Run Bob Shell */}
  <div className="step">
    <h3>Step 3: Run Bob Shell Analysis</h3>
    <p>Copy and run this command:</p>
    <div className="code-block">
      <code>
        bob -p "Analyze this codebase and provide a comprehensive onboarding guide. 
        Return ONLY a valid JSON object with no additional text, markdown fences, or explanation.
        
        Required structure:
        {
          \"metadata\": { 
            \"repoName\": \"repository name\", 
            \"repoUrl\": \"github url\", 
            \"analyzedAt\": \"ISO timestamp\", 
            \"language\": \"primary language\", 
            \"framework\": \"main framework\" 
          },
          \"summary\": \"1-2 sentence description\",
          \"architecture\": { 
            \"frontend\": { \"description\": \"...\", \"technologies\": [] }, 
            \"backend\": { \"description\": \"...\", \"technologies\": [] } 
          },
          \"dataFlow\": [\"step 1\", \"step 2\", \"step 3\"],
          \"keyFiles\": [
            { \"file\": \"path/to/file\", \"reason\": \"why important\" }
          ],
          \"entryPoints\": { 
            \"add_feature\": \"where to start\", 
            \"fix_bug\": \"where to start\",
            \"understand_flow\": \"where to start\"
          },
          \"gotchas\": [\"pitfall 1\", \"pitfall 2\"],
          \"dependencies\": { 
            \"external_services\": [], 
            \"npm_packages\": {}, 
            \"runtime_requirements\": [] 
          }
        }" > analysis.json
      </code>
      <button onClick={copyCommand}>Copy Command</button>
    </div>
  </div>
  
  {/* Step 4: Upload JSON (Future Feature) */}
  <div className="step">
    <h3>Step 4: Upload Analysis (Coming Soon)</h3>
    <p>For now, you can view the analysis.json file locally.</p>
    <p className="future-feature">
      🚀 JSON upload feature coming soon! For the hackathon, 
      we're demonstrating with pre-analyzed repositories.
    </p>
  </div>
  
  {/* Alternative: Run Locally */}
  <div className="alternative">
    <h3>Alternative: Run amneAI Locally</h3>
    <p>For full functionality with live analysis:</p>
    <code>
      git clone https://github.com/ranfarrr/amneai<br/>
      cd amneai<br/>
      npm install<br/>
      npm run dev:full
    </code>
  </div>
</div>
```

### Phase 2: JSON Upload Feature (Future - Post Hackathon)

**New Component:** `src/components/JsonUploader.jsx`

```jsx
import { useState } from 'react';
import { Upload, CheckCircle, XCircle } from 'lucide-react';

const JsonUploader = ({ onAnalysisLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateJson = (data) => {
    // Validate required fields
    const required = ['metadata', 'summary', 'architecture', 'dataFlow', 
                     'keyFiles', 'entryPoints', 'gotchas', 'dependencies'];
    
    for (const field of required) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate metadata
    if (!data.metadata.repoName || !data.metadata.analyzedAt) {
      throw new Error('Invalid metadata structure');
    }
    
    return true;
  };

  const handleFile = async (file) => {
    setError(null);
    setSuccess(false);
    
    try {
      // Check file type
      if (!file.name.endsWith('.json')) {
        throw new Error('Please upload a JSON file');
      }
      
      // Read file
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate structure
      validateJson(data);
      
      // Success!
      setSuccess(true);
      onAnalysisLoaded(data);
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="json-uploader">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload size={48} />
        <h3>Upload Analysis JSON</h3>
        <p>Drag and drop your analysis.json file here</p>
        <p>or</p>
        <label className="file-input-label">
          <input
            type="file"
            accept=".json"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
          <button className="btn-primary">Choose File</button>
        </label>
      </div>
      
      {error && (
        <div className="error-message">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="success-message">
          <CheckCircle size={20} />
          <span>Analysis loaded successfully!</span>
        </div>
      )}
    </div>
  );
};

export default JsonUploader;
```

**Integration in App.jsx:**

```jsx
// src/App.jsx

import JsonUploader from './components/JsonUploader';

function App() {
  const [uploadedAnalysis, setUploadedAnalysis] = useState(null);
  
  const handleJsonUpload = (data) => {
    setUploadedAnalysis(data);
    setSelectedRepo({
      id: 'uploaded',
      name: data.metadata.repoName,
      description: data.summary,
      tags: [data.metadata.language, data.metadata.framework],
      metadata: data.metadata,
      data: data
    });
  };
  
  return (
    <div className="app">
      {!selectedRepo && (
        <>
          <RepoInput onAnalyze={handleAnalyze} />
          
          {/* Add JSON Upload Option */}
          <div className="or-divider">
            <span>OR</span>
          </div>
          
          <JsonUploader onAnalysisLoaded={handleJsonUpload} />
        </>
      )}
      
      {/* Rest of the app... */}
    </div>
  );
}
```

---

## User Flow

### For Hackathon Demo (Phase 1)

1. **User visits amneAI on Vercel**
2. **User clicks "Analyze Custom Repo"**
3. **EnterpriseModal opens** with instructions
4. **User sees:**
   - How to install Bob Shell
   - Exact command to run
   - Note that upload feature is "coming soon"
   - Alternative: Run locally for full functionality
5. **User can:**
   - Copy the command
   - Try it locally
   - Or use the 3 pre-cached examples

### Post-Hackathon (Phase 2)

1. **User installs Bob Shell** locally
2. **User runs the command** in their repository
3. **User gets `analysis.json`** file
4. **User uploads JSON** to amneAI website
5. **Website validates and displays** the dashboard

---

## Implementation Checklist

### Phase 1: Hackathon Demo (1-2 days)

- [ ] Update [`EnterpriseModal.jsx`](src/components/modals/EnterpriseModal.jsx:1) with:
  - [ ] Bob Shell installation instructions (https://bob.ibm.com/download?bob=shell)
  - [ ] Exact command to run with full prompt
  - [ ] "Copy Command" button
  - [ ] Example JSON structure
  - [ ] "Coming Soon" note for upload feature
  - [ ] Alternative: Run locally instructions
- [ ] Add better styling to modal:
  - [ ] Step-by-step layout
  - [ ] Code blocks with syntax highlighting
  - [ ] Copy button functionality
  - [ ] Responsive design
- [ ] Test the modal on mobile and desktop
- [ ] Update README with Enterprise Mode section

### Phase 2: JSON Upload (Post-Hackathon)

- [ ] Create `JsonUploader.jsx` component
- [ ] Implement drag-and-drop functionality
- [ ] Add JSON validation
- [ ] Add error handling
- [ ] Integrate with [`App.jsx`](src/App.jsx:1)
- [ ] Add upload button to EnterpriseModal
- [ ] Test with various JSON files
- [ ] Add loading states
- [ ] Add success/error messages

---

## Bob Shell Command Template

**File:** `src/utils/bobPrompt.js`

```javascript
export const BOB_ANALYSIS_PROMPT = `Analyze this codebase and provide a comprehensive onboarding guide. 
Return ONLY a valid JSON object with no additional text, markdown fences, or explanation.

Required structure:
{
  "metadata": { 
    "repoName": "repository name", 
    "repoUrl": "github url or local path", 
    "analyzedAt": "ISO timestamp", 
    "language": "primary language", 
    "framework": "main framework" 
  },
  "summary": "1-2 sentence description of what this project does",
  "architecture": { 
    "frontend": { "description": "...", "technologies": [] }, 
    "backend": { "description": "...", "technologies": [] } 
  },
  "dataFlow": ["step 1: user action", "step 2: system response", "step 3: data processing"],
  "keyFiles": [
    { "file": "path/to/file", "reason": "why this file is important" }
  ],
  "entryPoints": { 
    "add_feature": "where to start when adding a feature", 
    "fix_bug": "where to start when fixing a bug",
    "understand_flow": "where to start to understand the application flow"
  },
  "gotchas": ["pitfall 1", "pitfall 2", "confusing aspect 3"],
  "dependencies": { 
    "external_services": ["service1", "service2"], 
    "npm_packages": { "package": "purpose" }, 
    "runtime_requirements": ["Node.js 18+", "etc"] 
  }
}

Include exactly 5 keyFiles. Focus on helping new developers understand the codebase quickly.
Pay special attention to the gotchas section - include security concerns, technical debt, and confusing patterns.`;

export const getBobCommand = () => {
  return `bob -p "${BOB_ANALYSIS_PROMPT.replace(/"/g, '\\"')}" > analysis.json`;
};
```

---

## Example JSON Output

**File:** `docs/example-analysis.json`

```json
{
  "metadata": {
    "repoName": "my-awesome-app",
    "repoUrl": "https://github.com/user/my-awesome-app",
    "analyzedAt": "2026-05-16T12:00:00Z",
    "language": "JavaScript",
    "framework": "React"
  },
  "summary": "A modern web application for managing tasks with real-time collaboration features.",
  "architecture": {
    "frontend": {
      "description": "React-based SPA with Redux for state management",
      "technologies": ["React 18", "Redux Toolkit", "Tailwind CSS", "Vite"]
    },
    "backend": {
      "description": "Node.js REST API with PostgreSQL database",
      "technologies": ["Express", "PostgreSQL", "Prisma ORM", "JWT Auth"]
    }
  },
  "dataFlow": [
    "User creates task in React UI",
    "Redux action dispatched to API middleware",
    "Express endpoint validates and saves to PostgreSQL",
    "WebSocket broadcasts update to all connected clients",
    "React components re-render with new data"
  ],
  "keyFiles": [
    {
      "file": "src/App.jsx",
      "reason": "Main application component, sets up routing and global state"
    },
    {
      "file": "src/store/taskSlice.js",
      "reason": "Redux slice managing all task-related state and actions"
    },
    {
      "file": "server/routes/tasks.js",
      "reason": "API endpoints for task CRUD operations"
    },
    {
      "file": "server/middleware/auth.js",
      "reason": "JWT authentication middleware protecting routes"
    },
    {
      "file": "prisma/schema.prisma",
      "reason": "Database schema defining all models and relationships"
    }
  ],
  "entryPoints": {
    "add_feature": "Start in src/App.jsx to understand routing, then add new route and component",
    "fix_bug": "Check Redux DevTools for state issues, or server logs for API errors",
    "understand_flow": "Follow a user action from src/components/TaskForm.jsx through Redux to API"
  },
  "gotchas": [
    "WebSocket connections must be manually closed on component unmount to prevent memory leaks",
    "Prisma migrations must be run before starting the server in development",
    "JWT tokens expire after 24 hours - implement refresh token logic for production",
    "Redux state is not persisted - add redux-persist for better UX",
    "CORS is configured for localhost only - update for production deployment"
  ],
  "dependencies": {
    "external_services": ["PostgreSQL database", "Redis for session storage"],
    "npm_packages": {
      "react": "UI framework",
      "redux-toolkit": "State management",
      "express": "Backend framework",
      "prisma": "Database ORM",
      "socket.io": "Real-time communication"
    },
    "runtime_requirements": [
      "Node.js 18+",
      "PostgreSQL 14+",
      "Redis 6+ (optional, for sessions)"
    ]
  }
}
```

---

## Updated EnterpriseModal Design

### Visual Mockup

```
┌─────────────────────────────────────────────────────────────┐
│  ✕                                                           │
│                                                              │
│  🏢 Analyze Your Custom Repository                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 1: Install Bob Shell                            │  │
│  │                                                       │  │
│  │ Download from: https://bob.ibm.com/download?bob=shell│  │
│  │                                                       │  │
│  │ Verify: bob --version                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 2: Navigate to Your Repository                  │  │
│  │                                                       │  │
│  │ cd /path/to/your/repository                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 3: Run Bob Shell Analysis                       │  │
│  │                                                       │  │
│  │ bob -p "Analyze this codebase..." > analysis.json    │  │
│  │                                                       │  │
│  │ [Copy Command]                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 4: Upload Analysis (Coming Soon! 🚀)            │  │
│  │                                                       │  │
│  │ For the hackathon, we're demonstrating with          │  │
│  │ pre-analyzed repositories. JSON upload feature       │  │
│  │ will be available soon!                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Alternative: Run Locally                             │  │
│  │                                                       │  │
│  │ git clone https://github.com/ranfarrr/amneai         │  │
│  │ cd amneai                                            │  │
│  │ npm install && npm run dev:full                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  [View Documentation]  [Close]                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Benefits of This Approach

### For Hackathon

1. **Quick to Implement:** 1-2 days instead of 4 weeks
2. **No Backend Needed:** Vercel deployment stays static
3. **Clear Demo:** Shows the vision without full implementation
4. **Professional:** Provides clear instructions for users

### For Future

1. **Easy to Extend:** JSON upload is straightforward to add
2. **Flexible:** Can add CLI tool later if needed
3. **User-Friendly:** Upload is simpler than CLI for many users
4. **Scalable:** Can add features like:
   - Save analyses to browser localStorage
   - Share analyses via URL
   - Export to PDF
   - Compare multiple analyses

---

## Timeline

### Phase 1: Hackathon Demo (1-2 days)

**Day 1:**
- Morning: Update EnterpriseModal with instructions
- Afternoon: Add styling and copy button
- Evening: Test and refine

**Day 2:**
- Morning: Update README and documentation
- Afternoon: Final testing and polish
- Evening: Deploy to Vercel

### Phase 2: JSON Upload (Post-Hackathon, 2-3 days)

**Day 1:**
- Create JsonUploader component
- Implement drag-and-drop

**Day 2:**
- Add validation and error handling
- Integrate with App.jsx

**Day 3:**
- Testing and polish
- Deploy update

---

## Conclusion

This simplified approach is **perfect for the hackathon** because:

1. ✅ **Fast to implement** (1-2 days vs 4 weeks)
2. ✅ **No backend complexity** (stays static on Vercel)
3. ✅ **Clear value proposition** (shows what's possible)
4. ✅ **Easy to demo** (clear instructions)
5. ✅ **Room to grow** (can add upload feature later)

The current [`EnterpriseModal.jsx`](src/components/modals/EnterpriseModal.jsx:1) already exists, we just need to update its content with proper instructions and styling.

---

**Document Version:** 2.0 (Simplified)  
**Last Updated:** 2026-05-16  
**Author:** Bob (AI Planning Assistant)  
**Status:** Ready for Implementation