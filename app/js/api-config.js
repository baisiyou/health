/**
 * API Configuration
 * Dynamically determines API URLs based on environment
 */

class APIConfig {
    constructor() {
        // Use injected config from server if available, otherwise fallback
        if (window.API_CONFIG) {
            this.backendApiUrl = window.API_CONFIG.backendApiUrl;
            this.hybridApiUrl = window.API_CONFIG.hybridApiUrl;
        } else {
            // Fallback: try to fetch from config endpoint
            this.loadFromEndpoint();
            
            // Or use localhost for development
            this.backendApiUrl = 'http://localhost:5001';
            this.hybridApiUrl = 'http://localhost:8000';
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

