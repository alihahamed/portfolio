# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Mobile & Tablet Responsiveness – About`
- **Status:** `Complete`
- **Last Updated:** `2026-06-11`

---

## Last Session Work

### Summary
Centered the physical folder ("How I Work" component) vertically in both desktop and mobile layouts. Added vertical side grid lines (`reveal-line-v` at `left-[16px]` and `right-[16px]`) and edge-to-edge horizontal divider lines (`reveal-line-h` with negative horizontal margins) to the mobile layout of the resume document in `components/Document.tsx`, connecting them to mimic the large-screen blueprint grid layout. Preserved all user manual adjustments to folder size, padding, and scaling. Implemented tap-triggered tooltips for interest icons on mobile viewports with click-outside dismissal and a 3-second auto-hide timer.

### Files Changed
| File                                   | Change Type | Notes                                |
|----------------------------------------|-------------|--------------------------------------|
| `components/Document.tsx`               | Modified    | Centered folder, added connected mobile grid lines, and implemented mobile tap tooltips. |

---

## Decisions Made

| # | Decision                              | Rationale                                      | Date       |
|---|---------------------------------------|-------------------------------------------------|------------|
| 1 | Use flex order for responsive Hero stack | Allows Score and Stats to stack cleanly on mobile/tablet without breaking absolute placement on desktop | 2026-06-10 |
| 2 | Set Signature font size to 24 with responsive class | Scales the loaded SVGs sharp stroke vector path cleanly | 2026-06-10 |
| 3 | Restrict mobile menu overlay to 50vw with minimum | Meets design criteria of covering half screen width without overflow on narrow screens | 2026-06-10 |
| 4 | Title: "What I alt-tab to"            | User chose this from brainstormed options       | 2026-06-02 |
| 2 | Reuse DraggableSkill for interests    | Same visual/interaction pattern as skills       | 2026-06-02 |
| 3 | Empty src in interests array          | User will add icons themselves                  | 2026-06-02 |
| 4 | Use nested wrapper architecture       | Isolates text tooltips from parent 3D rotation, tilt, and CSS filter flattening, resolving blur and subpixel rasterization issues | 2026-06-02 |
| 5 | Live IST Clock with tabular-nums      | Tabular numbers prevent inline layout shifting as dynamic seconds increment | 2026-06-02 |
| 6 | Timeline Callbacks for Reveals        | Synchronizes entrance triggers directly with master timeline progress, avoiding physical scroll height and coordinate mismatches | 2026-06-02 |
| 7 | Premium Editorial Animation Style     | Replaced generic fades and springy 3D effects with luxury editorial slide-ups and plotter clipping masks for a high-end feel | 2026-06-02 |
| 8 | Remove Opacity Fade-in Animations     | Avoids cheap transparent crossfades, instead using crisp shutter reveals and geometric pops to align with the bold brutalist aesthetic | 2026-06-02 |
| 9 | Strip Staggered Letter DOM Nodes      | Replaced CPU-heavy letter staggers with single container clip-path wipes, reducing active DOM node footprint and preventing scroll-scrub stutter | 2026-06-02 |
| 10| Unclipped Folder Reveal Translation   | Slides up from y: 150 without a clipping mask to allow fanned cards to overflow unclipped at the top boundary | 2026-06-02 |
| 11| Stacking Lift for Draggable Stickers  | Dynamically raises z-index to 999 on hover and 1000 on drag to keep active stickers and tooltips floating at the top of the stack | 2026-06-02 |
| 12| Isolate Interests Title Shutter Mask  | Moved the reveal-interests-title class onto the h2 itself instead of wrapping the entire interests section. This avoids parent clipPath mask clipping overflowing tooltips | 2026-06-02 |
| 13| Block-Render Script for Preloader     | Executing a script at the top of the body before layout paints guarantees that fresh sessions are instantly hidden, preventing hero flash | 2026-06-02 |
| 14| Instant Glow & Canvas Fade-in         | Uses an SSR-ready radial gradient glow for immediate visual feedback and fades in the WebGL canvas dynamically to prevent canvas snap | 2026-06-02 |
| 15| Use scale over clipPath for circle    | GPU-accelerated scaling transforms on a circular div are more performant and cross-browser stable than complex CSS clip-path interpolation on large screens (Replaced by Decision 18) | 2026-06-02 |
| 16| Raise Contact z-index to z-[60]      | Allows the contact section to stack on top of the fixed z-30/z-50 elements in the preceding About section as it scrolls up, enabling the transparent overlap reveal | 2026-06-03 |
| 17| Wipe reveal for CONTACT heading       | Synchronizes the bold title entrance with the final 40% of the scroll timeline, ensuring high-contrast visibility only after the black background covers the screen | 2026-06-03 |
| 18| Fixed Viewport clipPath circle reveal | Using a fixed inset-0 viewport container with clip-path: circle(R at 50% 100%) prevents the circle from being clipped by the parent scrolling section and ensures a perfect, centered circle curve | 2026-06-03 |
| 19| Increased Contact height to h-[200vh] | Doubles the scroll distance of the scrub, letting the circular background reveal expand slowly and elegantly instead of snapping instantly (Replaced by Decision 22) | 2026-06-03 |
| 20| Pin resume longer via About hold    | Increased About section height to h-[400vh] and added a 100vh scroll hold (6.1 units) at the end of the timeline. This keeps the fully-rendered resume pinned stationary before entering the contact section circular reveal | 2026-06-03 |
| 21| Reduce line drawing delay by 1.5s    | Adjusted blueprint grid lines drawing delay from 3.5s to 2.0s in About.tsx to trigger line drafting faster after text elements settle | 2026-06-03 |
| 22| Fluid catch-up with scrub: 2 & 300vh  | Slows down the circle background reveal on scroll and adds a smooth 2-second lag catch-up for luxurious fluid feel | 2026-06-03 |
| 23| Two-stage Contact title translation   | Animates title from bottom (y: 50vh) to center (y: 0) as circle expands, then translates it left (x: -24vw) in the final 40% of scroll | 2026-06-03 |
| 24| Double parallax for About section     | Animates doc wrapper up by yPercent: -130 and red background by yPercent: -80 during circle expansion to create a strong layered depth | 2026-06-03 |
| 25| Change Contact title & scale down     | Replaced CONTACT with HAVE AN IDEA?, reduced size to text-[8vw] md:text-[10vw], and set left translate to x: -14vw to keep text on-screen | 2026-06-03 |
| 26| Pivot to absolute position layout     | Positioned heading top-left (2px margins) using CSS, and animated from center using negative xPercent/yPercent and window width/height multipliers to guarantee perfect margin-of-2 alignment at completion | 2026-06-03 |
| 27| Add email and bottom-left text        | Added aliahmedyus@gmail.com and a custom editorial statement using CSS absolute positions and GSAP physical clip-path mask reveals | 2026-06-03 |
| 28| Sequential transition timing schedule | Re-scheduled GSAP timelines to stage reveals sequentially (0-0.5 for header centering, 0.5-0.75 for header top-left slide, 0.75-1.0 for email and statement reveals) | 2026-06-03 |
| 29| Email roll-swap hover interaction     | Implemented high-fidelity text rolling swap on hover using CSS translation and snapping SVG arrow slide-in | 2026-06-03 |
| 30| Fixed document component visibility    | Raised circle container z-index to z-[60] and used GSAP timeline set() to hide the preceding .about-red-bg panel (containing the document) at progress 0.5 to prevent visual bleed and stacking leakage | 2026-06-03 |
| 31| Red/Black Saturated Gradient          | Gradient blend of black (#000000) and highly saturated red (#ff1500) | 2026-06-03 |
| 32| Removed Noise Overlay                 | Removed the SVG noise overlay per user preference to focus on pure, high-saturation color gradient blend | 2026-06-03 |
| 33| Scroll-Linked Gradient Shift          | Animated backgroundPositionY from 100% to 0% linearly over the entire GSAP timeline to slowly move the gradient on user scroll | 2026-06-03 |
| 34| Phone Link Interaction                | Implemented +91 8867145921 link that rolls to "call me" with custom phone SVG icon on hover | 2026-06-03 |
| 35| Unified Details Wrapper               | Groups email and phone links inside vertical flex container below the header to preserve modular responsive layout | 2026-06-03 |
| 36| Staggered Contact Reveals             | Staggers the entrance animations of email and phone links via GSAP array target stagger | 2026-06-03 |
| 37| Remove Image Entrance Animations      | Removed entrance animations for skills, interests, and portrait images to keep them static from mount | 2026-06-04 |
| 38| Unified Real-Time Sequential Reveals  | Created a single sequential timeline (entranceTimeline) for text/grid reveals that plays in real-time with a 0.3s delay between steps | 2026-06-04 |
| 39| Reduced Grid Line Delay               | Removed the 2-second delay from grid line draws to animate them immediately on trigger | 2026-06-04 |
| 40| Instant Animation Redaction           | Configured entranceTimeline to seek to time 0 and pause instantly when user scrolls back up, keeping the layout clean and snappy | 2026-06-04 |
| 41| Static Folder Component               | Removed entrance animation from the folder (image badge) to keep all document image-like assets static on load | 2026-06-04 |
| 42| Quote Slide-Up & Fade Entrance        | Replaced clipPath wipe with a clean slide-up + fade entrance for the Bertrand Russell quote | 2026-06-04 |
| 43| Slowed Document Descent               | Extended document drop duration from 5 to 7 units in scroll timeline to slow down descent speed | 2026-06-04 |
| 44| Document Pendulum Swing               | Implemented keyframe-like Z-axis rotation swing sequence on the document container anchored at the top-center (transformOrigin: 50% 0%) to simulate realistic gravity physics (rotation widened to 3.5° max for prominence) | 2026-06-04 |
| 45| Remove ScrollTrigger boundary snaps   | Removed instant `gsap.set` in ScrollTrigger callbacks to let scrub catch-up handle transition boundaries smoothly and prevent sudden exit snap | 2026-06-04 |
| 46| Fine-tune Contact parallax speeds      | Reduced target translations of .about-doc-wrap (yPercent: -35) and .about-red-bg (yPercent: -15) to make them ascend slowly under the expanding contact circle, creating visible depth | 2026-06-04 |
| 47| Animated status badge on header         | Wrapped contact header in flex container to host status badge, keeping it hidden (opacity: 0) during transit and revealing (fade/slide) at progress 0.75 | 2026-06-04 |
| 48| Increased contact link heights        | Swapped h-[1.2em] leading-none with h-[1.35em] leading-[1.35] on contact links to give font descenders enough vertical space and prevent clipping | 2026-06-04 |
| 49| Dynamic display toggle on About overlay| Set display: none on .about-red-bg during onLeave and onLeaveBack, and display: "" on onEnter and onEnterBack. This prevents the red background from overlaying and clipping the Selected Work section during scrollback and initial load | 2026-06-04 |
| 50| 9:16 borderless Contact images         | Set aspect ratio to 9:16, removed borders, and sourced images to where-you-going.png and you-consumed-enough.png using Next.js Image for a premium borderless layout | 2026-06-04 |
| 51| Contact sequential image entry & parallax| Programmed Project A frame to enter from top (progress 0.45-0.70) and Project B frame from bottom (progress 0.70-0.95), with both inner images animating scroll-down parallax (yPercent: -12 to 12) scaled to 1.35x to avoid edge gaps | 2026-06-04 |
| 52| Absolute status badge centering fix     | Positioned status badge absolute at left-[calc(100%+16px)] so it does not add to the width of the heading container. This makes GSAP center "have an idea?" text perfectly in the viewport | 2026-06-04 |
| 53| Single larger Project B image card     | Removed Project A image card, enlarged Project B card to w-[18vw] with a matching aspect ratio of 9:16, and shifted its entry animation to trigger after all information has revealed at progress 0.80. Managed scale: 1.15 in GSAP to prevent style conflicts and text cropping | 2026-06-04 |
| 54| Eased image entrance scroll timing     | Updated slide-in ease to "power2.inOut" to prevent sudden velocity transitions and make the entrance feel smoother, keeping duration at 0.20 of the scroll trigger | 2026-06-04 |
| 55| Red social links stack below phone     | Added GitHub, LinkedIn, Instagram, and X links vertically stacked below the phone number, styled in red (#AB1509) smaller font (text-[12px] md:text-[1.8vw]) with rolling hovers to white (#fff7d3). Integrated them into the GSAP staggered wipe-down timeline | 2026-06-04 |
| 56| Dynamically center signature zoom origin| Calculated transformOrigin in pixels based on screen size, centering the offset so large monitors zoom directly into the signature stroke instead of empty space | 2026-06-05 |
| 57| Isolate signature base scale to inner container| Wrapped signature in a `.signature-scale-container` that scales around its center. Keeps parent wrapper at `scale: 1` initially to prevent layout shift of centered element before zoom starts | 2026-06-05 |
| 58| Dynamic percentage-based transform origin| Replaced pixel-based units with screen percentages, explicitly defined it in the context/timeline tween, and removed Tailwind's `origin-center` class from the JSX container to prevent styling overrides | 2026-06-05 |
| 59| Sticky Footer Reveal & Redaction Timeline| Created a separate empty brand-red sticky Footer component (`h-screen`) and configured contact GSAP timeline (1.00 to 1.25) to slide the fixed wrapper off-screen and retract text/image elements with distinct parallax speeds | 2026-06-05 |
| 60| Fixed Footer Reveal with Visibility Toggles| Swapped `display: none`/`flex` with `visibility: hidden`/`visible` to prevent painting latency and eliminate background WebGL canvas flash | 2026-06-05 |
| 61| Full Viewport Sticky Footer Reveal        | Sliding up the contact section `circleRef` by `yPercent: -100` and setting the footer height to `100dvh` creates a seamless full-page reveal without showing the WebGL canvas backdrop | 2026-06-05 |
| 62| Brutalist Editorial Footer Layout         | Implemented huge Tusker Grotesk typography and small responsive tech stack texts aligned in a two-row responsive flex container on a solid brand-red background | 2026-06-05 |
| 63| Scroll Ease and Scrub Tuning              | Configured retraction tweens with `ease: "none"` and scaled duration perfectly to `0.50` (1/3 of a 300vh scroll) to create a perfect 1:1 native scroll illusion without any jarring acceleration gaps | 2026-06-05 |
| 64| Slowed Contact Section Animations         | Extended Contact section timeline to 3.0, slowing down circle expansion, heading movement, sub-info entrance, and retraction | 2026-06-05 |
| 65| Global Scrub Lag Standardization          | Set scrub catch-up lag to 0.8 across About, SelectedWork, and Contact sections to unify scrolling momentum feel | 2026-06-05 |
| 66| Dynamic Corner Rounding on Contact Section | Removed static Tailwind rounding and animated borderBottomLeftRadius/RightRadius dynamically from 0px to 100px/40px (at time 2.6 to 2.9) only as the retraction slide-up starts | 2026-06-05 |
| 67| Contact Scroll Hold and Deferred Footer   | Added a scroll hold (time 2.0 to 2.6) where the fully revealed Contact section sits static with sharp corners, and deferred footer visibility to progress > 0.66 | 2026-06-05 |
| 68| Strengthened Contact Elements Retraction  | Increased retraction yPercent values to -75 for Image B and -120 for text/links, using a staggered timeline amount of 0.15 to sweep them off-screen strongly | 2026-06-05 |
| 69| Retraction Matching for Scroll Hold       | Stretched retraction duration to 1.30 and total timeline to 3.90 to maintain exactly 1/3 ratio, guaranteeing 1:1 speed alignment with native scroll | 2026-06-05 |
| 70| Localize SilkBackground to Hero Section   | Moved SilkBackground from global layout.tsx to the relative-positioned components/Hero.tsx container, changing its CSS position from fixed to absolute to scroll away naturally with scroll momentum | 2026-06-05 |
| 71| Hero Section Componentization             | Refactored Hero state, timers, custom entrance timelines, and layouts into a standalone Hero component to simplify page.tsx and improve bundle isolation | 2026-06-05 |
| 72| Footer Visible Behind Contact Seam        | Keeps the red fixed footer visible during contact covered range so scrub lag cannot expose the app background between contact and footer | 2026-06-05 |
| 73| Full Contact Trigger Footer Backing       | Keeps the footer visible for the entire active contact trigger so reverse scroll never crosses a hidden-footer threshold | 2026-06-05 |
| 74| Slower Signature Zoom Parallax            | Extends signature zoom duration and adds viewport-based drift so zoom in/out feels smoother and deeper instead of snapping through the signature | 2026-06-05 |
| 75| Subtle Contact Corner Rounding            | Reduced contact bottom border radius animation target from 100px (desktop) / 10px (mobile) to 24px (desktop) / 8px (mobile) to keep bottom corners only slightly rounded | 2026-06-05 |
| 76| Brutalist Oversized Typographic Footer   | Redesigned footer with a soft yellow background (#fff7d3), solid red bottom block, and giant red 'ALI AHMED' text in Tusker Standard Bold at 22vw with scaleX(1.20) stretching | 2026-06-05 |
| 77| Aggressive Footer Typographic Bury        | Shifted text down by translateY(14%) and scaled vertically to bury the baseline deeply into the red panel | 2026-06-05 |
| 78| Scroll-Driven Footer Text Animation        | Implemented double-wrapper layout (.footer-name-outer and .footer-name-inner) with overflow-hidden and pt-[12vw], animating yPercent (100% to 0%) starting at 2.9 (ease power2.out) via document.querySelector to bypass GSAP scoped context and make the text rise up from behind the red panel | 2026-06-05 |
| 79| Refactor Footer rise to refs               | Registers ScrollTrigger timeline inside Footer.tsx using refs to ensure robust DOM targeting post-hydration/remount | 2026-06-05 |
| 80| Slower synchronized footer text rise       | Increased rise duration from 0.9 to 1.3 and aligned start to 2.6 to stretch animation across the full curtain retraction | 2026-06-05 |
| 81| Clear clipPath to allow shadow bleed       | Setting clipPath to none at time 1.5 allows the new thick viewport-fixed box-shadow to bleed outside the element boundary during slide-up retraction | 2026-06-05 |
| 82| 3-Column Footer Grid Layout                | Replaced the empty red panel with a top-aligned, three-column column grid (tech stack, site transition links, socials) styled in Neue Montreal medium to unify typography | 2026-06-05 |
| 83| Footer links wipe reveal & lets work CTA  | Added lets work text + square background arrow button below navigation column, and synced bottom block contents to rise up together with "ALI AHMED" typography | 2026-06-05 |
| 84| Redesigned Text-Only Rolling Footer CTA    | Changed footer CTA to a text-only, soft yellow rolling transition (from "lets work" to "or settle for average" on hover) to match contact section style and portfolio tone | 2026-06-05 |
| 86| Remove arcade 3D word swap in Hero         | Removed cycling timer, measuring nodes, and slot-machine track markup to display static "Websites" in the entrance timeline | 2026-06-05 |
| 87| Sequential Hero Entrance with 0.1s Gaps    | Ordered entrance timeline to play Hero text, About description, and stats/lines/signature/menu button in sequence with 0.1s offsets | 2026-06-05 |
| 88| Prevent Footer Column Squishing            | Swapped grid-cols-3 with flex justify-between, explicit percentage widths, and shrink-0 to lock column widths during GSAP translation | 2026-06-05 |
| 89| Reduced Content Translate & Padding        | Changed content yPercent from 100 to 30, and padding on monitor from pt-30 (120px) to pt-20 (80px) to prevent vertical overflow clipping | 2026-06-05 |
| 90| Dynamic Footer Visibility                  | Set footer visibility based on progress > 0.66 in Contact scroll timeline to prevent it showing behind transparent preceding sections | 2026-06-05 |
| 91| Laptop Menu Fit Adjustments                | Moved oversized menu link/panel sizes from md: to monitor:, and reduced md: values (text-[4.5rem], pt-20, py-3.5) to fit laptop viewports without scrolling | 2026-06-05 |
| 92| Solid Red Block z-index Over Text          | Added z-10 to top footer section and z-30 to bottom red block to ensure bottom block covers the base of 'ALI AHMED' text | 2026-06-05 |
| 93| Correct Navigation Hash Scroll             | Removed scroll-to-bottom override for #about and #contact in PageTransition.tsx to scroll elements to viewport top and prevent footer bleed | 2026-06-05 |
| 94| Smooth Signature Reverse Zoom              | Converted signature zoom from to() to fromTo() tween in About.tsx to lock initial transforms and prevent layout popping on scroll-back | 2026-06-05 |
| 95| Fixed Contact Navigation Target ID         | Renamed duplicate id='contact' in Document.tsx to 'about-quote' and updated Contact section container to use 'contact' to align with menu links | 2026-06-05 |
| 96| About Navigation Scroll Offset             | Added window.innerHeight * 3.84 offset to #about scroll position in PageTransition.tsx to jump directly to the revealed resume document | 2026-06-05 |
| 97| Expose Lenis globally on window            | Allows immediate virtual scroll updates during programmatic jumps to prevent bounce-backs | 2026-06-05 |
| 98| Move carousel rotation to timeline onUpdate | Forces cylinder rotation to render synchronously when timeline progress is set | 2026-06-05 |
| 99| Adjust About scroll offset to 2.85         | Land early in hold zone to maximize distance from the contact circle trigger | 2026-06-05 |
| 100| Instant transition completion on triggers  | Combined transition check class and ScrollTrigger onUpdate to bypass entrance playing delays during jumps | 2026-06-05 |
| 101| Accelerate contact Image B entrance        | Completes image entrance before the scroll hold begins so it is fully visible upon jump | 2026-06-05 |
| 102| Dynamic route-specific wipe texts          | Configured map and helper function to show unique wipe text for Home, About, Work, and Contact | 2026-06-05 |
| 103| Shift contact animations to 1.8            | Starts link, message, and image entrances only after the heading finishes corner transition at 1.8, aligning retraction symmetrically | 2026-06-05 |
| 104| Rolling text CTA button with Tusker font   | Restored original rolling text CTA style in the footer, styled it with font-tusker-standard, increased size to 36px, and aligned height/line-height to 1.8em to prevent clipping | 2026-06-05 |
| 105| Prominent footer name rise                 | Slowed down Contact retraction and Footer content rise to duration 1.8s starting at 3.0, using power3.out ease | 2026-06-05 |
| 106| Bottom Drawer for mobile/tablet details   | Replaced inline hover overlays with a bottom sheet drawer (h-[75vh]) on tap to avoid screen clutter and fits mobile screens | 2026-06-10 |
| 107| Responsive relative flex stack for Selected Work | Stacks title, carousel, and description vertically with tighter gaps instead of absolute coordinates | 2026-06-10 |
| 108| Disable custom cursors on touch screens    | Hides trailing particle cursor and carousel tooltip cursor below 1024px to match native touch interface | 2026-06-10 |
| 109| Dynamic 3D Carousel Card Dimming         | Calculates face angle relative to screen using Math.cos and applies CSS brightness filter dynamically to cards to enhance depth | 2026-06-10 |
| 110| Center physical folder container          | Centered the folder vertically in mobile view using padding (py-10) and bottom border, and in desktop view using absolute positioning between the 66% and 89% grid lines. | 2026-06-11 |

---

## Open Questions
| 12| Isolate Interests Title Shutter Mask  | Moved the reveal-interests-title class onto the h2 itself instead of wrapping the entire interests section. This avoids parent clipPath mask clipping overflowing tooltips | 2026-06-02 |
| 13| Block-Render Script for Preloader     | Executing a script at the top of the body before layout paints guarantees that fresh sessions are instantly hidden, preventing hero flash | 2026-06-02 |
| 14| Instant Glow & Canvas Fade-in         | Uses an SSR-ready radial gradient glow for immediate visual feedback and fades in the WebGL canvas dynamically to prevent canvas snap | 2026-06-02 |
| 15| Use scale over clipPath for circle    | GPU-accelerated scaling transforms on a circular div are more performant and cross-browser stable than complex CSS clip-path interpolation on large screens (Replaced by Decision 18) | 2026-06-02 |
| 16| Raise Contact z-index to z-[60]      | Allows the contact section to stack on top of the fixed z-30/z-50 elements in the preceding About section as it scrolls up, enabling the transparent overlap reveal | 2026-06-03 |
| 17| Wipe reveal for CONTACT heading       | Synchronizes the bold title entrance with the final 40% of the scroll timeline, ensuring high-contrast visibility only after the black background covers the screen | 2026-06-03 |
| 18| Fixed Viewport clipPath circle reveal | Using a fixed inset-0 viewport container with clip-path: circle(R at 50% 100%) prevents the circle from being clipped by the parent scrolling section and ensures a perfect, centered circle curve | 2026-06-03 |
| 19| Increased Contact height to h-[200vh] | Doubles the scroll distance of the scrub, letting the circular background reveal expand slowly and elegantly instead of snapping instantly (Replaced by Decision 22) | 2026-06-03 |
| 20| Pin resume longer via About hold    | Increased About section height to h-[400vh] and added a 100vh scroll hold (6.1 units) at the end of the timeline. This keeps the fully-rendered resume pinned stationary before entering the contact section circular reveal | 2026-06-03 |
| 21| Reduce line drawing delay by 1.5s    | Adjusted blueprint grid lines drawing delay from 3.5s to 2.0s in About.tsx to trigger line drafting faster after text elements settle | 2026-06-03 |
| 22| Fluid catch-up with scrub: 2 & 300vh  | Slows down the circle background reveal on scroll and adds a smooth 2-second lag catch-up for luxurious fluid feel | 2026-06-03 |
| 23| Two-stage Contact title translation   | Animates title from bottom (y: 50vh) to center (y: 0) as circle expands, then translates it left (x: -24vw) in the final 40% of scroll | 2026-06-03 |
| 24| Double parallax for About section     | Animates doc wrapper up by yPercent: -130 and red background by yPercent: -80 during circle expansion to create a strong layered depth | 2026-06-03 |
| 25| Change Contact title & scale down     | Replaced CONTACT with HAVE AN IDEA?, reduced size to text-[8vw] md:text-[10vw], and set left translate to x: -14vw to keep text on-screen | 2026-06-03 |
| 26| Pivot to absolute position layout     | Positioned heading top-left (2px margins) using CSS, and animated from center using negative xPercent/yPercent and window width/height multipliers to guarantee perfect margin-of-2 alignment at completion | 2026-06-03 |
| 27| Add email and bottom-left text        | Added aliahmedyus@gmail.com and a custom editorial statement using CSS absolute positions and GSAP physical clip-path mask reveals | 2026-06-03 |
| 28| Sequential transition timing schedule | Re-scheduled GSAP timelines to stage reveals sequentially (0-0.5 for header centering, 0.5-0.75 for header top-left slide, 0.75-1.0 for email and statement reveals) | 2026-06-03 |
| 29| Email roll-swap hover interaction     | Implemented high-fidelity text rolling swap on hover using CSS translation and snapping SVG arrow slide-in | 2026-06-03 |
| 30| Fixed document component visibility    | Raised circle container z-index to z-[60] and used GSAP timeline set() to hide the preceding .about-red-bg panel (containing the document) at progress 0.5 to prevent visual bleed and stacking leakage | 2026-06-03 |
| 31| Red/Black Saturated Gradient          | Gradient blend of black (#000000) and highly saturated red (#ff1500) | 2026-06-03 |
| 32| Removed Noise Overlay                 | Removed the SVG noise overlay per user preference to focus on pure, high-saturation color gradient blend | 2026-06-03 |
| 33| Scroll-Linked Gradient Shift          | Animated backgroundPositionY from 100% to 0% linearly over the entire GSAP timeline to slowly move the gradient on user scroll | 2026-06-03 |
| 34| Phone Link Interaction                | Implemented +91 8867145921 link that rolls to "call me" with custom phone SVG icon on hover | 2026-06-03 |
| 35| Unified Details Wrapper               | Groups email and phone links inside vertical flex container below the header to preserve modular responsive layout | 2026-06-03 |
| 36| Staggered Contact Reveals             | Staggers the entrance animations of email and phone links via GSAP array target stagger | 2026-06-03 |
| 37| Remove Image Entrance Animations      | Removed entrance animations for skills, interests, and portrait images to keep them static from mount | 2026-06-04 |
| 38| Unified Real-Time Sequential Reveals  | Created a single sequential timeline (entranceTimeline) for text/grid reveals that plays in real-time with a 0.3s delay between steps | 2026-06-04 |
| 39| Reduced Grid Line Delay               | Removed the 2-second delay from grid line draws to animate them immediately on trigger | 2026-06-04 |
| 40| Instant Animation Redaction           | Configured entranceTimeline to seek to time 0 and pause instantly when user scrolls back up, keeping the layout clean and snappy | 2026-06-04 |
| 41| Static Folder Component               | Removed entrance animation from the folder (image badge) to keep all document image-like assets static on load | 2026-06-04 |
| 42| Quote Slide-Up & Fade Entrance        | Replaced clipPath wipe with a clean slide-up + fade entrance for the Bertrand Russell quote | 2026-06-04 |
| 43| Slowed Document Descent               | Extended document drop duration from 5 to 7 units in scroll timeline to slow down descent speed | 2026-06-04 |
| 44| Document Pendulum Swing               | Implemented keyframe-like Z-axis rotation swing sequence on the document container anchored at the top-center (transformOrigin: 50% 0%) to simulate realistic gravity physics (rotation widened to 3.5° max for prominence) | 2026-06-04 |
| 45| Remove ScrollTrigger boundary snaps   | Removed instant `gsap.set` in ScrollTrigger callbacks to let scrub catch-up handle transition boundaries smoothly and prevent sudden exit snap | 2026-06-04 |
| 46| Fine-tune Contact parallax speeds      | Reduced target translations of .about-doc-wrap (yPercent: -35) and .about-red-bg (yPercent: -15) to make them ascend slowly under the expanding contact circle, creating visible depth | 2026-06-04 |
| 47| Animated status badge on header         | Wrapped contact header in flex container to host status badge, keeping it hidden (opacity: 0) during transit and revealing (fade/slide) at progress 0.75 | 2026-06-04 |
| 48| Increased contact link heights        | Swapped h-[1.2em] leading-none with h-[1.35em] leading-[1.35] on contact links to give font descenders enough vertical space and prevent clipping | 2026-06-04 |
| 49| Dynamic display toggle on About overlay| Set display: none on .about-red-bg during onLeave and onLeaveBack, and display: "" on onEnter and onEnterBack. This prevents the red background from overlaying and clipping the Selected Work section during scrollback and initial load | 2026-06-04 |
| 50| 9:16 borderless Contact images         | Set aspect ratio to 9:16, removed borders, and sourced images to where-you-going.png and you-consumed-enough.png using Next.js Image for a premium borderless layout | 2026-06-04 |
| 51| Contact sequential image entry & parallax| Programmed Project A frame to enter from top (progress 0.45-0.70) and Project B frame from bottom (progress 0.70-0.95), with both inner images animating scroll-down parallax (yPercent: -12 to 12) scaled to 1.35x to avoid edge gaps | 2026-06-04 |
| 52| Absolute status badge centering fix     | Positioned status badge absolute at left-[calc(100%+16px)] so it does not add to the width of the heading container. This makes GSAP center "have an idea?" text perfectly in the viewport | 2026-06-04 |
| 53| Single larger Project B image card     | Removed Project A image card, enlarged Project B card to w-[18vw] with a matching aspect ratio of 9:16, and shifted its entry animation to trigger after all information has revealed at progress 0.80. Managed scale: 1.15 in GSAP to prevent style conflicts and text cropping | 2026-06-04 |
| 54| Eased image entrance scroll timing     | Updated slide-in ease to "power2.inOut" to prevent sudden velocity transitions and make the entrance feel smoother, keeping duration at 0.20 of the scroll trigger | 2026-06-04 |
| 55| Red social links stack below phone     | Added GitHub, LinkedIn, Instagram, and X links vertically stacked below the phone number, styled in red (#AB1509) smaller font (text-[12px] md:text-[1.8vw]) with rolling hovers to white (#fff7d3). Integrated them into the GSAP staggered wipe-down timeline | 2026-06-04 |
| 56| Dynamically center signature zoom origin| Calculated transformOrigin in pixels based on screen size, centering the offset so large monitors zoom directly into the signature stroke instead of empty space | 2026-06-05 |
| 57| Isolate signature base scale to inner container| Wrapped signature in a `.signature-scale-container` that scales around its center. Keeps parent wrapper at `scale: 1` initially to prevent layout shift of centered element before zoom starts | 2026-06-05 |
| 58| Dynamic percentage-based transform origin| Replaced pixel-based units with screen percentages, explicitly defined it in the context/timeline tween, and removed Tailwind's `origin-center` class from the JSX container to prevent styling overrides | 2026-06-05 |
| 59| Sticky Footer Reveal & Redaction Timeline| Created a separate empty brand-red sticky Footer component (`h-screen`) and configured contact GSAP timeline (1.00 to 1.25) to slide the fixed wrapper off-screen and retract text/image elements with distinct parallax speeds | 2026-06-05 |
| 60| Fixed Footer Reveal with Visibility Toggles| Swapped `display: none`/`flex` with `visibility: hidden`/`visible` to prevent painting latency and eliminate background WebGL canvas flash | 2026-06-05 |
| 61| Full Viewport Sticky Footer Reveal        | Sliding up the contact section `circleRef` by `yPercent: -100` and setting the footer height to `100dvh` creates a seamless full-page reveal without showing the WebGL canvas backdrop | 2026-06-05 |
| 62| Brutalist Editorial Footer Layout         | Implemented huge Tusker Grotesk typography and small responsive tech stack texts aligned in a two-row responsive flex container on a solid brand-red background | 2026-06-05 |
| 63| Scroll Ease and Scrub Tuning              | Configured retraction tweens with `ease: "none"` and scaled duration perfectly to `0.50` (1/3 of a 300vh scroll) to create a perfect 1:1 native scroll illusion without any jarring acceleration gaps | 2026-06-05 |
| 64| Slowed Contact Section Animations         | Extended Contact section timeline to 3.0, slowing down circle expansion, heading movement, sub-info entrance, and retraction | 2026-06-05 |
| 65| Global Scrub Lag Standardization          | Set scrub catch-up lag to 0.8 across About, SelectedWork, and Contact sections to unify scrolling momentum feel | 2026-06-05 |
| 66| Dynamic Corner Rounding on Contact Section | Removed static Tailwind rounding and animated borderBottomLeftRadius/RightRadius dynamically from 0px to 100px/40px (at time 2.6 to 2.9) only as the retraction slide-up starts | 2026-06-05 |
| 67| Contact Scroll Hold and Deferred Footer   | Added a scroll hold (time 2.0 to 2.6) where the fully revealed Contact section sits static with sharp corners, and deferred footer visibility to progress > 0.66 | 2026-06-05 |
| 68| Strengthened Contact Elements Retraction  | Increased retraction yPercent values to -75 for Image B and -120 for text/links, using a staggered timeline amount of 0.15 to sweep them off-screen strongly | 2026-06-05 |
| 69| Retraction Matching for Scroll Hold       | Stretched retraction duration to 1.30 and total timeline to 3.90 to maintain exactly 1/3 ratio, guaranteeing 1:1 speed alignment with native scroll | 2026-06-05 |
| 70| Localize SilkBackground to Hero Section   | Moved SilkBackground from global layout.tsx to the relative-positioned components/Hero.tsx container, changing its CSS position from fixed to absolute to scroll away naturally with scroll momentum | 2026-06-05 |
| 71| Hero Section Componentization             | Refactored Hero state, timers, custom entrance timelines, and layouts into a standalone Hero component to simplify page.tsx and improve bundle isolation | 2026-06-05 |
| 72| Footer Visible Behind Contact Seam        | Keeps the red fixed footer visible during contact covered range so scrub lag cannot expose the app background between contact and footer | 2026-06-05 |
| 73| Full Contact Trigger Footer Backing       | Keeps the footer visible for the entire active contact trigger so reverse scroll never crosses a hidden-footer threshold | 2026-06-05 |
| 74| Slower Signature Zoom Parallax            | Extends signature zoom duration and adds viewport-based drift so zoom in/out feels smoother and deeper instead of snapping through the signature | 2026-06-05 |
| 75| Subtle Contact Corner Rounding            | Reduced contact bottom border radius animation target from 100px (desktop) / 10px (mobile) to 24px (desktop) / 8px (mobile) to keep bottom corners only slightly rounded | 2026-06-05 |
| 76| Brutalist Oversized Typographic Footer   | Redesigned footer with a soft yellow background (#fff7d3), solid red bottom block, and giant red 'ALI AHMED' text in Tusker Standard Bold at 22vw with scaleX(1.20) stretching | 2026-06-05 |
| 77| Aggressive Footer Typographic Bury        | Shifted text down by translateY(14%) and scaled vertically to bury the baseline deeply into the red panel | 2026-06-05 |
| 78| Scroll-Driven Footer Text Animation        | Implemented double-wrapper layout (.footer-name-outer and .footer-name-inner) with overflow-hidden and pt-[12vw], animating yPercent (100% to 0%) starting at 2.9 (ease power2.out) via document.querySelector to bypass GSAP scoped context and make the text rise up from behind the red panel | 2026-06-05 |
| 79| Refactor Footer rise to refs               | Registers ScrollTrigger timeline inside Footer.tsx using refs to ensure robust DOM targeting post-hydration/remount | 2026-06-05 |
| 80| Slower synchronized footer text rise       | Increased rise duration from 0.9 to 1.3 and aligned start to 2.6 to stretch animation across the full curtain retraction | 2026-06-05 |
| 81| Clear clipPath to allow shadow bleed       | Setting clipPath to none at time 1.5 allows the new thick viewport-fixed box-shadow to bleed outside the element boundary during slide-up retraction | 2026-06-05 |
| 82| 3-Column Footer Grid Layout                | Replaced the empty red panel with a top-aligned, three-column column grid (tech stack, site transition links, socials) styled in Neue Montreal medium to unify typography | 2026-06-05 |
| 83| Footer links wipe reveal & lets work CTA  | Added lets work text + square background arrow button below navigation column, and synced bottom block contents to rise up together with "ALI AHMED" typography | 2026-06-05 |
| 84| Redesigned Text-Only Rolling Footer CTA    | Changed footer CTA to a text-only, soft yellow rolling transition (from "lets work" to "or settle for average" on hover) to match contact section style and portfolio tone | 2026-06-05 |
| 86| Remove arcade 3D word swap in Hero         | Removed cycling timer, measuring nodes, and slot-machine track markup to display static "Websites" in the entrance timeline | 2026-06-05 |
| 87| Sequential Hero Entrance with 0.1s Gaps    | Ordered entrance timeline to play Hero text, About description, and stats/lines/signature/menu button in sequence with 0.1s offsets | 2026-06-05 |
| 88| Prevent Footer Column Squishing            | Swapped grid-cols-3 with flex justify-between, explicit percentage widths, and shrink-0 to lock column widths during GSAP translation | 2026-06-05 |
| 89| Reduced Content Translate & Padding        | Changed content yPercent from 100 to 30, and padding on monitor from pt-30 (120px) to pt-20 (80px) to prevent vertical overflow clipping | 2026-06-05 |
| 90| Dynamic Footer Visibility                  | Set footer visibility based on progress > 0.66 in Contact scroll timeline to prevent it showing behind transparent preceding sections | 2026-06-05 |
| 91| Laptop Menu Fit Adjustments                | Moved oversized menu link/panel sizes from md: to monitor:, and reduced md: values (text-[4.5rem], pt-20, py-3.5) to fit laptop viewports without scrolling | 2026-06-05 |
| 92| Solid Red Block z-index Over Text          | Added z-10 to top footer section and z-30 to bottom red block to ensure bottom block covers the base of 'ALI AHMED' text | 2026-06-05 |
| 93| Correct Navigation Hash Scroll             | Removed scroll-to-bottom override for #about and #contact in PageTransition.tsx to scroll elements to viewport top and prevent footer bleed | 2026-06-05 |
| 94| Smooth Signature Reverse Zoom              | Converted signature zoom from to() to fromTo() tween in About.tsx to lock initial transforms and prevent layout popping on scroll-back | 2026-06-05 |
| 95| Fixed Contact Navigation Target ID         | Renamed duplicate id='contact' in Document.tsx to 'about-quote' and updated Contact section container to use 'contact' to align with menu links | 2026-06-05 |
| 96| About Navigation Scroll Offset             | Added window.innerHeight * 3.84 offset to #about scroll position in PageTransition.tsx to jump directly to the revealed resume document | 2026-06-05 |
| 97| Expose Lenis globally on window            | Allows immediate virtual scroll updates during programmatic jumps to prevent bounce-backs | 2026-06-05 |
| 98| Move carousel rotation to timeline onUpdate | Forces cylinder rotation to render synchronously when timeline progress is set | 2026-06-05 |
| 99| Adjust About scroll offset to 2.85         | Land early in hold zone to maximize distance from the contact circle trigger | 2026-06-05 |
| 100| Instant transition completion on triggers  | Combined transition check class and ScrollTrigger onUpdate to bypass entrance playing delays during jumps | 2026-06-05 |
| 101| Accelerate contact Image B entrance        | Completes image entrance before the scroll hold begins so it is fully visible upon jump | 2026-06-05 |
| 102| Dynamic route-specific wipe texts          | Configured map and helper function to show unique wipe text for Home, About, Work, and Contact | 2026-06-05 |
| 103| Shift contact animations to 1.8            | Starts link, message, and image entrances only after the heading finishes corner transition at 1.8, aligning retraction symmetrically | 2026-06-05 |
| 104| Rolling text CTA button with Tusker font   | Restored original rolling text CTA style in the footer, styled it with font-tusker-standard, increased size to 36px, and aligned height/line-height to 1.8em to prevent clipping | 2026-06-05 |
| 105| Prominent footer name rise                 | Slowed down Contact retraction and Footer content rise to duration 1.8s starting at 3.0, using power3.out ease | 2026-06-05 |
| 106| Bottom Drawer for mobile/tablet details   | Replaced inline hover overlays with a bottom sheet drawer (h-[75vh]) on tap to avoid screen clutter and fits mobile screens | 2026-06-10 |
| 107| Responsive relative flex stack for Selected Work | Stacks title, carousel, and description vertically with tighter gaps instead of absolute coordinates | 2026-06-10 |
| 108| Disable custom cursors on touch screens    | Hides trailing particle cursor and carousel tooltip cursor below 1024px to match native touch interface | 2026-06-10 |
| 109| Dynamic 3D Carousel Card Dimming         | Calculates face angle relative to screen using Math.cos and applies CSS brightness filter dynamically to cards to enhance depth | 2026-06-10 |

---

## Open Questions

| # | Question                                              | Priority | Owner |
|---|-------------------------------------------------------|----------|-------|
| 1 | Which interest icons to add?                          | High     | User  |
| 2 | Availability indicator still pending implementation?  | Medium   | User  |

---

## Notes

- Interests array has 4 slots with positions/rotations pre-set (bike, ps, pink-floyd, cinema)
- Both skills and interests now use the high-sharpness nested layout structure
- Live Indian Standard Time (IST) clock updates dynamically on mount and runs on a 1-second interval
- Staggered entry utilizes container timelines (14.2s to 18.2s) mapped to the linear sliding coordinates
