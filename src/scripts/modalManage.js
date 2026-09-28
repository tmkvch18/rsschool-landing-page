import products from "../json/products.json";

const body = document.body;
const cards = document.querySelector(".menu-cards.menu__cards");
const modal = document.querySelector(".modal");
const modalImg = modal?.querySelector(".modal__img img");
const modalTitle = modal?.querySelector(".modal__title");
const modalDescription = modal?.querySelector(".modal__description");
const modalSizes = modal?.querySelector(
  "[data-actions='size'] .modal__actions-btns",
);
const modalAdditives = modal?.querySelector(
  "[data-actions='additives'] .modal__actions-btns",
);
const modalPrice = modal?.querySelector(".modal__price");

function createModal(cardId) {
  const product = products.find((item) => item.name === cardId);

  if (!product) return;

  modalImg.src = `./images/${product.image}.jpg`;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalPrice.textContent = `${product.price}`;

  createSize(modalSizes, product.sizes);
  createAdditives(modalAdditives, product.additives);
}

function createSize(modalSizes, sizes) {
  modalSizes.replaceChildren();

  Object.entries(sizes).forEach(([sizeKey, size], index) => {
    const button = document.createElement("button");

    button.setAttribute("type", "button");
    button.dataset.size = size["add-price"];
    button.classList.add("modal__actions-btn");

    if (!index) {
      button.classList.add("modal__actions-btn--active");
    }

    const sizeKeyElement = document.createElement("span");
    const sizeValueElement = document.createElement("span");

    sizeKeyElement.textContent = sizeKey.toUpperCase();
    sizeValueElement.textContent = size.size;

    button.append(sizeKeyElement, sizeValueElement);

    modalSizes.append(button);
  });
}

function createAdditives(modalAdditives, additives) {
  modalAdditives.replaceChildren();

  for (let i = 0; i < additives.length; i++) {
    const name = additives[i].name;
    const price = additives[i]["add-price"];

    const button = document.createElement("button");

    button.setAttribute("type", "button");
    button.dataset.additives = price;
    button.classList.add("modal__actions-btn");

    const additivesKeyElement = document.createElement("span");
    const additivesValueElement = document.createElement("span");

    additivesKeyElement.textContent = i + 1;
    additivesValueElement.textContent = name;

    button.append(additivesKeyElement, additivesValueElement);

    modalAdditives.append(button);
  }
}

function closeModal() {
  body.classList.remove("no-scroll-page");
  modal?.classList.remove("modal--active");
}

export default function initModalManage() {
  if (!cards || !modal) return;

  cards.addEventListener("click", (event) => {
    const card = event.target.closest(".menu-cards__card");

    if (!card) return;

    const cardId = card.id;

    createModal(cardId);

    modal?.classList.add("modal--active");
    body.classList.add("no-scroll-page");
  });

  modal?.addEventListener("click", (event) => {
    const btnClose = event.target.closest(".modal__close");
    const overlay = event.target.classList.contains("modal--active");

    if (!btnClose && !overlay) return;

    closeModal();
  });

  modalSizes.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-size]");

    if (!btn) return;

    const prev = modalSizes.querySelector(
      ".modal__actions-btn--active[data-size]",
    );

    prev.classList.remove("modal__actions-btn--active");
    btn.classList.add("modal__actions-btn--active");

    modalPrice.textContent = (
      +modalPrice.textContent -
      +prev.dataset.size +
      +btn.dataset.size
    ).toFixed(2);
  });

  modalAdditives.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-additives]");

    if (!btn) return;

    btn.classList.toggle("modal__actions-btn--active");

    const sum = +btn.dataset.additives;
    const price = Number(modalPrice.textContent);

    modalPrice.textContent = (
      btn.classList.contains("modal__actions-btn--active")
        ? price + sum
        : price - sum
    ).toFixed(2);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
