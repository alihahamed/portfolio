'use client'

import { useEffect, useRef, useState } from 'react'

// A potted vine standing on the line under the intro, as if on a shelf, spilling over the rim and trailing into the
// section below. It sways in the wind, swings when the cursor brushes past, and grows a little each time someone
// waters it. Drawn in the sky's dots (3px on a 4px grid, one canvas pixel per dot) so it reads as part of the same
// display.
const COLS = 28
const LINE = 14 // rows above the line: room for the pot, its leaves and the rain falling on them
const ROWS = LINE + 28
const POT = 14 // the pot's centre column
const SOIL = LINE - 8 // the row the strands grow from, just above the rim
const GROWTH = 6 // links the longest strand can gain from watering
const REFRESH = 1 / 20 // moves in whole dots, so 20 frames a second is plenty

type Ink = 'stem' | 'leaf' | 'lit' | 'shade' | 'pot' | 'rim' | 'dark' | 'drop'
type Rgb = [number, number, number]
const DAY: Record<Ink, Rgb> = {
  stem: [70, 110, 58],
  leaf: [104, 160, 84],
  lit: [146, 196, 110],
  shade: [64, 118, 60],
  pot: [196, 110, 72],
  rim: [222, 140, 96],
  dark: [156, 84, 56],
  drop: [92, 160, 232],
}
const NIGHT: Record<Ink, Rgb> = {
  stem: [36, 60, 46],
  leaf: [50, 88, 64],
  lit: [72, 114, 84],
  shade: [34, 62, 48],
  pot: [98, 60, 50],
  rim: [120, 74, 60],
  dark: [74, 44, 38],
  drop: [104, 136, 200],
}

const hash = (a: number, b: number) => {
  const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return n - Math.floor(n)
}

// Each strand is a chain of one-dot links growing from the soil. It sets off up and out (`out`, the angle from straight
// down) and gives in to gravity over `bend` links, so it arcs over the rim and falls beside the pot. Four of them, a
// long and a short on each side. `lag` staggers the gusts between them.
const STRANDS = [
  { x: POT - 2, len: 24, out: -2.3, bend: 3, lag: 0 },
  { x: POT + 2, len: 16, out: 2.3, bend: 3, lag: 1.6 },
  { x: POT - 3, len: 9, out: -2.7, bend: 3.5, lag: 0.8 },
  { x: POT + 3, len: 6, out: 2.7, bend: 3.5, lag: 2.4 },
].map((s, n) => {
  // leaves at uneven gaps of two or three links, alternating sides, larger near the pot and small further down, laid
  // out for the longest it can grow: [link, side, size]
  const leaves: [number, number, number][] = []
  let side = n % 2 ? 1 : -1
  const most = s.len + GROWTH
  for (let i = 2; i < most; i += 2 + Math.floor(hash(n, i) * 2)) {
    side = -side
    const along = i / most
    leaves.push([i, side, along < 0.3 && hash(n + 9, i) > 0.5 ? 2 : along < 0.75 ? 1 : 0])
  }
  return { ...s, leaves }
})

// A few leaves standing up out of the pot: [column, rows above the soil, side, size]
const CROWN: [number, number, number, number][] = [
  [POT - 2, 1, -1, 1],
  [POT, 2, 1, 1],
  [POT + 2, 1, 1, 0],
]

// Leaves growing to the right and drooping, as [dx, dy, ink]; mirrored for the left, flipped for leaves standing up.
const SIZES: [number, number, Ink][][] = [
  [
    [1, 0, 'lit'],
    [2, 0, 'leaf'],
    [1, 1, 'shade'],
  ],
  [
    [1, -1, 'lit'],
    [1, 0, 'leaf'],
    [2, 0, 'leaf'],
    [1, 1, 'shade'],
    [2, 1, 'shade'],
  ],
  [
    [1, -1, 'lit'],
    [2, -1, 'lit'],
    [1, 0, 'leaf'],
    [2, 0, 'leaf'],
    [3, 0, 'leaf'],
    [2, 1, 'shade'],
    [3, 1, 'shade'],
  ],
]

// The wind: a few slow waves on top of each other, so it never quite repeats. Between -1 and 1.
const gust = (t: number) => 0.5 * Math.sin(0.9 * t) + 0.3 * Math.sin(2.1 * t + 1.3) + 0.2 * Math.sin(0.37 * t + 0.5)

export default function Vine() {
  const ref = useRef<HTMLCanvasElement>(null)
  const water = useRef(() => {})
  const [thanked, setThanked] = useState(false)
  const timer = useRef(0)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const frame = ctx.createImageData(COLS, ROWS)
    const page = document.documentElement
    let ink = DAY
    const put = (x: number, y: number, name: Ink) => {
      x = Math.round(x)
      y = Math.round(y)
      if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return
      const at = (y * COLS + x) * 4
      ;[frame.data[at], frame.data[at + 1], frame.data[at + 2]] = ink[name]
      frame.data[at + 3] = 255
    }
    const leaf = (x: number, y: number, side: number, size: number, up = false) => {
      for (const [dx, dy, name] of SIZES[size]) {
        put(x + dx * side, y + (up ? -dy : dy), up && name !== 'leaf' ? (name === 'lit' ? 'shade' : 'lit') : name)
      }
    }

    let kick = 0 // the cursor's push: a damped spring that a brush sets swinging and that settles back to rest
    let swing = 0
    let grown = 0 // links gained from watering, up to GROWTH
    let rain = 0 // seconds of rain left
    let drops: [number, number][] = []

    const draw = (time: number) => {
      ink = page.dataset.theme === 'night' ? NIGHT : DAY
      frame.data.fill(0)

      // the pot: a rim one dot wider each side, then a body that narrows, lit on the left and shaded on the right
      for (let x = POT - 5; x < POT + 5; x++) {
        put(x, LINE - 7, 'rim')
        put(x, LINE - 6, x >= POT + 3 ? 'dark' : 'pot')
      }
      for (let k = 0; k < 5; k++) {
        const half = k < 2 ? 4 : 3
        for (let x = POT - half; x < POT + half; x++) {
          put(x, LINE - 5 + k, x === POT - half ? 'rim' : x >= POT + half - 2 ? 'dark' : 'pot')
        }
      }

      for (const [x, y] of drops) put(x, y, 'drop')

      for (const [x, up, side, size] of CROWN) {
        for (let r = 0; r < up; r++) put(x, SOIL - r, 'stem')
        leaf(x, SOIL - up, side, size, true)
      }

      for (const s of STRANDS) {
        const len = s.len + Math.floor((grown * s.len) / 26)
        const links: [number, number][] = []
        let x = s.x
        let y = SOIL
        for (let i = 1; i <= len; i++) {
          const angle = s.out * Math.exp(-i / s.bend) + (0.22 * gust(time - i * 0.07 - s.lag) + kick) * (i / 40)
          x += Math.sin(angle)
          y += Math.cos(angle)
          put(x, y, 'stem')
          links[i] = [x, y]
        }
        for (const [i, side, size] of s.leaves) if (i < len) leaf(...links[i], side, size)
        leaf(...links[len], s.out > 0 ? 1 : -1, 0)
      }

      ctx.putImageData(frame, 0, 0)
    }

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      water.current = () => {
        grown = Math.min(GROWTH, grown + 3)
        draw(0)
      }
      draw(0)
      const watch = new MutationObserver(() => draw(0))
      watch.observe(page, { attributes: true, attributeFilter: ['data-theme'] })
      return () => watch.disconnect()
    }

    water.current = () => (rain = 1.2)
    const brush = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top + LINE * 4 || e.clientY > box.bottom) return
      swing = Math.max(-3, Math.min(3, swing + e.movementX * 0.01))
    }
    addEventListener('pointermove', brush)

    let last = performance.now()
    let wait = 0
    let id = 0
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      swing += (-14 * kick - 2.5 * swing) * dt
      kick = Math.max(-0.5, Math.min(0.5, kick + swing * dt))
      wait -= dt
      if (wait <= 0) {
        wait = REFRESH
        // rain falls from the top of the display; each drop that reaches the leaves feeds the plant a little
        if (rain > 0) {
          rain -= REFRESH
          drops.push([POT - 5 + Math.floor(Math.random() * 10), 0])
        }
        drops = drops.filter((d) => (d[1] += 1.6) < SOIL - 3 || ((grown = Math.min(GROWTH, grown + 0.15)), false))
        draw(now / 1000)
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(id)
      removeEventListener('pointermove', brush)
    }
  }, [])

  const thank = () => {
    water.current()
    setThanked(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setThanked(false), 2500)
  }

  return (
    <div
      className="pointer-events-none absolute top-full right-4 z-10 sm:right-6"
      style={{ width: COLS * 4, height: ROWS * 4, marginTop: -LINE * 4 }}
    >
      <canvas ref={ref} aria-hidden="true" width={COLS} height={ROWS} className="dots size-full" />
      <button
        type="button"
        aria-label="Water the plant"
        onClick={thank}
        className="pointer-events-auto absolute cursor-pointer focus-visible:outline-1 focus-visible:outline-ink"
        style={{ left: (POT - 6) * 4, top: (SOIL - 3) * 4, width: 48, height: 44 }}
      />
      {/* The vine's right edge sits on the same line as the right edge of the text (24px in from the section's edge).
          A pencilled hint lives out in the margin, past the frame's rail and dotted band, which end 33px beyond the
          section, with an arrow back to the pot. Only on screens wide enough to have a margin. */}
      <span
        aria-hidden="true"
        className="absolute hidden font-hand text-note whitespace-nowrap text-fg/35 lg:block"
        style={{ left: 'calc(100% + 72px)', top: (SOIL - 5) * 4 }}
      >
        {/* starts just clear of the band and 8px short of the words, and stops short of the leaves */}
        <svg
          viewBox="0 0 80 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute top-2 right-full mr-2 w-20"
        >
          <path d="M76 6C56 1 30 4 8 21" />
          <path d="M8 21l2.5-6.5M8 21l6.5-1.5" />
        </svg>
        {thanked ? 'thank you!' : 'water me'}
      </span>
    </div>
  )
}
