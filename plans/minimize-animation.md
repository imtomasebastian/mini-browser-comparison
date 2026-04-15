# Plan: Minimize Interaction

## Context
Add a minimize animation to the mini-browser component. The orange window-control dot triggers it from either the expanded or collapsed state. In the minimized state, the entire `.mini-browser` acts as the restore trigger. Returning always goes back to the prior state. Visual target: 96×96px layout size + 0.75 CSS scale = 72×72px visual footprint (matches Paper "mini-browser-minimized" at 75%).

---

## State Refactor

**File:** `src/components/MiniBrowser/MiniBrowser.tsx`

Replace `const [collapsed, setCollapsed] = useState(false)` with:

```ts
type BrowserState = 'expanded' | 'collapsed' | 'minimized'
const [uiState, setUiState] = useState<BrowserState>('expanded')
const preMinimizeState = useRef<BrowserState>('expanded')
```

Toggle functions:
- `toggleCollapse` — flips between `'expanded'` and `'collapsed'` (green dot)
- `toggleMinimize` — if minimized → restore `preMinimizeState.current`; else → save current to ref, set `'minimized'` (orange dot + whole-div click)

Derive helpers so all existing `collapsed`-keyed logic stays untouched:
```ts
const collapsed = uiState === 'collapsed'
const minimized = uiState === 'minimized'
```

---

## Dimensions

```ts
const DIMENSIONS = {
  collapsed: { width: 386, height: 156 },
  expanded:  { width: 552, height: 285 },
  minimized: { width: 96,  height: 96  },
}
```

---

## Animation: `.mini-browser`

Extend the existing `animate={{ width, height }}` pattern (same as collapse/expand — no changes to that code path). Add `scale` as a pure transform alongside it:

> **Note:** By the time this is implemented, the collapse/expand refactor will have migrated the container to use `layout`. The minimize animation should follow the same pattern — use `layout` for the container resize and animate `scale` separately.

```tsx
<motion.div
  className={`mini-browser${minimized ? ' mini-browser--minimized' : ''}`}
  style={{ width: DIMENSIONS[uiState].width, height: DIMENSIONS[uiState].height }}
  layout
  animate={{ scale: minimized ? 0.75 : 1 }}
  transition={{
    layout: activeSpring,
    scale:  activeSpring,   // transform-origin: 50% 50% (Framer Motion default = center)
  }}
  onClick={minimized ? toggleMinimize : undefined}
/>
```

`scale: 1` during collapse/expand is a no-op — this is purely additive and does not affect existing animation behaviour.

---

## Preventing Reflow — Frozen Width Wrapper Pattern

**The problem:** `.mb-browser-bar` and `.mb-browser-window` are `align-self: stretch`, so they track the parent width. As `.mini-browser` shrinks from 552→96px, the bar and window shrink too, causing their flex children to reflow.

**The solution — true structural prevention:** Wrap the content of each in a `motion.div` that gets `flex-shrink: 0` + a locked `minWidth` during minimize. The content box is physically frozen at its pre-minimize width. Reflow cannot happen because the container doesn't change size. `overflow: clip` on the parent clips whatever extends beyond the shrinking outer box.

This is different from "hide fast enough" — the children never actually reflow; their containing box is structurally unchanged.

### `.mb-browser-bar` inner wrapper

Move all bar children (window controls, tab bar, chevron) into:

```tsx
<motion.div
  className="mb-browser-bar-content"
  style={{
    // Structural freeze: when minimizing, lock width to pre-minimize bar content area
    // (.mb-browser-bar has 12px padding-inline each side, so -24 from parent width)
    minWidth: minimized
      ? DIMENSIONS[preMinimizeState.current].width - 24
      : undefined,
    flexShrink: 0,
  }}
  animate={{
    opacity: minimized ? 0 : 1,
    filter:  minimized ? 'blur(4px)' : 'blur(0px)',
  }}
  transition={childTransition}
>
  <WindowControls ... />
  <div className="mb-tab-bar">...</div>
  <ChevronDownIcon />
</motion.div>
```

Add to CSS:
```css
.mb-browser-bar-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

/* mb-browser-bar: add overflow: clip */
.mb-browser-bar {
  overflow: clip;
}
```

### `.mb-browser-window` inner wrapper

Wrap `.mb-app-list` in:

```tsx
<motion.div
  className="mb-browser-window-content"
  style={{
    minWidth: minimized
      ? DIMENSIONS[preMinimizeState.current].width - 8
      : undefined,
    flexShrink: 0,
    alignSelf: 'stretch',
    flex: minimized ? undefined : 1,
  }}
  animate={{
    opacity: minimized ? 0 : 1,
    filter:  minimized ? 'blur(4px)' : 'blur(0px)',
  }}
  transition={childTransition}
>
  <div className="mb-app-list">
    ...
  </div>
</motion.div>
```

`.mb-browser-window` already has `overflow: clip` — no CSS change needed here.

---

## DialKit Parameters

Add to `useDialKit`:

```ts
minimize: {
  out: {
    duration: [0.35, 0, 1],
    bounce:   [0.2,  0, 1],
  },
  restore: {
    duration: [0.55, 0, 1],
    bounce:   [0.3,  0, 1],
  },
  childFade: {
    duration: [0.18, 0, 0.5],
    delay:    [0,    0, 0.3],
  },
  childReveal: {
    duration: [0.25, 0, 0.5],
    delay:    [0.12, 0, 0.5],
  },
},
```

---

## WindowControls

Pass and wire `onMinimize`:
```tsx
function WindowControls({ collapsed, onToggle, onMinimize }) {
  ...
  <button className="mb-dot mb-dot--orange" onClick={onMinimize}>
```

---

## CSS

```css
.mini-browser--minimized {
  cursor: pointer;
}

.mb-browser-bar-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}
```

---

## Files to Modify

| File | Change |
|---|---|
| `src/components/MiniBrowser/MiniBrowser.tsx` | State refactor, DIMENSIONS, animations, frozen wrappers, WindowControls wiring |
| `src/components/MiniBrowser/MiniBrowser.css` | `overflow: clip` on bar (already done in layout refactor), `.mb-browser-bar-content`, `.mini-browser--minimized` cursor |

---

## Verification (manual by user)

1. Click orange dot from expanded → animates to 72×72 visual; no content reflow visible
2. Click the minimized square → restores to expanded
3. Collapse first, then orange dot → minimizes from collapsed state
4. Restore → returns to collapsed (not expanded)
5. Collapse/expand interaction untouched
