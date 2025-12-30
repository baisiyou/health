// Static file server with API configuration injection
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync, existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Get API URLs from environment variables
// Render will set these via fromService in render.yaml
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5001';
const HYBRID_API_URL = process.env.HYBRID_API_URL || 'http://localhost:8000';

// Ensure URLs have protocol
const ensureProtocol = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
};

const backendUrl = ensureProtocol(BACKEND_API_URL);
const hybridUrl = ensureProtocol(HYBRID_API_URL);

// API configuration endpoint (JSON) - available before HTML loads
app.get('/api/config', (req, res) => {
    res.json({
        backendApiUrl: backendUrl,
        hybridApiUrl: hybridUrl
    });
});

// Inject API configuration into HTML files
app.get('*.html', (req, res, next) => {
    const filePath = __dirname + req.path;
    if (existsSync(filePath)) {
        try {
            let html = readFileSync(filePath, 'utf8');
            
            // Inject API configuration script before </head>
            const configScript = `
    <script>
        window.API_CONFIG = {
            backendApiUrl: '${backendUrl}',
            hybridApiUrl: '${hybridUrl}'
        };
    </script>`;
            
            if (html.includes('</head>')) {
                html = html.replace('</head>', configScript + '</head>');
            } else if (html.includes('</body>')) {
                html = html.replace('</body>', configScript + '</body>');
            }
            
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error reading HTML file:', error);
            next();
        }
    } else {
        next();
    }
});

// Handle root path explicitly - serve index.html
app.get('/', (req, res) => {
    const indexPath = __dirname + '/index.html';
    console.log('Root path requested, looking for index.html at:', indexPath);
    console.log('__dirname is:', __dirname);
    console.log('File exists:', existsSync(indexPath));
    
    if (existsSync(indexPath)) {
        try {
            let html = readFileSync(indexPath, 'utf8');
            
            const configScript = `
    <script>
        window.API_CONFIG = {
            backendApiUrl: '${backendUrl}',
            hybridApiUrl: '${hybridUrl}'
        };
    </script>`;
            
            if (html.includes('</head>')) {
                html = html.replace('</head>', configScript + '</head>');
            } else if (html.includes('</body>')) {
                html = html.replace('</body>', configScript + '</body>');
            }
            
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error reading index.html:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        res.status(404).send('Not found');
    }
});

// Serve static files for non-HTML assets (CSS, JS, images, etc.)
// This must come after root and HTML handlers
app.use(express.static(__dirname));

// Catch-all for other paths - serve index.html for SPA routing
app.get('*', (req, res, next) => {
    // Skip if it's already an HTML file or API endpoint (let previous handlers handle these)
    if (req.path.endsWith('.html') || req.path.startsWith('/api/')) {
        return next();
    }
    
    // For other paths, serve index.html (SPA routing)
    const indexPath = __dirname + '/index.html';
    if (existsSync(indexPath)) {
        try {
            let html = readFileSync(indexPath, 'utf8');
            
            const configScript = `
    <script>
        window.API_CONFIG = {
            backendApiUrl: '${backendUrl}',
            hybridApiUrl: '${hybridUrl}'
        };
    </script>`;
            
            if (html.includes('</head>')) {
                html = html.replace('</head>', configScript + '</head>');
            } else if (html.includes('</body>')) {
                html = html.replace('</body>', configScript + '</body>');
            }
            
            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error reading index.html:', error);
            res.status(500).send('Internal server error');
        }
    } else {
        res.status(404).send('Not found');
    }
});

app.listen(PORT, () => {
    console.log(`✅ Frontend server running on port ${PORT}`);
    console.log(`📁 __dirname: ${__dirname}`);
    console.log(`📄 index.html exists: ${existsSync(__dirname + '/index.html')}`);
    console.log(`🔗 Backend API URL: ${backendUrl}`);
    console.log(`🔗 Hybrid API URL: ${hybridUrl}`);
    
    // List some files for debugging
    try {
        const files = readdirSync(__dirname).filter(f => !f.startsWith('.') && !f.includes('node_modules')).slice(0, 10);
        console.log(`📂 Directory contents (first 10):`, files);
    } catch (err) {
        console.error('Error listing directory:', err);
    }
    
    // Verify index.html
    const indexPath = __dirname + '/index.html';
    if (existsSync(indexPath)) {
        console.log(`✅ index.html found at: ${indexPath}`);
    } else {
        console.error(`❌ index.html NOT found at: ${indexPath}`);
        console.log(`Current directory: ${process.cwd()}`);
    }
});
