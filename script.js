function go(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function spark(x, y, n = 5) {
    const symbols = ["✦", "✧", "·", "♡"];

    for (let i = 0; i < n; i++) {
        const e = document.createElement("span");
        e.className = "spark";
        e.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        e.style.left = x + "px";
        e.style.top = y + "px";
        e.style.setProperty("--x", (Math.random() - 0.5) * 140 + "px");
        e.style.setProperty("--y", (Math.random() - 0.5) * 140 + "px");

        document.body.appendChild(e);
        setTimeout(() => e.remove(), 1800);
    }
}

function hearts(n) {
    const symbols = ["♡", "♥", "💛", "✦", "✨"];

    for (let i = 0; i < n; i++) {
        const e = document.createElement("span");
        e.className = "heart";
        e.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        e.style.left = Math.random() * 100 + "vw";
        e.style.top = (55 + Math.random() * 35) + "vh";
        e.style.fontSize = 12 + Math.random() * 24 + "px";

        document.body.appendChild(e);
        setTimeout(() => e.remove(), 3000);
    }
}

/* -------------------------------
   MOBILE-FRIENDLY VIDEO FULLSCREEN
-------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("birthdayVideo");
    const videoWrap = document.getElementById("videoWrap");
    const fullscreenBtn = document.getElementById("fullscreenBtn");

    if (!video || !videoWrap || !fullscreenBtn) return;

    fullscreenBtn.addEventListener("click", function () {
        // iPhone/iPad Safari has its own video fullscreen method.
        if (typeof video.webkitEnterFullscreen === "function") {
            try {
                video.webkitEnterFullscreen();
                return;
            } catch (error) {
                // Fall through to the normal fullscreen method.
            }
        }

        if (document.fullscreenElement || document.webkitFullscreenElement) {
            exitVideoFullscreen();
            return;
        }

        if (videoWrap.requestFullscreen) {
            videoWrap.requestFullscreen().catch(() => {});
        } else if (videoWrap.webkitRequestFullscreen) {
            videoWrap.webkitRequestFullscreen();
        } else if (video.requestFullscreen) {
            video.requestFullscreen().catch(() => {});
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    });

    function exitVideoFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    function updateFullscreenButton() {
        const isFullscreen =
            document.fullscreenElement === videoWrap ||
            document.webkitFullscreenElement === videoWrap;

        fullscreenBtn.querySelector("span").textContent =
            isFullscreen ? "Exit Fullscreen" : "Fullscreen";
        fullscreenBtn.setAttribute(
            "aria-label",
            isFullscreen ? "Exit fullscreen" : "Play video fullscreen"
        );
    }

    document.addEventListener("fullscreenchange", updateFullscreenButton);
    document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

    // Keep the video mobile-friendly after orientation changes.
    window.addEventListener("orientationchange", function () {
        setTimeout(() => video.style.maxHeight = "75vh", 300);
    });
});

/* Decorative sparkles when tapping/clicking the page.
   Buttons and the video are excluded so controls remain easy to use. */
document.addEventListener("click", function (e) {
    if (!e.target.closest("button, video")) {
        spark(e.clientX, e.clientY);
    }
});
