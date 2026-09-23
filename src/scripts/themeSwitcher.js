export default function initThemeSwitcher() {
  const themeSwitcher = document.querySelector(".theme-switcher");

  if (!themeSwitcher) return;

  const sunIcon = themeSwitcher.querySelector(".theme-switcher__icon--sun");
  const moonIcon = themeSwitcher.querySelector(".theme-switcher__icon--moon");

  if (!sunIcon || !moonIcon) return;

  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "light";

  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    sunIcon.classList.toggle("theme-switcher__icon--active", theme === "light");
    moonIcon.classList.toggle("theme-switcher__icon--active", theme === "dark");
  };

  setTheme(savedTheme);

  themeSwitcher.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    setTheme(newTheme);
  });
}
