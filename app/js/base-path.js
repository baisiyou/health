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
            return basePath + path;
        }
        // Otherwise return as-is (already relative)
        return path;
    };
    
    // Fix all absolute paths in the document after DOM loads
    document.addEventListener('DOMContentLoaded', function() {
        // Fix all <a> tags with href="/..."
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href !== '/' && !href.startsWith('//') && !href.startsWith('http')) {
                link.setAttribute('href', basePath + href);
            }
        });
        
        // Fix all <img> tags with src="/..."
        document.querySelectorAll('img[src^="/"]').forEach(img => {
            const src = img.getAttribute('src');
            if (!src.startsWith('//') && !src.startsWith('http')) {
                img.setAttribute('src', basePath + src);
            }
        });
        
        // Fix all <link> tags with href="/..."
        document.querySelectorAll('link[href^="/"]').forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('//') && !href.startsWith('http')) {
                link.setAttribute('href', basePath + href);
            }
        });
        
        // Fix all <script> tags with src="/..."
        document.querySelectorAll('script[src^="/"]').forEach(script => {
            const src = script.getAttribute('src');
            if (!src.startsWith('//') && !src.startsWith('http')) {
                script.setAttribute('src', basePath + src);
            }
        });
    });
})();

