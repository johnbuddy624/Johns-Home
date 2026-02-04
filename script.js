/* =====================================================
   PARALLAX SCRIPT SKELETON
   Purpose: Scroll-based parallax effect (mobile safe)
   ===================================================== */


/* -----------------------------------------------------
   1. FEATURE CHECKS / EARLY EXITS
   These go first so we don’t do any work if we shouldn’t
----------------------------------------------------- */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Respect accessibility settings
  document.documentElement.classList.add("reduce-motion");
  // Exit early — no parallax logic runs
  // return; // uncomment if wrapping in a function
}


/* -----------------------------------------------------
   2. CONFIGURATION / CONSTANTS
   Tweak values here without touching logic
----------------------------------------------------- */

const MOBILE_BREAKPOINT = 768;
const MOBILE_SPEED_MULTIPLIER = 0.5;
const DESKTOP_SPEED_MULTIPLIER = 1;

const speedMultiplier =
  window.innerWidth <= MOBILE_BREAKPOINT
    ? MOBILE_SPEED_MULTIPLIER
    : DESKTOP_SPEED_MULTIPLIER;


/* -----------------------------------------------------
   3. DOM SELECTION
   Query elements ONCE and reuse them
----------------------------------------------------- */

const parallaxLayers = document.querySelectorAll("[data-parallax]");


/* -----------------------------------------------------
   4. STATE VARIABLES
   Track scroll position & animation state
----------------------------------------------------- */

let latestScrollY = 0;
let isTicking = false;


/* -----------------------------------------------------
   5. HELPER FUNCTIONS
   Small utilities that keep logic readable
----------------------------------------------------- */

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}


/* -----------------------------------------------------
   6. CORE PARALLAX UPDATE FUNCTION
   This does the actual visual movement
----------------------------------------------------- */

function updateParallax() {
  parallaxLayers.forEach(layer => {
    // Skip elements that are off-screen (mobile perf win)
    if (!isInViewport(layer)) return;

    const speed = Number(layer.dataset.parallax) || 0;
    const offsetY = latestScrollY * speed * speedMultiplier;

    // Use transform for GPU-accelerated animation
    layer.style.transform = `translate3d(0, ${offsetY}px, 0)`;
  });

  // Allow the next animation frame
  isTicking = false;
}


/* -----------------------------------------------------
   7. SCROLL HANDLER
   Keep this light — no heavy logic here
----------------------------------------------------- */

function onScroll() {
  latestScrollY = window.scrollY;

  // Throttle with requestAnimationFrame
  if (!isTicking) {
    window.requestAnimationFrame(updateParallax);
    isTicking = true;
  }
}


/* -----------------------------------------------------
   8. EVENT LISTENERS
   Hook user actions to handlers
----------------------------------------------------- */

window.addEventListener("scroll", onScroll, { passive: true });


/* -----------------------------------------------------
   9. INITIALIZATION
   Run once so elements start in the correct position
----------------------------------------------------- */

updateParallax();



/* =====================================================
SCROLL STATE
Purpose:
- Stores latest scroll position
- Avoids repeated DOM reads
===================================================== */
let latestScrollY = 0;


/* =====================================================
REQUEST ANIMATION FRAME THROTTLING
Purpose:
- Prevents scroll handler overload
- Syncs updates to browser paint cycle
===================================================== */
let ticking = false;

/* =====================================================
SCROLL HANDLER (INPUT ONLY)
Purpose:
- Captures scroll position
- Does NOT perform heavy logic
===================================================== */
function onScroll() {
  latestScrollY = window.scrollY;
}

/* =====================================================
PARALLAX UPDATE FUNCTION
Purpose:
- Applies transforms to parallax layers
- Runs inside requestAnimationFrame

Performance:
- Uses transform only
- Skips offscreen elements if possible
===================================================== */
function updateParallax() {}

/* =====================================================
PASSIVE SCROLL LISTENER
Purpose:
- Improves mobile scroll performance
- Prevents scroll blocking
===================================================== */
window.addEventListener("scroll", onScroll, { passive: true });

/* =====================================================
INTERSECTION OBSERVER (OPTIONAL)
Purpose:
- Detects when elements enter viewport
- Reduces unnecessary parallax updates

Use when:
- Many parallax elements exist
===================================================== */
const observer = new IntersectionObserver(() => {});


