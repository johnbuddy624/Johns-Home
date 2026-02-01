//==EXPLANATIONS==//
//==Camera → tracks mouse to create parallax==//

//==Starfield → background stars with depth==//

//==Mountains → multiple layers for 3D parallax effect==//

//==animate() → main render loop==//

//==Buttons → basic interaction wired==//



/* ================= RESIZE ================= */
const stars = document.getElementById("stars");
const world = document.getElementById("world");
const sctx = stars.getContext("2d");
const ctx = world.getContext("2d");

function resize() {
  stars.width = world.width = innerWidth;
  stars.height = world.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ================= CAMERA (FAKE 3D) ================= */
const camera = { x: 0, y: 0 };
window.addEventListener("mousemove", e => {
  camera.x = (e.clientX - innerWidth/2) * 0.04;
  camera.y = (e.clientY - innerHeight/2) * 0.04;
});

/* ================= STARFIELD ================= */
const starfield = Array.from({ length: 600 }, () => ({
  x: Math.random()*innerWidth,
  y: Math.random()*innerHeight,
  z: Math.random()*0.4 + 0.1
}));

function drawStars() {
  sctx.clearRect(0,0,stars.width,stars.height);
  sctx.fillStyle = "white";
  starfield.forEach(s => {
    sctx.globalAlpha = s.z;
    sctx.fillRect(
      s.x - camera.x*s.z,
      s.y - camera.y*s.z,
      2, 2
    );
  });
}

/* ================= MOUNTAINS / TERRAIN ================= */
function drawMountain(baseY, depth, color) {
  ctx.beginPath();
  ctx.moveTo(0, world.height);
  for (let x = 0; x <= world.width; x += 120) {
    ctx.lineTo(
      x - camera.x*depth,
      baseY - Math.random()*140*depth
    );
  }
  ctx.lineTo(world.width, world.height);
  ctx.fillStyle = color;
  ctx.fill();
}

/* ================= ANIMATION LOOP ================= */
function animate() {
  ctx.clearRect(0,0,world.width,world.height);

  drawStars();
  drawMountain(innerHeight*0.8, 0.2, "#050b14");
  drawMountain(innerHeight*0.7, 0.4, "#0b1f3a");
  drawMountain(innerHeight*0.6, 0.6, "#143c6e");

  requestAnimationFrame(animate);
}
animate();

/* ================= BUTTON INTERACTION ================= */
const enterBtn = document.getElementById("enterBtn");
enterBtn.addEventListener("click", () => {
  alert("Entering the universe!");
});