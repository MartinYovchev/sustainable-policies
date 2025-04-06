/**
 * Custom JS
 * Handles loading of component scripts and any custom functionality
 */

// The scripts are loaded in the HTML via separate script tags
// This file is for any global custom code that isn't in a component

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for internal links
  document
    .querySelectorAll('a[href^="javascript:void(0)"][data-section]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const section = this.getAttribute("data-section");
        const target = document.getElementById(section);

        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

  // Add any other global functionality here
});
