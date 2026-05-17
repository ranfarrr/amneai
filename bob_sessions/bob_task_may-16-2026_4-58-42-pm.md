**User:**

<task>
Please read and summarize the UI_REVAMP_PLAN.md file, focusing on:
1. The exact specifications for the RepoInput component (styling, behavior, dropdown functionality)
2. The validation requirements for GitHub URLs
3. The EnterpriseModal specifications
4. The App.jsx integration requirements

This will help me understand the detailed implementation requirements before delegating the coding tasks.
</task>
<environment_details>
# VSCode Visible Files
../../Downloads/bob_task_may-16-2026_4-47-15-pm.md

# VSCode Open Tabs
../../Downloads/bob_task_may-16-2026_4-47-15-pm.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:58:02.724Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>


# Current Workspace Directory (/Users/randyfaraday/Desktop/BOB project - amneAI) Files
galaxium-travels-raw.json
index.html
package-lock.json
package.json
postcss.config.js
repomix-output.xml
SESSION.md
tailwind.config.js
TECHNICAL_SPEC.md
toeic-learner-raw.json
UI_REVAMP_PLAN.md
vite.config.js
src/
src/App.jsx
src/index.css
src/main.jsx
src/components/
src/components/cards/
src/components/cards/ArchitectureCard.jsx
src/components/cards/BaseCard.jsx
src/components/cards/DataFlowCard.jsx
src/components/cards/DependenciesCard.jsx
src/components/cards/EntryPointsCard.jsx
src/components/cards/GotchasCard.jsx
src/components/cards/KeyFilesCard.jsx
src/components/cards/SummaryCard.jsx
src/components/layout/
src/components/layout/Header.jsx
src/components/modals/
src/data/
src/data/apilot.json
src/data/galaxium-travels.json
src/data/index.js
src/data/toeic-learner.json
src/hooks/
src/utils/
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll read the UI_REVAMP_PLAN.md file to provide you with a comprehensive summary of the implementation requirements.

<read_file>
<args>
  <file>
    <path>UI_REVAMP_PLAN.md</path>
  </file>
</args>
</read_file>

---

**User:**

[read_file for 'UI_REVAMP_PLAN.md'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>UI_REVAMP_PLAN.md</path>
<content lines="1-326">
  1 | # amneAI UI Revamp Plan
  2 | 
  3 | ## 🎯 Goal
  4 | Transform the card gallery into a URL-first interface with dropdown suggestions, making it feel like a professional analysis tool rather than just a showcase.
  5 | 
  6 | ---
  7 | 
  8 | ## 📋 Changes Overview
  9 | 
 10 | ### 1. **Replace Card Gallery with URL Input Bar**
 11 | 
 12 | **Current:**
 13 | ```
 14 | [Card 1] [Card 2] [Card 3]
 15 | ```
 16 | 
 17 | **New:**
 18 | ```
 19 | ┌─────────────────────────────────────────────────────┐
 20 | │ 🔍 Enter GitHub Repository URL...          [Analyze]│
 21 | │                                                      │
 22 | │ ▼ Try these examples:                               │
 23 | │   • APIlot - AI API Navigator                       │
 24 | │   • TOEIC Learner - Educational Platform            │
 25 | │   • Galaxium Travels - IBM Demo Project             │
 26 | └─────────────────────────────────────────────────────┘
 27 | ```
 28 | 
 29 | ---
 30 | 
 31 | ## 🎨 Detailed Component Design
 32 | 
 33 | ### **A. URL Input Component (`RepoInput.jsx`)**
 34 | 
 35 | **Features:**
 36 | - Large search-style input field
 37 | - GitHub icon on the left
 38 | - "Analyze" button on the right
 39 | - Dropdown appears on focus/click
 40 | - Auto-complete from pre-cached repos
 41 | - Validates GitHub URL format
 42 | 
 43 | **Layout:**
 44 | ```jsx
 45 | <div className="max-w-4xl mx-auto mb-12">
 46 |   <div className="relative">
 47 |     {/* Main Input */}
 48 |     <div className="flex items-center bg-slate-800 rounded-xl border-2 border-slate-700 focus-within:border-primary transition-all">
 49 |       <Github className="ml-4 text-slate-400" />
 50 |       <input 
 51 |         type="text"
 52 |         placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
 53 |         className="flex-1 bg-transparent px-4 py-4 text-slate-100"
 54 |       />
 55 |       <button className="mr-2 px-6 py-2 bg-primary rounded-lg">
 56 |         Analyze
 57 |       </button>
 58 |     </div>
 59 | 
 60 |     {/* Dropdown Suggestions */}
 61 |     {showDropdown && (
 62 |       <div className="absolute w-full mt-2 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl">
 63 |         <div className="p-3 text-sm text-slate-400 border-b border-slate-700">
 64 |           Try these examples:
 65 |         </div>
 66 |         {repositories.map(repo => (
 67 |           <div className="p-4 hover:bg-slate-700 cursor-pointer">
 68 |             <div className="font-semibold text-slate-100">{repo.name}</div>
 69 |             <div className="text-sm text-slate-400">{repo.description}</div>
 70 |             <div className="text-xs text-primary mt-1">{repo.data.metadata.repoUrl}</div>
 71 |           </div>
 72 |         ))}
 73 |       </div>
 74 |     )}
 75 |   </div>
 76 | </div>
 77 | ```
 78 | 
 79 | ---
 80 | 
 81 | ### **B. Analysis Results View**
 82 | 
 83 | **Add GitHub Link in Header:**
 84 | ```jsx
 85 | <div className="flex items-center justify-between mb-8">
 86 |   <div>
 87 |     <h2 className="text-4xl font-bold text-slate-100 mb-2">
 88 |       {selectedRepo.name}
 89 |     </h2>
 90 |     <p className="text-lg text-slate-400">{selectedRepo.description}</p>
 91 |   </div>
 92 |   
 93 |   {/* GitHub Link */}
 94 |   <a 
 95 |     href={selectedRepo.data.metadata.repoUrl}
 96 |     target="_blank"
 97 |     className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
 98 |   >
 99 |     <Github className="w-5 h-5" />
100 |     <span>View on GitHub</span>
101 |   </a>
102 | </div>
103 | ```
104 | 
105 | ---
106 | 
107 | ### **C. Enterprise Modal (`EnterpriseModal.jsx`)**
108 | 
109 | **Triggers when:**
110 | - User enters a custom GitHub URL (not in pre-cached list)
111 | - In production environment only
112 | 
113 | **Design:**
114 | ```jsx
115 | <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
116 |   <div className="bg-slate-800 rounded-xl p-8 max-w-2xl border border-slate-700">
117 |     <div className="flex items-center gap-3 mb-4">
118 |       <Building className="w-8 h-8 text-primary" />
119 |       <h3 className="text-2xl font-bold text-slate-100">
120 |         Enterprise Feature
121 |       </h3>
122 |     </div>
123 |     
124 |     <p className="text-slate-300 mb-6">
125 |       Live repository analysis requires running amneAI locally with Bob Shell integration.
126 |     </p>
127 | 
128 |     <div className="bg-slate-900 rounded-lg p-4 mb-6">
129 |       <h4 className="text-sm font-semibold text-primary mb-2">Quick Setup:</h4>
130 |       <code className="text-sm text-slate-300">
131 |         git clone https://github.com/ranfarrr/amneai<br/>
132 |         cd amneai<br/>
133 |         npm install<br/>
134 |         npm run dev
135 |       </code>
136 |     </div>
137 | 
138 |     <div className="flex gap-3">
139 |       <button className="flex-1 px-4 py-2 bg-primary rounded-lg">
140 |         View Documentation
141 |       </button>
142 |       <button className="px-4 py-2 bg-slate-700 rounded-lg">
143 |         Close
144 |       </button>
145 |     </div>
146 |   </div>
147 | </div>
148 | ```
149 | 
150 | ---
151 | 
152 | ## 🎬 User Flow
153 | 
154 | ### **Scenario 1: Pre-cached Repo**
155 | 1. User clicks input field
156 | 2. Dropdown shows 3 examples
157 | 3. User clicks "APIlot"
158 | 4. URL auto-fills: `https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator`
159 | 5. Analysis cards appear immediately (no loading)
160 | 
161 | ### **Scenario 2: Custom URL (Production)**
162 | 1. User types: `https://github.com/facebook/react`
163 | 2. User clicks "Analyze"
164 | 3. Enterprise Modal appears
165 | 4. Shows setup instructions
166 | 
167 | ### **Scenario 3: Custom URL (Local)**
168 | 1. User types: `https://github.com/facebook/react`
169 | 2. User clicks "Analyze"
170 | 3. Loading spinner appears
171 | 4. Backend calls Bob Shell
172 | 5. Analysis cards appear with results
173 | 
174 | ---
175 | 
176 | ## 🎨 Visual Enhancements
177 | 
178 | ### **1. URL Input Animations**
179 | ```css
180 | /* Input focus effect */
181 | .url-input:focus-within {
182 |   transform: scale(1.02);
183 |   box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
184 | }
185 | 
186 | /* Dropdown slide-in */
187 | .dropdown-enter {
188 |   animation: slideDown 0.3s ease-out;
189 | }
190 | 
191 | @keyframes slideDown {
192 |   from {
193 |     opacity: 0;
194 |     transform: translateY(-10px);
195 |   }
196 |   to {
197 |     opacity: 1;
198 |     transform: translateY(0);
199 |   }
200 | }
201 | ```
202 | 
203 | ### **2. Card Entrance Stagger**
204 | - Already implemented with `animationDelay`
205 | - Keep the smooth slide-up effect
206 | 
207 | ### **3. Loading State**
208 | ```jsx
209 | {loading && (
210 |   <div className="flex flex-col items-center justify-center py-20">
211 |     <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
212 |     <p className="text-slate-400">Analyzing repository...</p>
213 |     <p className="text-sm text-slate-500">This may take 1-2 minutes</p>
214 |   </div>
215 | )}
216 | ```
217 | 
218 | ---
219 | 
220 | ## 📦 New Components to Create
221 | 
222 | 1. **`src/components/RepoInput.jsx`**
223 |    - URL input field
224 |    - Dropdown with suggestions
225 |    - Validation logic
226 | 
227 | 2. **`src/components/modals/EnterpriseModal.jsx`**
228 |    - Modal overlay
229 |    - Setup instructions
230 |    - Close/Documentation buttons
231 | 
232 | 3. **`src/utils/validation.js`**
233 |    - GitHub URL validation
234 |    - Check if URL is in pre-cached list
235 | 
236 | 4. **`src/hooks/useEnvironment.js`**
237 |    - Detect production vs local
238 |    - Return `IS_PRODUCTION` boolean
239 | 
240 | ---
241 | 
242 | ## 🔧 Implementation Order
243 | 
244 | ### Phase 1: URL Input (30 min)
245 | 1. Create `RepoInput.jsx` component
246 | 2. Add dropdown with pre-cached repos
247 | 3. Handle selection and URL filling
248 | 4. Add GitHub icon and styling
249 | 
250 | ### Phase 2: Enterprise Modal (20 min)
251 | 1. Create `EnterpriseModal.jsx`
252 | 2. Add environment detection
253 | 3. Trigger modal for custom URLs in production
254 | 4. Style with instructions
255 | 
256 | ### Phase 3: Integration (15 min)
257 | 1. Update `App.jsx` to use new components
258 | 2. Add GitHub link to analysis header
259 | 3. Test all flows
260 | 4. Polish animations
261 | 
262 | ### Phase 4: Polish (15 min)
263 | 1. Add loading states
264 | 2. Improve transitions
265 | 3. Test responsiveness
266 | 4. Final touches
267 | 
268 | **Total Time: ~80 minutes**
269 | 
270 | ---
271 | 
272 | ## ✅ Success Criteria
273 | 
274 | - [ ] URL input is prominent and beautiful
275 | - [ ] Dropdown shows pre-cached examples clearly
276 | - [ ] Selecting cached repo loads instantly
277 | - [ ] Custom URL triggers enterprise modal (production)
278 | - [ ] GitHub link visible in analysis view
279 | - [ ] All animations smooth and professional
280 | - [ ] Mobile responsive
281 | - [ ] No bugs or console errors
282 | 
283 | ---
284 | 
285 | ## 🎯 Final Result
286 | 
287 | **Home Page:**
288 | ```
289 | ┌──────────────────────────────────────────────────────┐
290 | │  amneAI - Your Codebase, Explained                   │
291 | ├──────────────────────────────────────────────────────┤
292 | │                                                       │
293 | │  Understand Any Codebase in Minutes                  │
294 | │  AI-powered analysis that transforms complex repos   │
295 | │                                                       │
296 | │  ┌─────────────────────────────────────────────┐    │
297 | │  │ 🔍 Enter GitHub URL...          [Analyze]   │    │
298 | │  │                                              │    │
299 | │  │ ▼ Try these examples:                       │    │
300 | │  │   • APIlot - AI API Navigator               │    │
301 | │  │   • TOEIC Learner - Educational Platform    │    │
302 | │  │   • Galaxium Travels - IBM Demo             │    │
303 | │  └─────────────────────────────────────────────┘    │
304 | │                                                       │
305 | └──────────────────────────────────────────────────────┘
306 | ```
307 | 
308 | **Analysis Page:**
309 | ```
310 | ┌──────────────────────────────────────────────────────┐
311 | │  APIlot                          [🔗 View on GitHub] │
312 | │  AI-powered API documentation navigator              │
313 | ├──────────────────────────────────────────────────────┤
314 | │  [Summary Card]                                      │
315 | │  [Architecture Card]                                 │
316 | │  [Data Flow Card]                                    │
317 | │  [Key Files Card]                                    │
318 | │  [Entry Points Card]                                 │
319 | │  [⚠️ Gotchas Card]                                   │
320 | │  [Dependencies Card]                                 │
321 | └──────────────────────────────────────────────────────┘
322 | ```
323 | 
324 | ---
325 | 
326 | Ready to implement? 🚀
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
../../Downloads/bob_task_may-16-2026_4-47-15-pm.md

# VSCode Open Tabs
../../Downloads/bob_task_may-16-2026_4-47-15-pm.md

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:58:06.284Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.02

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

# UI Revamp Plan Summary

Based on the [`UI_REVAMP_PLAN.md`](UI_REVAMP_PLAN.md) file, here's a comprehensive breakdown of the implementation requirements:

---

## 1. RepoInput Component Specifications

### **Styling & Layout**
- **Container**: `max-w-4xl mx-auto mb-12` with relative positioning
- **Input Wrapper**: 
  - Flexbox container with `bg-slate-800`, `rounded-xl`
  - `border-2 border-slate-700` that transitions to `border-primary` on focus
  - Smooth transition animations
- **GitHub Icon**: Left-aligned with `ml-4 text-slate-400` styling
- **Input Field**:
  - Placeholder: `"Enter GitHub repository URL (e.g., https://github.com/user/repo)"`
  - Classes: `flex-1 bg-transparent px-4 py-4 text-slate-100`
- **Analyze Button**: 
  - Right-aligned with `mr-2 px-6 py-2 bg-primary rounded-lg`

### **Dropdown Functionality**
- **Trigger**: Shows on input focus/click
- **Positioning**: Absolute, full width (`w-full`), `mt-2` spacing
- **Styling**: `bg-slate-800 rounded-xl border border-slate-700 shadow-2xl`
- **Header**: `"Try these examples:"` with `p-3 text-sm text-slate-400 border-b border-slate-700`
- **Items**: Each repository displays:
  - Name: `font-semibold text-slate-100`
  - Description: `text-sm text-slate-400`
  - URL: `text-xs text-primary mt-1`
  - Hover state: `hover:bg-slate-700 cursor-pointer`
- **Animation**: Slide-down effect (0.3s ease-out)

### **Behavior**
- Auto-fills URL when user selects from dropdown
- Validates GitHub URL format before analysis
- Shows dropdown with 3 pre-cached repositories
- Clicking a suggestion immediately loads that repo's analysis (no loading state for cached repos)

---

## 2. GitHub URL Validation Requirements

### **Validation Logic** (to be implemented in [`src/utils/validation.js`](src/utils/validation.js))
- Must validate GitHub URL format
- Check if URL exists in pre-cached repository list
- Return boolean indicating if repo is cached or custom

### **Expected Format**
- Standard GitHub URL: `https://github.com/user/repo`
- Must handle validation before triggering analysis

---

## 3. EnterpriseModal Specifications

### **Trigger Conditions**
- User enters a **custom GitHub URL** (not in pre-cached list)
- **Production environment only** (requires environment detection)

### **Modal Structure**
- **Overlay**: `fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50`
- **Container**: `bg-slate-800 rounded-xl p-8 max-w-2xl border border-slate-700`

### **Content Elements**
1. **Header**:
   - Building icon: `w-8 h-8 text-primary`
   - Title: `"Enterprise Feature"` with `text-2xl font-bold text-slate-100`

2. **Description**:
   - Text: `"Live repository analysis requires running amneAI locally with Bob Shell integration."`
   - Styling: `text-slate-300 mb-6`

3. **Setup Instructions Box**:
   - Container: `bg-slate-900 rounded-lg p-4 mb-6`
   - Header: `"Quick Setup:"` with `text-sm font-semibold text-primary`
   - Commands:
     ```
     git clone https://github.com/ranfarrr/amneai
     cd amneai
     npm install
     npm run dev
     ```

4. **Action Buttons**:
   - Primary: `"View Documentation"` - `flex-1 px-4 py-2 bg-primary rounded-lg`
   - Secondary: `"Close"` - `px-4 py-2 bg-slate-700 rounded-lg`

---

## 4. App.jsx Integration Requirements

### **Main Changes**
1. **Replace Card Gallery** with [`RepoInput`](src/components/RepoInput.jsx) component
2. **Add GitHub Link** to analysis results header
3. **Implement State Management** for:
   - Selected repository
   - Loading state
   - Modal visibility
   - Dropdown visibility

### **Analysis Results Header**
```jsx
<div className="flex items-center justify-between mb-8">
  <div>
    <h2 className="text-4xl font-bold text-slate-100 mb-2">
      {selectedRepo.name}
    </h2>
    <p className="text-lg text-slate-400">{selectedRepo.description}</p>
  </div>
  
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

### **User Flow Logic**
- **Pre-cached Repo**: Instant load, no loading state
- **Custom URL (Production)**: Show [`EnterpriseModal`](src/components/modals/EnterpriseModal.jsx)
- **Custom URL (Local)**: Show loading spinner, call backend

### **Loading State**
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

## 5. Additional Components Required

1. **[`src/utils/validation.js`](src/utils/validation.js)**: GitHub URL validation and cache checking
2. **[`src/hooks/useEnvironment.js`](src/hooks/useEnvironment.js)**: Environment detection (returns `IS_PRODUCTION` boolean)

---

## 6. Animation Specifications

### **Input Focus Effect**
```css
.url-input:focus-within {
  transform: scale(1.02);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}
```

### **Dropdown Animation**
- Slide-down effect: 0.3s ease-out
- Opacity transition from 0 to 1
- Transform from `translateY(-10px)` to `translateY(0)`

### **Card Entrance**
- Keep existing stagger animation with `animationDelay`
- Maintain smooth slide-up effect

---

## Success Criteria Checklist
- ✅ URL input is prominent and beautiful
- ✅ Dropdown shows pre-cached examples clearly
- ✅ Selecting cached repo loads instantly
- ✅ Custom URL triggers enterprise modal (production only)
- ✅ GitHub link visible in analysis view
- ✅ All animations smooth and professional
- ✅ Mobile responsive
- ✅ No bugs or console errors

---

This plan transforms the current card gallery into a professional URL-first interface with a total estimated implementation time of **~80 minutes** across 4 phases.

---

**User:**

[ERROR] You did not use a tool in your previous response! Please retry with a tool use.

# Reminder: Instructions for Tool Use

Tool uses are formatted using XML-style tags. The tool name itself becomes the XML tag name. Each parameter is enclosed within its own set of tags. Here's the structure:

<actual_tool_name>
<parameter1_name>value1</parameter1_name>
<parameter2_name>value2</parameter2_name>
...
</actual_tool_name>

For example, to use the attempt_completion tool:

<attempt_completion>
<result>
I have completed the task...
</result>
</attempt_completion>

Always use the actual tool name as the XML tag name for proper parsing and execution.

# Next Steps

If you have completed the user's task, use the attempt_completion tool.
If you require additional information from the user, use the ask_followup_question tool.
Otherwise, if you have not completed the task and do not need additional information, then proceed with the next step of the task.
(This is an automated message, so do not respond to it conversationally.)
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs


# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:58:29.925Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.06

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>ask</slug>
<name>❓ Ask</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
I've read and summarized the [`UI_REVAMP_PLAN.md`](UI_REVAMP_PLAN.md) file. Here are the key implementation requirements:

## 1. RepoInput Component Specifications

**Styling:**
- Container: `max-w-4xl mx-auto mb-12` with relative positioning
- Input wrapper: Flexbox with `bg-slate-800`, `rounded-xl`, `border-2 border-slate-700` (transitions to `border-primary` on focus)
- GitHub icon on left (`ml-4 text-slate-400`)
- Input field: `flex-1 bg-transparent px-4 py-4 text-slate-100`
- Analyze button on right: `mr-2 px-6 py-2 bg-primary rounded-lg`

**Dropdown Functionality:**
- Triggers on input focus/click
- Absolute positioning, full width, `mt-2` spacing
- Styled with `bg-slate-800 rounded-xl border border-slate-700 shadow-2xl`
- Header: "Try these examples:" with `text-sm text-slate-400`
- Each item shows: repo name (bold), description, and URL in primary color
- Hover state: `hover:bg-slate-700 cursor-pointer`
- Slide-down animation (0.3s ease-out)

**Behavior:**
- Auto-fills URL when user selects from dropdown
- Shows 3 pre-cached repositories
- Instant load for cached repos (no loading state)

## 2. GitHub URL Validation Requirements

**To implement in [`src/utils/validation.js`](src/utils/validation.js):**
- Validate GitHub URL format (e.g., `https://github.com/user/repo`)
- Check if URL exists in pre-cached repository list
- Return boolean indicating cached vs custom repo

## 3. EnterpriseModal Specifications

**Trigger Conditions:**
- Custom GitHub URL (not in pre-cached list)
- Production environment only

**Modal Structure:**
- Overlay: `fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50`
- Container: `bg-slate-800 rounded-xl p-8 max-w-2xl border border-slate-700`
- Building icon + "Enterprise Feature" title
- Description: "Live repository analysis requires running amneAI locally with Bob Shell integration."
- Setup instructions box with commands:
  ```
  git clone https://github.com/ranfarrr/amneai
  cd amneai
  npm install
  npm run dev
  ```
- Two buttons: "View Documentation" (primary) and "Close" (secondary)

## 4. App.jsx Integration Requirements

**Main Changes:**
- Replace card gallery with [`RepoInput`](src/components/RepoInput.jsx) component
- Add GitHub link to analysis results header (right-aligned, with GitHub icon)
- Implement state management for: selected repo, loading state, modal visibility, dropdown visibility

**Analysis Header:**
- Left side: Repo name (4xl bold) + description
- Right side: "View on GitHub" link with icon (`bg-slate-800 hover:bg-slate-700 rounded-lg`)

**User Flow Logic:**
- Pre-cached repo → Instant load
- Custom URL (Production) → Show [`EnterpriseModal`](src/components/modals/EnterpriseModal.jsx)
- Custom URL (Local) → Show loading spinner with "Analyzing repository..." message

**Additional Components Needed:**
- [`src/hooks/useEnvironment.js`](src/hooks/useEnvironment.js) - Environment detection (returns `IS_PRODUCTION` boolean)

**Animations:**
- Input focus: Scale 1.02 with primary color shadow
- Dropdown: Slide-down with opacity transition
- Cards: Keep existing stagger animation

**Implementation Time:** ~80 minutes across 4 phases (URL Input → Enterprise Modal → Integration → Polish)
</result>
</attempt_completion>

