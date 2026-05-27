# Design System Specification

Welcome to the official Design System documentation for the portfolio. This document defines our visual identity, core color palette, typography hierarchy, and key layout components as implemented in the codebase.

---

## 🎨 Color Palette

Our identity relies on a high-contrast, tactile, and minimalist color system inspired by brutalist print design and modern motion posters.

| Color | Hex Value | CSS Variable | Tailwind Class | Purpose / Role |
| :--- | :--- | :--- | :--- | :--- |
| **Deep Pitch Black** | `#050505` | `--black-deep` / `--background` | `bg-black-deep` | Core background, dominant surface area. |
| **Soft Yellow** | `#fff7d3` | `--yellow-soft` / `--foreground` | `text-yellow-soft` | Dominant text color, primary interface elements. |
| **Deep Rich Red** | `#AB1509` | `--accent-color` / `--color-accent` | `text-accent` | High-impact callouts, active elements, and branding accents. |
| **Dark Reddish Warm Border** | `#2c0a07` | `--border-color` | `border-border` | Subtle tactile division borders, structural outlines. |

### Color Usage Guidelines

- **Primary Background**: The viewport must always default to **Deep Pitch Black** (`#050505`) to preserve high-contrast visibility.
- **Primary Text**: Standard text and main headings use **Soft Yellow** (`#fff7d3`) for a warm, readable, and vintage-tactile look instead of harsh white.
- **Accents**: **Deep Rich Red** (`#AB1509`) should be used sparingly for maximum psychological impact (e.g., hover states, underlines, focus indicators).

---

## font-tusker-standard Typography

The typography scale enforces a strict contrast between massive, ultra-bold brutalist headings and clean, structured, highly-legible body text.

### Font Families

1. **Main Headings (`font-tusker-standard`)**
   - **Typeface**: Tusker Grotesk Standard
   - **Styling**: Bold, compressed, heavy weight, uppercase.
   - **Attributes**: Tight leading (`leading-[0.85]`), tight tracking (`tracking-tight`), and gradient fill.
   - **CSS Variable**: `var(--font-tusker-standard)`

2. **Subheadings / Labels (`PP Neue Montreal Bold`)**
   - **Typeface**: PP Neue Montreal Bold
   - **Styling**: High-density geometric grotesque, uppercase, spaced out.
   - **Attributes**: Extremely wide tracking (`tracking-widest`), small size (`text-[10px]`), and bold weight.
   - **CSS Variable**: `var(--font-montreal)` with `font-bold`

3. **Body Text (`Neue Montreal Light`)**
   - **Typeface**: Neue Montreal Light
   - **Styling**: Geometric, lightweight, elegant proportions.
   - **Attributes**: Normal casing, light weight (`font-light`), and comfortable leading for maximum readability.
   - **CSS Variable**: `var(--font-montreal)` with `font-light`

---

## 🏛️ Hero Section Architecture Reference

Our layout architecture translates print poster design into interactive web structures. The hero section showcases our design principles in action:

```mermaid
graph TD
    Hero[h-screen flex flex-col] --> TacticalOverlay[Tactile Noise Overlay absolute z-50]
    Hero --> Header[Floating Header z-10]
    Hero --> Main[Main Content Region flex-1 z-10]
    
    Header --> Logo[Circular Logo Monogram PP Neue Montreal]
    Header --> Menu[Stylized ME/NU Stacked Menu Button Tusker Standard]
    
    Main --> Stats[Top Stats Row Single Performance Score at top-right]
    Main --> Headings[Typography Wrapper Tusker Standard uppercase leading-[0.85]]
    Main --> About[Bottom Section PP Neue Montreal Bold About Label + Neue Montreal Light Paragraph]

    Headings --> Line1[Line 1: I Code Brutal Motion]
    Headings --> Line2[Line 2: Stats left-aligned + For Websites right-aligned]
```

### 1. Typography & Stats Hierarchy
```html
<!-- TOP STATS ROW SPACER (Preserves the exact vertical layout flow and height) -->
<div class="flex justify-end w-full relative -bottom-20 text-[10px] font-medium uppercase tracking-wider text-transparent select-none pointer-events-none">
  <div class="text-right pr-2">
    98.9/100 Average Performance Score
  </div>
</div>

<!-- TYPOGRAPHY WRAPPER -->
<div class="relative flex flex-col w-full select-none gap-2 md:gap-2 mt-6 md:mt-10 lg:mt-0">
  <!-- Top-right stat absolutely positioned relative to the typography wrapper to prevent vertical drift on large monitors -->
  <div class="absolute right-2 top-[-3.5vw] fade-in-item text-[10px] font-medium uppercase tracking-wider text-white/80 pr-2">
    98.9/100 Average Performance Score
  </div>

  <!-- Main Brutalist Heading Line 1 -->
  <h1 class="font-tusker-standard text-[10vw] md:text-[11.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient">
    I Build Websites That
  </h1>

  <!-- Main Heading Line 2 with Left-Aligned Stats and Right-Aligned Title -->
  <div class="flex flex-col md:flex-row justify-between items-end w-full gap-4 md:gap-0">
    <!-- Stats placed side-by-side below Line 1 (responsive using w-[46vw] to match responsive font sizing) -->
    <div class="fade-in-item flex shrink-0 whitespace-nowrap justify-between items-center text-[10px] font-medium uppercase tracking-wider text-white/80 pb-32 pl-2 w-full md:w-[46vw]">
      <div>50+ Projects Completed</div>
      <div id="stat-connector-line" class="hidden md:block flex-1 h-[1px] bg-white/50 origin-left scale-x-0 mx-6"></div>
      <div>6+ Years of Experience</div>
    </div>

    <!-- Heading Title aligned to the right (no underline) -->
    <div class="overflow-hidden py-1 flex flex-col items-end max-w-full">
      <h1 class="font-tusker-standard text-[8vw] md:text-[9.5vw] font-medium uppercase leading-[0.85] tracking-tight heading-gradient pb-2">
        Hit Different
      </h1>
    </div>
  </div>
</div>

<!-- Subheading / Label -->
<div class="text-[10px] uppercase tracking-widest text-white/50 font-bold">
  About
</div>

<!-- Body Text (Light weight, comfortable reading) -->
<p class="text-xs md:text-sm font-light text-white/90 leading-[1.2] normal-case max-w-xl">
  I'm a web developer focused on building modern, fast, and reliable websites...
</p>
```

### 2. Heading Gradient Implementation
To achieve the warm, metallic glow on our massive headings, we use a text clipping gradient defined in `app/globals.css`:
```css
.heading-gradient {
  background: linear-gradient(to top, #fff7d3 0%, #fffad6 33%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
```

### 3. Tactile Noise Layer
To break the clinical digital feel and provide a high-end tactile finish, an overlay is layered across the entire screen:
```html
<div class="absolute inset-0 z-50 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
```

---

## 🎬 Brutalist Motion Principles

All motion must feel deliberate, heavy, and mechanical, aligning with the "Brutal Motion" theme.

### 1. Dramatic Entrance Reveal (Upright CustomEase)
- **Concept**: Large headers slide up from invisible masks without any tilting/skewing to maintain clean brutalist structure. The animation starts slowly, suddenly accelerates, and settles with high-end smoothness.
- **GSAP Configuration**:
  ```javascript
  gsap.registerPlugin(CustomEase);
  CustomEase.create("heroEntranceEase", "0.85, 0, 0.2, 1");

  gsap.fromTo(".text-reveal", 
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.8,
      ease: "heroEntranceEase",
      stagger: 0.18,
    }
  );
  ```

### 2. Baseline-Locked 2D Sliding Track Cycler
- **Concept**: Stacks target cycler words vertically inside a baseline-aligned `h-[0.85em] overflow-hidden` wrapper to guarantee 100% vertical line-height alignment down to the pixel. Paused during the main reveal via an `isIntroFinished` flag.
- **GSAP Configuration**:
  - **Width Transition**: Smooth container width adjustment in sync with the slide (`duration: 0.6`, `ease: "power2.out"`).
  - **Vertical Slide & Motion Blur**: Snap track down dynamically to index with vertical motion blur and spring landing:
    ```javascript
    gsap.fromTo(".sliding-track",
      { filter: "blur(0px)" },
      {
        yPercent: -virtualIndex * 20,
        filter: "blur(1.5px)",
        duration: 0.8,
        ease: "back.out(1.8)",
        onComplete: () => {
          gsap.set(".sliding-track", { filter: "blur(0px)" });
        }
      }
    );
    ```

### 3. Vector-Drawing Arrow Shaft & Head (ScrollArrow)
- **Concept**: Arrow shaft grows dynamically down from the top, followed sequentially by the arrowhead wings scaling out, before initiating the liquid yoyo highlight loop.
- **GSAP Configuration**:
  ```javascript
  // 1. Initial State Setup
  gsap.set(shaftRef.current, { scaleY: 0, transformOrigin: "top center" });
  gsap.set(headRef.current, { scaleY: 0, transformOrigin: "top center", opacity: 0 });

  // 2. Stroke Scale-Drawing Sequence
  const drawTl = gsap.timeline();
  drawTl.to(shaftRef.current, { scaleY: 1, duration: 1.2, ease: "power2.inOut" });
  drawTl.to(headRef.current, { scaleY: 1, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
  ```

### 4. Symmetrical Stat Connectors & Odometer Counts
- **Connector Lines**: Horizontal top and bottom divider lines expand outwards to frame the stats (`scaleX: 1`, `duration: 1.5`, `ease: "power3.inOut"`).
- **Odometer Count-Ups**: Numeric values count up rapidly from zero on load. GSAP transitions a virtual object and updates innerText directly inside `onUpdate` to bypass React rendering cycles and achieve fluid 60fps counting.

### 5. Interactive States
- Hover states must be snap-fast with strict inverted colors or high-contrast shifts:
  - Example: A menu link with white text instantly shifts to black text with a full-width solid Soft Yellow background block.

