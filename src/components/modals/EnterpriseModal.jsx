import { useEffect, useState } from 'react';
import { Building2, Copy, Check, ExternalLink, Shield } from 'lucide-react';
import { getBobCommand } from '../../utils/bobPrompt';

const EnterpriseModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  // Handle copy command
  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(getBobCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle overlay click (close modal)
  const handleOverlayClick = () => {
    onClose();
  };

  // Prevent modal content clicks from closing
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 transition-opacity duration-200 ease-out p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-slate-800 rounded-xl p-6 md:p-8 max-w-4xl w-full border border-slate-700 shadow-2xl transform transition-transform duration-200 ease-out my-8"
        onClick={handleModalClick}
        style={{ animation: 'slideUp 0.2s ease-out' }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <Building2 size={48} className="text-primary mb-4" />
          <h2 className="text-3xl font-bold text-slate-100 mb-2 text-center">
            Analyze Your Custom Repository
          </h2>
          <p className="text-lg text-slate-400 text-center">
            Use Bob Shell to generate a comprehensive onboarding guide
          </p>
        </div>

        {/* What is Enterprise Mode? */}
        <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-blue-400" />
            <h3 className="text-xl font-semibold text-slate-100">What is Enterprise Mode?</h3>
          </div>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Enterprise Mode is designed for users who prioritize <strong className="text-blue-400">data privacy and security</strong>.
            Your codebase data <strong className="text-blue-400">never leaves your computer</strong> except for analysis by IBM Bob server.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 mb-1">Bob Shell (Recommended)</h4>
                  <p className="text-slate-400 text-sm">
                    Run Bob Shell locally - your code stays on your machine, only analyzed by IBM Bob server
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 mb-1">Full Local Setup</h4>
                  <p className="text-slate-400 text-sm">
                    Run amneAI entirely on your machine for complete local control
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Install Bob Shell */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              1
            </div>
            <h3 className="text-xl font-semibold text-slate-100">Install Bob Shell</h3>
          </div>
          <div className="ml-11">
            <p className="text-slate-300 mb-3">
              Download and install Bob Shell from IBM:
            </p>
            <a
              href="https://bob.ibm.com/download?bob=shell"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-3"
            >
              https://bob.ibm.com/download?bob=shell
              <ExternalLink size={16} />
            </a>
            <p className="text-slate-300 mb-2 mt-4">Verify installation:</p>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <code className="text-sm text-green-400 font-mono">bob --version</code>
            </div>
          </div>
        </div>

        {/* Step 2: Navigate to Repository */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              2
            </div>
            <h3 className="text-xl font-semibold text-slate-100">Navigate to Your Repository</h3>
          </div>
          <div className="ml-11">
            <p className="text-slate-300 mb-3">
              Open your terminal and navigate to your project directory:
            </p>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <code className="text-sm text-green-400 font-mono">cd /path/to/your/repository</code>
            </div>
          </div>
        </div>

        {/* Step 3: Run Bob Shell Analysis */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              3
            </div>
            <h3 className="text-xl font-semibold text-slate-100">Run Bob Shell Analysis</h3>
          </div>
          <div className="ml-11">
            <p className="text-slate-300 mb-3">
              Copy and run this command in your repository:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 pr-24 border border-slate-700 relative">
              <div className="overflow-x-auto max-w-full">
                <code className="text-xs md:text-sm text-green-400 font-mono whitespace-pre-wrap break-words block">
                  {getBobCommand()}
                </code>
              </div>
              <button
                onClick={handleCopyCommand}
                className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600 text-slate-100 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-3">
              This will generate an <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">analysis.json</code> file in your repository.
            </p>
          </div>
        </div>

        {/* Step 4: Upload JSON (Coming Soon) */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="bg-slate-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
              4
            </div>
            <h3 className="text-xl font-semibold text-slate-100">Upload Analysis</h3>
            <span className="ml-3 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
          <div className="ml-11">
            <p className="text-slate-300 mb-3">
              For now, you can view the <code className="text-green-400 bg-slate-900 px-2 py-1 rounded">analysis.json</code> file locally.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                🚀 <strong>JSON upload feature coming soon!</strong> For the hackathon, 
                we're demonstrating with pre-analyzed repositories.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative: Run Locally */}
        <div className="border-t border-slate-700 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-3">
            Alternative: Run amneAI Locally
          </h3>
          <p className="text-slate-300 mb-3">
            For full functionality with live analysis:
          </p>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="font-mono text-sm text-slate-300 space-y-1">
              <div className="text-green-400">git clone https://github.com/ranfarrr/amneai</div>
              <div className="text-green-400">cd amneai</div>
              <div className="text-green-400">npm install</div>
              <div className="text-green-400">npm run dev:full</div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EnterpriseModal;

// Made with Bob
