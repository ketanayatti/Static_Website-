// Fix for products visibility
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close mobile menu when clicking nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnHamburger &&
      navMenu.classList.contains("active")
    ) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function () {
    let current = "";
    const navHeight = document.querySelector(".navbar").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - navHeight - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Navbar background on scroll
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
  });

  // Ensure products section is visible
  const productsSection = document.querySelector(".products");
  const productsGrid = document.querySelector(".products-grid");
  const productCards = document.querySelectorAll(".product-card");

  if (productsSection) {
    productsSection.style.display = "block";
    productsSection.style.visibility = "visible";
    productsSection.style.opacity = "1";
  }

  if (productsGrid) {
    productsGrid.style.display = "grid";
    productsGrid.style.visibility = "visible";
    productsGrid.style.opacity = "1";
  }

  // Ensure all product cards are visible
  productCards.forEach((card, index) => {
    card.style.display = "block";
    card.style.visibility = "visible";
    card.style.opacity = "1";

    // Add staggered animation
    setTimeout(() => {
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Intersection Observer for scroll animations (better for mobile performance)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        // Optionally unobserve after animating for better performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe product cards, features, and stats
  const animatedElements = document.querySelectorAll(
    ".product-card, .feature, .stat",
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Touch-friendly button interactions
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    // Add active state for touch
    button.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });

    button.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = "";
      }, 100);
    });
  });

  // Optimize images loading for mobile
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.src;
    });
  } else {
    // Fallback for older browsers
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }

  // Handle orientation change
  window.addEventListener("orientationchange", function () {
    // Close mobile menu on orientation change
    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Prevent zoom on input focus (iOS)
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        viewportMeta.content =
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      });

      input.addEventListener("blur", function () {
        viewportMeta.content =
          "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";
      });
    });
  }
});
