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

// Made with Bob
