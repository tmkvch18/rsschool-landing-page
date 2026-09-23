# rsschool-landing-page

Coffee House — многостраничный лендинг (index + menu), собранный на Vite со стилями на SCSS.

## Команды

```bash
npm install     # установка зависимостей
npm run dev     # дев-сервер с HMR
npm run build   # продакшен-сборка в dist/
npm run preview # локальный просмотр собранного dist/
```

## Структура

```
index.html            главная страница
menu.html             страница меню
vite.config.js        base для GitHub Pages + две точки входа
public/               статика, копируется в dist как есть (images, svg, video)
src/
  assets/fonts/       шрифты Inter, подключаются из base/fonts.scss
  assets/json/        products.json — данные карточек меню
  scripts/            main.js (общая точка входа) + модули по фичам
  styles/
    style.scss        собирает base/* и components/*
    base/             fonts, variables, normalize, typography, utils
    components/       header, enjoy, favorite-coffee, about, mobile-app, menu, footer
```

`base` в [vite.config.js](vite.config.js) указан как `/rsschool-landing-page/` — под деплой на GitHub Pages.
