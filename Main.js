// ==UserScript==
// @name         YouTube short gone
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Hides YouTube Shorts
// @author       16546489
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Immediately redirect if on a Shorts page.
    if (window.location.pathname.includes('/shorts/')) {
        window.location.href = 'https://www.youtube.com';
        return;
    }

    // List of selectors to catch standard containers.
    const selectors = [
        'ytd-rich-item-renderer',   
        'ytd-video-renderer',       
        'ytd-grid-video-renderer'   
    ];

    // Core function to remove unwanted elements.
    const hideUnwantedItems = () => {
        try {
            // Process standard containers from the selectors array.
            selectors.forEach(selector => {
                const items = document.querySelectorAll(selector);
                items.forEach(item => {
                    const link = item.querySelector('a[href]');
                    if (link && (link.href.includes('/shorts/') || link.href.includes('/playables/'))) {
                        item.style.display = 'none';
                    }
                });
            });

            // Additional filtering for elements with class "style-scope ytd-item-section-renderer"
            const sectionItems = document.querySelectorAll('.style-scope.ytd-item-section-renderer');
            sectionItems.forEach(item => {
                const link = item.querySelector('a[href]');
                if (link && (link.href.includes('/shorts/') || link.href.includes('/playables/'))) {
                    item.style.display = 'none';
                }
            });

            // Hide the sidebar "Shorts" button if present.
            const sidebarShorts = document.querySelector('a[title="Shorts"]');
            if (sidebarShorts) {
                sidebarShorts.style.display = 'none';
            }

            // Hide the "Shorts" section header.
            const shortsSectionHeader = document.querySelector('#rich-shelf-header-container');
            if (shortsSectionHeader) {
                shortsSectionHeader.style.display = 'none';
            }

            // Hide dismissible sections containing Shorts links.
            document.querySelectorAll('#dismissible').forEach(section => {
                const a = section.querySelector('a[href*="/shorts/"]');
                if (a) {
                    section.style.display = 'none';
                }
            });
        } catch (error) {
            console.error('Error hiding content:', error);
        }
    };

    // Continuously run the removal function to catch dynamically loaded content.
    setInterval(hideUnwantedItems, 1000);
})();
