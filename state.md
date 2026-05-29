# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Page Transition Implementation`
- **Status:** `Complete`
- **Last Updated:** `2026-05-29`

---

## Last Session Work

### Summary
Fixed the preloader restart bug and added a persistent session state to the preloader so it only runs once per user visit. Used `sessionStorage` to check if `portfolio-preloader-played` is `"true"` upon client mount; if so, the preloader is bypassed and the page entrance animation plays instantly. When the preloader finishes playing for the first time, it sets this sessionStorage key to `"true"`.

### Files Changed
| File | Change Type | Notes |
| :--- | :--- | :--- |
| `components/Preloader.tsx` | Modified | Add `timelineStartedRef` single-shot guard |
| `components/PageTransition.tsx` | Modified | Implement `sessionStorage` preloader state checking on mount & update onComplete |

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
| 30 | Native Next.js Page Interceptor System | Avoided barba.js hydration conflicts with Next.js App Router by building a custom context provider that intercepts cross-page Link clicks to coordinate page swap animations. | 2026-05-29 |
| 31 | Custom-Themed Dynamic Clip-Path Overlay | Themed the transition overlay to slide in Deep Rich Red (`#AB1509`) and display massive centered Soft Yellow (`#fff7d3`) destination typography. | 2026-05-29 |
| 32 | SplitText Word Stagger Reveals | Integrated the official GSAP `SplitText` plugin to slice target headings and stagger individual words upwards (`yPercent: -120`, `ease: "elastic.in(1, 0.75)"`) on mount. | 2026-05-29 |
| 33 | Dynamic Vertical Clip-Path Percentages | Computed vertical clip percentages dynamically by measuring the bounds of the destination title against the viewport height, creating a fitted horizontal strip. | 2026-05-29 |
| 34 | Use Tusker Standard for all Preloader Slides | Configured all three preloader text slides to use Tusker Standard typography, avoiding any PP Neue Montreal fallback. | 2026-05-29 |
| 35 | Manage Preloader state in Provider | Mounted Preloader inside PageTransitionProvider conditionally to preserve layout structure. | 2026-05-29 |
| 36 | Disable sessionStorage Preloader constraint | Temporarily disabled sessionStorage checks and writes to allow the preloader to play on every page refresh for development and testing. | 2026-05-29 |
| 37 | Increase Preloader padding & line height | Prevent Tusker font clipping by increasing masking container padding to py-10/py-14 and leading-height to 1.1. | 2026-05-29 |
| 38 | Drop Preloader z-index to 9999 | Lower Preloader z-index below PageTransition overlay (99999) to enable the horizontal leave wipe to sweep beautifully on top. | 2026-05-29 |
| 39 | Stagger text slide-up inside Leave stripe | Programmed SplitText word reveals inside the expanding horizontal transition stripe before full-screen expansion. | 2026-05-29 |
| 40 | Stretched edge-to-edge SVG typography | Rendered Row 1 and Row 3 text inside responsive SVGs with textLength="1000" to stretch letters full-width with 0px margins. | 2026-05-29 |
| 41 | Stark Studio timing via GSAP set | Configured zero-fade ON/OFF toggle switches inside GSAP using set() to simulate a stark dark light bulb environment. | 2026-05-29 |
| 42 | Solid soft yellow text color (#fff7d3) | Removed all gradients and opacity filters, displaying text in solid #fff7d3 at 1.0 opacity as requested. | 2026-05-29 |
| 43 | Conditionally hide Menu trigger wrap | Bound showPreloader state to Menu button class rendering, making it cleanly disappear during preloader screen. | 2026-05-29 |
| 44 | Persist Row 1 text during red swipe | Set row1 autoAlpha: 1 at t = 9.0s in Preloader.tsx timeline, keeping the top line visible as the red stripe sweeps across. | 2026-05-29 |
| 45 | Add top/bottom row margins | Added pt-6 mt-4 to Row 1 and pb-6 mb-4 to Row 3 for clean visual layout spacing. | 2026-05-29 |
| 46 | Prevent StrictMode leakage on Preloader | Reset row1/row2/row3 to autoAlpha: 0 on timeline start to prevent properties sticking during React StrictMode double mounts. | 2026-05-29 |
| 47 | Mount Menu trigger conditionally | Prevent the menu button trigger from flashing/rendering by returning null immediately when showPreloader is true. | 2026-05-29 |
| 48 | Delay Hero entrance animation | Blocked the main Home page entrance timeline from executing when showPreloader is true to prevent background animation playback. | 2026-05-29 |

---

## Open Questions

| # | Question | Priority | Owner |
|---|---|---|---|
| 1 | Should we implement subpages or internal components following the new design system guidelines? | Medium | Dev |

---

## Notes

- Color hexes: Deep Rich Red (`#AB1509`), Soft Yellow (`#fff7d3`), Deep Pitch Black (`#050505`).
- Font scales: Heading is Tusker Standard (`var(--font-tusker-standard)`), labels are PP Neue Montreal Bold, body is Neue Montreal Light.
