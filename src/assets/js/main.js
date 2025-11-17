document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Scroll reveal -------------------------------------------------------
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if ("IntersectionObserver" in window && revealElements.length) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            el.classList.add("is-visible");
            obs.unobserve(el);
          });
        },
        {
          threshold: 0.15
        }
      );

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback: just show everything
      revealElements.forEach(el => el.classList.add("is-visible"));
    }
  } else {
    // If reduced motion, ensure everything is visible
    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach(el => el.classList.add("is-visible"));
  }

  // --- Navbar style on scroll ----------------------------------------------
  const nav = document.querySelector(".navbar");

  if (nav) {
    const updateNavbar = () => {
      if (window.scrollY > 10) {
        nav.classList.add("navbar--scrolled");
      } else {
        nav.classList.remove("navbar--scrolled");
      }
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
  }
});
