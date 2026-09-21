import products from "../json/products.json";

const ACTIVE_TAB = "menu-tabs__item_active";
const HIDDEN_CARD = "menu-cards__card_hidden";
const MOBILE_BREAKPOINT = 768;
const CARDS_ON_MOBILE = 4;

/* Image files are numbered across the whole product list: coffee-1..8,
   tea-9..12, dessert-13..20 — hence the index of the full array. */
function createCard({ name, description, price, category }, index) {
  return `
    <div class="menu-cards-card menu-cards__card">
      <div class="menu-cards-card__img">
        <img src="./images/${category}-${index + 1}.jpg" alt="${category}">
      </div>
      <div class="menu-cards-card-description menu-cards-card__description">
        <h3 class="menu-cards-card-description__title">${name}</h3>
        <p class="menu-cards-card-description__subtitle">${description}</p>
        <p class="menu-cards-card-description__price">$${price}</p>
      </div>
    </div>`;
}

export default function initMenuTabs() {
  const cardsContainer = document.querySelector(".menu__cards");
  const tabs = document.querySelectorAll(".menu-tabs__item");
  const refreshBtn = document.querySelector(".menu__btn-refresh");

  if (!cardsContainer || !tabs.length) return;

  function hideExtraCards() {
    const cards = cardsContainer.querySelectorAll(".menu-cards__card");
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const hasExtraCards = isMobile && cards.length > CARDS_ON_MOBILE;

    cards.forEach((card, index) => {
      card.classList.toggle(
        HIDDEN_CARD,
        hasExtraCards && index >= CARDS_ON_MOBILE,
      );
    });

    if (refreshBtn) {
      refreshBtn.style.display = hasExtraCards ? "" : "none";
    }
  }

  function renderCategory(category) {
    cardsContainer.innerHTML = products
      .map((product, index) =>
        product.category === category ? createCard(product, index) : "",
      )
      .join("");

    hideExtraCards();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove(ACTIVE_TAB));
      tab.classList.add(ACTIVE_TAB);
      renderCategory(tab.id);
    });
  });

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      cardsContainer
        .querySelectorAll(`.${HIDDEN_CARD}`)
        .forEach((card) => card.classList.remove(HIDDEN_CARD));

      refreshBtn.style.display = "none";
    });
  }

  const defaultTab = tabs[0];
  defaultTab.classList.add(ACTIVE_TAB);
  renderCategory(defaultTab.id);
}
