document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.getElementById("whatsapp-button");
    const whatsappLink = document.getElementById("whatsapp-link");
    let isDragging = false;
    let startX, startY, offsetX, offsetY;

    // When mouse/touch starts
    function startDrag(event) {
        event.preventDefault();
        
        // Check if the click is on the image (so it can still open WhatsApp)
        if (event.target.tagName === "IMG") return;

        isDragging = true;
        whatsappButton.style.cursor = "grabbing";

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        startX = clientX;
        startY = clientY;
        offsetX = clientX - whatsappButton.getBoundingClientRect().left;
        offsetY = clientY - whatsappButton.getBoundingClientRect().top;

        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    // Move the button while dragging
    function drag(event) {
        if (!isDragging) return;

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        // Prevent dragging out of viewport
        newX = Math.max(0, Math.min(window.innerWidth - whatsappButton.clientWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - whatsappButton.clientHeight, newY));

        whatsappButton.style.left = `${newX}px`;
        whatsappButton.style.top = `${newY}px`;
    }

    // Stop dragging when mouse/touch is released
    function stopDrag(event) {
        isDragging = false;
        whatsappButton.style.cursor = "grab";

        // Remove event listeners to stop further movement
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
    }

    // Add event listeners
    whatsappButton.addEventListener("mousedown", startDrag);
    whatsappButton.addEventListener("touchstart", startDrag);

    // Ensure WhatsApp opens on click
    whatsappLink.addEventListener("click", function (event) {
        if (isDragging) {
            event.preventDefault(); // Prevent opening WhatsApp if the user was dragging
        }
    });
});