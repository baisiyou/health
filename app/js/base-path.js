/**
 * Base Path Utility
 * Handles GitHub Pages base path (/health/) for relative URLs
 */

(function() {
    // Detect if we're on GitHub Pages
    const isGitHubPages = window.location.hostname === 'baisiyou.github.io';
    const basePath = isGitHubPages ? '/health' : '';
    
    // Make basePath available globally
    window.BASE_PATH = basePath;
    
    // Helper function to convert absolute paths to relative paths
    window.getPath = function(path) {
        // If path starts with /, replace with basePath + /
        if (path.startsWith('/')) {
            // Don't add basePath if it's already there
            if (basePath && (path.startsWith(basePath + '/') || path === basePath)) {
                return path;
            }
            return basePath + path;
        }
        // Otherwise return as-is (already relative)
        return path;
    };
    
    // Fix all absolute paths in the document after DOM loads
    document.addEventListener('DOMContentLoaded', function() {
        // Only fix paths if we're on GitHub Pages and basePath is set
        if (!basePath) return;
        
        // Helper function to check if path already has basePath
        const needsBasePath = function(path) {
            if (!path || !path.startsWith('/')) return false;
            if (path.startsWith('//') || path.startsWith('http')) return false;
            // Don't add basePath if it's already there
            if (path.startsWith(basePath + '/') || path === basePath) return false;
            return true;
        };
        
        // Fix all <a> tags with href="/..."
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            const href = link.getAttribute('href');
            if (needsBasePath(href)) {
                link.setAttribute('href', basePath + href);
            }
        });
        
        // Fix all <img> tags with src="/..."
        document.querySelectorAll('img[src^="/"]').forEach(img => {
            const src = img.getAttribute('src');
            if (needsBasePath(src)) {
                img.setAttribute('src', basePath + src);
            }
        });
        
        // Fix all <link> tags with href="/..."
        document.querySelectorAll('link[href^="/"]').forEach(link => {
            const href = link.getAttribute('href');
            if (needsBasePath(href)) {
                link.setAttribute('href', basePath + href);
            }
        });
        
        // Fix all <script> tags with src="/..."
        document.querySelectorAll('script[src^="/"]').forEach(script => {
            const src = script.getAttribute('src');
            if (needsBasePath(src)) {
                script.setAttribute('src', basePath + src);
            }
        });
    });
})();

