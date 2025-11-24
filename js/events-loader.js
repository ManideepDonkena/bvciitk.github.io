$(document).ready(function () {
    const eventsContainer = document.getElementById('events-container');

    if (!eventsContainer) {
        console.error("Events container not found!");
        return;
    }

    if (typeof CONFIG !== 'undefined' && CONFIG.eventsUrl && typeof fetchCSVData === 'function') {
        fetchCSVData(CONFIG.eventsUrl).then(data => {
            if (data && data.length > 0) {
                renderEvents(data, eventsContainer);
            } else {
                eventsContainer.innerHTML = '<p class="text-center">No events found.</p>';
            }
        }).catch(err => {
            console.error("Error loading events data:", err);
            eventsContainer.innerHTML = '<p class="text-center">Error loading events data.</p>';
        });
    } else {
        console.error("Config or Data Loader not found.");
    }
});

function renderEvents(events, container) {
    container.innerHTML = ''; // Clear existing content

    events.forEach((event, index) => {
        // Create elements
        const bgridDiv = document.createElement('div');
        bgridDiv.className = 'bgrid service-item animate-this';

        const iconLink = document.createElement('a');
        iconLink.href = '#';
        iconLink.className = 'icon';

        const iconI = document.createElement('i');
        // Default icon if missing. Handle 'fa-' prefix if user provides it or not.
        // Assuming user provides full class like 'fa-leaf' or just 'leaf'.
        // The mock data has 'fa-leaf'.
        let iconClass = event.icon || 'fa-calendar';
        if (!iconClass.startsWith('fa-') && !iconClass.startsWith('icon-')) {
            // If just 'leaf', assume fa
            iconClass = 'fa-' + iconClass;
        }
        // Check if it's 'icon-' (simple-line-icons) or 'fa-' (fontawesome)
        if (iconClass.startsWith('icon-')) {
            iconI.className = iconClass;
        } else {
            iconI.className = `fa ${iconClass} blue-color`;
        }

        iconLink.appendChild(iconI);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'service-content';

        const titleLink = document.createElement('a');
        titleLink.href = '#';

        const titleH3 = document.createElement('h3');
        titleH3.className = 'h05';
        titleH3.innerText = event.title;

        titleLink.appendChild(titleH3);

        const descP = document.createElement('p');
        descP.className = 'events-desc';
        descP.innerText = event.description;

        contentDiv.appendChild(titleLink);
        contentDiv.appendChild(descP);

        bgridDiv.appendChild(iconLink);
        bgridDiv.appendChild(contentDiv);

        container.appendChild(bgridDiv);
    });
}
