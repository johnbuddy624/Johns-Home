//------------ CANVAS SETUP ----------
const canvas =
document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize",
resizeCanvas);

//---------- TITLE + BUTTON ----------
const title =
document.getElementById("title");
const button =
document.getElementById("btn");

//---------- TITLE ANIMATION ----------
let scale = 1;
let growing = true;

function animateTitle() {
  if (growing) {
    scale += 0.005;
    if (scale >= 1.05) growing = false;
  } else {
    scale -= 0.005;
    if (scale <= 1.0) growing = true;
  }
  title.style.transform = `scale($
{scale})`;
}

// ---------- STARFIELD SETUP ----------
const stars = [];
const STAR_COUNT = 300;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width -
canvas.width / 2,
    y: Math.random() * canvas.height -
canvas.height / 2,
    z: Math.random() * canvas.width
  });
}

//---------- DRAW STARS ----------
function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cavas.width, canvas.height);

  ctx.fillStyle = "white";
  
  for (let star of stars) {
    star.z -= 20;
    if (star.z <= 0) {
      star.z = canvas.width;

    const k = 500 / star.z;
    const px = star.x * k + canvas.width / 2;
    const py = star.y * k + canvas.height / 2;

    if (
      px >= 0 &&
      px <= canvas.width &&
      py >= 0 &&
      py <= canvas.height
    ) {

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
    
//---------- MAIN LOOP ----------
function animate() {
  animateTitle();
  drawStars();
  requestAnimationFrame(animate);
}

//---------- BUTTON ACTION ----------
button.addEventListener("click", () => {
  title.textContent = "Warp speed engaged";
});

//---------- START ------------
animate();

