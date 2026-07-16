import { getSortedPosts } from "./posts.js";
import { createPostCard } from "./post-renderer.js";

const posts = getSortedPosts();

function normalise(value) {
    return String(value).trim().toLocaleLowerCase();
}

function getAllTags() {
    return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}

function createTagOptions(selectElement) {
    selectElement.insertAdjacentHTML(
        "beforeend",
        getAllTags().map((tag) => `<option value="${tag}">${tag}</option>`).join("")
    );
}

function readInitialFilters(searchInput, typeSelect, tagSelect) {
    const parameters = new URLSearchParams(window.location.search);
    searchInput.value = parameters.get("q") ?? "";
    typeSelect.value = parameters.get("type") ?? "";
    tagSelect.value = parameters.get("tag") ?? "";
}

function updateUrl(query, type, tag) {
    const parameters = new URLSearchParams();

    if (query) parameters.set("q", query);
    if (type) parameters.set("type", type);
    if (tag) parameters.set("tag", tag);

    const nextUrl = parameters.toString()
        ? `${window.location.pathname}?${parameters.toString()}`
        : window.location.pathname;

    window.history.replaceState({}, "", nextUrl);
}

function initialiseFilters() {
    const form = document.querySelector("[data-post-filters]");
    const resultsContainer = document.querySelector("[data-filter-results]");

    if (!form || !resultsContainer || form.dataset.initialised === "true") {
        return;
    }

    form.dataset.initialised = "true";

    const searchInput = form.querySelector("[data-search-input]");
    const typeSelect = form.querySelector("[data-type-filter]");
    const tagSelect = form.querySelector("[data-tag-filter]");
    const clearButton = form.querySelector("[data-clear-filters]");
    const resultsCount = document.querySelector("[data-results-count]");
    const emptyState = document.querySelector("[data-empty-state]");

    createTagOptions(tagSelect);
    readInitialFilters(searchInput, typeSelect, tagSelect);

    const renderFilteredPosts = () => {
        const query = normalise(searchInput.value);
        const type = typeSelect.value;
        const tag = tagSelect.value;

        const filteredPosts = posts.filter((post) => {
            const searchableText = normalise([
                post.title,
                post.description,
                post.excerpt,
                post.type,
                ...post.tags
            ].join(" "));

            return (!query || searchableText.includes(query))
                && (!type || post.type === type)
                && (!tag || post.tags.includes(tag));
        });

        resultsContainer.innerHTML = filteredPosts.map(createPostCard).join("");
        resultsCount.textContent = `${filteredPosts.length} ${filteredPosts.length === 1 ? "post" : "posts"} found`;
        emptyState.hidden = filteredPosts.length !== 0;
        clearButton.disabled = !query && !type && !tag;
        updateUrl(searchInput.value.trim(), type, tag);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        renderFilteredPosts();
    });
    form.addEventListener("input", renderFilteredPosts);
    form.addEventListener("change", renderFilteredPosts);

    clearButton.addEventListener("click", () => {
        form.reset();
        renderFilteredPosts();
        searchInput.focus();
    });

    renderFilteredPosts();
}

document.addEventListener("DOMContentLoaded", initialiseFilters);
initialiseFilters();
