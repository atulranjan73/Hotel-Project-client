document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.getElementById("whatsapp-button");
    let isDragging = false;
    let offsetX, offsetY;

    // Prevent image from blocking clicks
    document.getElementById("whatsapp-logo").addEventListener("dragstart", (event) => event.preventDefault());

    // When mouse or touch starts, initialize drag
    function startDrag(event) {
        isDragging = true;
        whatsappButton.style.cursor = "grabbing"; // Change cursor to indicate dragging

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        offsetX = clientX - whatsappButton.getBoundingClientRect().left;
        offsetY = clientY - whatsappButton.getBoundingClientRect().top;

        // Add event listeners to handle dragging and stopping the drag
        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    // Move the element while dragging
    function drag(event) {
        if (!isDragging) return;

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        whatsappButton.style.left = `${clientX - offsetX}px`;
        whatsappButton.style.top = `${clientY - offsetY}px`;
    }

    // When drag ends, reset cursor and stop dragging
    function stopDrag() {
        isDragging = false;
        whatsappButton.style.cursor = "grab"; // Change cursor back to grab

        // Remove event listeners to stop dragging after release
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
    }

    // Add event listeners for mouse and touch events
    whatsappButton.addEventListener("mousedown", startDrag);
    whatsappButton.addEventListener("touchstart", startDrag);


    function hideWhatsapp() {
        const whatsappButton = document.getElementById("whatsapp-button");
        if (whatsappButton) {
            whatsappButton.style.display = "none"; // Hides the button
        }
    }
});