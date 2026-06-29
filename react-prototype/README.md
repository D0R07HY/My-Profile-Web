# React/Vite Portfolio Prototype

This folder contains the React + Vite prototype for the portfolio migration.

## What this prototype includes

- Parity-focused portfolio sections
- English/Thai language switching
- Split-text hero animation
- Block-based language transition
- Scroll progress indicator
- Hero ambient scan motion
- Interactive surface tilt/spotlight
- Certificate hover motion
- Magnet hover on key controls
- Shared design system and custom typography

## Local development

```bash
cd react-prototype
npm install
npm run dev
```

## Production build

```bash
cd react-prototype
npm run build
```

## Lint

```bash
cd react-prototype
npm run lint
```

## Notes

- This branch is intentionally isolated from the production `main` branch.
- Media assets live in `public/media`.
- Typography assets live in `public/fonts`.
- The frozen migration-ready motion baseline is documented in `MIGRATION_BASELINE.md`.
