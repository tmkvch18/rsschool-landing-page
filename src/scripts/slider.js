const ACTIVE_LINE = "favorites-coffee-section-controls__line_active";
const SLIDE_WIDTH = 480;
const SLIDE_INTERVAL = 5000;

export default function initSlider() {
  const track = document.querySelector(
    ".favorites-coffee-slider-content__wrapper",
  );
  const btnLeft = document.querySelector(".favorites-coffee-slider__btn-left");
  const btnRight = document.querySelector(
    ".favorites-coffee-slider__btn-right",
  );
  const lines = document.querySelectorAll(".controls-line");

  if (!track || !btnLeft || !btnRight || !lines.length) return;

  let position = -SLIDE_WIDTH;
  let currentLine = 0;
  let timer = setInterval(autoplay, SLIDE_INTERVAL);

  function moveTrack(step) {
    if (step > 0) {
      position = position === SLIDE_WIDTH ? -SLIDE_WIDTH : position + SLIDE_WIDTH;
    } else {
      position = position === -SLIDE_WIDTH ? SLIDE_WIDTH : position - SLIDE_WIDTH;
    }

    track.style.right = `${position}px`;
  }

  function switchLine(step) {
    lines[currentLine].classList.remove(ACTIVE_LINE);

    if (step > 0) {
      currentLine = currentLine === lines.length - 1 ? 0 : currentLine + 1;
    } else {
      currentLine = currentLine === 0 ? lines.length - 1 : currentLine - 1;
    }

    lines[currentLine].classList.add(ACTIVE_LINE);
  }

  function autoplay() {
    switchLine(1);
    moveTrack(1);
  }

  function slide(step) {
    clearInterval(timer);
    switchLine(step);
    moveTrack(step);
    timer = setInterval(autoplay, SLIDE_INTERVAL);
  }

  btnRight.addEventListener("click", () => slide(1));
  btnLeft.addEventListener("click", () => slide(-1));
}
