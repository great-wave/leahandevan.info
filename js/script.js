// Map initialization function
function initializeMap() {
    // Wedding venues
    const venues = [
        {
            name: "Santa Barbara Courthouse",
            position: [34.4240, -119.7030],
            description: "Ceremony location - Mural Room",
            type: "venue",
            icon: "🏛️"
        },
        {
            name: "Santa Barbara Wine Collective",
            position: [34.4150, -119.6870],
            description: "Cocktail hour and dinner",
            type: "venue",
            icon: "🍷"
        }
    ];

    // Hotels
    const hotels = [
        {
            name: "Hotel Santa Barbara",
            position: [34.4215, -119.7020],
            url: "https://www.hotelsantabarbara.com/",
            type: "hotel"
        },
        {
            name: "Harbor View Inn",
            position: [34.4130, -119.6900],
            url: "https://www.harborviewinnsb.com/en",
            type: "hotel"
        },
        {
            name: "Mar Monte Hotel by Hyatt",
            position: [34.4080, -119.6890],
            url: "https://www.hyatt.com/unbound-collection/en-US/sbars-mar-monte-hotel",
            type: "hotel"
        },
        {
            name: "The Drift Santa Barbara",
            position: [34.4190, -119.6980],
            url: "https://www.drifthotels.co/santabarbara",
            type: "hotel"
        },
        {
            name: "Kimpton Canary Santa Barbara",
            position: [34.4205, -119.7015],
            url: "https://www.canarysantabarbara.com/",
            type: "hotel"
        }
    ];

    // Check if map element exists (only on travel page)
    if (!document.getElementById('map')) {
        return;
    }

    // Calculate center point between courthouse and wine collective
    const centerLat = (34.4240 + 34.4150) / 2;
    const centerLng = (-119.7030 + -119.6870) / 2;

    // Initialize the map centered between the two venues
    const map = L.map('map').setView([centerLat, centerLng], 14);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Create hotel icon
    const hotelIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="position: relative;">
                <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#d97706" stroke="#FFF" stroke-width="2" 
                        d="M16 1c-7.732 0-14 6.268-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z"/>
                    <text x="16" y="20" text-anchor="middle" font-family="Arial" 
                        font-size="16" font-weight="bold" fill="white">H</text>
                </svg>
            </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42]
    });

    // Create venue icon
    const venueIcon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="position: relative;">
                <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#b45309" stroke="#FFF" stroke-width="2" 
                        d="M18 1c-8.732 0-15 7.268-15 15 0 11.5 15 28 15 28s15-16.5 15-28c0-7.732-6.268-15-15-15z"/>
                    <circle cx="18" cy="16" r="6" fill="white"/>
                </svg>
            </div>
        `,
        iconSize: [36, 46],
        iconAnchor: [18, 46],
        popupAnchor: [0, -46]
    });

    // Add venue markers
    venues.forEach(venue => {
        const marker = L.marker(venue.position, { icon: venueIcon }).addTo(map);
        
        const popupContent = `
            <div style="min-width: 220px;">
                <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 6px 0; color: #1f2937;">
                    ${venue.icon} ${venue.name}
                </h3>
                <p style="margin: 0; color: #4b5563; font-size: 15px;">${venue.description}</p>
            </div>
        `;
        
        marker.bindPopup(popupContent);
    });

    // Add hotel markers
    hotels.forEach(hotel => {
        const marker = L.marker(hotel.position, { icon: hotelIcon }).addTo(map);
        
        const popupContent = `
            <div style="min-width: 220px;">
                <h3 style="font-size: 18px; font-weight: 600; margin: 0 0 8px 0; color: #1f2937;">
                    ${hotel.name}
                </h3>
                <a href="${hotel.url}" target="_blank" rel="noopener" 
                   style="font-size: 15px;">
                    Visit Website →
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });

    // Fit map to show all markers with padding
    const allLocations = [...venues.map(v => v.position), ...hotels.map(h => h.position)];
    const bounds = L.latLngBounds(allLocations);
    map.fitBounds(bounds, { padding: [50, 50] });
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === 'celebrate') {
        // Store authentication in sessionStorage
        sessionStorage.setItem('authenticated', 'true');
        
        document.getElementById('passwordPrompt').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('flex');
        document.getElementById('mainContent').classList.add('flex-col');

        console.log('About to attach menu listeners');

        $('#menuButton').on('click', () => {
            const $menu = $('#mobileMenuOverlay');
            
            if ($menu.hasClass('hidden')) {
                // Show menu
                $menu.removeClass('hidden');
                setTimeout(() => $menu.removeClass('opacity-0'), 10);
            } else {
                // Hide menu
                $menu.addClass('opacity-0');
                setTimeout(() => $menu.addClass('hidden'), 300);
            }
        });

        $('#closeLink').on('click', () => {
            const $menu = $('#mobileMenuOverlay');
            $menu.addClass('opacity-0');
            setTimeout(() => $menu.addClass('hidden'), 300);
        });

        // Initialize map if on travel page
        initializeMap();

    } else {
        alert('Wrong password');
    }
}

document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    const referrer = document.referrer;
    const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
    const cameFromHomePage = referrer.includes('leahandevan.info') && 
                             (referrer.endsWith('/') || referrer.includes('/index.html'));
    
    if (isAuthenticated || cameFromHomePage) {
        // User is authenticated or came from home page
        document.getElementById('passwordPrompt').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('flex');
        document.getElementById('mainContent').classList.add('flex-col');

        $('#menuButton').on('click', () => {
            const $menu = $('#mobileMenuOverlay');
            
            if ($menu.hasClass('hidden')) {
                // Show menu
                $menu.removeClass('hidden');
                setTimeout(() => $menu.removeClass('opacity-0'), 10);
            } else {
                // Hide menu
                $menu.addClass('opacity-0');
                setTimeout(() => $menu.addClass('hidden'), 300);
            }
        });

        $('#closeLink').on('click', () => {
            const $menu = $('#mobileMenuOverlay');
            $menu.addClass('opacity-0');
            setTimeout(() => $menu.addClass('hidden'), 300);
        });
        
        // Set authenticated flag for future pages in this session
        sessionStorage.setItem('authenticated', 'true');

        // Initialize map if on travel page
        initializeMap();
    }
});