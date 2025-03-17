document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".whatsapp-logo").forEach(logo => {
        // Prevent dragging
        logo.addEventListener("dragstart", (event) => event.preventDefault());

        // Open WhatsApp on click or tap
        logo.addEventListener("pointerdown", function () {
            window.location.href = "https://wa.me/7324086918"; // Replace with your number
        });
    });
});
