
/* ==================================
   PERSONALIZE YOUR BIRTHDAY WEBSITE
================================== */

const HER_NAME = "My Love"; // Change this to her name

document.title = `Happy Birthday, ${HER_NAME} ♡`;

document.getElementById("herName").textContent = HER_NAME;
document.getElementById("letterName").textContent = HER_NAME;

/* ==================================
   INTRO ANIMATION
================================== */

const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  mainContent.classList.remove("hidden");

  intro.classList.add("exit");

  // Reveal sections and start the ambient effects.
  createParticles();
  createPetals();

  // Enable 3D tilt once the main section is visible.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
      window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
  }

  setTimeout(() => {
    intro.style.display = "none";
  }, 850);
});

/* ==================================
   FLOATING HEARTS
================================== */

function createParticles() {
  const container = document.getElementById("particles");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Avoid creating duplicates if the animation is replayed.
  container.innerHTML = "";

  const heartCount = window.innerWidth < 600 ? 12 : 22;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("span");

    heart.className = "particle";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 17}px`;
    heart.style.animationDuration = `${9 + Math.random() * 12}s`;
    heart.style.animationDelay = `${-Math.random() * 18}s`;

    container.appendChild(heart);
  }
}

/* ==================================
   FALLING ROSE PETALS
================================== */

function createPetals() {
  const container = document.getElementById("petals");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  container.innerHTML = "";

  const petalCount = window.innerWidth < 600 ? 9 : 17;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 12}s`;
    petal.style.animationDelay = `${-Math.random() * 18}s`;
    petal.style.width = `${9 + Math.random() * 8}px`;
    petal.style.height = `${13 + Math.random() * 10}px`;

    container.appendChild(petal);
  }
}

/* ==================================
   BIRTHDAY LETTER BUTTON
================================== */

document.getElementById("letterBtn").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center"
  });

  // A gentle highlight when the letter is opened.
  const letter = document.getElementById("letterCard");

  letter.animate(
    [
      { boxShadow: "0 0 0 rgba(255, 157, 187, 0)" },
      { boxShadow: "0 0 45px rgba(255, 157, 187, 0.2)" },
      { boxShadow: "0 25px 70px rgba(0,0,0,.13)" }
    ],
    {
      duration: 1100,
      easing: "ease-out"
    }
  );
});

/* ==================================
   SURPRISE GIFT
================================== */

const giftBtn = document.getElementById("giftBtn");
const finalMessage = document.getElementById("finalMessage");
const replayBtn = document.getElementById("replayBtn");

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const symbols = ["♥", "♡", "✿", "✧", "❀"];
  const colors = ["#ff9dbb", "#e9c49b", "#fff0e9", "#e96891"];

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");

    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    Object.assign(particle.style, {
      position: "fixed",
      left: `${35 + Math.random() * 30}%`,
      top: `${35 + Math.random() * 25}%`,
      zIndex: "100",
      pointerEvents: "none",
      color: colors[Math.floor(Math.random() * colors.length)],
      fontSize: `${14 + Math.random() * 20}px`,
      willChange: "transform, opacity"
    });

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 260;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 80;

    const animation = particle.animate(
      [
        {
          transform: "translate3d(0, 0, 0) scale(.4) rotate(0deg)",
          opacity: 1
        },
        {
          transform: `translate3d(${x}px, ${y}px, 0) scale(1.2) rotate(${Math.random() * 500}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1000 + Math.random() * 1100,
        easing: "cubic-bezier(.15,.7,.3,1)",
        fill: "forwards"
      }
    );

    animation.onfinish = () => particle.remove();
  }
}

giftBtn.addEventListener("click", () => {
  if (finalMessage.classList.contains("show")) return;

  finalMessage.classList.remove("show");

  // Restart the reveal animation cleanly.
  void finalMessage.offsetWidth;

  finalMessage.classList.add("show");
  giftBtn.querySelector(".gift-box").textContent = "💝";
  giftBtn.querySelector(".gift-label").textContent = "Your wish is here ♡";

  launchConfetti();

  finalMessage.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center"
  });
});

/* ==================================
   REPLAY THE SURPRISE
================================== */

replayBtn.addEventListener("click", () => {
  finalMessage.classList.remove("show");

  giftBtn.querySelector(".gift-box").textContent = "🎁";
  giftBtn.querySelector(".gift-label").textContent =
    "Tap to unwrap your wish";

  giftBtn.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center"
  });
});

/* ==================================
   INITIAL SETUP
================================== */

// Create effects only after the visitor opens the surprise.
// The website remains lightweight before interaction.
