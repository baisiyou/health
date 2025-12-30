/**
 * Path Helper Utility
 * Provides helper functions for handling paths in GitHub Pages environment
 */

(function() {
    // Detect if we're on GitHub Pages
    const isGitHubPages = window.location.hostname === 'baisiyou.github.io';
    const basePath = isGitHubPages ? '/health' : '';
    
    // Helper function to get base path
    window.getBasePath = function() {
        return basePath;
    };
    
    // Helper function to convert absolute paths to GitHub Pages compatible paths
    window.resolvePath = function(path) {
        // If path starts with /, prepend basePath
        if (path.startsWith('/')) {
            return basePath + path;
        }
        // Otherwise return as-is (already relative)
        return path;
    };
    
    // Helper function for window.location.href redirects
    window.redirect = function(path) {
        window.location.href = window.resolvePath(path);
    };
})();

