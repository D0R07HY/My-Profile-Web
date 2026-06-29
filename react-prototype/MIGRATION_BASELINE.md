# React Prototype Baseline

This file freezes the current React/Vite prototype motion set as the baseline for migration planning.

## Keep

- Split hero name animation
- Block-based language switching
- Scroll progress bar
- Hero ambient scan lines
- Interactive surface tilt and spotlight
- Certificate hover motion
- Magnet hover on key interactive controls

## Exclude

- Custom cursor glow and cursor dot
- Orbit and ping decorations around the hero portrait

## Why

The kept set improves perceived polish and interaction quality without adding high-maintenance effects that are hard to keep parity-safe across migration, responsive layouts, and accessibility modes.

The excluded set was visually interesting, but had lower long-term value for production migration relative to maintenance and testing cost.
