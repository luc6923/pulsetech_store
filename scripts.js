// carrossel
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const items = document.querySelectorAll(".item");
const dots = document.querySelectorAll(".dot");
const numberIncator = document.querySelector(".numbers");
const list = document.querySelector(".list");

let active = 0;
const total = items.length;
let timer;

function update(direction) {
  document.querySelector(".item.active").classList.remove("active");
  document.querySelector(".dot.active").classList.remove("active");

  if (direction > 0) {
    active = active + 1;
    if (active === total) {
      active = 0;
    }
  } else if (direction < 0) {
    active = active - 1;

    if (active < 0) {
      active = total - 1;
    }
  }

  items[active].classList.add("active");
  dots[active].classList.add("active");

  numberIncator.textContent = String(active + 1).padStart(2, "0");
}

clearInterval(timer);
timer = setInterval(() => {
  update(1);
}, 5000); // 5 segundos

prevButton.addEventListener("click", () => {
  update(-1);
});

nextButton.addEventListener("click", () => {
  update(+1);
});

// particulas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 102, 0.5)";
    ctx.shadowColor = "#ff0040";
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function updateParticles() {
  for (let p of particles) {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  }
}

function loop() {
  draw();
  updateParticles(); // nome alterado para evitar conflito
  requestAnimationFrame(loop);
}

loop();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
