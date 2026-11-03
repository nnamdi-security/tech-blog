"use strict";

/**
 * The site root, worked out from this script's own URL (it lives at
 * <root>/assets/js/components.js). This lets the site run from a domain
 * root (Netlify) or from a sub-folder (GitHub Pages: /tech-blog/).
 */
const SITE_ROOT = new URL("../../", document.currentScript.src);
window.siteRoot = SITE_ROOT.href;

/**
 * Shared partials are written with root-relative links such as "/posts/".
 * Rewrite them so they point inside the site root wherever it is hosted.
 */
function resolveRootRelativeLinks(container) {
    container.querySelectorAll("[href^='/'], [src^='/']").forEach((element) => {
        ["href", "src"].forEach((attribute) => {
            const value = element.getAttribute(attribute);

            if (value && value.startsWith("/") && !value.startsWith("//")) {
                element.setAttribute(attribute, new URL(value.slice(1), SITE_ROOT).href);
            }
        });
    });
}

/**
 * Loads shared HTML partials into elements that declare data-component.
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
        resolveRootRelativeLinks(element);
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
