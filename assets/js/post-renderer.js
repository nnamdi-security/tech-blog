import { getPostById, getSortedPosts } from "./posts.js";

const TYPE_LABELS = {
    tutorial: "Video tutorial",
    podcast: "Podcast",
    article: "Article"
};

export function formatDate(dateString) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(`${dateString}T00:00:00`));
}

function escapeAttribute(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function createTagList(tags) {
    return tags
        .map((tag) => `<li><a class="tag" href="/posts/?tag=${encodeURIComponent(tag)}">${escapeAttribute(tag)}</a></li>`)
        .join("");
}

export function createPostCard(post) {
    const mediaMeta = post.duration ?? post.readingTime ?? "";
    const typeLabel = TYPE_LABELS[post.type] ?? post.type;

    return `
        <article class="post-card">
            <a class="post-card__image-link" href="${escapeAttribute(post.url)}" tabindex="-1" aria-hidden="true">
                <img class="post-card__image" src="${escapeAttribute(post.thumbnail)}" alt="" width="720" height="450" loading="lazy">
            </a>

            <div class="post-card__body">
                <div class="post-card__meta">
                    <span class="eyebrow">${escapeAttribute(typeLabel)}</span>
                    ${mediaMeta ? `<span>${escapeAttribute(mediaMeta)}</span>` : ""}
                </div>

                <h3 class="post-card__title">
                    <a href="${escapeAttribute(post.url)}">${escapeAttribute(post.title)}</a>
                </h3>

                <p>${escapeAttribute(post.excerpt)}</p>

                <div class="post-card__footer">
                    <time datetime="${escapeAttribute(post.publishedAt)}">${formatDate(post.publishedAt)}</time>
                    <ul class="tag-list" aria-label="Post tags">${createTagList(post.tags)}</ul>
                </div>
            </div>
        </article>
    `;
}

function renderCards(selector, selectedPosts) {
    const container = document.querySelector(selector);

    if (container) {
        container.innerHTML = selectedPosts.map(createPostCard).join("");
    }
}

function renderFeaturedPost(sortedPosts) {
    const container = document.querySelector("[data-featured-post]");

    if (!container) {
        return;
    }

    const post = sortedPosts.find((item) => item.featured) ?? sortedPosts[0];

    if (!post) {
        container.innerHTML = "<p>No featured post is available yet.</p>";
        return;
    }

    const mediaMeta = post.duration ?? post.readingTime ?? "";

    container.innerHTML = `
        <article class="featured-post">
            <div class="featured-post__media">
                <img src="${escapeAttribute(post.thumbnail)}" alt="${escapeAttribute(post.thumbnailAlt)}" width="960" height="600">
            </div>

            <div class="featured-post__content">
                <span class="eyebrow">${escapeAttribute(TYPE_LABELS[post.type])}</span>
                <h2>${escapeAttribute(post.title)}</h2>
                <p>${escapeAttribute(post.description)}</p>
                <div class="featured-post__details">
                    <time datetime="${escapeAttribute(post.publishedAt)}">${formatDate(post.publishedAt)}</time>
                    ${mediaMeta ? `<span>${escapeAttribute(mediaMeta)}</span>` : ""}
                </div>
                <ul class="tag-list" aria-label="Featured post tags">${createTagList(post.tags)}</ul>
                <a class="button" href="${escapeAttribute(post.url)}">Read the featured post</a>
            </div>
        </article>
    `;
}

function renderHomepageSections(sortedPosts) {
    renderFeaturedPost(sortedPosts);
    renderCards("[data-latest-posts]", sortedPosts.slice(0, 3));
    renderCards("[data-tutorial-posts]", sortedPosts.filter((post) => post.type === "tutorial").slice(0, 3));
    renderCards("[data-podcast-posts]", sortedPosts.filter((post) => post.type === "podcast").slice(0, 3));
    renderCards("[data-article-posts]", sortedPosts.filter((post) => post.type === "article").slice(0, 3));

    document.querySelectorAll("[data-total-posts]").forEach((element) => {
        element.textContent = String(sortedPosts.length);
    });
}

function renderRelatedPosts(sortedPosts) {
    const container = document.querySelector("[data-related-posts]");
    const currentPostId = document.body.dataset.currentPost;

    if (!container || !currentPostId) {
        return;
    }

    const currentPost = getPostById(currentPostId);

    if (!currentPost) {
        container.innerHTML = "<p>Related posts are unavailable.</p>";
        return;
    }

    const relatedPosts = sortedPosts
        .filter((post) => post.id !== currentPost.id)
        .map((post) => ({
            ...post,
            relevance: post.tags.filter((tag) => currentPost.tags.includes(tag)).length
        }))
        .sort((a, b) => b.relevance - a.relevance || new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 2);

    container.innerHTML = relatedPosts.map(createPostCard).join("");
}

function renderPostNavigation(sortedPosts) {
    const container = document.querySelector("[data-post-navigation]");
    const currentPostId = document.body.dataset.currentPost;

    if (!container || !currentPostId) {
        return;
    }

    const currentIndex = sortedPosts.findIndex((post) => post.id === currentPostId);

    if (currentIndex === -1) {
        return;
    }

    const newerPost = sortedPosts[currentIndex - 1] ?? null;
    const olderPost = sortedPosts[currentIndex + 1] ?? null;

    const createNavigationLink = (post, label) => {
        if (!post) {
            return `<span class="post-navigation__empty">${label}: none yet</span>`;
        }

        return `
            <a href="${escapeAttribute(post.url)}">
                <span>${label}</span>
                <strong>${escapeAttribute(post.title)}</strong>
            </a>
        `;
    };

    container.innerHTML = `
        ${createNavigationLink(olderPost, "Older post")}
        ${createNavigationLink(newerPost, "Newer post")}
    `;
}

function renderPostCounts(sortedPosts) {
    const counts = sortedPosts.reduce(
        (result, post) => {
            result[post.type] += 1;
            return result;
        },
        { tutorial: 0, podcast: 0, article: 0 }
    );

    Object.entries(counts).forEach(([type, count]) => {
        document.querySelectorAll(`[data-count="${type}"]`).forEach((element) => {
            element.textContent = String(count);
        });
    });
}

function initialisePostRendering() {
    const sortedPosts = getSortedPosts();
    renderHomepageSections(sortedPosts);
    renderRelatedPosts(sortedPosts);
    renderPostNavigation(sortedPosts);
    renderPostCounts(sortedPosts);
}

initialisePostRendering();
