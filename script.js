/**
 * Frustm Studio - Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');

    if (navToggle && navMobile) {
        navToggle.addEventListener('click', function () {
            navMobile.classList.toggle('is-open');
            const icon = navToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = navMobile.classList.contains('is-open') ? 'close' : 'menu';
            }
        });

        // Close mobile menu when clicking a link or contact button
        navMobile.querySelectorAll('.nav-link, .btn-contact').forEach(function (link) {
            link.addEventListener('click', function () {
                navMobile.classList.remove('is-open');
                const icon = navToggle.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.textContent = 'menu';
                }
            });
        });
    }

    // Dynamic year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Contact form - Web3Forms
    const form = document.getElementById('form');
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            formData.set("access_key", "5f21e212-028e-413d-8911-1d408cb4fd22");

            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + (data.message || "Something went wrong."));
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
