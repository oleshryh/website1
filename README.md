# Site1 — ATMARAKSI

Одностраничный сайт VR-тренажёров для военной подготовки.
Экраны сменяются прокруткой одной длинной сцены.

## Запуск

```bash
npm install     # один раз
npm run dev     # http://localhost:5173
npm run check   # линтер + сборка, перед каждым сохранением
npm run build   # собрать сайт в папку dist
```

## Документация

Вся документация — в папке [`docs/`](docs/README.md):

- [Как устроена страница](docs/architecture.md)
- [Что где менять: тексты, товары, цвета](docs/content-editing.md)
- [Кадры анимации из видео](docs/frames-pipeline.md)
- [Порядок работы: коммиты и откаты](docs/workflow.md)
- [Словарь терминов](docs/glossary.md)

История изменений — [CHANGELOG.md](CHANGELOG.md).
Правила для Claude Code — [CLAUDE.md](CLAUDE.md).

## Стек

React 19 · Vite 8 · Tailwind CSS 4 · framer-motion · oxlint
