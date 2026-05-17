**User:**

<task>
Create the useEnvironment hook at `src/hooks/useEnvironment.js` with the following specifications:

**Hook Purpose:**
Detect whether the application is running in production (deployed) or local development environment.

**Implementation Requirements:**
1. Create a custom React hook named `useEnvironment`
2. Return an object with a single property: `IS_PRODUCTION` (boolean)
3. Detection logic:
   - Check if `import.meta.env.MODE === 'production'` (Vite's built-in environment variable)
   - Alternatively, check if `window.location.hostname` is NOT 'localhost' or '127.0.0.1'
   - Return `true` for production, `false` for local development

**Return Value:**
```javascript
{
  IS_PRODUCTION: boolean
}
```

**Usage Example:**
```javascript
import { useEnvironment } from './hooks/useEnvironment';

function MyComponent() {
  const { IS_PRODUCTION } = useEnvironment();
  
  if (IS_PRODUCTION) {
    // Show enterprise modal for custom URLs
  } else {
    // Allow live analysis with backend
  }
}
```

**Additional Requirements:**
- Add JSDoc comment explaining the hook's purpose
- Export as default export
- Keep it simple and lightweight (no external dependencies)
- Use Vite's `import.meta.env.MODE` as the primary detection method

IMPORTANT: Only create the useEnvironment.js file. Do not modify any other files.
</task>
<environment_details>
# VSCode Visible Files
src/utils/validation.js

# VSCode Open Tabs
src/components/RepoInput.jsx,src/utils/validation.js

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:41.277Z
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
src/utils/validation.js
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

I'll create the `useEnvironment` hook at `src/hooks/useEnvironment.js` with the specifications you provided.

<write_to_file>
<path>src/hooks/useEnvironment.js</path>
<content>
/**
 * Custom React hook to detect the application environment.
 * 
 * Determines whether the application is running in production (deployed)
 * or local development environment using Vite's built-in environment
 * variables and hostname detection.
 * 
 * @returns {Object} An object containing:
 *   - IS_PRODUCTION {boolean} - true if running in production, false for local development
 * 
 * @example
 * import { useEnvironment } from './hooks/useEnvironment';
 * 
 * function MyComponent() {
 *   const { IS_PRODUCTION } = useEnvironment();
 *   
 *   if (IS_PRODUCTION) {
 *     // Show enterprise modal for custom URLs
 *   } else {
 *     // Allow live analysis with backend
 *   }
 * }
 */
export default function useEnvironment() {
  // Primary detection: Use Vite's built-in environment variable
  const isViteProduction = import.meta.env.MODE === 'production';
  
  // Fallback detection: Check hostname
  const isProductionHostname = 
    typeof window !== 'undefined' && 
    window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1';
  
  // Return true if either condition indicates production
  const IS_PRODUCTION = isViteProduction || isProductionHostname;
  
  return {
    IS_PRODUCTION
  };
}
</content>
<line_count>40</line_count>
</write_to_file>

---

**User:**

[write_to_file for 'src/hooks/useEnvironment.js'] Result:
<file_write_result>
<path>src/hooks/useEnvironment.js</path>
<operation>created</operation>
<notice>
<i>You do not need to re-read the file, as you have seen all changes</i>
<i>Proceed with the task using these changes as the new baseline.</i>
</notice>
</file_write_result>

<environment_details>
# VSCode Visible Files
src/hooks/useEnvironment.js

# VSCode Open Tabs
src/components/RepoInput.jsx,src/utils/validation.js,src/hooks/useEnvironment.js

# Current Time
Current time in ISO 8601 UTC format: 2026-05-16T10:00:48.315Z
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

<attempt_completion>
<result>
Successfully created the `useEnvironment` hook at `src/hooks/useEnvironment.js` with the following features:

✅ **Custom React hook** named `useEnvironment`
✅ **Returns object** with `IS_PRODUCTION` boolean property
✅ **Detection logic:**
   - Primary: Checks `import.meta.env.MODE === 'production'` (Vite's built-in variable)
   - Fallback: Checks if hostname is NOT 'localhost' or '127.0.0.1'
   - Returns `true` for production, `false` for local development
✅ **Comprehensive JSDoc** documentation explaining purpose and usage
✅ **Default export** for easy importing
✅ **Lightweight implementation** with no external dependencies
✅ **SSR-safe** with `typeof window !== 'undefined'` check

The hook can now be imported and used in any component:
```javascript
import useEnvironment from './hooks/useEnvironment';

const { IS_PRODUCTION } = useEnvironment();
```
</result>
</attempt_completion>

