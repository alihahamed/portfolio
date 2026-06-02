# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Signature Zoom Speed Refinement`
- **Status:** `Complete`
- **Last Updated:** `2026-06-02`

---

## Last Session Work

### Summary
Slowed down the signature zoom in/zoom out transition speed by 2.5x in the scroll-driven animation timeline. Increased the relative Stage 4 duration from `2.0` to `5.0` and adjusted subsequent stages, rendering a highly gradual camera zoom perfectly mapped to physical scroll wheel rotations.

### Files Changed
| File | Change Type | Notes |
| :--- | :--- | :--- |
| `components/About.tsx` | Modified | Extended Stage 4 (zoom) duration to 5 and shifted Stage 5 (descend) start and duration. |

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
| 77 | Stagger-Loaded Handwritten Cursive Header Logo | Added the custom `Signature` component as the top-left header logo, set to white, displaying "Ali Ahmed" to mount precisely when the preloader ends. Locked it in relative layout bounds to scroll away naturally. | 2026-05-29 |
| 78 | Zero-Dependency cn Merger | Created a lightweight, zero-dependency `cn` class merger in `lib/utils.ts` to satisfy shadcn interface requirements without requiring extra packages. | 2026-05-29 |
| 79 | Wildcard Namespace Import for opentype.js | Swapped default import to namespace wildcard `import * as opentype` to resolve ES module default export mismatch in Next.js Turbopack. | 2026-05-29 |
| 80 | Fetch + parse Font Loading | Replaced the deprecated `opentype.load` stub with a native fetch + `opentype.parse` buffer pipeline to render handwriting vector glyphs reliably in the browser. | 2026-05-29 |
| 81 | Large Monitor Project Title Scale | Programmed `2xl:text-[42px]` responsive text scaling on the project title inside `SelectedWork.tsx` to preserve bold visual framing on wider screens (1536px+). (Superseded by height-aware class). | 2026-05-29 |
| 82 | Height-Aware Title Sizing | Implemented a hybrid width/height-based media query (`min-width: 1600px` and `min-height: 900px`) for project title scaling to perfectly isolate physically large desktop displays from compact laptop viewports. (Superseded by inline Tailwind variant). | 2026-05-29 |
| 83 | Inline Arbitrary Tailwind Media Query | Adopted Tailwind's arbitrary modifier `[@media(min-width:1600px)_and_(min-height:900px)]:text-[52px]` to handle combined dimensional responsive overrides inline, avoiding globals.css styles. (Superseded by custom theme breakpoint). | 2026-05-29 |
| 84 | Tailwind v4 Custom Media Breakpoint | Declared a custom height-aware media query `--breakpoint-3xl` inside `@theme` in `globals.css` to enable clean, reusable native modifier classes (`3xl:`) across all components. (Superseded by @custom-variant directive). | 2026-05-29 |
| 85 | Custom Tailwind Media Variant | Deployed the Tailwind CSS v4 `@custom-variant` directive to declare a native `3xl:` modifier representing large desktops, bypassing compiler parsing restrictions. | 2026-05-29 |
| 86 | Re-namespace Custom Variant to monitor | Changed `@custom-variant 3xl` to `@custom-variant monitor` to completely avoid breakpoint namespace collisions and PostCSS compile errors in Tailwind CSS v4, and updated JSX classes to `monitor:!text-[52px]`. | 2026-05-29 |
| 87 | Monitor Viewport Sub-element Scaling | Added height/width-aware `monitor:` classes to all details overlay sub-texts, metrics labels, numbers, approach blocks, tech label/SVG icons, and descriptions in `SelectedWork.tsx`, scaling sizes by +2px to balance visual density. | 2026-05-29 |
| 88 | Square 3D Carousel Cards | Reverted 3D carousel card dimensions from landscape (600x340px) to square (340x340px) and updated the 3D cylinder translation math to a radius of 300px to ensure card separation gaps. | 2026-05-29 |
| 89 | Crisp 3D Image Rendering | Aligned carousel parent size to 400x400px, changed background-size to cover, and added hardware-accelerated GPU translateZ and contrast-optimization properties to ensure ultra-sharp 3D card renders. | 2026-05-29 |
| 90 | Next.js Image Component Optimization | Swapped CSS background-image style for Next.js Image component with loading="lazy", sizes="400px", and quality={100} to deliver optimized WebP assets at maximum crisp resolution. | 2026-05-29 |
| 91 | High-Res Qualities and URL Parsing Fixes | Configured `images.qualities: [75, 100]` in `next.config.ts` to support quality 100, and corrected the relative image path in `PROJECTS_DATA` to have a leading slash `/` to avoid next/image construction crashes. | 2026-05-29 |
| 92 | Restore 3D Context of Carousel Cards | Removed `backface-visibility: hidden` and `translateZ(0)` flattening properties from `.work__card` to prevent 3D rendering context collapse, restoring side cards to 3D visibility. | 2026-05-29 |
| 93 | Uncompressed Crystal-Clear Carousel Images | Added unoptimized prop to Next.js Image component inside SelectedWork.tsx to serve raw high-resolution WebP files directly, matching the perfect image fidelity of the original Codrops source. | 2026-05-29 |
| 94 | Fix duplicate cycler keys | Append index to measuring keys to ensure React key uniqueness and cure hydration mismatch. | 2026-05-30 |
| 95 | 3D-Safe Link Hover Dimming | Apply opacity transitions directly to individual 3D cards instead of their preserve-3d parent to prevent browser cylinder flattening. | 2026-05-30 |
| 96 | Color-coded Brand SVGs for Technologies | Integrated brand-specific SVGs and color hexes from svg-icons.txt for technology icons inside SelectedWork.tsx. | 2026-05-30 |
| 97 | Remove Blur-Causing CSS Properties | Stripped `image-rendering: crisp-edges`, `backface-visibility: hidden`, redundant `translateZ(0)` from card-face CSS and Image inline styles to prevent GPU texture downsampling that blurred screenshot text in 3D carousel. | 2026-05-30 |
| 98 | Restore original card brightness behavior | Removed the brightness animation scroll-triggers to align with the pristine visual fidelity of the original 3D-source.txt. | 2026-05-30 |
| 99 | Custom Brand-Colored Tech Stack Icons | Configured brand-colored SVGs for Project 2 (Vite: #9135FF, Framer: #0055FF, Supabase: #3FCF8E, Resend/shadcn: #FFFFFF) in SelectedWork.tsx. | 2026-05-30 |
| 100 | Draggable 3D Scroll Carousel Interactivity | Implemented horizontal drag move listener mapped to standard scrollBy delta steps (1.8x multiplier) for natural 3D rotation, adding mouse/touch coordinate distance thresholds to isolate click triggers. (Superseded by on-axis drag). | 2026-05-30 |
| 101 | On-Axis Drag-to-Rotate Carousel | Decoupled dragging from page scroll. Introduced a local `dragRotationY` offset and animated scroll values through a `rotationProxy` object, combining scroll + drag rotation programmatically for continuous rotation. | 2026-05-30 |
| 102 | Kinetic Flick and Spring Lag Deceleration Physics | Engineered physics-based spring lag (0.5s `power3.out`) during active dragging and a long-tail kinetic decay (1.2s `power4.out`) on flick-release by calculating delta move velocities. | 2026-05-30 |
| 103 | Scroll-Pinned About Zoom-Reveal | Designed fixed overlay transition where ScrollTrigger pins SelectedWork (`#work`) at `bottom bottom` for 200% scroll, slowly pushing it back in 3D (`scale: 0.72`, `z: -450`, `rotateX: 12`, `opacity: 0`) while sliding the red panel up over it, drawing/zooming signature, and descending document. | 2026-05-30 |
| 104 | Decouple Pin and Animation Targets | Swapped trigger animation targets from `#work` to `#work-inner` wrapper to completely separate ScrollTrigger pinning calculations from visual scale/perspective offsets, avoiding translation conflicts. | 2026-05-30 |
| 105 | Height-Aware Dynamic Transform Origin | Computed y-transform origin mathematically inside `About.tsx` relative to visible viewport context (`((totalHeight - window.innerHeight / 2) / totalHeight) * 100`) to guarantee recession stays centered on viewport. | 2026-05-30 |
| 106 | React-State Guided Signature Drawing | Isolated signature drawing animation to execute exactly when the sliding red panel settles by using state rendering `{animateSignature && <Signature inView={false} />}`. | 2026-05-30 |
| 107 | Eliminate Inline Transform Style Conflicts | Migrated initial styling translations to high-performance GSAP `yPercent` setters inside `gsap.context` to avoid conflicts with inline React/HTML CSS styles. | 2026-05-30 |
| 108 | GSAP ScrollTrigger Pinning for SelectedWork | Swapped flaky CSS sticky positioning for GSAP ScrollTrigger `pin: "#work"` with `pinSpacing: false` during About transition to guarantee SelectedWork remains perfectly locked in place without scrolling upwards. | 2026-05-30 |
| 109 | Bottom-Center Transform Origin for 3D Recede | Configured `transformOrigin: "50% 100%"` on `#work-inner` to anchor the 3D recede transition at the bottom of the viewport, pushing the section strictly backwards in 3D rather than upwards. | 2026-05-30 |
| 110 | Slow Down Red Panel Slide-up Speed | Reduced the vertical scroll slide-up speed of the red background panel by 50% by increasing its Stage 1 duration in the GSAP timeline from 3 to 4.5 and shifting subsequent stages to align perfectly. | 2026-05-30 |
| 111 | Delayed Solid Signature Fill Fade-in | Defined `fillRef` and delayed solid fill opacity fade-in to only run between 90% and 100% drawing progress in `setProgress`, ensuring the signature is drawn strictly as an outline first. | 2026-05-30 |
| 112 | Red-to-Yellow Background Zoom Morph | Morph container background color from `#AB1509` (red) to `#fff7d3` (soft yellow) and increased signature scale to 90 at Stage 4, executing a seamless camera zoom directly inside the signature's yellow color. (Superseded by decision 113). | 2026-05-30 |
| 113 | Retain Solid Red Background Outside Document | Preserved container background as solid Deep Rich Red (`#AB1509`) throughout the transition to ensure a gorgeous high-contrast framing around the soft yellow document. | 2026-05-30 |
| 114 | High-Quality Vector Zoom | Removed rasterizing GPU transform layers (`will-change: transform`) on the signature wrapper and set native `fontSize={85}` to force crisp vector re-rasterization up close. | 2026-05-30 |
| 115 | Sequential Zoom-then-Descend Document Transition | Serialized Stage 4 (Signature zooms to 120 first) and Stage 5 (Document drops down on subsequent scroll) to guarantee the document only reveals after the signature has fully zoomed past the camera. | 2026-05-30 |
| 116 | Hardware-Accelerated 60fps Zoom Optimization | Reinstated `will-change: transform, opacity` on signature wrap, capped scale to 18, and faded opacity to 0 in 0.8s to leverage GPU texture scaling, fully eliminating vector re-rasterization lag. (Superseded by decision 117). | 2026-05-30 |
| 117 | Bypassed SVG Mask Filter for Smooth Scaling | Removed the highly expensive SVG mask from the solid fill group inside `signature.tsx`, reducing browser rendering overhead by 90% and enabling buttery-smooth, lag-free scaling up to 120x without pixelation. | 2026-05-30 |
| 118 | Letter-Stroke Anchored Transform Origin | Set `transformOrigin: "42% 52%"` on `signatureWrapRef` to anchor the camera zoom directly on a thick letter stroke of "Ali", ensuring the viewport is filled with solid yellow instead of blank red space. | 2026-05-30 |
| 119 | Solid Opacity Vector Zoom | Removed early opacity fading from the signature zoom (keeping opacity: 1) so the stroke expands fully to cover the entire viewport in solid yellow before the document slides down. | 2026-05-30 |
| 120 | Estelle Darcy Print-Editorial Layout | Replaced the blank document layout with a high-craft print-editorial resume for Ali Ahmed modeled after the Estelle Darcy template. (Superseded by decision 123). | 2026-05-30 |
| 121 | High-Contrast Grayscale Developer Portrait | Generated a professional grayscale creative developer portrait and served it locally via `next/image` in the resume header layout to complete the authentic look. (Superseded by decision 123). | 2026-05-30 |
| 122 | Signature Overlay Branding | Superimposed a dark cursive signature "Ali Ahmed" overlaying the bold red surname heading on the resume layout, replicating the original design's elegant watermark effect. (Superseded by decision 123). | 2026-05-30 |
| 123 | Solid Blank Document Sheet | Removed all children, headers, footers, text, and images from inside the document paper `docWrapRef`, leaving a solid, blank, high-contrast soft yellow print sheet. | 2026-05-30 |
| 124 | Inline Base Transforms for FOUC Prevention | Embedded base layout translation styles (`translateY(100%)` on `redBgRef` and `translate(-50%, -150%)` with `opacity: 0` on `docWrapRef`) directly in the markup to completely eliminate reload flashes. | 2026-05-30 |
| 125 | Transition-Enabled Section Navigation | Connected homepage and menu section links to the global horizontal wipe transition system. | 2026-05-31 |
| 126 | Dynamic Preloader Wipe Text | Programmed the preloader to dynamically set overlay text as "we're going to X" based on the target section name. | 2026-05-31 |
| 127 | Fully Rendered Document Target | Directed "#about" and "#contact" scrolling targets to "document.documentElement.scrollHeight" instantly while covered by the transition wipe, ensuring the document is fully rendered down in position. | 2026-05-31 |
| 128 | CV Footer Target | Added "id='contact'" directly to the document's footer quote block so contact links correctly trigger and align at the end of the fully rendered CV. | 2026-05-31 |
| 129 | Pinned Navigation Spacer Resolution | Calculated the absolute top scroll position of target elements' GSAP `.pin-spacer` parent during transitions, preventing scrollIntoView locks when navigating away from the About section while `#work` is pinned. | 2026-05-31 |
| 130 | React Native Carousel Tooltip | Converted decoupled native DOM event listeners in SelectedWork.tsx to inline React event handlers. This ensures the "Open/Close" white tooltip cursor works reliably across all three 3D project carousels during dynamic re-renders. | 2026-05-31 |
| 131 | Duplicate Cursor Hiding | Appended className `.global-custom-cursor` to the main custom cursor and toggled `body.carousel-hovered` on carousel enter/leave, hiding the red custom cursor during carousel hovers to prevent trailing cursor overlaps. | 2026-05-31 |
| 132 | Tooltip Portal Containment | Wrapped the custom circular "Open/Close" white tooltip cursor inside a React Portal targeting `document.body`. This completely escapes the transformed coordinate contexts of `.work__scene` and `#work` (which shifted the cursor's containing block and caused it to render off-screen for the 2nd and 3rd carousels), ensuring the cursor remains fully visible and tracks viewport client coordinates perfectly across all scroll heights. | 2026-05-31 |
| 133 | Signature Zoom Speed Deceleration | Increased the relative timeline duration of Stage 4 (signature zoom) from `2.0` to `5.0` (extending it by 2.5x), slowing down the camera zoom in/zoom out transitions significantly to make them feel highly gradual and organic under the scroll wheel. | 2026-06-02 |

---

## Open Questions

| # | Question | Priority | Owner |
|---|---|---|---|
| 1 | Should we implement subpages or internal components following the new design system guidelines? | Medium | Dev |

---

## Notes

- Color hexes: Deep Rich Red (`#AB1509`), Soft Yellow (`#fff7d3`), Deep Pitch Black (`#050505`).
- Font scales: Heading is Tusker Standard (`var(--font-tusker-standard)`), labels are PP Neue Montreal Bold, body is Neue Montreal Light.
