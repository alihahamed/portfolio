# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Feature Development - Motion Principles Documentation`
- **Status:** `Complete`
- **Last Updated:** `2026-05-27`

---

## Last Session Work

### Summary
Documented the precise CustomEase entrance reveal curve parameters (`0.85, 0, 0.2, 1`), the 2D vertical sliding track baseline slot-machine configurations, the vector scale-drawing mechanics for the ScrollArrow, and the symmetrical connector line timelines under `Brutalist Motion Principles` in `design.md`. Verified that the Next.js bundle compiles and builds cleanly.

### Files Changed
| File | Change Type | Notes |
| :--- | :--- | :--- |
| `design.md` | Modified | Updated official design system specification with custom motion curves and parameters. |
| `state.md` | Modified | Synchronized change lists, phase status, and decisions made. |
| `state.md` | Modified | Synchronized phase, technical change summaries, and decisions. |

---

## Decisions Made

| # | Decision | Rationale | Date |
|---|---|---|---|
| 1 | Create `design.md` | Document design colors, typography, hero section structures, and brutalist motion guidelines for repository continuity. | 2026-05-27 |
| 2 | Reposition hero stats below title | Improve scanning hierarchy and visual alignment inside the typography viewport. | 2026-05-27 |
| 3 | Add animated stats connector line | Create visual cohesion between separated stats and add premium micro-motion. | 2026-05-27 |
| 4 | Remove underline from 'For Websites' | Clean up overlapping visual noise for a more minimalist, high-end look. | 2026-05-27 |
| 5 | Absolute positioning for relocated stats | Lock the stats block coordinates relative to the text block to prevent layout reflows on screen resize. | 2026-05-27 |
| 6 | Responsive vw-width stats block | Match the responsive scaling of the typography to ensure the stats stay locked under their heading characters. | 2026-05-27 |
| 7 | Flexbox auto-stretching connector | Use flex-1 with horizontal margins to let the line stretch dynamically as the viewport expands. | 2026-05-27 |
| 8 | Group top stats with headings | Prevent vertical drift on large/tall screens by keeping them within a unified block flow. (Superseded by spacer method). | 2026-05-27 |
| 9 | Invisible layout spacer block | Maintain three-child flow layout to balance vertical centering on all screen sizes. | 2026-05-27 |
| 10 | Relative absolute top-right stat | Position the visible stat absolutely relative to the headings wrapper to eliminate vertical drift under flex-grow. | 2026-05-27 |
| 11 | Vertically stacked ME/NU menu | Replace traditional menu pill with a split typography-based branding element that balances logo height and uses a premium hover transition. | 2026-05-27 |
| 12 | Curved sliding menu overlay | Apply `rounded-l-[2rem] md:rounded-l-[3.5rem]` to BOTH the nav container and staggered background panels for a fluid, ultra-premium transition. (Customized down to `1rem` and `2rem` by user). | 2026-05-27 |
| 13 | Seamless morphing toggle button | Make the main toggle button `fixed` at viewport top-right to overlay the portal seamlessly, morphing between "ME/NU" text and a geometric X without shifting positions. | 2026-05-27 |
| 14 | Render trigger inside the portal | Move the trigger element inside the portal to escape the header's stacking context restriction, while using `pointer-events-none` on the portal container to prevent click blocking. | 2026-05-27 |
| 15 | Optimized Pinyon Script font load | Load Pinyon Script via standard Next.js Google font loader to ensure zero layout-shift, high performance local caching, and custom CSS variables. | 2026-05-27 |
| 16 | Hybrid clip-path + character transform signature reveal | Combine a smooth linear clip-path reveal with a staggered, spring-like scale/rotation animation of individual spans to simulate a realistic, premium handwriting/signing effect. | 2026-05-27 |
| 17 | Infinite Yoyo Highlight Flow on ScrollArrow | Configured `yoyo: true` and `repeat: -1` directly on the GSAP timeline in `ScrollArrow` to make the accent highlight flow back up to the top tip seamlessly instead of snapping back instantly. | 2026-05-27 |
| 18 | Real-Time Hidden Measurement Nodes | Rendered hidden off-screen copies of all responsive cycler words to capture their millisecond-accurate client bounding box sizes on mount and resize, bypassing static width popping. | 2026-05-27 |
| 19 | SVG Stroke-Drawing for ScrollArrow Track | Programmed sequential SVG dasharray/dashoffset offsets to draw the scroll arrow shaft and arrowhead wings on load before initiating the highlight loop. | 2026-05-27 |
| 20 | High-Performance Stat Odometers | Animated virtual JavaScript integers and directly mapped them back to references in the DOM using `onUpdate` to bypass React's standard state/render cycle, yielding smooth 60fps counts. | 2026-05-27 |
| 21 | Clean Brutalist Mask Reveals | Deployed overflow-hidden vertical slide-ups with staggered `power4.out` curves to introduce hero text, fully compliant with the brutalist guidelines. | 2026-05-27 |
| 22 | Paused Intro Cylinder Lock | Implemented `isIntroFinished` flag to pause the 3D rotating cycler timer and lock the cylinder drum to a static, flat layout width on load, preventing visual layout breaks during reveals. | 2026-05-27 |
| 23 | Symmetrical Top Connector Line | Added a full-width flex container in the top-right stat row to draw a horizontal visual connector line extending from the score to the title's "I" letter on the left, matching the bottom stats. | 2026-05-27 |
| 24 | Scale-Based Line Drawing for ScrollArrow | Refactored the ScrollArrow track to scale the vertical shaft from top to bottom (`scaleY: 0` -> `1`) and scale the wings out, establishing a 100% reliable vectors drawing system. | 2026-05-27 |
| 25 | Baseline Centered 3D Word Cylinder Faces | Positioned absolute cylinder child faces as full-height flex containers centered vertically (`absolute inset-0 flex items-center justify-start`), locking their Y-centers with the parent's rotational axis to guarantee flawless line-height and baseline continuity. | 2026-05-27 |
| 26 | Hydration-Isolated Menu Trigger Entrance | Relocated trigger entrance animation to `Menu.tsx` to run client-side upon client mount, bypassing React Portal DOM isolation and GSAP container scoping restrictions. | 2026-05-27 |
| 27 | Baseline-Locked 2D Motion-Blurred Sliding Track | Swapped the 3D rotating cylinder for a vertical flex stack inside a baseline-aligned `h-[0.85em] overflow-hidden` wrapper. Programmed infinite downward scrolling and high-end motion blur offset transitions (`blur(1.5px)` -> `blur(0px)`) combined with snappy spring snaps (`back.out(1.8)`), locking vertical alignment perfectly to the browser's line-box baseline down to the pixel. | 2026-05-27 |
| 28 | Lenis Smooth Scrolling Provider | Integrated the Lenis package and built a custom client-side React wrapper to initialize global smooth inertia scrolling with clean exponential easing, globally cached on mount. | 2026-05-27 |
| 29 | CustomEase Acceleration Curve | Registered GSAP CustomEase (`0.85, 0, 0.2, 1`) on mount to power the vertical masked reveal. Text slides straight up (perfectly upright, zero skew/tilt angle) with an elegant slow crawl initially, then accelerates rapidly with high-craft speed before settling smoothly. Decoupled the slide-up cycler perfectly until this entrance has completely finished. | 2026-05-27 |

---

## Open Questions

| # | Question | Priority | Owner |
|---|---|---|---|
| 1 | Should we implement subpages or internal components following the new design system guidelines? | Medium | Dev |

---

## Notes

- Color hexes: Deep Rich Red (`#AB1509`), Soft Yellow (`#fff7d3`), Deep Pitch Black (`#050505`).
- Font scales: Heading is Tusker Standard (`var(--font-tusker-standard)`), labels are PP Neue Montreal Bold, body is Neue Montreal Light.
