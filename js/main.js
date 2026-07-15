// ==========================================
// AP UNIVERSE ENGINE v2
// ==========================================

// Tutti gli elementi dell'universo che reagiscono al mouse
const universeLinks = document.querySelectorAll(".universe-link");

// Posizione iniziale del mouse
let mouseX = 0;
let mouseY = 0;

// Aggiorna la posizione del mouse
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Calcola la distanza tra il mouse e ogni stella
const updateUniverse = () => {
  universeLinks.forEach((link) => {
    const node = link.querySelector(".universe-node");

    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();

    const nodeX = rect.left + rect.width / 2;
    const nodeY = rect.top + rect.height / 2;

    const dx = mouseX - nodeX;
    const dy = mouseY - nodeY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = 180;

    const intensity = Math.max(0, 1 - distance / radius);

    link.style.setProperty("--energy", intensity);
  });
};

// Loop continuo dell'universo
const animateUniverse = () => {
  updateUniverse();

  requestAnimationFrame(animateUniverse);
};

animateUniverse();

// ==========================================
// UNIVERSE COMPASS ENGINE
// ==========================================

const polaris = document.querySelector(".polaris");
const navWrapper = document.querySelector(".nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");

// Il primo link è attivo al caricamento
let activeLink = navLinks[0] || null;

// Sposta Polaris sotto il link ricevuto
const movePolaris = (link) => {
  if (!link || !polaris || !navWrapper) {
    return;
  }

  const wrapperRect = navWrapper.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const centerX = linkRect.left - wrapperRect.left + linkRect.width / 2;

  polaris.style.left = `${centerX}px`;
  polaris.style.opacity = "1";
};

// Imposta il link attivo
const setActiveLink = (link) => {
  if (!link) {
    return;
  }

  activeLink = link;

  navLinks.forEach((navLink) => {
    navLink.classList.toggle("active", navLink === activeLink);
  });

  movePolaris(activeLink);
};

// Polaris segue il mouse quando passa sui link
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    movePolaris(link);
  });

  link.addEventListener("click", () => {
    setActiveLink(link);
  });
});

// Quando il mouse esce dalla navbar,
// Polaris torna alla sezione attiva
if (navWrapper) {
  navWrapper.addEventListener("mouseleave", () => {
    movePolaris(activeLink);
  });
}

// ==========================================
// ACTIVE NAVIGATION ON SCROLL
// ==========================================

// Recupera soltanto le sezioni presenti nella navbar
const observedSections = [];

navLinks.forEach((link) => {
  const sectionSelector = link.getAttribute("href");

  if (!sectionSelector || !sectionSelector.startsWith("#")) {
    return;
  }

  const section = document.querySelector(sectionSelector);

  if (section) {
    observedSections.push(section);
  }
});

// Osserva quale sezione attraversa il centro dello schermo
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const matchingLink = [...navLinks].find(
        (link) => link.getAttribute("href") === `#${entry.target.id}`,
      );

      if (matchingLink) {
        setActiveLink(matchingLink);
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0,
  },
);

// Attiva l'osservazione
observedSections.forEach((section) => {
  sectionObserver.observe(section);
});

// ==========================================
// EVOLUTION TIMELINE OBSERVER
// ==========================================

const timelineItems = document.querySelectorAll(".timeline__item");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      // L'animazione viene eseguita una sola volta
      timelineObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.3,
  },
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// ==========================================
// INITIAL POSITION AND RESIZE
// ==========================================

// Posiziona Polaris al caricamento completo della pagina
window.addEventListener("load", () => {
  setActiveLink(activeLink);
});

// Ricalcola la posizione se cambia la larghezza della finestra
window.addEventListener("resize", () => {
  movePolaris(activeLink);
});
// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNavLinks = document.querySelectorAll(".nav-link");

if (navbar && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("menu-open");

      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}