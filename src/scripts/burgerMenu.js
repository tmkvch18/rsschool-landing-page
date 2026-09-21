const NAV_ACTIVE = "header__burger-nav_active";
const BTN_ACTIVE = "header__burger-btn_active";
const BODY_LOCK = "no-scroll-page";

export default function initBurgerMenu() {
  const burgerNav = document.querySelector(".header__burger-nav");
  const burgerBtn = document.querySelector(".header__burger-btn");

  if (!burgerNav || !burgerBtn) return;

  const body = document.body;

  burgerBtn.addEventListener("click", () => {
    burgerNav.classList.toggle(NAV_ACTIVE);
    burgerBtn.classList.toggle(BTN_ACTIVE);
    body.classList.toggle(BODY_LOCK);
  });

  burgerNav.addEventListener("click", (event) => {
    const isNavLink = event.target.closest(".header-nav-list__item");
    const isBackdrop = event.target === burgerNav;

    if (!isNavLink && !isBackdrop) return;

    burgerNav.classList.remove(NAV_ACTIVE);
    burgerBtn.classList.remove(BTN_ACTIVE);
    body.classList.remove(BODY_LOCK);
  });
}
