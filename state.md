# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Feature Development – Contact Section Scroll Effects`
- **Status:** `Complete`
- **Last Updated:** `2026-06-04`

---

## Last Session Work

### Summary
Added a vertical list of social profile links (GitHub, LinkedIn, Instagram, X) stacked line by line below the contact phone link. Styled links in red smaller font, complete with interactive rolling hovers that flip to white, and integrated them into the GSAP staggered shutter-wipe entrance animation.

### Files Changed
| File                        | Change Type | Notes                                |
|-----------------------------|-------------|--------------------------------------|
| `components/Contact.tsx`    | Modified    | Added social links vertical stack and integrated them into the GSAP reveal stagger target |

---

## Decisions Made

| # | Decision                              | Rationale                                      | Date       |
|---|---------------------------------------|-------------------------------------------------|------------|
| 1 | Title: "What I alt-tab to"            | User chose this from brainstormed options       | 2026-06-02 |
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




