/**
 * API Configuration
 * Dynamically determines API URLs based on environment
 */

class APIConfig {
    constructor() {
        // Use injected config from server if available (Render deployment)
        if (window.API_CONFIG) {
            this.backendApiUrl = window.API_CONFIG.backendApiUrl;
            this.hybridApiUrl = window.API_CONFIG.hybridApiUrl;
        } else {
            // Check if we're on GitHub Pages
            const isGitHubPages = window.location.hostname === 'baisiyou.github.io';
            
            if (isGitHubPages) {
                // GitHub Pages: Use Render API URLs directly
                this.backendApiUrl = 'https://health-1-3gn7.onrender.com';
                this.hybridApiUrl = 'https://health-2-aw0s.onrender.com';
            } else {
                // Local development: try to fetch from config endpoint
                this.loadFromEndpoint();
                
                // Fallback to localhost for development
                this.backendApiUrl = 'http://localhost:5001';
                this.hybridApiUrl = 'http://localhost:8000';
            }
        }
    }
    
    async loadFromEndpoint() {
        try {
            const response = await fetch('/api/config');
            const config = await response.json();
            this.backendApiUrl = config.backendApiUrl;
            this.hybridApiUrl = config.hybridApiUrl;
        } catch (error) {
            console.warn('Could not load API config from endpoint, using defaults');
        }
    }

    getBackendApiUrl() {
        return this.backendApiUrl;
    }

    getHybridApiUrl() {
        return this.hybridApiUrl;
    }

    getSupabaseKeysUrl() {
        return `${this.backendApiUrl}/keys`;
    }
}

// Create global instance
window.apiConfig = new APIConfig();

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIConfig;
}

