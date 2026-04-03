---
name: paper-extract
description: Scaffold a React component from a Paper MCP design. Reads the mini-browser frame and any *-states/*-animation frames, then produces a component file with correct structure and motion.
---

You are extracting a React component from a Paper design. Follow these steps in order:

## 1. Read the design

Use Paper MCP tools to:
- Get the basic info and tree summary of the design file.
- Get the full node info and JSX for the **"mini-browser"** frame — this is the primary component design.
- Identify any sibling frames whose names end in **"-states"** or **"-animation"**:
  - `*-states` frames: read these to understand all component states (hover, active, disabled, selected, etc.)
  - `*-animation` frames: read these to understand transitions and motion between states

## 2. Analyze

Before writing code:
- Map each state from `*-states` frames to a React state variable or prop.
- Map each `*-animation` frame sequence to a CSS transition, keyframe, or JS-driven animation.
- Note spacing, typography, colors — extract as CSS custom properties where reused.

## 3. Invoke animation skill

If any `*-animation` frames exist, invoke the `emil-design-eng` skill to determine the right animation approach (CSS vs JS, easing, duration, spring values). Do not guess at motion — derive it from the frame data.

## 4. Follow React best practices

Apply `vercel-react-best-practices`:
- Prefer composition over configuration.
- Co-locate component CSS in a matching `.css` file.
- Use semantic HTML.
- Keep the component file focused — one component per file.

## 5. Write the component

Create `src/components/<ComponentName>/<ComponentName>.jsx` and `<ComponentName>.css`.

The component should:
- Accept props for each discrete state identified in step 2.
- Use CSS custom properties for design tokens.
- Have zero hard-coded magic numbers — all values derived from the Paper design.

## 6. Verify

Run `npm run lint` and `npm run build` — both must pass before marking done.
