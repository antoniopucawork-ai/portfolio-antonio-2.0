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

// Sposta Polaris
function movePolaris(link) {
  const wrapperRect = navWrapper.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();

  const centerX = linkRect.left - wrapperRect.left + linkRect.width / 2;
  console.log(centerX);
  polaris.style.left = `${centerX}px`;
  polaris.style.opacity = "1";
}

// Appena il sito è pronto
window.addEventListener("load", () => {
  movePolaris(navLinks[0]);
});

// Hover sui link
navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    movePolaris(link);
  });
});

// Quando esci dalla navbar
navWrapper.addEventListener("mouseleave", () => {
  movePolaris(navLinks[0]);
});