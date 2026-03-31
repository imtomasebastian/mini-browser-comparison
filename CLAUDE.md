# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React component library built from Paper MCP designs. The main design frame in Paper is called **"mini-browser"**. Additional frames follow naming conventions:
- `*-animation` — animation state references (use these when implementing motion/transitions)
- `*-states` — component state references (use these for hover, active, disabled, etc. variants)

## Design-to-code workflow

1. Use Paper MCP tools to read the `mini-browser` frame and its child nodes.
2. Identify any `*-states` and `*-animation` frames for the component being built.
3. Invoke the `emil-design-eng` skill for all animation and motion work.
4. Follow `vercel-react-best-practices` for component structure and composition.
5. Run `/paper-extract` to scaffold a component from a Paper design.

## Stack

- React 19, Vite 8, plain JavaScript (no TypeScript — do not convert)
- CSS with custom properties and nested syntax (no CSS-in-JS)
- ESLint flat config (`eslint.config.js`) — run `npm run lint` to validate
- Prettier for formatting — run `npx prettier --write <file>` or let the hook handle it

## Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — production build (must pass before pushing)
- `npm run lint` — ESLint check
- `npm run preview` — preview production build

## Deployment

Pushing to GitHub triggers an automatic Vercel deploy. Ensure `npm run build` passes locally before pushing.
