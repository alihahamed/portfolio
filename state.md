# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Brutalist Project Details Projection System`
- **Status:** `Complete`
- **Last Updated:** `2026-05-29`

---

## Last Session Work

### Summary
Programmed an immersive backdrop dimming effect when hovering the "VISIT WORK" link. All surrounding elements are dimmed to the user's exact specification (carousel to 0.25, title to 0.35, approach to 0.25, description to 0.25, tech icons to 0.25, and grid lines to 0.15 opacity) using smooth GPU-accelerated CSS transitions, while keeping the preview video card and the link itself at full brightness.

### Files Changed
| File | Change Type | Notes |
| :--- | :--- | :--- |
| `components/SelectedWork.tsx` | Modified | Implemented `isLinkHovered` state, mouse listeners on link, and transition classes/inner wrappers. |

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
| 49 | 3D Cylinder Scroll Carousel | Implemented a circular 3D cylinder rotating scroll-driven carousel of 6 cards for each selected project using CSS 3D transforms and GSAP ScrollTrigger. | 2026-05-29 |
| 50 | Horizontal Draw-Out Grid Lines | Added 7 thin horizontal brand-red (#AB1509) lines spaced at exactly 12.5vh vertically that draw out from left to right on scroll as each scene is entered. | 2026-05-29 |
| 51 | 4-Cell Landscape 3D Carousel | Reduced 3D carousel cylinder cells to 4 and widened card dimensions to landscape (460x300px) with Z-translation at 400px. | 2026-05-29 |
| 52 | Remove Red Card Borders | Removed brand-red card borders from Selected Work cards to maintain a clean, borderless brutalist screen projection look. | 2026-05-29 |
| 53 | Parent-Level Continuous Grid Lines | Relocated brand-red lines to the parent container level for a continuous grid background, reducing line count to 5 per viewport (15 total spaced at exactly 20vh intervals). | 2026-05-29 |
| 54 | True Landscape 3D Carousel Cards | Updated work__carousel and work__carousel-cell to a true landscape size (600x340px) and matched 420px translateZ cylinder math. | 2026-05-29 |
| 55 | Sync GSAP Scroll Rotation Durations | Explicitly declared duration: 1 on rotating and tilting cylinder tweens to match lighting timelines and ensure complete, smooth rotations spanning the full scroll length. | 2026-05-29 |
| 56 | Bottom-Left Typewriter Scroll-Linked Titles | Repositioned project titles to the bottom-left of the viewport, styled with Neue Montreal Medium, and animated them with scroll-linked typing and redaction stagger curves for highly tactile motion. | 2026-05-29 |
| 57 | Responsive Title Alignment and Accelerated Stagger | Positioned titles horizontally on the left of 3D cards using media queries for a clean layout on desktops, while maintaining responsive bottom alignment on mobile. Accelerated typing/redacting scrub speed to 15% scroll progress. | 2026-05-29 |
| 58 | Typewriter Title Tailwind Conversion | Migrated custom responsive media query styling of titles to inline Tailwind classes in `SelectedWork.tsx` to enable seamless manual edits, while retaining a non-styled target selector class for GSAP. | 2026-05-29 |
| 59 | Interactive Project Descriptions with Typing Staggers | Integrated character-split project descriptions positioned below titles using inline Tailwind styles, driving them with smooth scroll-scrubbed typing and redaction curves. | 2026-05-29 |
| 60 | Far-Right Symmetrical Descriptions | Positioned project descriptions at the far bottom-right on desktop, level with left-aligned titles, forming a clean, balanced frame around the central 3D carousel projection. | 2026-05-29 |
| 61 | Decoupling Typewriter Scroll Triggers | Programmed independent triggers for typewriter staggers, preventing large text length or high stagger values from stretching the main 3D rotation timeline, ensuring bulletproof 3D carousel scroll mechanics. | 2026-05-29 |
| 62 | Transition-Driven Hash Scrolling | Upgraded `PageTransition` and link interceptors to coordinate full page wipes for in-page hash navigation, scrolling seamlessly to target sections while viewport is fully covered for an ultra-premium feel. | 2026-05-29 |
| 63 | Circular Hover Tooltip Cursor | Programmed a butter-smooth custom circular white tooltip cursor saying "Open" that tracks the user's cursor inside 3D project carousel bounds at 60fps using GSAP quickTo. | 2026-05-29 |
| 64 | Brutalist Project Details Projection | Framed the centered 3D carousel symmetrically with Top-Right Metrics (counting up with GSAP odometers), Bottom-Right Upper Tech Icons, Bottom-Left Lower Approach paragraphs, and Title/Description at default coordinates, revealing all details with vertical SVG clip-path wipes and auto-dismissing on 15vh scroll downs. | 2026-05-29 |
| 65 | Metrics Shift & Smooth Title Scaling | Shifted stats horizontally to the top-left side and pushed the tech stack block up to `bottom-[35%]`. Built a custom smooth GSAP transition that scales the project title by `+2px` (`scale: 1.11` lock on baseline `transformOrigin: "left bottom"`) on project open, returning to default on dismiss. | 2026-05-29 |
| 66 | Scroll-Drawn Title Underline | Designed a `white/80` absolute border underline positioned within a relative wrapping block directly under the project title, and animated it to draw out dynamically (`scaleX: 0` -> `1`) via GSAP ScrollTrigger as the user scrolls to each 3D carousel scene to capture attention. | 2026-05-29 |
| 67 | Layout-Aware Scroll Pacing | Configured scroll typewriter and drawing triggers to start at `top 70%` (when titles/lines scroll onto the screen) and end at `top 15%`, using smooth inertia variables (`scrub: 1.2`) to prevent speed rushes and ensure premium visibility. | 2026-05-29 |
| 68 | Cinematic Trigger-Once Typewriter | Converted typewriter (titles, descriptions) and underline triggers to execute once at a premium, fixed speed (`stagger: 0.012` for titles, `stagger: 0.006` for descriptions, `1.0s` for line draws) when entering the viewport at `top 60%`, resetting on reverse scrolling (`toggleActions: "play none none reverse"`) to eliminate speed variations and ensure 100% stable visibility. | 2026-05-29 |
| 69 | Instant state-clearing clicks | Removed delayed timeline callbacks and setTimeouts from closeDetails and handleCardClick to set states instantly, eliminating double-click locks and guaranteeing highly responsive toggle actions. | 2026-05-29 |
| 70 | Hover Video Website Preview | Designed a stark, top-right `VISIT WORK ↗` project link accompanied by a floating video preview card with a thin brand-red (`#AB1509`) border and square corners. Hovering triggers an auto-playing, muted, looping high-fashion video preview (`autoPlay muted loop playsInline`), disappearing instantly when hover ends. | 2026-05-29 |
| 71 | Sibling clip-path isolation | Isolated the `details-wipe-reveal` clip-path styling to a dedicated inner wrapper around the `a` link, rendering the floating video card as a sibling to escape clip-path overflow masking, guaranteeing 100% hover visibility. | 2026-05-29 |
| 72 | Immersive Global Interface Hiding | Programmed GSAP animations to smoothly slide and fade away the global menu button (`.menu-trigger-wrap`) and the "Selected Work" section label (`.selected-work-label`) when any details overlay is active, restoring them dynamically on details close or scroll dismissal to maximize visual immersion. | 2026-05-29 |
| 73 | Flat 2D Parent Click Interceptor | Relocated `onClick` triggers from 3D transform cards to the flat, absolute 2D `.work__carousel` parent wrapper, adding `pointer-events-auto z-20` to cure WebKit/Blink 3D hit-testing flake completely and ensure instant, single-click responses. | 2026-05-29 |
| 74 | React-State Selected Work Label Hide | Used React-state conditional class bindings and CSS transitions to reliably fade and translate the Selected Work section label away when any project details page is active, eliminating potential GSAP target failures. | 2026-05-29 |
| 75 | Widescreen Widescreen aspect-ratio Tooltip Card | Adopted a standard 16:9 widescreen layout (`w-[320px] aspect-video`) for the absolute project website preview card, letting video frames draw fully without horizontal cropping. | 2026-05-29 |
| 76 | Immerse Link-Hover Backdrop Dimming | Implemented smooth 500ms transition-opacity dimming on active project elements (carousel: 0.25, title: 0.35, approach: 0.25, description: 0.25, tech icons: 0.25, grid lines: 0.15) when hovering "VISIT WORK" to highlight the preview card and focus interaction. | 2026-05-29 |

---

## Open Questions

| # | Question | Priority | Owner |
|---|---|---|---|
| 1 | Should we implement subpages or internal components following the new design system guidelines? | Medium | Dev |

---

## Notes

- Color hexes: Deep Rich Red (`#AB1509`), Soft Yellow (`#fff7d3`), Deep Pitch Black (`#050505`).
- Font scales: Heading is Tusker Standard (`var(--font-tusker-standard)`), labels are PP Neue Montreal Bold, body is Neue Montreal Light.
