document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.getElementById("whatsapp-button");
    const whatsappLink = document.getElementById("whatsapp-link");
    let isDragging = false;
    let offsetX, offsetY;

    // Prevent image blocking clicks
    document.getElementById("whatsapp-logo").addEventListener("dragstart", (event) => event.preventDefault());

    // Start dragging
    function startDrag(event) {
        event.preventDefault(); // Prevent touch from scrolling the page
        isDragging = true;
        whatsappButton.style.cursor = "grabbing";

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        offsetX = clientX - whatsappButton.getBoundingClientRect().left;
        offsetY = clientY - whatsappButton.getBoundingClientRect().top;

        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag, { passive: false });
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchend", stopDrag);
    }

    // Dragging movement
    function drag(event) {
        if (!isDragging) return;

        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;

        whatsappButton.style.left = `${clientX - offsetX}px`;
        whatsappButton.style.top = `${clientY - offsetY}px`;
    }

    // Stop dragging
    function stopDrag() {
        isDragging = false;
        whatsappButton.style.cursor = "grab";
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchend", stopDrag);
    }

    // Fix: Prevent click inside the icon from being treated as drag
    whatsappButton.addEventListener("mousedown", (event) => {
        if (event.target !== whatsappLink) startDrag(event);
    });

    whatsappButton.addEventListener("touchstart", (event) => {
        if (event.target !== whatsappLink) startDrag(event);
    });

    // Hide WhatsApp button
    window.hideWhatsapp = function () {
        whatsappButton.style.display = "none";
    };
});