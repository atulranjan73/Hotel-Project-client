document.addEventListener("DOMContentLoaded", function () {
    let whatsappButton = document.getElementById("whatsapp-button");
    let whatsappLink = document.getElementById("whatsapp-link");
    let isDragging = false;
    let offsetX, offsetY;
    let tapTimeout;

    function startDrag(e) {
        let event = e.type.includes("touch") ? e.touches[0] : e;
        offsetX = event.clientX - whatsappButton.getBoundingClientRect().left;
        offsetY = event.clientY - whatsappButton.getBoundingClientRect().top;
        isDragging = false;

        tapTimeout = setTimeout(() => {
            isDragging = true;
            whatsappButton.style.cursor = "grabbing";
        }, 150);

        e.preventDefault();
    }

    function onDrag(e) {
        if (!isDragging) return;
        let event = e.type.includes("touch") ? e.touches[0] : e;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;

        // Keep button within viewport bounds
        let maxX = window.innerWidth - whatsappButton.offsetWidth;
        let maxY = window.innerHeight - whatsappButton.offsetHeight;
        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        whatsappButton.style.left = x + "px";
        whatsappButton.style.top = y + "px";
    }

    function stopDrag(e) {
        clearTimeout(tapTimeout);
        whatsappButton.style.cursor = "grab";
        isDragging = false;
    }

    whatsappLink.addEventListener("click", function (e) {
        if (isDragging) {
            e.preventDefault();
        }
    });

    // Mouse events
    whatsappButton.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);

    // Touch events (mobile)
    whatsappButton.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);

    // Adjust position on window resize
    window.addEventListener("resize", function () {
        let maxX = window.innerWidth - whatsappButton.offsetWidth;
        let maxY = window.innerHeight - whatsappButton.offsetHeight;
        let currentX = parseInt(whatsappButton.style.left || "0");
        let currentY = parseInt(whatsappButton.style.top || "0");

        whatsappButton.style.left = Math.min(currentX, maxX) + "px";
        whatsappButton.style.top = Math.min(currentY, maxY) + "px";
    });
});

function hideWhatsapp() {
    document.getElementById("whatsapp-button").style.display = "none";
}