const NAV_ACTIVE = "header__burger-nav--active";
const BTN_ACTIVE = "header__burger-btn--active";
const BODY_LOCK = "no-scroll-page";

export default function initBurgerMenu() {
  const burgerNav = document.querySelector(".header__burger-nav");
  const burgerBtn = document.querySelector(".header__burger-btn");

  if (!burgerNav || !burgerBtn) return;

  const body = document.body;

  const closeMenu = () => {
    burgerNav.classList.remove(NAV_ACTIVE);
    burgerBtn.classList.remove(BTN_ACTIVE);
    body.classList.remove(BODY_LOCK);
  };

  burgerBtn.addEventListener("click", () => {
    burgerNav.classList.toggle(NAV_ACTIVE);
    burgerBtn.classList.toggle(BTN_ACTIVE);
    body.classList.toggle(BODY_LOCK);
  });

  burgerNav.addEventListener("click", (event) => {
    const isNavLink = event.target.closest(".header-nav-list__item");
    const isNavLinkPage = event.target.closest(".header-menu-coffee__link");
    // const isBackdrop = event.target === burgerNav;

    if (!isNavLink && !isNavLinkPage) return;

    event.preventDefault();

    const link = event.target.closest("a");

    closeMenu();

    setTimeout(() => {
      if (link) {
        window.location.href = link.href;
      }
    }, 500);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 769 &&
      burgerNav.classList.contains("header__burger-nav--active")
    ) {
      closeMenu();
    }
  });
}
