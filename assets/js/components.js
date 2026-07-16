"use strict";

/**
 * Loads shared HTML partials into elements that declare data-component.
 * Root-relative paths work from nested pages on Netlify.
 */
async function loadComponent(element) {
    const componentUrl = element.dataset.component;

    if (!componentUrl) {
        return;
    }

    try {
        const response = await fetch(componentUrl);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        element.innerHTML = await response.text();
        element.dataset.componentLoaded = "true";
    } catch (error) {
        console.error(`Could not load shared component: ${componentUrl}`, error);
        element.innerHTML = `
            <div class="component-error" role="alert">
                A shared part of this page could not be loaded. Please refresh the page or use a local web server.
            </div>
        `;
    }
}

async function loadAllComponents() {
    const componentElements = [...document.querySelectorAll("[data-component]")];
    await Promise.all(componentElements.map(loadComponent));
    document.dispatchEvent(new CustomEvent("components:loaded"));
}

document.addEventListener("DOMContentLoaded", loadAllComponents);
