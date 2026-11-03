"use strict";

// Path of the site root: "/" on Netlify, "/tech-blog/" on GitHub Pages.
function getRootPath() {
    return new URL(window.siteRoot ?? "/", window.location.href).pathname;
}

// Returns a path relative to the site root, e.g. "/" or "/posts".
function normalizePath(pathname) {
    const rootPath = getRootPath();
    const relativePath = pathname.startsWith(rootPath) ? pathname.slice(rootPath.length - 1) : pathname;

    return relativePath.replace(/index\.html$/, "").replace(/\/+$/, "") || "/";
}

function setActiveNavigationLink() {
    const currentPath = normalizePath(window.location.pathname);

    document.querySelectorAll("[data-nav-link]").forEach((link) => {
        const linkPath = normalizePath(new URL(link.href).pathname);
        const isHome = linkPath === "/" && currentPath === "/";
        const isSection = linkPath !== "/" && currentPath.startsWith(linkPath);

        if (isHome || isSection) {
            link.setAttribute("aria-current", "page");
        }
    });
}

function initialiseMobileNavigation() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const navigation = document.querySelector("[data-primary-nav]");

    if (!toggle || !navigation || toggle.dataset.initialised === "true") {
        return;
    }

    toggle.dataset.initialised = "true";

    const closeNavigation = () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation");
        navigation.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeNavigation();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
            toggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 48rem)").matches) {
            closeNavigation();
        }
    });
}

function updateCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });
}

function initialiseSharedInterface() {
    initialiseMobileNavigation();
    setActiveNavigationLink();
    updateCurrentYear();
}

document.addEventListener("components:loaded", initialiseSharedInterface);
document.addEventListener("DOMContentLoaded", initialiseSharedInterface);
