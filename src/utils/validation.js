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

// Made with Bob
