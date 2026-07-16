"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("[data-form-status]");

    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            status.textContent = "Please review the highlighted fields before submitting.";
            form.reportValidity();
            form.querySelector(":invalid")?.focus();
            return;
        }

        status.textContent = "Your message is ready to send.";
    });
});
