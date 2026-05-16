import { useState, useRef } from 'react';
import { GitBranch, CheckCircle } from 'lucide-react';
import Header from './components/layout/Header';
import RepoInput from './components/RepoInput';
import EnterpriseModal from './components/modals/EnterpriseModal';
import TerminalDisplay from './components/TerminalDisplay';
import SummaryCard from './components/cards/SummaryCard';
import ArchitectureCard from './components/cards/ArchitectureCard';
import DataFlowCard from './components/cards/DataFlowCard';
import KeyFilesCard from './components/cards/KeyFilesCard';
import EntryPointsCard from './components/cards/EntryPointsCard';
import GotchasCard from './components/cards/GotchasCard';
import DependenciesCard from './components/cards/DependenciesCard';
import useEnvironment from './hooks/useEnvironment';
import { isCachedRepo } from './utils/validation';
import apilot from './data/apilot.json';
import toeicLearner from './data/toeic-learner.json';
import galaxiumTravels from './data/galaxium-travels.json';

function App() {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const eventSourceRef = useRef(null);
  const { IS_PRODUCTION } = useEnvironment();

  /**
   * Simulate terminal logs for cached repositories
   * Creates realistic-looking logs with delays
   * Returns the final logs array
   */
  const simulateCachedRepoLogs = async (repoName) => {
    const simulatedLogs = [
      { type: 'info', message: `Loading cached analysis for ${repoName}...`, delay: 0 },
      { type: 'success', message: 'Repository data found in cache ✓', delay: 500 },
      { type: 'info', message: 'Validating cached data structure...', delay: 800 },
      { type: 'bob_thinking', message: '[Bob] Analyzing repository structure...', delay: 1200 },
      { type: 'bob_thinking', message: '[Bob] Reading repository files...', delay: 1600 },
      { type: 'bob_thinking', message: '[Bob] Examining code architecture...', delay: 2000 },
      { type: 'success', message: 'Cache validation complete ✓', delay: 2300 },
      { type: 'info', message: 'Preparing analysis results...', delay: 2500 }
    ];

    setLogs([]);
    setIsLoading(true);
    setAnalysisComplete(false);
    setShowResults(false);

    const finalLogs = [];
    for (const log of simulatedLogs) {
      await new Promise(resolve => setTimeout(resolve, log.delay));
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const logEntry = { ...log, timestamp };
      finalLogs.push(logEntry);
      setLogs(prev => [...prev, logEntry]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisComplete(true);
    return finalLogs;
  };

  // Repository data mapping
  const repositories = [
    {
      id: 'apilot',
      name: 'APIlot',
      description: 'AI-powered API documentation navigator',
      tags: ['React', 'AI', 'n8n', 'Vite'],
      metadata: apilot.metadata,
      data: apilot
    },
    {
      id: 'toeic-learner',
      name: 'Interactive TOEIC Learner',
      description: '3-phase progressive TOEIC learning platform',
      tags: ['React', 'Education', 'Interactive'],
      metadata: toeicLearner.metadata,
      data: toeicLearner
    },
    {
      id: 'galaxium-travels',
      name: 'Galaxium Travels',
      description: 'Interplanetary flight booking system',
      tags: ['FastAPI', 'React', 'TypeScript', 'IBM'],
      metadata: galaxiumTravels.metadata,
      data: galaxiumTravels
    }
  ];

  const handleAnalyze = async (url) => {
    const cachedRepo = isCachedRepo(url);
    
    if (cachedRepo) {
      // Find matching repo from our data
      const matchingRepo = repositories.find(repo =>
        repo.metadata.repoUrl.toLowerCase() === url.toLowerCase()
      );
      
      if (matchingRepo) {
        // Store analysis data first
        setAnalysisData(matchingRepo);
        
        // Show simulated terminal logs for cached repos
        const finalLogs = await simulateCachedRepoLogs(matchingRepo.name);
        
        // After simulation, store terminal logs
        setTerminalLogs(finalLogs);
        setIsLoading(false);
        
        // Don't automatically show results - wait for user action
      }
    } else if (IS_PRODUCTION) {
      // In production, show enterprise modal for non-cached repos
      setIsModalOpen(true);
    } else {
      // In development, use streaming analysis with SSE
      setIsLoading(true);
      setLogs([]);
      setAnalysisComplete(false);
      setAnalysisError(null);
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        
        // Close any existing EventSource connection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
        }
        
        // Create EventSource connection for streaming
        const eventSource = new EventSource(
          `${API_URL}/analyze-stream`,
          {
            withCredentials: false
          }
        );
        
        // Note: EventSource doesn't support POST directly, so we need to use fetch with streaming
        // Let's use fetch with streaming instead
        const response = await fetch(`${API_URL}/analyze-stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ repoUrl: url }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to start analysis');
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'complete') {
                // Analysis complete, store the result but don't show yet
                const analysisResult = data.data;
                const newRepo = {
                  id: 'live-analysis',
                  name: analysisResult.metadata?.repoName || 'Repository',
                  description: analysisResult.summary || 'Live repository analysis',
                  tags: ['Live Analysis'],
                  metadata: analysisResult.metadata || { repoUrl: url },
                  data: analysisResult
                };
                
                setAnalysisComplete(true);
                setAnalysisData(newRepo);
                // Store terminal logs using callback to get latest state
                setLogs(currentLogs => {
                  setTerminalLogs(currentLogs);
                  return currentLogs;
                });
                // Don't automatically show results - wait for user action
              } else if (data.type === 'error') {
                setAnalysisError(data.message);
              } else {
                // Add log entry
                setLogs(prev => [...prev, {
                  type: data.type,
                  message: data.message,
                  timestamp: data.timestamp
                }]);
              }
            }
          }
        }
        
      } catch (error) {
        console.error('Analysis error:', error);
        setAnalysisError(error.message);
        setLogs(prev => [...prev, {
          type: 'error',
          message: `Failed to analyze repository: ${error.message}`,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header onEnterpriseClick={() => setIsModalOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {!showResults && !selectedRepo ? (
          <>
            <RepoInput onAnalyze={handleAnalyze} />
            <EnterpriseModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            
            {(isLoading || analysisComplete) && (
              <>
                <TerminalDisplay
                  logs={logs}
                  isComplete={analysisComplete}
                  error={analysisError}
                  viewMode={isLoading ? 'live' : 'replay'}
                />
                
                {/* Show Analysis Button */}
                {analysisComplete && !analysisError && analysisData && (
                  <div className="w-full max-w-4xl mx-auto mt-4 animate-fade-in">
                    <button
                      onClick={() => {
                        setShowResults(true);
                        setSelectedRepo(analysisData);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={20} />
                      Show Analysis Results
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* View Logs Button */}
            <button
              onClick={() => {
                setShowResults(false);
                setSelectedRepo(null);
                setLogs(terminalLogs);
              }}
              className="mb-4 text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
            >
              ← View Logs
            </button>

            {/* Repository Header */}
            <div className="max-w-7xl mx-auto px-4 mb-8 flex items-start justify-between animate-fade-in">
              <div>
                <h2 className="text-4xl font-bold text-slate-100 mb-2">
                  {selectedRepo?.name}
                </h2>
                <p className="text-slate-400">{selectedRepo?.description}</p>
              </div>
              <a
                href={selectedRepo?.metadata.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
              >
                <GitBranch size={20} />
                <span>View on GitHub</span>
              </a>
            </div>

            {/* Analysis Cards */}
            <div className="space-y-6">
              <div className="animate-slide-up" style={{ animationDelay: '0ms' }}>
                <SummaryCard summary={selectedRepo?.data.summary} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <ArchitectureCard architecture={selectedRepo?.data.architecture} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <DataFlowCard dataFlow={selectedRepo?.data.dataFlow} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <KeyFilesCard keyFiles={selectedRepo?.data.keyFiles} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <EntryPointsCard entryPoints={selectedRepo?.data.entryPoints} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '500ms' }}>
                <GotchasCard gotchas={selectedRepo?.data.gotchas} />
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                <DependenciesCard dependencies={selectedRepo?.data.dependencies} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

// Made with Bob
