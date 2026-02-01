//=====EXPLANATIONS=====//
//==starsCanvas → JS draws starfield with glow==//
//==worldCanvas → JS draws 3D mountains / layers==//
//==ui → JS handles mouse movement for parallax==//
//==enterBtn → triggers interaction==//

//==JS STARTS==//

// GET CANVAS ELEMENTS
const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

const worldCanvas = document.getElementById("world");
const worldCtx = worldCanvas.getContext("2d");

const ui = document.getElementById("ui");
const enterBtn = document.getElementById("enterBtn");

// RESIZE CANVASES
function resize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  worldCanvas.width = window.innerWidth;
  worldCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ===== STARFIELD =====
const stars = Array.from({ length: 600 }, () => ({
  x: Math.random() * starsCanvas.width,
  y: Math.random() * starsCanvas.height,
  size: Math.random() * 2 + 0.5,
  speed: Math.random() * 0.5 + 0.1,
  glow: Math.random() * 0.8 + 0.2
}));

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(star => {
    star.x -= star.speed;
    if (star.x < 0) star.x = starsCanvas.width;
    starsCtx.fillStyle = `rgba(255,255,255,${star.glow})`;
    starsCtx.beginPath();
    starsCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    starsCtx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ===== 3D WORLD / MOUNTAINS WITH PARALLAX =====
const layers = [
  { color: "#1a2a3f", depth: 0.2, peaks: 6, offset: 200 },
  { color: "#2b4a6f", depth: 0.5, peaks: 5, offset: 150 },
  { color: "#3b6a9f", depth: 0.8, peaks: 4, offset: 100 }
];

let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX / window.innerWidth;
  mouse.y = e.clientY / window.innerHeight;
});

function drawWorld() {
  worldCtx.clearRect(0, 0, worldCanvas.width, worldCanvas.height);

  layers.forEach(layer => {
    worldCtx.fillStyle = layer.color;
    worldCtx.beginPath();
    worldCtx.moveTo(0, worldCanvas.height);

    const step = worldCanvas.width / (layer.peaks * 2);
    for (let i = 0; i <= layer.peaks * 2; i++) {
      const x = i * step;
      const peak = worldCanvas.height - layer.offset - Math.random() * 100;
      const parallaxX = (mouse.x - 0.5) * layer.depth * 50;
      const parallaxY = (mouse.y - 0.5) * layer.depth * 50;
      const y = peak + parallaxY;
      worldCtx.lineTo(x + parallaxX, y);
    }

    worldCtx.lineTo(worldCanvas.width, worldCanvas.height);
    worldCtx.closePath();
    worldCtx.fill();
  });

  requestAnimationFrame(drawWorld);
}
drawWorld();

// ===== BUTTON INTERACTIVITY =====
enterBtn.addEventListener("click", () => {
  alert("Welcome to your 3D interactive universe!");
});