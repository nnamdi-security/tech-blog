export const posts = [
    {
        id: "web-security-basics-for-beginners",
        title: "Web Security Basics for Front-End Beginners",
        slug: "web-security-basics-for-beginners",
        type: "article",
        description: "Learn what XSS is, why innerHTML can be dangerous, and how HTTP security headers protect a static website.",
        excerpt: "XSS, innerHTML, and security headers explained with real code from this blog.",
        publishedAt: "2026-11-03",
        updatedAt: null,
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/web-security-basics.webp",
        thumbnailAlt: "Thumbnail reading Is Your Code Open To XSS, comparing innerHTML with textContent beside a padlock shield",
        url: "/posts/web-security-basics-for-beginners/",
        youtubeId: null,
        duration: null,
        readingTime: "10 min read",
        featured: false,
        tags: ["Security", "JavaScript", "Netlify"]
    },
    {
        id: "building-a-blog-without-a-framework",
        title: "How I Built This Blog Without a Framework",
        slug: "building-a-blog-without-a-framework",
        type: "article",
        description: "A behind-the-scenes look at how this blog runs on plain HTML, CSS, and JavaScript, with no framework, no build step, and no package manager.",
        excerpt: "The architecture, trade-offs, and bugs behind a blog built with plain HTML, CSS, and JavaScript.",
        publishedAt: "2026-11-03",
        updatedAt: null,
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/building-blog-without-framework.webp",
        thumbnailAlt: "Thumbnail reading No Framework. No Build Step. Just HTML, CSS and JS, with a zero dependencies badge",
        url: "/posts/building-a-blog-without-a-framework/",
        youtubeId: null,
        duration: null,
        readingTime: "9 min read",
        featured: false,
        tags: ["HTML", "JavaScript", "Netlify", "Case Study"]
    },
    {
        id: "git-and-github-beginner-mistakes",
        title: "Git and GitHub for Beginners: The Mistakes I Made So You Don't Have To",
        slug: "git-and-github-beginner-mistakes",
        type: "article",
        description: "Real Git mistakes from this blog's own commit history: unrelated histories, surprise merge commits, a broken URL, and how to avoid each one.",
        excerpt: "Unrelated histories, surprise merge commits, and a broken URL, plus how to avoid each one.",
        publishedAt: "2026-11-03",
        updatedAt: null,
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/git-github-beginner-mistakes.webp",
        thumbnailAlt: "Thumbnail reading 5 Git Mistakes I Made So You Don't Have To, with a terminal error and a commit graph",
        url: "/posts/git-and-github-beginner-mistakes/",
        youtubeId: null,
        duration: null,
        readingTime: "9 min read",
        featured: false,
        tags: ["Git", "Career", "Beginners"]
    },
    {
        id: "javascript-array-methods",
        title: "JavaScript Array Methods Explained",
        slug: "javascript-array-methods",
        type: "tutorial",
        description: "Learn how map, filter, find, and reduce help you transform real application data.",
        excerpt: "A practical, beginner-friendly walkthrough of the array methods you will use in everyday JavaScript.",
        publishedAt: "2026-07-16",
        updatedAt: "2026-07-18",
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/javascript-array-methods.webp",
        thumbnailAlt: "Thumbnail reading Array Methods, with a code window chaining filter and map",
        url: "/posts/javascript-array-methods/",
        youtubeId: "M7lc1UVf-VE",
        duration: "18:42",
        readingTime: null,
        featured: true,
        tags: ["JavaScript", "Frontend", "Tutorial"]
    },
    {
        id: "technology-podcast-episode-one",
        title: "The Skills Junior Developers Actually Need",
        slug: "technology-podcast-episode-one",
        type: "podcast",
        description: "A practical conversation about learning, portfolios, communication, and becoming employable.",
        excerpt: "Beyond syntax: what helps a new developer become reliable, useful, and ready to work with a team?",
        publishedAt: "2026-07-10",
        updatedAt: null,
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/technology-podcast.webp",
        thumbnailAlt: "Podcast thumbnail reading The Skills Junior Devs Actually Need, with a microphone and sound wave",
        url: "/posts/technology-podcast-episode-one/",
        youtubeId: "M7lc1UVf-VE",
        duration: "42:15",
        readingTime: null,
        featured: false,
        tags: ["Career", "Podcast", "Learning"]
    },
    {
        id: "building-accessible-navigation",
        title: "Building Navigation That Works for Everyone",
        slug: "building-accessible-navigation",
        type: "article",
        description: "A practical guide to semantic, keyboard-friendly navigation for responsive websites.",
        excerpt: "Learn how semantic HTML, focus management, and a small amount of JavaScript create a better menu.",
        publishedAt: "2026-07-03",
        updatedAt: null,
        author: "Nnamdi Ileh",
        thumbnail: "/assets/images/posts/accessible-navigation.webp",
        thumbnailAlt: "Thumbnail reading Navigation That Works For Everyone, with a focused menu link and Tab, Enter, and Esc keys",
        url: "/posts/building-accessible-navigation/",
        youtubeId: null,
        duration: null,
        readingTime: "8 min read",
        featured: false,
        tags: ["Accessibility", "HTML", "JavaScript"]
    },

{
    id: "javascript-variables",
    title: "Understanding Variables in JavaScript",
    slug: "javascript-variables",
    type: "tutorial",
    description: "A beginner-friendly video tutorial explaining what variables are in JavaScript, how to declare them with let, const, and var, and when to use each one.",
    excerpt: "What variables are, how to declare them, and when to use let, const, or var.",
    publishedAt: "2026-07-17",
    updatedAt: null,
    author: "Nnamdi",
    thumbnail: "/assets/images/posts/javascript-variables.webp",
    thumbnailAlt: "Thumbnail for the Understanding Variables in JavaScript tutorial",
    url: "/posts/javascript-variables/",
    youtubeId: "tWrxq7yiwxA",
    duration: "03:56",
    readingTime: null,
    featured: false,
    tags: ["JavaScript", "Beginners"]
}

];

// The site root, worked out from this file's URL (<root>/assets/js/posts.js),
// so post links and thumbnails work on Netlify and on GitHub Pages.
const SITE_ROOT = new URL("../../", import.meta.url);

/**
 * Turns a root-relative path from the data above, such as "/posts/my-post/",
 * into a full URL inside the site root.
 */
export function resolveSitePath(path) {
    return path.startsWith("/") ? new URL(path.slice(1), SITE_ROOT).href : path;
}

export function getSortedPosts() {
    return [...posts].sort(
        (firstPost, secondPost) => new Date(secondPost.publishedAt) - new Date(firstPost.publishedAt)
    );
}

export function getPostById(id) {
    return posts.find((post) => post.id === id) ?? null;
}
