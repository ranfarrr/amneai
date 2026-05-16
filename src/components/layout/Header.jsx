import { Brain, Building2 } from 'lucide-react';

export default function Header({ onEnterpriseClick }) {
  return (
    <header className="bg-bg-secondary border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">amneAI</h1>
              <p className="text-sm text-text-muted">Your codebase, explained</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {onEnterpriseClick && (
              <button
                onClick={onEnterpriseClick}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Building2 size={18} />
                <span className="font-semibold">Enterprise Mode</span>
              </button>
            )}
            <a
              href="https://github.com/ranfarrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <span className="text-sm">Built for IBM BOB Hackathon 2026</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Made with Bob
