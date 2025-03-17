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

        // Set a timeout to determine if it's a drag
        tapTimeout = setTimeout(() => {
            isDragging = true;
            whatsappButton.style.cursor = "grabbing";
        }, 150);

        e.preventDefault(); // Prevent default behavior
    }

    function onDrag(e) {
        if (!isDragging) return;
        let event = e.type.includes("touch") ? e.touches[0] : e;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        whatsappButton.style.left = x + "px";
        whatsappButton.style.top = y + "px";
    }

    function stopDrag(e) {
        clearTimeout(tapTimeout);
        whatsappButton.style.cursor = "grab";
        isDragging = false; // Reset dragging state
    }

    // Handle click event separately
    whatsappLink.addEventListener("click", function (e) {
        if (isDragging) {
            e.preventDefault(); // Prevent link from opening if dragging occurred
        }
        // If not dragging, the link will open naturally via the <a> href
    });

    // Mouse events for dragging
    whatsappButton.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);

    // Touch events for dragging (mobile)
    whatsappButton.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
});

// Hide WhatsApp button
function hideWhatsapp() {
    document.getElementById("whatsapp-button").style.display = "none";
}