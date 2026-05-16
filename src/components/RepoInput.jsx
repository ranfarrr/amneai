import { useState, useRef, useEffect } from 'react';
import { GitBranch } from 'lucide-react';
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
        <GitBranch className="ml-4 text-slate-400" size={24} />

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
                <div className="font-bold text-slate-100 mb-1 flex items-center gap-2">
                  {repo.data.metadata.repoName}
                  <span className="text-[10px] uppercase tracking-wider bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full border border-slate-600 font-medium">
                    Cached
                  </span>
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

// Made with Bob
