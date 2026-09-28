const ACTIVE_LINE = "favorites-coffee-section-controls__line--active";
const SLIDE_WIDTH = 480;
const SLIDE_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

export default function initSlider() {
  const track = document.querySelector(
    ".favorites-coffee-slider-content__wrapper",
  );
  const btnLeft = document.querySelector(".favorites-coffee-slider__btn-left");
  const btnRight = document.querySelector(
    ".favorites-coffee-slider__btn-right",
  );
  const lines = document.querySelectorAll(
    ".favorites-coffee-section-controls__line",
  );

  if (!track || !btnLeft || !btnRight || !lines.length) return;

  let currentSlide = 0;
  let timer = setInterval(autoplay, SLIDE_INTERVAL);

  let pointerStartX = 0;
  let isDragging = false;

  function updateSlider() {
    track.style.right = `${(currentSlide - 1) * SLIDE_WIDTH}px`;

    lines.forEach((line, index) => {
      line.classList.toggle(ACTIVE_LINE, index === currentSlide);
    });

    restartLineAnimation();
  }

  function restartLineAnimation() {
    const activeLine = lines[currentSlide];

    restartAnimation(activeLine);
  }

  function goToSlide(index) {
    clearInterval(timer);

    currentSlide = index;
    updateSlider();

    timer = setInterval(autoplay, SLIDE_INTERVAL);
  }

  function nextSlide() {
    currentSlide = currentSlide === lines.length - 1 ? 0 : currentSlide + 1;

    updateSlider();
  }

  function prevSlide() {
    currentSlide = currentSlide === 0 ? lines.length - 1 : currentSlide - 1;

    updateSlider();
  }

  function autoplay() {
    nextSlide();
  }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(autoplay, SLIDE_INTERVAL);
  }

  function restartAnimation(element) {
    element.classList.remove(ACTIVE_LINE);
    element.offsetWidth;
    element.classList.add(ACTIVE_LINE);
  }

  btnRight.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  btnLeft.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  lines.forEach((line, index) => {
    line.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  track.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
    isDragging = true;

    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointerup", (event) => {
    if (!isDragging) return;

    isDragging = false;

    const swipeDistance = pointerStartX - event.clientX;

    if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) return;

    if (swipeDistance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    restartAutoplay();
  });

  track.addEventListener("pointercancel", () => {
    isDragging = false;
  });

  track.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}
