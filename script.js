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


/* ===== SKILLS STAGGERED PILL REVEAL =====
   Assign each pill in #skills an --i index (in document order across
   all groups), then reveal them with a cascading delay the first
   time the Skills section scrolls into view. */

const skillsSection = document.getElementById("skills");

if (skillsSection) {
  const staggerTags = skillsSection.querySelectorAll(".tag--stagger");

  staggerTags.forEach((tag, index) => {
    tag.style.setProperty("--i", index);
  });

  if (prefersReducedMotion) {
    skillsSection.classList.add("is-visible");
  } else {
    const skillsRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillsSection.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillsRevealObserver.observe(skillsSection);
  }
}


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


/* ===== CURSOR-REACTIVE HERO GLITCH =====
   The hero name's RGB-split layers separate more the closer the
   mouse gets to it, and lean in the direction of the cursor. */

const heroName = document.querySelector(".hero__name");

if (heroName && !prefersReducedMotion) {
  const PROXIMITY_RADIUS = 260; // px — how far the effect reaches

  window.addEventListener("mousemove", event => {
    const rect = heroName.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;

    const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS);

    heroName.style.setProperty("--gi", proximity.toFixed(2));
    heroName.style.setProperty("--gx", `${(dx / distance) * proximity * 6}px`);
  });
}


/* ===== AMBIENT SIGNAL DRIFT =====
   Every so often, a random heading or skill tag currently on screen
   glitches on its own — makes the page feel alive rather than only
   reactive to clicks/scrolling. */

function scheduleAmbientGlitch() {
  if (prefersReducedMotion) {
    return;
  }

  const delay = 4000 + Math.random() * 6000; // every 4-10s

  setTimeout(() => {
    const candidates = Array.from(
      document.querySelectorAll(".glitch, .tag")
    ).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    if (candidates.length) {
      const target =
        candidates[Math.floor(Math.random() * candidates.length)];
      triggerGlitch(target);
    }

    scheduleAmbientGlitch();
  }, delay);
}

scheduleAmbientGlitch();


/* ===== SYSTEM GLITCH EASTER EGG (click logo) =====
   Clicking the nav logo triggers a full-screen static/chromatic-
   aberration flash with a random glitchy message and a screen shake,
   then scrolls back to the top. */

const systemMessages = [
  "SIGNAL LOST...",
  "RECONNECTING...",
  "AMIEL_SAMORIN.EXE",
  "// rebuilding...",
  "404: BUG NOT FOUND"
];

const glitchOverlay = document.createElement("div");
glitchOverlay.className = "system-glitch-overlay";
document.body.appendChild(glitchOverlay);

const glitchMsgEl = document.createElement("div");
glitchMsgEl.className = "system-glitch-msg";
document.body.appendChild(glitchMsgEl);

function triggerSystemGlitch() {
  if (prefersReducedMotion) {
    return;
  }

  glitchMsgEl.textContent =
    systemMessages[Math.floor(Math.random() * systemMessages.length)];

  glitchOverlay.classList.remove("is-active");
  glitchMsgEl.classList.remove("is-active");
  document.body.classList.remove("is-shaking");

  void glitchOverlay.offsetWidth;

  glitchOverlay.classList.add("is-active");
  glitchMsgEl.classList.add("is-active");
  document.body.classList.add("is-shaking");

  setTimeout(() => {
    glitchOverlay.classList.remove("is-active");
    glitchMsgEl.classList.remove("is-active");
    document.body.classList.remove("is-shaking");
  }, 600);
}

const navLogo = document.getElementById("navLogo");

if (navLogo) {
  navLogo.style.cursor = "pointer";
  navLogo.addEventListener("click", event => {
    event.preventDefault();
    triggerSystemGlitch();
    setTimeout(() => {
      window.location.hash = "#top";
    }, 300);
  });
}
