import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*' // Allow all origins for local development to prevent port mismatch issues
}));
app.use(express.json());

// Bob Shell prompt template
const BOB_PROMPT = `Analyze this codebase and provide a comprehensive onboarding guide. 
Return ONLY a valid JSON object with no additional text, markdown fences, or explanation.

Required structure:
{
  "metadata": { 
    "repoName": "repository name", 
    "repoUrl": "github url", 
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

/**
 * Validate GitHub URL format
 */
function isValidGitHubUrl(url) {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
  return githubRegex.test(url);
}

/**
 * Extract repo name from GitHub URL
 */
function extractRepoName(url) {
  const match = url.match(/github\.com\/([\w-]+)\/([\w.-]+)/);
  if (match) {
    return match[2].replace(/\.git$/, '');
  }
  return 'unknown-repo';
}

/**
 * Parse Bob Shell output to extract JSON
 */
function parseBobOutput(output) {
  try {
    console.log('=== RAW BOB OUTPUT START ===');
    console.log(output);
    console.log('=== RAW BOB OUTPUT END ===');
    
    // Try to find JSON in the output
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('Found JSON match, attempting to parse...');
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in Bob output');
  } catch (error) {
    console.error('Failed to parse Bob output:', error);
    console.error('Output was:', output.substring(0, 500)); // First 500 chars
    throw new Error('Failed to parse analysis results');
  }
}

/**
 * Filter Bob Shell output to extract meaningful progress information
 * @param {string} output - Raw Bob Shell output
 * @returns {string|null} - Filtered message or null if not relevant
 */
function filterBobShellOutput(output) {
  // Skip empty or whitespace-only output
  if (!output || !output.trim()) {
    return null;
  }

  const trimmed = output.trim();
  
  // Extract file paths from read_file tool usage
  const readFileMatch = trimmed.match(/<read_file>[\s\S]*?<path>(.*?)<\/path>/i);
  if (readFileMatch) {
    const filePath = readFileMatch[1].trim();
    return `Reading ${filePath}`;
  }

  // Extract search patterns
  const searchMatch = trimmed.match(/<search_files>[\s\S]*?<regex>(.*?)<\/regex>/i);
  if (searchMatch) {
    const pattern = searchMatch[1].trim();
    return `Searching for pattern: ${pattern}`;
  }

  // Extract directory listings
  const listFilesMatch = trimmed.match(/<list_files>[\s\S]*?<path>(.*?)<\/path>/i);
  if (listFilesMatch) {
    const dirPath = listFilesMatch[1].trim();
    return `Listing directory: ${dirPath}`;
  }

  // Extract code definition analysis
  const codeDefMatch = trimmed.match(/<list_code_definition_names>[\s\S]*?<path>(.*?)<\/path>/i);
  if (codeDefMatch) {
    const path = codeDefMatch[1].trim();
    return `Analyzing code structure in ${path}`;
  }

  // Extract command execution
  const commandMatch = trimmed.match(/<execute_command>[\s\S]*?<command>(.*?)<\/command>/i);
  if (commandMatch) {
    const command = commandMatch[1].trim().substring(0, 50);
    return `Executing: ${command}`;
  }

  // Detect completion attempt
  if (trimmed.includes('<attempt_completion>')) {
    return 'Finalizing analysis results...';
  }

  // Capture Bob's thinking patterns (plain text before tool usage)
  const thinkingPatterns = [
    { regex: /(?:let me|i'll|i will)\s+(\w+\s+\w+)/i, prefix: 'Planning to' },
    { regex: /(?:analyzing|examining|checking|reviewing|inspecting)\s+([^.!?\n]{10,60})/i, prefix: 'Analyzing' },
    { regex: /(?:found|discovered|identified)\s+(\d+)\s+(\w+)/i, prefix: 'Found' },
    { regex: /(?:reading|looking at|examining)\s+([^.!?\n]{10,60})/i, prefix: 'Reading' },
    { regex: /(?:understanding|determining|figuring out)\s+([^.!?\n]{10,60})/i, prefix: 'Understanding' }
  ];

  for (const pattern of thinkingPatterns) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      const extracted = match[1].trim();
      return `${pattern.prefix} ${extracted}`;
    }
  }

  // Capture file/directory mentions in plain text
  const filePathPattern = /(?:in|from|at)\s+([a-zA-Z0-9_\-./]+\.[a-zA-Z]{2,4})/;
  const fileMatch = trimmed.match(filePathPattern);
  if (fileMatch) {
    return `Examining ${fileMatch[1]}`;
  }

  // Capture directory mentions
  const dirPattern = /(?:in|from|at)\s+([a-zA-Z0-9_\-./]+\/)/;
  const dirMatch = trimmed.match(dirPattern);
  if (dirMatch) {
    return `Exploring ${dirMatch[1]}`;
  }

  // Capture progress indicators
  if (/step\s+\d+/i.test(trimmed)) {
    const stepMatch = trimmed.match(/step\s+\d+[:\s]+([^.!?\n]{10,60})/i);
    if (stepMatch) {
      return stepMatch[0].trim();
    }
  }

  // Capture completion/milestone messages
  if (/complete|finished|done|ready/i.test(trimmed)) {
    const completionMatch = trimmed.match(/([^.!?\n]{10,80}(?:complete|finished|done|ready)[^.!?\n]{0,20})/i);
    if (completionMatch) {
      return completionMatch[1].trim();
    }
  }

  // If output is short and meaningful (not just XML tags), return it
  if (trimmed.length > 10 && trimmed.length < 150 && !trimmed.startsWith('<') && !trimmed.endsWith('>')) {
    // Check if it contains actual words (not just symbols)
    if (/[a-zA-Z]{3,}/.test(trimmed)) {
      return trimmed;
    }
  }

  return null;
}

/**
 * POST /analyze
 * Analyze a GitHub repository using Bob Shell
 */
app.post('/analyze', async (req, res) => {
  const { repoUrl } = req.body;
  
  // Validate input
  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }
  
  if (!isValidGitHubUrl(repoUrl)) {
    return res.status(400).json({ error: 'Invalid GitHub URL format' });
  }
  
  const repoName = extractRepoName(repoUrl);
  const timestamp = Date.now();
  const tempDir = path.join(__dirname, 'temp', `${repoName}-${timestamp}`);
  
  console.log(`[${new Date().toISOString()}] Starting analysis for: ${repoUrl}`);
  
  try {
    // 1. Create temp directory
    await fs.ensureDir(tempDir);
    console.log(`Created temp directory: ${tempDir}`);
    
    // 2. Clone repository
    console.log('Cloning repository...');
    await execPromise(`git clone --depth 1 "${repoUrl}" "${tempDir}"`, {
      timeout: 120000 // 2 minute timeout for clone
    });
    console.log('Repository cloned successfully');
    
    // 3. Run Bob Shell analysis
    console.log('Running Bob Shell analysis...');
    const { stdout, stderr } = await execPromise(
      `cd "${tempDir}" && bob -p "${BOB_PROMPT.replace(/"/g, '\\"')}"`,
      {
        timeout: 300000, // 5 minute timeout for analysis
        maxBuffer: 10 * 1024 * 1024 // 10MB buffer
      }
    );
    
    if (stderr) {
      console.warn('Bob Shell stderr:', stderr);
    }
    
    console.log('Bob Shell analysis complete');
    
    // 4. Parse Bob output
    const analysis = parseBobOutput(stdout);
    
    // 5. Add metadata if missing
    if (!analysis.metadata) {
      analysis.metadata = {};
    }
    analysis.metadata.repoName = analysis.metadata.repoName || repoName;
    analysis.metadata.repoUrl = analysis.metadata.repoUrl || repoUrl;
    analysis.metadata.analyzedAt = analysis.metadata.analyzedAt || new Date().toISOString();
    
    console.log(`[${new Date().toISOString()}] Analysis complete for: ${repoUrl}`);
    
    // 6. Return results
    res.json(analysis);
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error analyzing ${repoUrl}:`, error);
    
    // Determine error type and send appropriate response
    if (error.message.includes('timeout')) {
      return res.status(504).json({ 
        error: 'Analysis timeout - repository too large or complex',
        details: 'Try a smaller repository or increase timeout settings'
      });
    }
    
    if (error.message.includes('git clone')) {
      return res.status(400).json({ 
        error: 'Failed to clone repository',
        details: 'Repository may be private or URL is incorrect'
      });
    }
    
    res.status(500).json({ 
      error: 'Analysis failed',
      details: error.message 
    });
    
  } finally {
    // 7. Cleanup temp directory
    try {
      await fs.remove(tempDir);
      console.log(`Cleaned up temp directory: ${tempDir}`);
    } catch (cleanupError) {
      console.error('Failed to cleanup temp directory:', cleanupError);
    }
  }
});

/**
 * POST /analyze-stream
 * Analyze a GitHub repository using Bob Shell with real-time streaming
 */
app.post('/analyze-stream', async (req, res) => {
  const { repoUrl } = req.body;
  
  // Validate input
  if (!repoUrl) {
    return res.status(400).json({ error: 'Repository URL is required' });
  }
  
  if (!isValidGitHubUrl(repoUrl)) {
    return res.status(400).json({ error: 'Invalid GitHub URL format' });
  }
  
  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering
  
  const repoName = extractRepoName(repoUrl);
  const timestamp = Date.now();
  const tempDir = path.join(__dirname, 'temp', `${repoName}-${timestamp}`);
  
  // Helper function to send SSE message
  const sendEvent = (type, message) => {
    const eventData = {
      type,
      message,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  };
  
  try {
    sendEvent('info', `Starting analysis for repository: ${repoUrl}`);
    console.log(`[${new Date().toISOString()}] Starting streaming analysis for: ${repoUrl}`);
    
    // 1. Create temp directory
    await fs.ensureDir(tempDir);
    sendEvent('info', 'Created temporary directory');
    
    // 2. Clone repository with progress
    sendEvent('info', 'Cloning repository from GitHub...');
    console.log('Cloning repository...');
    
    const { exec } = await import('child_process');
    
    // Clone with streaming output
    await new Promise((resolve, reject) => {
      const cloneProcess = exec(
        `git clone --depth 1 --progress "${repoUrl}" "${tempDir}"`,
        { timeout: 120000 }
      );
      
      let cloneOutput = '';
      
      cloneProcess.stderr.on('data', (data) => {
        const output = data.toString();
        cloneOutput += output;
        // Git clone outputs to stderr
        if (output.includes('Cloning into') || output.includes('Receiving objects')) {
          sendEvent('info', output.trim());
        }
      });
      
      cloneProcess.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Git clone failed with code ${code}`));
        }
      });
      
      cloneProcess.on('error', reject);
    });
    
    sendEvent('success', 'Repository cloned successfully ✓');
    console.log('Repository cloned successfully');
    
    // 3. Run Bob Shell analysis with streaming
    sendEvent('info', 'Running Bob Shell AI analysis...');
    console.log('Running Bob Shell analysis...');
    
    let bobOutput = '';
    let lastOutputTime = Date.now();
    let outputBuffer = '';
    
    // Progress messages to show when no filtered output is available
    const progressMessages = [
      'Examining repository structure...',
      'Analyzing code patterns...',
      'Processing dependencies...',
      'Understanding architecture...',
      'Reviewing key files...'
    ];
    let progressIndex = 0;
    
    // Send varied progress updates every 8 seconds if no real output
    const progressInterval = setInterval(() => {
      const timeSinceLastOutput = Date.now() - lastOutputTime;
      if (timeSinceLastOutput > 8000) {
        sendEvent('bob_thinking', `[Bob] ${progressMessages[progressIndex % progressMessages.length]}`);
        progressIndex++;
      }
    }, 8000);
    
    await new Promise((resolve, reject) => {
      const bobProcess = exec(
        `cd "${tempDir}" && bob -p "${BOB_PROMPT.replace(/"/g, '\\"')}"`,
        {
          timeout: 300000,
          maxBuffer: 10 * 1024 * 1024
        }
      );
      
      bobProcess.stdout.on('data', (data) => {
        const output = data.toString();
        bobOutput += output;
        outputBuffer += output;
        
        // Process complete lines from buffer
        const lines = outputBuffer.split('\n');
        outputBuffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (line.trim()) {
            // Filter and send Bob Shell thinking logs
            const filteredMessage = filterBobShellOutput(line);
            if (filteredMessage) {
              sendEvent('bob_thinking', `[Bob] ${filteredMessage}`);
              lastOutputTime = Date.now();
            }
          }
        }
      });
      
      bobProcess.stderr.on('data', (data) => {
        const output = data.toString();
        if (!output.includes('warning')) {
          sendEvent('warning', output.trim());
        }
      });
      
      bobProcess.on('close', (code) => {
        clearInterval(progressInterval);
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Bob Shell failed with code ${code}`));
        }
      });
      
      bobProcess.on('error', (error) => {
        clearInterval(progressInterval);
        reject(error);
      });
    });
    
    sendEvent('success', 'Analysis complete ✓');
    console.log('Bob Shell analysis complete');
    
    // 4. Parse Bob output
    sendEvent('info', 'Parsing results...');
    const analysis = parseBobOutput(bobOutput);
    
    // 5. Add metadata if missing
    if (!analysis.metadata) {
      analysis.metadata = {};
    }
    analysis.metadata.repoName = analysis.metadata.repoName || repoName;
    analysis.metadata.repoUrl = analysis.metadata.repoUrl || repoUrl;
    analysis.metadata.analyzedAt = analysis.metadata.analyzedAt || new Date().toISOString();
    
    sendEvent('success', 'Ready to display! ✓');
    console.log(`[${new Date().toISOString()}] Streaming analysis complete for: ${repoUrl}`);
    
    // 6. Send final result
    res.write(`data: ${JSON.stringify({ type: 'complete', data: analysis })}\n\n`);
    res.end();
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in streaming analysis ${repoUrl}:`, error);
    
    // Send error event
    let errorMessage = 'Analysis failed';
    if (error.message.includes('timeout')) {
      errorMessage = 'Analysis timeout - repository too large or complex';
    } else if (error.message.includes('git clone')) {
      errorMessage = 'Failed to clone repository - may be private or URL is incorrect';
    } else {
      errorMessage = error.message;
    }
    
    sendEvent('error', errorMessage);
    res.write(`data: ${JSON.stringify({ type: 'error', message: errorMessage })}\n\n`);
    res.end();
    
  } finally {
    // 7. Cleanup temp directory
    try {
      await fs.remove(tempDir);
      console.log(`Cleaned up temp directory: ${tempDir}`);
    } catch (cleanupError) {
      console.error('Failed to cleanup temp directory:', cleanupError);
    }
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'amneAI Backend'
  });
});

/**
 * GET /
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    name: 'amneAI Backend',
    version: '1.0.0',
    description: 'AI-powered codebase analysis using Bob Shell',
    endpoints: {
      'POST /analyze': 'Analyze a GitHub repository',
      'POST /analyze-stream': 'Analyze a GitHub repository with real-time streaming',
      'GET /health': 'Health check'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                    amneAI Backend                         ║
║                                                           ║
║  Server running on: http://localhost:${PORT}              ║
║  Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
║  Endpoints:                                               ║
║    POST /analyze        - Analyze GitHub repository      ║
║    POST /analyze-stream - Analyze with real-time logs    ║
║    GET  /health         - Health check                   ║
║                                                           ║
║  Ready to analyze repositories with Bob Shell! 🚀        ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Made with Bob