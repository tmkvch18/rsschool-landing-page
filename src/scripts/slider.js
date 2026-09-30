const ACTIVE_LINE = "favorites-coffee-section-controls__line--active";
const SLIDE_WIDTH = 480;
const SLIDE_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;
const TRANSITION_FALLBACK = 600;

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

  const slides = track.children;
  const slidesCount = slides.length;

  if (!slidesCount) return;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slidesCount - 1].cloneNode(true);

  firstClone.setAttribute("aria-hidden", "true");
  lastClone.setAttribute("aria-hidden", "true");

  track.append(firstClone);
  track.prepend(lastClone);

  const totalItems = slidesCount + 2;

  let currentSlide = 0;
  let isAnimating = false;
  let transitionFallback = null;
  let timer = setInterval(autoplay, SLIDE_INTERVAL);

  let pointerStartX = 0;
  let isDragging = false;

  function getRealIndex() {
    return (currentSlide + slidesCount) % slidesCount;
  }

  function setTrackPosition() {
    const position = currentSlide + 1;

    track.style.right = `${(position - (totalItems - 1) / 2) * SLIDE_WIDTH}px`;
  }

  function jumpWithoutTransition() {
    track.style.transition = "none";
    setTrackPosition();
    track.offsetWidth;
    track.style.transition = "";
  }

  function updateLines() {
    const realIndex = getRealIndex();

    lines.forEach((line, index) => {
      line.classList.toggle(ACTIVE_LINE, index === realIndex);
    });

    restartAnimation(lines[realIndex]);
  }

  function moveTo(index) {
    if (isAnimating || index === currentSlide) return;

    isAnimating = true;
    currentSlide = index;

    setTrackPosition();
    updateLines();

    transitionFallback = setTimeout(finishTransition, TRANSITION_FALLBACK);
  }

  function goToSlide(index) {
    moveTo(index);
    restartAutoplay();
  }

  function nextSlide() {
    moveTo(currentSlide + 1);
  }

  function prevSlide() {
    moveTo(currentSlide - 1);
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

  function handleTransitionEnd(event) {
    if (event.target !== track || event.propertyName !== "right") return;

    finishTransition();
  }

  function finishTransition() {
    if (!isAnimating) return;

    clearTimeout(transitionFallback);

    if (currentSlide < 0 || currentSlide >= slidesCount) {
      currentSlide = getRealIndex();
      jumpWithoutTransition();
    }

    isAnimating = false;
  }

  jumpWithoutTransition();

  track.addEventListener("transitionend", handleTransitionEnd);
  track.addEventListener("transitioncancel", handleTransitionEnd);

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
