document.addEventListener("DOMContentLoaded", function () {
    let whatsappButton = document.getElementById("whatsapp-button");
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        isDragging = true;
        let event = e.type.includes("touch") ? e.touches[0] : e;
        offsetX = event.clientX - whatsappButton.getBoundingClientRect().left;
        offsetY = event.clientY - whatsappButton.getBoundingClientRect().top;
        whatsappButton.style.cursor = "grabbing";
        e.preventDefault(); // Prevents text selection while dragging
    }

    function onDrag(e) {
        if (!isDragging) return;
        let event = e.type.includes("touch") ? e.touches[0] : e;
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        whatsappButton.style.position = "fixed"; // Ensure it's fixed
        whatsappButton.style.left = x + "px";
        whatsappButton.style.top = y + "px";
    }

    function stopDrag() {
        isDragging = false;
        whatsappButton.style.cursor = "grab";
    }

    // Mouse events
    whatsappButton.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);

    // Touch events (for mobile)
    whatsappButton.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
});

// Close button functionality
function hideWhatsapp() {
    document.getElementById("whatsapp-button").style.display = "none";
}
