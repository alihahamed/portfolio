# Project State

> This file is maintained automatically by the agent. Updated after every change.

---

## Current Phase

- **Phase:** `Feature Development – Editorial Entrance Animations`
- **Status:** `Complete`
- **Last Updated:** `2026-06-02`

---

## Last Session Work

### Summary
Designed and implemented a highly optimized, ultra-premium editorial entrance reveal animation system for the CV document. Completely eliminated all springy/elastic bounces, 3D flips, rotations, and **all opacity-based fade-in animations** to maintain a clean, sophisticated, flat high-contrast aesthetic with near-zero computational overhead:
1. **Grid Lines Wipes (Time 14.2)**: Red blueprint boundary lines dynamically scale in (`scaleY: 0` to `1` for vertical / `scaleX: 0` to `1` for horizontal) using a smooth, hardware-accelerated `power4.inOut` ease, acting as if they are drafted on the screen.
2. **Horizontal/Vertical Plotter Mask Wipes**: Text containers (Header, Education, Profile, Footer) and physical folder components slide and wipe into view using highly performant CSS clipping masks (`clipPath: inset(...)`), with absolutely zero muddy opacity fading.
3. **Smooth 2D Icon Pops**: Draggable Skills and Interests icons smoothly pop out and scale up from invisible (`scale: 0` to `1`) into position using a clean deceleration curve (`power4.out`, duration: 1.4s) and elegant staggering, with zero transparency animations.
4. **DOM & Resource Optimization**: Removed all word-splitting and letter-splitting span wrapper elements (`EditorialText`) in [Document.tsx](file:///c:/Users/aliah/Pictures/portfolio/components/Document.tsx) to restore clean plain-text nodes. This reduces the document size by hundreds of elements, eliminating CPU and layout paint stutter during scroll scrub.

All entrance animations reset smoothly on reverse scroll.

### Files Changed
| File                        | Change Type | Notes                                |
|-----------------------------|-------------|--------------------------------------|
| `components/Document.tsx`   | Modified    | Removed EditorialText component and all character-splitting wraps to optimize DOM overhead |
| `components/About.tsx`      | Modified    | Switched timeline triggers to pure scale and clip-path wipes, stripping all opacity transitions |

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




