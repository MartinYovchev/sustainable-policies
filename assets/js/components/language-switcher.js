/**
 * Language Switcher Component
 * Handles language switching functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("langToggle");

  // Get translations from external file
  // Check if translations object exists in global scope
  if (typeof translations === "undefined") {
    console.error(
      "Translations not found. Make sure translations.js is loaded properly."
    );
    return;
  }

  console.log("Translations loaded successfully", translations);

  // Current language state
  let currentLang = "bg"; // Default language is Bulgarian

  // Toggle language
  function toggleLanguage() {
    currentLang = currentLang === "bg" ? "en" : "bg";
    langToggle.textContent = currentLang.toUpperCase();

    // Update all translatable elements
    updatePageLanguage();
  }

  // Update page content based on current language
  function updatePageLanguage() {
    const t = translations[currentLang];
    if (!t) {
      console.error(`Translations for language ${currentLang} not found.`);
      return;
    }

    // Update elements by known selectors
    // Menu items
    document.querySelectorAll("#menu ul li a").forEach((el, index) => {
      switch (index) {
        case 0:
          el.textContent = t.home;
          break;
        case 1:
          el.textContent = t.about;
          break;
        case 2:
          el.textContent = t.activities;
          break;
        case 3:
          el.textContent = t.goals;
          break;
        case 4:
          el.textContent = t.contact;
          break;
      }
    });

    // Menu toggle
    const menuToggle = document.querySelector(".menuToggle span");
    if (menuToggle) menuToggle.textContent = t.menu;

    // Header and banner
    const headerLink = document.querySelector("h1 a");
    if (headerLink) headerLink.textContent = t.title;

    const bannerTitle = document.querySelector("#banner h2");
    if (bannerTitle) bannerTitle.textContent = t.title;

    const bannerSubtitle = document.querySelector("#banner p");
    if (bannerSubtitle) {
      bannerSubtitle.innerHTML = t.subtitle.replace(/\n/g, "<br />");
    }

    // Buttons
    const contactButtons = document.querySelectorAll(
      "#contactButton, #contactButton2"
    );
    contactButtons.forEach((button) => {
      button.textContent = t.contactUs;
    });

    // About section
    const aboutTitle = document.querySelector("#about .major h2");
    if (aboutTitle) aboutTitle.textContent = t["about.title"];

    // New About text paragraphs
    const aboutDescription = document.querySelector(
      ".about-text p[data-i18n='about.description']"
    );
    if (aboutDescription) aboutDescription.textContent = t["about.description"];

    const aboutValues = document.querySelector(
      ".about-text p[data-i18n='about.values']"
    );
    if (aboutValues) aboutValues.textContent = t["about.values"];

    // Activities section
    const goalsTitle = document.querySelector(
      "#activities .spotlight:nth-child(1) h2"
    );
    if (goalsTitle) goalsTitle.textContent = t.ourGoals;

    const goalsText = document.querySelector(
      "#activities .spotlight:nth-child(1) p"
    );
    if (goalsText) goalsText.textContent = t.ourGoalsText;

    const activitiesTitle = document.querySelector(
      "#activities .spotlight:nth-child(2) h2"
    );
    if (activitiesTitle) activitiesTitle.textContent = t.ourActivities;

    const activitiesText = document.querySelector(
      "#activities .spotlight:nth-child(2) p"
    );
    if (activitiesText) activitiesText.textContent = t.ourActivitiesText;

    const teamTitle = document.querySelector(
      "#activities .spotlight:nth-child(3) h2"
    );
    if (teamTitle) teamTitle.textContent = t.ourTeam;

    const teamText = document.querySelector(
      "#activities .spotlight:nth-child(3) p"
    );
    if (teamText) teamText.textContent = t.ourTeamText;

    const teamItems = document.querySelectorAll(
      "#activities .spotlight:nth-child(3) li"
    );
    if (teamItems.length >= 3) {
      teamItems[0].textContent = t.servicesAnalysis;
      teamItems[1].textContent = t.servicesConsulting;
      teamItems[2].textContent = t.servicesTraining;
    }

    // Goals section
    const goalsMainTitle = document.querySelector("#goals .major h2");
    if (goalsMainTitle) goalsMainTitle.textContent = t.mainGoals;

    const goalsFocus = document.querySelector("#goals .major p");
    if (goalsFocus) goalsFocus.textContent = t.focus;

    // Goals carousel items - First slide
    const valuesTitle = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(1) li h3"
    );
    if (valuesTitle) valuesTitle.textContent = t.values;

    const valuesText = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(1) li p"
    );
    if (valuesText) valuesText.textContent = t.valuesText;

    const cooperationTitle = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(2) li h3"
    );
    if (cooperationTitle) cooperationTitle.textContent = t.cooperation;

    const cooperationText = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(2) li p"
    );
    if (cooperationText) cooperationText.textContent = t.cooperationText;

    const innovationTitle = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(3) li h3"
    );
    if (innovationTitle) innovationTitle.textContent = t.innovation;

    const innovationText = document.querySelector(
      "#goals .goals-group:nth-child(1) ul:nth-child(3) li p"
    );
    if (innovationText) innovationText.textContent = t.innovationText;

    // Goals carousel items - Second slide
    const educationTitle = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(1) li h3"
    );
    if (educationTitle) educationTitle.textContent = t.education;

    const educationText = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(1) li p"
    );
    if (educationText) educationText.textContent = t.educationText;

    const entrepreneurshipTitle = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(2) li h3"
    );
    if (entrepreneurshipTitle)
      entrepreneurshipTitle.textContent = t.entrepreneurship;

    const entrepreneurshipText = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(2) li p"
    );
    if (entrepreneurshipText)
      entrepreneurshipText.textContent = t.entrepreneurshipText;

    const sustainabilityTitle = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(3) li h3"
    );
    if (sustainabilityTitle) sustainabilityTitle.textContent = t.sustainability;

    const sustainabilityText = document.querySelector(
      "#goals .goals-group:nth-child(2) ul:nth-child(3) li p"
    );
    if (sustainabilityText)
      sustainabilityText.textContent = t.sustainabilityText;

    // Goals carousel items - Third slide
    const environmentTitle = document.querySelector(
      "#goals .goals-group:nth-child(3) ul:nth-child(1) li h3"
    );
    if (environmentTitle) environmentTitle.textContent = t.environment;

    const environmentText = document.querySelector(
      "#goals .goals-group:nth-child(3) ul:nth-child(1) li p"
    );
    if (environmentText) environmentText.textContent = t.environmentText;

    const crossBorderTitle = document.querySelector(
      "#goals .goals-group:nth-child(3) ul:nth-child(2) li h3"
    );
    if (crossBorderTitle)
      crossBorderTitle.textContent = t.crossBorderCooperation;

    const crossBorderText = document.querySelector(
      "#goals .goals-group:nth-child(3) ul:nth-child(2) li p"
    );
    if (crossBorderText)
      crossBorderText.textContent = t.crossBorderCooperationText;

    // Contact section
    const contactTitle = document.querySelector("#contact header h2");
    if (contactTitle) contactTitle.textContent = t.contactUs;

    // Contact overlay
    const contactOverlayTitle = document.getElementById("contactOverlayTitle");
    if (contactOverlayTitle)
      contactOverlayTitle.textContent = t.contactOverlayTitle;

    // Update page title
    document.title = t.title;
  }

  // Add click event to language toggle button
  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
  }

  // Initialize i18n attributes if not already present
  function initializeI18nAttributes() {
    // Map of elements to assign data-i18n attributes to
    const elementSelectors = {
      'nav a[href="javascript:void(0)"][data-section="home"]': "menu.home",
      'nav a[href="javascript:void(0)"][data-section="about"]': "menu.about",
      'nav a[href="javascript:void(0)"][data-section="activities"]':
        "menu.activities",
      'nav a[href="javascript:void(0)"][data-section="goals"]': "menu.goals",
      'nav a[href="javascript:void(0)"][data-section="contact"]':
        "menu.contact",
      "#contactOverlayTitle": "contact.title",
      "#banner h2": "banner.title",
      "#banner p": "banner.subtitle",
      "#contactButton": "contact.button",
      "#contactButton2": "contact.button",
    };

    // Assign data-i18n attributes
    for (const selector in elementSelectors) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!el.hasAttribute("data-i18n")) {
          el.setAttribute("data-i18n", elementSelectors[selector]);
        }
      });
    }
  }

  // Initialize i18n attributes on page load
  initializeI18nAttributes();
});
