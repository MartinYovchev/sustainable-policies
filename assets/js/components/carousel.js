/**
 * Carousel Component
 * A reusable carousel/slider implementation
 */
class Carousel {
  constructor(config) {
    // Find required elements
    this.container = document.querySelector(config.containerSelector);

    // Validate container exists
    if (!this.container) {
      console.error("Carousel container not found:", config.containerSelector);
      return;
    }

    this.content = this.container.querySelector(config.contentSelector);
    if (!this.content) {
      console.error("Carousel content not found:", config.contentSelector);
      return;
    }

    this.dots = document.querySelectorAll(config.dotsSelector);
    this.groups = this.container.querySelectorAll(config.groupsSelector);

    // Validate we have slides
    if (this.groups.length === 0) {
      console.error(
        "No carousel slides found with selector:",
        config.groupsSelector
      );
      return;
    }

    // Set initial state
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.autoSlideDelay = config.autoSlideDelay || 7000;
    this.addNavButtons = config.addNavButtons || false;
    this.isPaused = false;
    this.equalizeHeights = config.equalizeHeights !== false;

    // Initialize
    this.init();
  }

  init() {
    // Add event listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
        this.restartAutoSlide();
      });
    });

    // Add navigation buttons if needed
    if (this.addNavButtons) {
      this.createNavButtons();
    }

    // Handle resize events
    window.addEventListener("resize", () => {
      this.updateCarousel();
      if (this.equalizeHeights) {
        this.equalizeItemHeights();
      }
    });

    // Initial update
    this.updateCarousel();

    // Equalize heights of items in each group
    if (this.equalizeHeights) {
      // Slight delay to ensure DOM is fully rendered
      setTimeout(() => this.equalizeItemHeights(), 100);
    }

    // Start auto slide
    this.startAutoSlide();

    // Add touch/swipe support
    this.enableTouchSwipe();

    // Add hover pause functionality
    this.enableHoverPause();
  }

  updateCarousel() {
    // Prevent errors if content is not available
    if (!this.content) return;

    // Update transform based on current index
    this.content.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Update active dot
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  equalizeItemHeights() {
    // Don't run on mobile
    if (window.innerWidth <= 768) {
      // Reset all heights to auto first
      this.container.querySelectorAll("li").forEach((item) => {
        item.style.height = "auto";
      });
      return;
    }

    // Process each group
    this.groups.forEach((group) => {
      const items = group.querySelectorAll("li");

      // Reset heights first
      items.forEach((item) => {
        item.style.height = "auto";
      });

      // Get the max height
      let maxHeight = 0;
      items.forEach((item) => {
        const height = item.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
      });

      // Set all items to max height if it's greater than zero
      if (maxHeight > 0) {
        items.forEach((item) => {
          item.style.height = `${maxHeight}px`;
        });
      }
    });
  }

  goToSlide(index) {
    // Validate index is within bounds
    if (index < 0 || index >= this.groups.length) {
      console.warn("Slide index out of bounds:", index);
      return;
    }

    this.currentIndex = index;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.groups.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.groups.length) % this.groups.length;
    this.updateCarousel();
  }

  startAutoSlide() {
    this.clearAutoSlide();
    if (!this.isPaused) {
      this.autoSlideInterval = setInterval(
        () => this.nextSlide(),
        this.autoSlideDelay
      );
    }
  }

  restartAutoSlide() {
    this.clearAutoSlide();
    this.startAutoSlide();
  }

  clearAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  pauseAutoSlide() {
    this.isPaused = true;
    this.clearAutoSlide();
  }

  resumeAutoSlide() {
    this.isPaused = false;
    this.startAutoSlide();
  }

  createNavButtons() {
    // Create navigation container
    const navContainer = document.createElement("div");
    navContainer.className = "carousel-nav";

    // Create prev button
    const prevButton = document.createElement("button");
    prevButton.className = "carousel-button prev-button";
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.setAttribute("aria-label", "Previous slide");
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.prevSlide();
      this.restartAutoSlide();
    });

    // Create next button
    const nextButton = document.createElement("button");
    nextButton.className = "carousel-button next-button";
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.setAttribute("aria-label", "Next slide");
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.nextSlide();
      this.restartAutoSlide();
    });

    // Add buttons to container
    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);

    // Add navigation to carousel container
    this.container.appendChild(navContainer);
  }

  enableTouchSwipe() {
    if (!this.content) return;

    let touchStartX = 0;
    let touchEndX = 0;

    this.content.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        this.pauseAutoSlide();
      },
      { passive: true }
    );

    this.content.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
        this.resumeAutoSlide();
      },
      { passive: true }
    );
  }

  handleSwipe(startX, endX) {
    const minSwipeDistance = 50;
    const swipeDistance = startX - endX;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left, go to next slide
        this.nextSlide();
      } else {
        // Swiped right, go to previous slide
        this.prevSlide();
      }
    }
  }

  enableHoverPause() {
    if (!this.container) return;

    // Pause on hover
    this.container.addEventListener("mouseenter", () => {
      this.pauseAutoSlide();
    });

    // Resume on mouse leave
    this.container.addEventListener("mouseleave", () => {
      this.resumeAutoSlide();
    });
  }
}

// Initialize carousel on DOM load
document.addEventListener("DOMContentLoaded", function () {
  // Goals carousel initialization
  if (document.querySelector(".goals-carousel")) {
    try {
      const goalsCarousel = new Carousel({
        containerSelector: ".carousel-container",
        contentSelector: ".carousel-content",
        dotsSelector: ".carousel-dots .dot",
        groupsSelector: ".goals-group",
        autoSlideDelay: 7000,
        addNavButtons: false,
        equalizeHeights: true,
      });
    } catch (error) {
      console.error("Error initializing carousel:", error);
    }
  }
});
