import "../styles/style.scss";

import initBurgerMenu from "./burgerMenu.js";
import initSlider from "./slider.js";
import initMenuTabs from "./menuTabs.js";
import initThemeSwitcher from "./themeSwitcher.js";
import initModalManage from "./modalManage.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initSlider();
  initMenuTabs();
  initThemeSwitcher();
  initModalManage();
});
