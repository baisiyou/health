const fontAwesomeScript = document.createElement("script");
fontAwesomeScript.src = "https://kit.fontawesome.com/c9fbfc084b.js";
fontAwesomeScript.crossOrigin = "anonymous"; // Set the crossorigin attribute
document.head.appendChild(fontAwesomeScript);

import { createClient } from "https://esm.sh/@supabase/supabase-js";

window.supabase = null;
async function initializeSupabase() {
    try {
        // Determine the keys URL based on environment
        let keysUrl;
        
        if (window.apiConfig && window.apiConfig.getSupabaseKeysUrl) {
            // Use API config (works for both Render and GitHub Pages)
            keysUrl = window.apiConfig.getSupabaseKeysUrl();
        } else if (window.location.hostname === "localhost") {
            // Local development
            keysUrl = "http://localhost:5001/keys";
        } else if (window.location.hostname === "baisiyou.github.io") {
            // GitHub Pages: Use Render Backend API
            keysUrl = "https://health-1-3gn7.onrender.com/keys";
        } else {
            // Fallback: try relative path (for Render frontend)
            keysUrl = "/api/supabase";
        }
        
        const response = await fetch(keysUrl);
        const { SUPABASE_URL, SUPABASE_KEY } = await response.json();
        
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase initialized.");
    } catch (error) {
        console.error("Error initializing Supabase:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await initializeSupabase();
    document.dispatchEvent(new Event("supabaseReady"));

    let currentPage = window.location.pathname.split("/").pop(); // Get current file name
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage || 
            (currentPage === "" && link.getAttribute("href") === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


/* === ✅ 1. Highlight the Current Page in the Navbar === */
function highlightActivePage() {
    let currentPage = window.location.pathname.split("/").pop(); // Get current file name
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}
