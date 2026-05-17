**User:**

<task>
Create the validation utilities file at `src/utils/validation.js` with the following functions:

**Function 1: `isValidGitHubUrl(url)`**
- Validates GitHub URL format using regex
- Should match patterns like:
  - `https://github.com/username/repo`
  - `https://github.com/username/repo.git`
  - `http://github.com/username/repo`
- Return `true` if valid, `false` otherwise

**Function 2: `isCachedRepo(url)`**
- Checks if the provided URL exists in the pre-cached repository list
- Import the 3 repositories from `src/data/index.js` (apilot, toeicLearner, galaxiumTravels)
- Compare the provided URL against each repo's `metadata.repoUrl`
- Return `true` if URL matches any cached repo, `false` otherwise
- Should handle URLs with or without `.git` suffix and trailing slashes

**Implementation Requirements:**
- Export both functions as named exports
- Use robust regex pattern for GitHub URL validation
- Normalize URLs before comparison (remove `.git` suffix and trailing slashes)
- Add JSDoc comments for both functions

**Example Usage:**
```javascript
import { isValidGitHubUrl, isCachedRepo } from './utils/validation';

isValidGitHubUrl('https://github.com/user/repo'); // true
isValidGitHubUrl('https://gitlab.com/user/repo'); // false
isCachedRepo('https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator'); // true
isCachedRepo('https://github.com/random/repo'); // false
```

IMPORTANT: Only create the validation.js file. Do not modify any other files.
</task>
<environment_details>
# VSCode Visible Files
src/components/RepoInput.jsx

# VSCode Open Tabs
src/components/RepoInput.jsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:01.986Z
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
src/components/RepoInput.jsx
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

I'll create the validation utilities file with the required functions. Let me start by reading the data/index.js file to understand the structure of the cached repositories.

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
src/components/RepoInput.jsx

# VSCode Open Tabs
src/components/RepoInput.jsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:04.678Z
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

Now let me check one of the JSON files to see the structure and find where the `repoUrl` is stored in the metadata:

<read_file>
<args>
<file>
<path>src/data/apilot.json</path>
<line_range>1-30</line_range>
</file>
</args>
</read_file>

---

**User:**

[read_file for 'src/data/apilot.json'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>src/data/apilot.json</path>
<content lines="1-30">
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
21 |       "firecrawl": "Web scraping service that extracts API documentation content",
22 |       "vLLM_GPT-OSS-20B": "AI model running on AMD MI300X GPU that parses docs into structured JSON"
23 |     }
24 |   },
25 |   "dataFlow": [
26 |     "User pastes API documentation URL into ApiScannerInput component",
27 |     "App.jsx sends POST request to n8n webhook (VITE_N8N_WEBHOOK_URL) with the URL",
28 |     "n8n triggers Firecrawl to scrape the documentation page",
29 |     "Scraped content is fed to GPT-OSS-20B model via vLLM for parsing",
30 |     "AI returns structured JSON with baseUrl and endpoints array (each endpoint has method, path, name, headers, pathParams, queryParams, bodyFields)",
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
src/components/RepoInput.jsx

# VSCode Open Tabs
src/components/RepoInput.jsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:07.455Z
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

Perfect! Now I understand the structure. Let me create the validation.js file with both required functions:

<write_to_file>
<path>src/utils/validation.js</path>
<content>
import { repositories } from '../data/index.js';

/**
 * Validates if a given URL is a valid GitHub repository URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Returns true if the URL is a valid GitHub URL, false otherwise
 * 
 * @example
 * isValidGitHubUrl('https://github.com/username/repo'); // true
 * isValidGitHubUrl('https://github.com/username/repo.git'); // true
 * isValidGitHubUrl('https://gitlab.com/username/repo'); // false
 */
export function isValidGitHubUrl(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Regex pattern to match GitHub URLs
  // Matches: http(s)://github.com/username/repo(.git)?
  const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+(\.git)?$/;
  
  return githubUrlPattern.test(url.trim());
}

/**
 * Checks if a given URL exists in the pre-cached repository list
 * @param {string} url - The GitHub repository URL to check
 * @returns {boolean} - Returns true if the URL matches any cached repository, false otherwise
 * 
 * @example
 * isCachedRepo('https://github.com/ranfarrr/APIlot-Inteligent-API-Navigator'); // true
 * isCachedRepo('https://github.com/random/repo'); // false
 */
export function isCachedRepo(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Normalize the input URL by removing .git suffix and trailing slashes
  const normalizedInputUrl = normalizeUrl(url);

  // Check if the normalized URL matches any cached repository
  return repositories.some(repo => {
    const cachedUrl = repo.data?.metadata?.repoUrl;
    if (!cachedUrl) {
      return false;
    }
    
    const normalizedCachedUrl = normalizeUrl(cachedUrl);
    return normalizedInputUrl === normalizedCachedUrl;
  });
}

/**
 * Normalizes a GitHub URL by removing .git suffix and trailing slashes
 * @param {string} url - The URL to normalize
 * @returns {string} - The normalized URL
 * @private
 */
function normalizeUrl(url) {
  let normalized = url.trim();
  
  // Remove .git suffix if present
  if (normalized.endsWith('.git')) {
    normalized = normalized.slice(0, -4);
  }
  
  // Remove trailing slashes
  while (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized.toLowerCase();
}
</content>
<line_count>75</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/utils/validation.js'] Result:
<file_write_result>
<path>src/utils/validation.js</path>
<operation>created</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<environment_details>
# VSCode Visible Files
src/utils/validation.js

# VSCode Open Tabs
src/components/RepoInput.jsx,src/utils/validation.js

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:17.226Z
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
Successfully created the validation utilities file at `src/utils/validation.js` with the following features:

**Function 1: `isValidGitHubUrl(url)`**
- Validates GitHub URL format using robust regex pattern
- Matches patterns: `https://github.com/username/repo`, `https://github.com/username/repo.git`, `http://github.com/username/repo`
- Returns `true` if valid, `false` otherwise
- Handles edge cases (null, undefined, non-string inputs)

**Function 2: `isCachedRepo(url)`**
- Checks if URL exists in pre-cached repository list
- Imports repositories from `src/data/index.js` (includes apilot, toeicLearner, galaxiumTravels)
- Compares against each repo's `metadata.repoUrl`
- Returns `true` if URL matches any cached repo, `false` otherwise
- Handles URLs with or without `.git` suffix and trailing slashes through normalization

**Additional Features:**
- Helper function `normalizeUrl()` for consistent URL comparison (removes `.git` suffix, trailing slashes, converts to lowercase)
- Comprehensive JSDoc comments for all exported functions
- Named exports for both functions
- Robust error handling for edge cases

The file is ready to use with the example usage patterns provided in the task requirements.
</result>
</attempt_completion>

