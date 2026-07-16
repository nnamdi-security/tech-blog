export const posts = [
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
        thumbnail: "/assets/images/posts/javascript-array-methods.svg",
        thumbnailAlt: "Illustration of JavaScript array values flowing through transformation steps",
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
        thumbnail: "/assets/images/posts/technology-podcast.svg",
        thumbnailAlt: "Two microphones facing each other during a technology podcast",
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
        thumbnail: "/assets/images/posts/accessible-navigation.svg",
        thumbnailAlt: "Website navigation links with a visible keyboard focus indicator",
        url: "/posts/building-accessible-navigation/",
        youtubeId: null,
        duration: null,
        readingTime: "8 min read",
        featured: false,
        tags: ["Accessibility", "HTML", "JavaScript"]
    }
];

export function getSortedPosts() {
    return [...posts].sort(
        (firstPost, secondPost) => new Date(secondPost.publishedAt) - new Date(firstPost.publishedAt)
    );
}

export function getPostById(id) {
    return posts.find((post) => post.id === id) ?? null;
}
