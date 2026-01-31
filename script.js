const title =
document.getElementById("title");
const button =
document.getElementById("btn");

let scale = 1;
let growing = true;

function animate() {
  if (growing) {
    scale += 0.005;
    if (scale >= 1.05) growing = false;
  } else {
    scale -= 0.005;
    if (scale <= 1.0) growing = true;
  }

  title.style.transform = `scale($
{scale})`;
  requestAnimationFrame(animate);
}

button.addEventListener("click", () => {
  title.textContent = "You clicked the button";
});

animate();

