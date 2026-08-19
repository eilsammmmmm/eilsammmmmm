/* ===== FOOTER YEAR ===== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ===== MOBILE MENU ===== */

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* ===== ACTIVE NAVIGATION ===== */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav__links a[data-nav]");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navItems.forEach(item => {
          const match = item.getAttribute("href") === `#${id}`;
          item.classList.toggle("is-active", match);
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* ===== LIGHT / DARK MODE ===== */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-toggle__icon");

const savedTheme = localStorage.getItem("theme");

const systemPrefersLight = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

if (
  savedTheme === "light" ||
  (!savedTheme && systemPrefersLight)
) {
  document.documentElement.classList.add("light");

  if (themeIcon) {
    themeIcon.textContent = "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark mode"
    );
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight =
      document.documentElement.classList.toggle("light");

    if (isLight) {
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "☾";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );
    } else {
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "☀";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );
    }
  });
}


/* ===== COPY EMAIL ===== */

const copyBtn = document.getElementById("copyBtn");
const emailLink = document.getElementById("emailLink");

if (copyBtn && emailLink) {
  copyBtn.addEventListener("click", async event => {
    event.preventDefault();

    const email = "eymielmain@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied!";
    } catch (error) {
      copyBtn.textContent = "Copy failed";
    }

    setTimeout(() => {
      copyBtn.textContent =
        copyBtn.dataset.default || "Copy";
    }, 1800);
  });
}


/* ===== REDUCED MOTION ===== */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ===== GLITCH FUNCTION ===== */

function triggerGlitch(element) {
  if (prefersReducedMotion || !element) {
    return;
  }

  element.classList.remove("is-glitching");

  void element.offsetWidth;

  element.classList.add("is-glitching");

  setTimeout(() => {
    element.classList.remove("is-glitching");
  }, 400);
}


/* ===== SECTION HEADING GLITCH ===== */

const glitchElements = document.querySelectorAll(".glitch");

function glitchHeading(sectionId) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return;
  }

  const heading = section.querySelector(".glitch");

  if (heading) {
    triggerGlitch(heading);
  }
}


/* ===== SKILLS GLITCH ===== */

function glitchSkills() {
  if (prefersReducedMotion) {
    return;
  }

  const skillsSection = document.getElementById("skills");

  if (!skillsSection) {
    return;
  }

  const heading = skillsSection.querySelector(".glitch");
  const skillTags = skillsSection.querySelectorAll(".tag");

  /* Glitch the Skills heading immediately */

  if (heading) {
    triggerGlitch(heading);
  }

  /* Glitch every skill one after another */

  skillTags.forEach((tag, index) => {
    setTimeout(() => {

      tag.classList.remove("is-glitching");

      void tag.offsetWidth;

      tag.classList.add("is-glitching");

      setTimeout(() => {
        tag.classList.remove("is-glitching");
      }, 350);

    }, 150 + index * 60);
  });
}


/* ===== NAVIGATION CLICK GLITCH ===== */

navItems.forEach(link => {

  link.addEventListener("click", event => {

    const targetId =
      link.getAttribute("href").replace("#", "");

    /*
      If the user clicks Skills,
      glitch the Skills section immediately.
    */

    if (targetId === "skills") {

      setTimeout(() => {
        glitchSkills();
      }, 250);

    } else {

      /*
        Other sections only glitch their heading.
      */

      setTimeout(() => {
        glitchHeading(targetId);
      }, 250);

    }

  });

});


/* ===== GLITCH WHEN SCROLLING TO SECTIONS ===== */

if (!prefersReducedMotion && glitchElements.length) {

  const glitchObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          /*
            Don't automatically glitch Skills here
            because navigation already handles it.
          */

          if (entry.target.closest("#skills")) {
            return;
          }

          triggerGlitch(entry.target);

        }

      });

    },
    {
      threshold: 0.5
    }
  );

  glitchElements.forEach(element => {
    glitchObserver.observe(element);
  });
}


/* ===== SKILL TAG INTERACTION ===== */

document.querySelectorAll(".tag").forEach(tag => {

  tag.setAttribute("tabindex", "0");
  tag.setAttribute("role", "button");

  const toggleTag = () => {

    tag.classList.remove("is-glitching");

    void tag.offsetWidth;

    tag.classList.add("is-glitching");

    tag.classList.toggle("is-active");

    setTimeout(() => {
      tag.classList.remove("is-glitching");
    }, 350);

  };

  tag.addEventListener("click", toggleTag);

  tag.addEventListener("keydown", event => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      toggleTag();

    }

  });

});


/* ===== NAV HOVER SCRAMBLE ===== */

const scrambleCharacters =
  "!<>-_\\/[]{}—=+*^?#";

function scrambleText(element) {

  if (prefersReducedMotion) {
    return;
  }

  const original = element.textContent;
  const length = original.length;

  let frame = 0;
  const totalFrames = 8;

  if (element._scrambleInterval) {
    clearInterval(element._scrambleInterval);
  }

  element._scrambleInterval = setInterval(() => {

    let output = "";

    for (let i = 0; i < length; i++) {

      if (
        i <
        (frame / totalFrames) * length
      ) {

        output += original[i];

      } else {

        output +=
          scrambleCharacters[
            Math.floor(
              Math.random() *
              scrambleCharacters.length
            )
          ];

      }

    }

    element.textContent = output;

    frame++;

    if (frame > totalFrames) {

      clearInterval(
        element._scrambleInterval
      );

      element.textContent = original;

    }

  }, 35);
}


/* Only navbar links get the character scramble */

document
  .querySelectorAll(".nav__links a[data-nav]")
  .forEach(link => {

    link.addEventListener(
      "mouseenter",
      () => {
        scrambleText(link);
      }
    );

  });