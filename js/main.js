// ==========================================
// AP UNIVERSE ENGINE v2
// ==========================================

// Tutti i Universe Link
const universeLinks = document.querySelectorAll(".universe-link");

// Posizione del mouse
let mouseX = 0;
let mouseY = 0;

// Aggiorna continuamente la posizione del mouse
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Aggiorna lo stato delle stelle
function updateUniverse() {
  universeLinks.forEach((link) => {
    const node = link.querySelector(".universe-node");

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
}

// Animation Loop
function animate() {
  updateUniverse();

  requestAnimationFrame(animate);
}

animate();
// ==========================================
// UNIVERSE COMPASS ENGINE v1
// ==========================================

const polaris = document.querySelector(".polaris");
const navWrapper = document.querySelector(".nav-wrapper");
const navLinks = document.querySelectorAll(".nav-link");

let activeLink = navLinks[0];

function movePolaris(link) {
  const wrapperRect = navWrapper.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const centerX = linkRect.left - wrapperRect.left + linkRect.width / 2;

  polaris.style.left = `${centerX}px`;
  polaris.style.opacity = "1";
}

window.addEventListener("load", () => {
  movePolaris(activeLink);
});

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    movePolaris(link);
  });

  link.addEventListener("click", () => {
    activeLink = link;
    movePolaris(activeLink);
  });
});

navWrapper.addEventListener("mouseleave", () => {
  movePolaris(activeLink);
});
// ==========================================
// EVOLUTION TIMELINE OBSERVER
// ==========================================

// Prende tutte le tappe della timeline
const timelineItems = document.querySelectorAll(".timeline__item");

// Crea l'osservatore
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Controlla se la card è entrata nel viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // Dopo la prima attivazione non serve più osservarla
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  {
    // La card si attiva quando circa il 30% è visibile
    threshold: 0.3,
  },
);

// Dice all'observer di controllare ogni card
timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});