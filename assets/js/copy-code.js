"use strict";

function createCopyButton(codeBlock) {
    const pre = codeBlock.closest("pre");

    if (!pre || pre.parentElement.classList.contains("code-example")) {
        return;
    }

    const wrapper = document.createElement("div");
    const toolbar = document.createElement("div");
    const label = document.createElement("span");
    const button = document.createElement("button");
    const language = codeBlock.dataset.language || "Code";

    wrapper.className = "code-example";
    toolbar.className = "code-example__toolbar";
    label.className = "code-example__language";
    label.textContent = language;
    button.className = "copy-button";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", `Copy ${language} example`);

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.append(toolbar, pre);
    toolbar.append(label, button);

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = "Copied";
            button.setAttribute("aria-live", "polite");
            window.setTimeout(() => {
                button.textContent = "Copy";
            }, 2000);
        } catch (error) {
            console.error("Could not copy code.", error);
            button.textContent = "Select manually";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre code").forEach(createCopyButton);
});
