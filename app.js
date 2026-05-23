// Pune Motorcycle Viewpoints Database (curated for riders)
const spotsDatabase = [
    {
        id: "lavasa",
        name: "Lavasa Viewpoint / Ghat",
        tagline: "Smooth Tarmac & Flowing Corners",
        type: "viewpoint",
        distance: 55,
        durationHours: 1.5,
        twistyIndex: 4.8,
        roadQuality: "excellent",
        roadQualityText: "Smooth, flowing twisties and perfect tarmac. Perfect for cornering practice.",
        pitstop: "Absolute Café near the lake or any of the climb tapris for quick Bhajji and sweet chai.",
        coordinates: { lat: 18.4114, lng: 73.5074 },
        aiCommentary: "Lavasa is an absolute dream for cornering practice near Pune. The road features wide, sweeping curves and highly consistent bankings. The tarmac is near-perfect, offering superior tire grip. Keep an eye out for loose gravel or minor rockfalls on the inner lanes during the monsoon. Reward your lean angles with a hot ginger tea at the lakeside cafe.",
        matchingKeywords: ["lavasa", "ghat", "twisties", "cornering", "monsoon", "scenic", "viewpoint", "lake", "absolute", "bhajji", "chai", "tea"]
    },
    {
        id: "lonavala",
        name: "Lonavala (Tiger Point)",
        tagline: "Fast Highway Cruise & High-Altitude Mist",
        type: "viewpoint",
        distance: 65,
        durationHours: 1.5,
        twistyIndex: 4.2,
        roadQuality: "excellent",
        roadQualityText: "Excellent wide roads on the old highway, but gets heavily congested with weekend traffic.",
        pitstop: "Ram Dev Chai Tapri near the toll, or hot corn bhaji/cheese maggi right at the windy edge.",
        coordinates: { lat: 18.7500, lng: 73.4000 },
        aiCommentary: "Tiger Point Lonavala features excellent wide lanes along the Old Highway, making it a great run for cruiser bikes and fast early morning rides. It gets extremely crowded on weekends, so a 5:30 AM wheels-up time is recommended. The windy apex of the point is famous for thick low-passing clouds, sizzling cheese maggi, and spicy corn bhaji.",
        matchingKeywords: ["tiger", "point", "lonavala", "highway", "cruise", "morning", "fast", "food", "maggi", "bhaji", "chai", "mist", "windy", "toll"]
    },
    {
        id: "dukesnose",
        name: "Duke's Nose (Khandala)",
        tagline: "Rugged Cliff Viewpoints & Rustic Trails",
        type: "viewpoint",
        distance: 70,
        durationHours: 1.5,
        twistyIndex: 3.9,
        roadQuality: "good",
        roadQualityText: "Good tarmac leading right up to Kurvande village. The last approach stretch has narrow, broken tracks.",
        pitstop: "Local breakfast tapris at Kurvande base for steaming Poha, or a quick misal stop on the Khandala stretch.",
        coordinates: { lat: 18.7285, lng: 73.3642 },
        aiCommentary: "Duke's Nose offers a fantastic highway cruise followed by a rural climb up to Kurvande village. The final approach features narrow, broken tracks that require standing on the footpegs and steady clutch control. The clifftop provides a panoramic drop-off overlooking the Khandala valley. Ideal for scramblers and tourers.",
        matchingKeywords: ["duke", "nose", "khandala", "kurvande", "village", "cliff", "viewpoint", "trek", "poha", "misal", "breakfast"]
    },
    {
        id: "ekole",
        name: "Ekole Valley Viewpoint (Tail Baila)",
        tagline: "Raw Sahyadri Off-Road Wilderness",
        type: "viewpoint",
        distance: 85,
        durationHours: 2.5,
        twistyIndex: 4.5,
        roadQuality: "rough",
        roadQualityText: "Beautiful scenic tarmac up to Tail Baila village, followed by a raw, challenging 2.5 km pure off-road trail.",
        pitstop: "Ansh Khanawal (local style restaurant) or tracking down black tea at the Tail Baila village square.",
        coordinates: { lat: 18.5588, lng: 73.3510 },
        aiCommentary: "Ekole Valley Viewpoint is a raw, remote tourer's paradise. The road via Paud-Hadashi offers winding valley views on asphalt, which abruptly turns into a challenging 2.5 km off-road route filled with loose gravel and steep drops. There is a beginner warning for loose rocks! Highly recommended for dual-sports or adventure bikes.",
        matchingKeywords: ["ekole", "tail", "baila", "valley", "off-road", "rough", "rocks", "challenge", "adventure", "wild", "khanawal", "tea"]
    },
    {
        id: "kasarsai",
        name: "Kasarsai Dam & Viewpoint",
        tagline: "Quick Sunset Lake Cruise",
        type: "viewpoint",
        distance: 30,
        durationHours: 0.75, // 45 Mins
        twistyIndex: 3.2,
        roadQuality: "good",
        roadQualityText: "Smooth internal roads, highly accessible. Perfect for a quick sunset ride.",
        pitstop: "Simple lakeside tapris serving excellent ginger tea and fresh bun-maska while you watch the water.",
        coordinates: { lat: 18.6256, lng: 73.6892 },
        aiCommentary: "Kasarsai Dam is the perfect short-distance escape from Pune city center, especially via Hinjewadi. The route features smooth, flat, accessible village roads. It is an ideal destination for a relaxing weekday sunset ride or an effortless morning cruise. Park near the shoreline and enjoy ginger tea with buttered bun-maska.",
        matchingKeywords: ["kasarsai", "dam", "lake", "sunset", "quick", "easy", "short", "bun", "maska", "tea", "water", "viewpoint", "hinjewadi", "ginger"]
    },
    {
        id: "kamshet",
        name: "Kamshet (Paragliding Tower Hill)",
        tagline: "Sweeping Highways & Concrete Hairpins",
        type: "viewpoint",
        distance: 48,
        durationHours: 1.0,
        twistyIndex: 4.4,
        roadQuality: "mixed",
        roadQualityText: "Fast highway cruising followed by a narrow, twisting, steep concrete ghat road.",
        pitstop: "Rangeela Hotel on the highway for heavy parathas, or local chai stalls right at the base.",
        coordinates: { lat: 18.7562, lng: 73.5512 },
        aiCommentary: "Kamshet Tower Hill combines fast, high-speed highway sweeping curves on NH4 with a final, technical concrete ascent. The concrete ghat is steep and narrow with sharp hairpins that require steady low-gear throttle control. The summit offers a spectacular viewing deck to watch colorful paragliders take off.",
        matchingKeywords: ["kamshet", "paragliding", "tower", "hill", "concrete", "climb", "steep", "highway", "paratha", "views", "viewpoint", "nh4"]
    }
];

// App State Management
const appState = {
    query: "",
    matchingTrails: [],
    selectedTrail: null
};

// DOM Elements
const appContainer = document.getElementById("app");
const searchInput = document.getElementById("user-prompt");
const searchButton = document.getElementById("search-btn");
const resultsSection = document.getElementById("results-section");
const sidebarList = document.getElementById("sidebar-rides-list");
const newTripBtn = document.getElementById("new-trip-btn");

// Map State Variables
let leafletMap = null;
let mapLayers = [];

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    renderSidebarRides(spotsDatabase);
    initResetHandler();
});

// Populate Left Sidebar with "Recent Rides"
function renderSidebarRides(spots) {
    if (!sidebarList) return;
    
    sidebarList.innerHTML = spots.map(spot => {
        const isActive = appState.selectedTrail && spot.id === appState.selectedTrail.id ? 'active' : '';
        return `
            <li class="recent-item ${isActive}" data-id="${spot.id}">
                <!-- Message chat bubble icon -->
                <svg class="recent-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span class="recent-text" style="overflow: hidden; text-overflow: ellipsis;">${spot.name}</span>
            </li>
        `;
    }).join('');

    // Attach click listeners to sidebar items
    sidebarList.querySelectorAll(".recent-item").forEach(item => {
        item.addEventListener("click", () => {
            const spotId = item.getAttribute("data-id");
            const spot = spotsDatabase.find(s => s.id === spotId);
            if (spot) {
                appState.selectedTrail = spot;
                appState.matchingTrails = [spot]; // Select this single spot
                
                // Highlight active item in sidebar
                sidebarList.querySelectorAll(".recent-item").forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                
                // Trigger results view
                executeDisplay();
            }
        });
    });
}

// "+ New Trip" Reset Action
function initResetHandler() {
    if (!newTripBtn) return;
    
    newTripBtn.addEventListener("click", () => {
        // Clear query fields
        searchInput.value = "";
        appState.query = "";
        appState.selectedTrail = null;
        appState.matchingTrails = [];
        
        // Transition back to Initial State
        appContainer.className = "state-initial";
        
        // Render full list in sidebar and remove active tags
        renderSidebarRides(spotsDatabase);
        
        // Hide results grid
        resultsSection.innerHTML = "";
        
        // Tear down Leaflet map
        if (leafletMap) {
            leafletMap.remove();
            leafletMap = null;
            mapLayers = [];
        }
    });
}

// Search Inputs listeners
searchButton.addEventListener("click", () => {
    executeSearch();
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        executeSearch();
    }
});

// Search Matching logic (Connects to our secure Vercel Serverless Backend /api/search)
async function executeSearch() {
    const userInput = searchInput.value.trim();
    appState.query = userInput;
    
    if (!userInput) return;
    
    showLoading(true);

    try {
        // Fetch route details dynamically from Vercel serverless function
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);

        if (isNaN(lat) || isNaN(lng)) {
            throw new Error("Invalid coordinate values returned from API endpoint.");
        }

        const matchedId = data.matchedLocation.toLowerCase().replace(/[^a-z0-9]/g, "");

        // Construct dynamic spot object using server-grounded response
        const dynamicSpot = {
            id: matchedId,
            name: data.matchedLocation,
            tagline: "Live Grounded Search Route",
            type: "viewpoint",
            distance: "Live Data",
            durationHours: "Real-time",
            twistyIndex: 4.5,
            roadQuality: "mixed",
            roadQualityText: "Real-time road conditions search generated.",
            pitstop: data.recommendedChaiStop,
            coordinates: {
                lat: lat,
                lng: lng
            },
            aiCommentary: data.aiReasoning
        };

        appState.matchingTrails = [dynamicSpot];
        appState.selectedTrail = dynamicSpot;

        // Highlight matching sidebar item if name matches one of our local recent rides
        renderSidebarRides(spotsDatabase);
        const localMatch = spotsDatabase.find(s => s.id === matchedId || s.name.toLowerCase().includes(data.matchedLocation.toLowerCase()));
        if (localMatch) {
            const sidebarItem = sidebarList.querySelector(`[data-id="${localMatch.id}"]`);
            if (sidebarItem) {
                sidebarList.querySelectorAll(".recent-item").forEach(i => i.classList.remove("active"));
                sidebarItem.classList.add("active");
            }
        }

        executeDisplay();
    } catch (error) {
        console.error("Vercel Search API error, falling back locally:", error);
        executeLocalSearchFallback(userInput);
    } finally {
        showLoading(false);
    }
}

// Local Search Matching Fallback (Fuzzy matching engine)
function executeLocalSearchFallback(textQuery) {
    const queryLower = textQuery.toLowerCase();
    let matches = spotsDatabase.map(spot => {
        let score = 0;
        const queryWords = queryLower.split(/\s+/);
        
        queryWords.forEach(word => {
            if (word.length < 2) return;
            if (spot.name.toLowerCase().includes(word)) score += 10;
            if (spot.tagline.toLowerCase().includes(word)) score += 5;
            if (spot.matchingKeywords.some(keyword => keyword.includes(word))) score += 8;
            if (spot.aiCommentary.toLowerCase().includes(word)) score += 3;
            
            if ((word === "short" || word === "quick" || word === "easy") && spot.distance <= 50) score += 6;
            if ((word === "long" || word === "far" || word === "challenge") && spot.distance > 50) score += 6;
            if ((word === "offroad" || word === "dirt" || word === "rough") && spot.roadQuality === "rough") score += 12;
        });

        return { ...spot, matchScore: score };
    })
    .filter(spot => spot.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

    if (matches.length > 0) {
        appState.matchingTrails = matches;
        appState.selectedTrail = matches[0];
        
        // Dynamic indicator showing fallback mode in the reasoning card
        appState.selectedTrail.aiCommentary += " (Note: Running on offline matching engine. Configure the GEMINI_API_KEY environment variable on Vercel to enable live AI reasoning!)";
        
        renderSidebarRides(matches);
        executeDisplay();
    } else {
        appState.matchingTrails = [];
        appState.selectedTrail = null;
        renderNoResults();
    }
}

// Display results and render Map
function executeDisplay() {
    // Transition UI State
    appContainer.className = "state-results";
    
    // Clear Leaflet map container to avoid canvas re-initialization errors
    if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
        mapLayers = [];
    }

    const spot = appState.selectedTrail;
    
    // Render Itinerary details
    resultsSection.innerHTML = `
        <div class="itinerary-panel">
            <div id="trail-details-wrapper">
                ${renderTrailDetails(spot)}
            </div>
        </div>
        
        <div class="map-panel">
            <div class="map-wrapper">
                <div id="map"></div>
            </div>
        </div>
    `;

    // Render Leaflet Map directions
    updateMapRoute(spot);
}

// Generate Detail Panel HTML
function renderTrailDetails(spot) {
    const roadQualityClass = getRoadQualityClass(spot.roadQuality);
    
    // Construct universal Google Maps directions link
    const mapsLink = `https://www.google.com/maps/dir/?api=1&origin=Pune,+Maharashtra&destination=${spot.coordinates.lat},${spot.coordinates.lng}&waypoints=${encodeURIComponent(spot.pitstop)}`;

    return `
        <div class="trail-header">
            <span class="tagline">${spot.tagline}</span>
            <h1>${spot.name}</h1>
        </div>
        
        <div class="premium-metrics">
            <div class="metric-card">
                <span class="label">Twisty Index</span>
                <div class="val">
                    <span style="font-family: var(--font-mono);">${spot.twistyIndex.toFixed(1)}</span>
                    <span class="stars">${"★".repeat(Math.floor(spot.twistyIndex))}${"☆".repeat(5 - Math.floor(spot.twistyIndex))}</span>
                </div>
            </div>
            <div class="metric-card">
                <span class="label">Road Quality</span>
                <div class="val">
                    <span class="badge ${roadQualityClass}">${spot.roadQuality === 'excellent' ? 'Excellent Tarmac' : spot.roadQuality.toUpperCase()}</span>
                </div>
            </div>
        </div>
        
        <div class="itinerary-details">
            <div class="stat">
                <span class="label">Distance from Pune</span>
                <span class="val">${spot.distance} km</span>
            </div>
            <div class="stat">
                <span class="label">Estimated Ride Time</span>
                <span class="val">${spot.durationHours} Hours</span>
            </div>
            <div class="stat">
                <span class="label">Road Condition Summary</span>
                <span class="val" style="text-align: right; max-width: 250px; line-height: 1.4;">${spot.roadQualityText}</span>
            </div>
            <div class="stat">
                <span class="label">Curated Local Pitstop</span>
                <span class="val" style="color: var(--accent-blue); text-align: right; max-width: 250px; line-height: 1.4;">${spot.pitstop}</span>
            </div>
        </div>

        <div class="ai-breakdown-card">
            <h3><span class="sparkle">✦</span> TorqueTrails Assistant Report</h3>
            <p>${spot.aiCommentary}</p>
        </div>

        <a href="${mapsLink}" target="_blank" class="gmaps-accent-btn">
            <svg class="btn-icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Launch Route in Google Maps App
        </a>
    `;
}

// Road Quality Class mappings
function getRoadQualityClass(quality) {
    switch (quality) {
        case 'excellent': return 'badge-excellent';
        case 'good': return 'badge-good';
        case 'mixed': return 'badge-mixed';
        case 'rough': return 'badge-rough';
        default: return '';
    }
}

// Leaflet Route Renderer using CartoDB Positron Light Tiles
function updateMapRoute(spot) {
    const puneCoords = [18.5204, 73.8567];
    const destCoords = [spot.coordinates.lat, spot.coordinates.lng];

    if (!leafletMap) {
        leafletMap = L.map('map', {
            zoomControl: false,
            attributionControl: true
        });
        
        L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);
        
        // Add beautiful CartoDB Positron (light silver) tiles matching the light Gemini layout
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(leafletMap);
    }

    // Clear previous markers & paths
    mapLayers.forEach(layer => leafletMap.removeLayer(layer));
    mapLayers = [];

    // DivIcon Markers styling
    const startIcon = L.divIcon({
        className: 'marker-start',
        html: `<div style="width: 12px; height: 12px; background-color: #ffffff; border: 2.5px solid #000000; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    const destIcon = L.divIcon({
        className: 'marker-dest',
        html: `<div style="width: 16px; height: 16px; background-color: #ff5e00; border: 2.5px solid #ffffff; border-radius: 50%; animation: pulseMarker 1.2s infinite alternate; box-shadow: 0 4px 12px rgba(255, 94, 0, 0.5);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    // Drop markers
    const startMarker = L.marker(puneCoords, { icon: startIcon }).addTo(leafletMap)
        .bindPopup("<b>Pune City Center</b><br>Ride Start Point");
    const destMarker = L.marker(destCoords, { icon: destIcon }).addTo(leafletMap)
        .bindPopup(`<b>${spot.name}</b><br>${spot.tagline}`);

    mapLayers.push(startMarker, destMarker);

    // Draw winding country road polyline path
    const routePoints = generateRoutePoints(puneCoords, destCoords);
    const routeLine = L.polyline(routePoints, {
        color: '#ff5e00',
        weight: 4.5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'route-polyline'
    }).addTo(leafletMap);

    mapLayers.push(routeLine);

    // Zoom and pan
    const bounds = L.latLngBounds([puneCoords, destCoords]);
    leafletMap.fitBounds(bounds, { padding: [50, 50] });

    setTimeout(() => {
        destMarker.openPopup();
    }, 450);
}

// Generate simple curved intermediate points
function generateRoutePoints(start, end) {
    const points = [start];
    const segments = 6;
    const latDiff = end[0] - start[0];
    const lngDiff = end[1] - start[1];
    
    for (let i = 1; i < segments; i++) {
        const ratio = i / segments;
        let lat = start[0] + latDiff * ratio;
        let lng = start[1] + lngDiff * ratio;
        
        const wave = Math.sin(ratio * Math.PI) * 0.025;
        
        if (i % 2 === 0) {
            lat += wave * 0.7;
            lng += wave * 0.3;
        } else {
            lat -= wave * 0.3;
            lng += wave * 0.7;
        }
        
        points.push([lat, lng]);
    }
    
    points.push(end);
    return points;
}

// Show/Hide Loading Overlay
function showLoading(visible) {
    let overlay = document.getElementById("loading-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "loading-overlay";
        overlay.className = "loading-overlay";
        overlay.innerHTML = `
            <div class="spinner"></div>
            <div style="font-size: 0.85rem; font-weight:600; letter-spacing:0.05em; color: var(--text-secondary); text-transform: uppercase;">
                Analyzing Trail Matrix...
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    if (visible) {
        overlay.classList.add("active");
    } else {
        overlay.classList.remove("active");
    }
}

// Render empty search responses
function renderNoResults() {
    // Transition UI State to results (to show results section)
    appContainer.className = "state-results";
    
    // Overwrite content
    resultsSection.innerHTML = `
        <div class="itinerary-panel" style="grid-column: span 2; display: flex; align-items: center; justify-content: center; min-height: 50vh;">
            <div class="no-results">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3>No Rides Match Your Query</h3>
                <p style="color: var(--text-muted); max-width: 400px; margin-top: 0.5rem; font-size: 0.92rem; line-height: 1.5;">
                    We couldn't find any views matching those terms. Try describing distance like 'short rides' or keywords like 'offroad', 'mist', or 'dam'.
                </p>
                <button onclick="triggerReset()" class="reset-btn">
                    Reset Map
                </button>
            </div>
        </div>
    `;
}

// Global reset helper mapping
window.triggerReset = function() {
    if (newTripBtn) {
        newTripBtn.click();
    }
};
