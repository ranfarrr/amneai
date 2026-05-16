import { useEffect, useRef } from 'react';
import { Terminal, CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * TerminalDisplay Component
 * Displays real-time logs in a terminal-style interface
 * @param {Array} logs - Array of log entries
 * @param {boolean} isComplete - Whether analysis is complete
 * @param {string} error - Error message if any
 * @param {string} viewMode - 'live' or 'replay' mode
 */
function TerminalDisplay({ logs, isComplete, error, viewMode = 'live' }) {
  const terminalRef = useRef(null);

  // Auto-scroll to bottom when new logs appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-400" />;
      case 'warning':
        return <AlertCircle size={14} className="text-yellow-400" />;
      case 'bob_thinking':
        return <Terminal size={14} className="text-purple-400" />;
      default:
        return <Info size={14} className="text-blue-400" />;
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'bob_thinking':
        return 'text-purple-400';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 animate-fade-in">
      {/* Terminal Header */}
      <div className="bg-slate-800 rounded-t-lg border border-slate-700 px-4 py-3 flex items-center gap-3">
        <Terminal size={20} className="text-primary" />
        <span className="text-slate-200 font-semibold">Analysis Terminal</span>
        <div className="ml-auto flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="bg-slate-950 rounded-b-lg border-x border-b border-slate-700 p-4 font-mono text-sm h-96 overflow-y-auto custom-scrollbar"
      >
        {logs.length === 0 ? (
          <div className="text-slate-500 flex items-center gap-2">
            <span className="animate-pulse">▊</span>
            <span>Waiting for analysis to start...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${getLogColor(log.type)} animate-slide-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-slate-500 text-xs mt-0.5 shrink-0">
                  [{log.timestamp}]
                </span>
                <span className="shrink-0 mt-0.5">{getLogIcon(log.type)}</span>
                <span className="break-words">{log.message}</span>
              </div>
            ))}
            
            {/* Cursor blink when not complete - only in live mode */}
            {!isComplete && !error && viewMode === 'live' && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="animate-pulse">▊</span>
                <span className="text-xs">Processing...</span>
              </div>
            )}

            {/* Completion message */}
            {isComplete && (
              <div className="flex items-center gap-2 text-green-400 mt-4 pt-4 border-t border-slate-800">
                <CheckCircle size={16} />
                <span className="font-semibold">Analysis complete! Ready to display results.</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 mt-4 pt-4 border-t border-slate-800">
                <AlertCircle size={16} />
                <span className="font-semibold">Error: {error}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress indicator */}
      {!isComplete && !error && logs.length > 0 && (
        <div className="mt-2">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-progress"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TerminalDisplay;

// Made with Bob