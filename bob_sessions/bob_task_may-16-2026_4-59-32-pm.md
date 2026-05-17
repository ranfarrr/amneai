**User:**

<task>
Create the RepoInput component at `src/components/RepoInput.jsx` with the following specifications:

**Component Requirements:**
1. Large URL input field with GitHub icon on the left
2. "Analyze" button on the right
3. Dropdown that shows 3 pre-cached repository examples when input is focused
4. Auto-fill URL when user selects a cached repo from dropdown
5. Validate GitHub URL format on input

**Styling Details:**
- Container: `max-w-4xl mx-auto mb-12` with relative positioning
- Input wrapper: Flexbox with `bg-slate-800`, `rounded-xl`, `border-2 border-slate-700` (transitions to `border-primary` on focus)
- GitHub icon: `Github` from lucide-react, positioned `ml-4 text-slate-400`
- Input field: `flex-1 bg-transparent px-4 py-4 text-slate-100` with placeholder "Enter GitHub repository URL..."
- Analyze button: `mr-2 px-6 py-2 bg-primary rounded-lg hover:bg-primary/90 transition-colors`
- Dropdown: Absolute positioned, full width, `mt-2`, `bg-slate-800 rounded-xl border border-slate-700 shadow-2xl`
- Dropdown header: "Try these examples:" in `text-sm text-slate-400 px-4 pt-3 pb-2`
- Dropdown items: Show repo name (bold), description, and URL in primary color with `hover:bg-slate-700 cursor-pointer`
- Slide-down animation: 0.3s ease-out

**Behavior:**
- Show dropdown on input focus/click
- Hide dropdown when clicking outside or selecting an item
- Auto-fill URL when selecting from dropdown
- Pass selected URL to parent via `onAnalyze` callback prop
- Disable analyze button if URL is empty or invalid

**Data Source:**
Import the 3 pre-cached repositories from `src/data/index.js`:
- APIlot
- Interactive TOEIC Learner  
- Galaxium Travels

Display each with: metadata.repoName, summary (truncated to ~60 chars), and metadata.repoUrl

**Props:**
- `onAnalyze: (url) => void` - Callback when analyze button is clicked

This component should be self-contained and handle its own state for the input value and dropdown visibility. Use React hooks (useState, useRef, useEffect) for state management and click-outside detection.

IMPORTANT: Only create the RepoInput component file. Do not modify any other files. Use the exact styling classes specified above to match the design system.
</task>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs


# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:59:04.634Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>


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

I'll create the RepoInput component with all the specified requirements. Let me start by reading the data source file to understand the structure of the cached repositories.

<read_file>
<args>
<file>
<path>src/data/index.js</path>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'src/data/index.js'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>src/data/index.js</path>
<content lines="1-31">
 1 | import apilot from './apilot.json';
 2 | import toeicLearner from './toeic-learner.json';
 3 | import galaxiumTravels from './galaxium-travels.json';
 4 | 
 5 | export const repositories = [
 6 |   {
 7 |     id: 'apilot',
 8 |     name: 'APIlot',
 9 |     description: 'AI-powered API documentation navigator',
10 |     tags: ['React', 'AI', 'n8n', 'Vite'],
11 |     data: apilot
12 |   },
13 |   {
14 |     id: 'toeic-learner',
15 |     name: 'Interactive TOEIC Learner',
16 |     description: '3-phase progressive TOEIC learning platform',
17 |     tags: ['React', 'Education', 'Interactive'],
18 |     data: toeicLearner
19 |   },
20 |   {
21 |     id: 'galaxium-travels',
22 |     name: 'Galaxium Travels',
23 |     description: 'Interplanetary flight booking system',
24 |     tags: ['FastAPI', 'React', 'TypeScript', 'IBM'],
25 |     data: galaxiumTravels
26 |   }
27 | ];
28 | 
29 | export default repositories;
30 | 
31 | // Made with Bob
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs


# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:59:06.918Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.01

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Now let me check one of the JSON files to understand the structure of the metadata (repoUrl and repoName):

<read_file>
<args>
<file>
<path>src/data/apilot.json</path>
<line_range>1-20</line_range>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'src/data/apilot.json'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>src/data/apilot.json</path>
<content lines="1-20">
 1 | {
 2 |   "metadata": {
 3 |     "repoName": "APIlot",
 4 |     "repoUrl": "https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator",
 5 |     "analyzedAt": "2026-05-16T08:00:00Z",
 6 |     "language": "JavaScript",
 7 |     "framework": "React + Vite"
 8 |   },
 9 |   "summary": "APIlot is an AI-powered API documentation navigator that transforms static API docs into interactive, usable forms. Users paste an API documentation URL, and the app scrapes it, processes it through an AI model (GPT-OSS-20B), and generates dynamic form fields with a live HTTP request preview terminal—all within 2 minutes.",
10 |   "architecture": {
11 |     "frontend": {
12 |       "App.jsx": "Main orchestrator managing global state (baseUrl, endpoints, selectedIndex, payload), handling the scan workflow, error handling, and JSON repair logic",
13 |       "ApiScannerInput": "URL input component with loading states and error display",
14 |       "EndpointSelector": "Collapsible list showing all discovered API endpoints with method badges (GET/POST/etc.)",
15 |       "DynamicFormBuilder": "Renders form fields dynamically based on endpoint schema (headers, path params, query params, body fields)",
16 |       "LivePayloadTerminal": "Real-time HTTP request preview with syntax highlighting, showing the complete request that would be sent",
17 |       "Header": "Navigation/branding component"
18 |     },
19 |     "backend": {
20 |       "n8n_webhook": "Orchestrates the scraping and AI processing workflow (not in this repo)",
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files


# VSCode Open Tabs


# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:59:09.602Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.02

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

Perfect! Now I have all the information I need. Let me create the RepoInput component with all the specified requirements:

<write_to_file>
<path>src/components/RepoInput.jsx</path>
<content>
import { useState, useRef, useEffect } from 'react';
import { Github } from 'lucide-react';
import { repositories } from '../data';

const RepoInput = ({ onAnalyze }) => {
  const [url, setUrl] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // GitHub URL validation regex
  const validateGitHubUrl = (urlString) => {
    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubUrlPattern.test(urlString.trim());
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(validateGitHubUrl(value));
  };

  // Handle input focus
  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  // Handle repo selection from dropdown
  const handleRepoSelect = (repoUrl) => {
    setUrl(repoUrl);
    setIsValid(true);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Handle analyze button click
  const handleAnalyze = () => {
    if (isValid && url.trim()) {
      onAnalyze(url.trim());
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Truncate summary to ~60 characters
  const truncateSummary = (text, maxLength = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="max-w-4xl mx-auto mb-12 relative">
      {/* Input wrapper */}
      <div
        className={`flex items-center bg-slate-800 rounded-xl border-2 transition-colors ${
          showDropdown ? 'border-primary' : 'border-slate-700'
        }`}
      >
        {/* GitHub icon */}
        <Github className="ml-4 text-slate-400" size={24} />

        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={url}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Enter GitHub repository URL..."
          className="flex-1 bg-transparent px-4 py-4 text-slate-100 outline-none placeholder:text-slate-500"
        />

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          disabled={!isValid || !url.trim()}
          className={`mr-2 px-6 py-2 rounded-lg transition-colors ${
            isValid && url.trim()
              ? 'bg-primary hover:bg-primary/90 text-white'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Analyze
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute w-full mt-2 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-slideDown"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          {/* Dropdown header */}
          <div className="text-sm text-slate-400 px-4 pt-3 pb-2">
            Try these examples:
          </div>

          {/* Dropdown items */}
          <div>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => handleRepoSelect(repo.data.metadata.repoUrl)}
                className="px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <div className="font-bold text-slate-100 mb-1">
                  {repo.data.metadata.repoName}
                </div>
                <div className="text-sm text-slate-400 mb-1">
                  {truncateSummary(repo.data.summary)}
                </div>
                <div className="text-sm text-primary">
                  {repo.data.metadata.repoUrl}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inline CSS for slide-down animation */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default RepoInput;
</content>
<line_count>159</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/components/RepoInput.jsx'] Result:
<file_write_result>
<path>src/components/RepoInput.jsx</path>
<operation>created</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<environment_details>
# VSCode Visible Files
src/components/RepoInput.jsx

# VSCode Open Tabs
src/components/RepoInput.jsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T09:59:24.648Z
User time zone: Asia/Jakarta, UTC+7:00

# Current Cost
$0.04

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

<attempt_completion>
<result>
Successfully created the RepoInput component at `src/components/RepoInput.jsx` with all specified requirements:

✅ **Component Features:**
- Large URL input field with GitHub icon on the left
- "Analyze" button on the right (disabled when URL is empty or invalid)
- Dropdown showing 3 pre-cached repository examples (APIlot, Interactive TOEIC Learner, Galaxium Travels)
- Auto-fill URL when selecting from dropdown
- GitHub URL format validation using regex pattern
- Click-outside detection to close dropdown
- Slide-down animation (0.3s ease-out)

✅ **Styling:**
- All exact CSS classes as specified
- Container: `max-w-4xl mx-auto mb-12` with relative positioning
- Input wrapper: Flexbox with `bg-slate-800`, `rounded-xl`, border transitions
- GitHub icon from lucide-react with proper positioning
- Dropdown with absolute positioning, full width, proper styling
- Hover effects on dropdown items

✅ **Behavior:**
- Shows dropdown on input focus/click
- Hides dropdown when clicking outside or selecting an item
- Auto-fills URL when selecting from dropdown
- Passes selected URL to parent via `onAnalyze` callback prop
- Validates GitHub URLs in real-time

✅ **Data Integration:**
- Imports repositories from `src/data/index.js`
- Displays metadata.repoName, truncated summary (~60 chars), and metadata.repoUrl
- All 3 cached repos properly integrated

The component is self-contained, uses React hooks (useState, useRef, useEffect) for state management, and matches the design system exactly as specified.
</result>
</attempt_completion>

