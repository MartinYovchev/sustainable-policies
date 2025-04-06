/**
 * Contact Overlay Component
 * Handles the display and interaction with the contact information overlay
 */
document.addEventListener("DOMContentLoaded", function () {
  const contactOverlay = document.getElementById("contactOverlay");
  const contactButtons = document.querySelectorAll('[id^="contactButton"]');
  const closeButton = document.querySelector(".contact-close");

  // Show contact overlay
  function showContactOverlay() {
    contactOverlay.style.display = "flex";
    // Trigger reflow to ensure the display change happens before adding the visible class
    contactOverlay.offsetHeight;
    contactOverlay.classList.add("visible");
    document.body.style.overflow = "hidden"; // Prevent scrolling when overlay is visible
  }

  // Hide contact overlay
  function hideContactOverlay() {
    contactOverlay.classList.remove("visible");

    // Wait for transition to complete before changing display property
    setTimeout(() => {
      contactOverlay.style.display = "none";
      document.body.style.overflow = ""; // Re-enable scrolling
    }, 300); // Match transition duration in CSS
  }

  // Add event listeners to all contact buttons
  contactButtons.forEach((button) => {
    button.addEventListener("click", showContactOverlay);
  });

  // Close button event listener
  if (closeButton) {
    closeButton.addEventListener("click", hideContactOverlay);
  }

  // Close overlay when clicking outside content
  contactOverlay.addEventListener("click", function (event) {
    if (event.target === contactOverlay) {
      hideContactOverlay();
    }
  });

  // Close overlay with Escape key
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      contactOverlay.classList.contains("visible")
    ) {
      hideContactOverlay();
    }
  });
});
