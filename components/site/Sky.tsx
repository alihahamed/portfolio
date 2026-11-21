'use client'

import { useEffect, useRef } from 'react'
import { type Act, airliner } from '@/components/site/jet'
import { banner } from '@/components/site/banner'

// The sky is one display of small square dots (3px on a 4px grid), and everything in it is those dots lit in different
// colours: the blue or the night, the sun or the moon and its glow, stars, clouds that form out of the sky itself,
// a flock of birds now and then, and something flying: an airliner with a vapour trail or, now and
// then, a little plane towing a banner. It follows the clock where Ali is, runs the full
// width of the screen, covers the rails, and thins away into scattered, fading dots where it meets the page.
//
// The canvas holds one pixel per dot and is scaled up; a mask (`.dots` in globals.css) cuts the gaps between them.
const CELL = 4
const REFRESH = 1 / 20 // the display redraws 20 times a second
const DRIFT = 2.2 // how many dots a second the clouds move

type RGB = [number, number, number]
const rand = (from: number, to: number) => from + Math.random() * (to - from)
const smooth = (from: number, to: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - from) / (to - from)))
  return t * t * (3 - 2 * t)
}
// A part-lit area is drawn as a pattern of lit and unlit dots rather than faded: a dot is on if the amount is more
// than its place in this 4 by 4 pattern.
const SCREEN = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16)

// A fixed random number for each point, and a smooth field made by blending between them. Clouds are that field, summed
// at three sizes, wherever it rises above a threshold, so they form out of the sky rather than being laid on it.
const hash = (x: number, y: number) => {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0
  n = Math.imul(n ^ (n >>> 13), 1274126177)
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296
}
const noise = (x: number, y: number) => {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const u = smooth(0, 1, x - xi)
  const v = smooth(0, 1, y - yi)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + hash(xi + 1, yi + 1)) * u * v
}
const billow = (x: number, y: number) =>
  noise(x, y) * 0.68 + noise(x * 2.1 + 7, y * 2.1 + 3) * 0.25 + noise(x * 4.3 + 13, y * 4.3 + 17) * 0.07
// The shape of the clouds. A puff is about ACROSS dots wide and DOWN dots tall: small, because these clouds are far
// off. Raise CLOUDY for fewer of them.
const ACROSS = 12
const DOWN = 6.5
const CLOUDY = 0.605

// A bird is five dots in a row: a body and two wings, whose tips are up or down.
const BIRD = [-2, -1, 0, 1, 2]

export default function Sky() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current!
    const pen = el.getContext('2d')!
    const page = document.documentElement
    const css = getComputedStyle(page)
    const tone = (name: string, or: RGB = [255, 255, 255]): RGB => {
      const hex = css.getPropertyValue(name).trim().replace('#', '')
      if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return or
      const full = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
      return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB
    }
    const arc = +css.getPropertyValue('--arc') || 0.4 // how far through the day or night it is

    let cols = 0
    let rows = 0
    let base = new Uint8ClampedArray(0) // the sky without the things that move fast, repainted only when clouds shift
    let image = pen.createImageData(1, 1)
    let shown = NaN

    // The colours come from the page's theme, and are read again whenever the theme is switched (see the dock).
    let night = false
    let [high, low, cloud, shade, orb, dusk] = [] as RGB[]
    const tint = () => {
      night = page.dataset.theme === 'night'
      high = tone('--sky-top')
      low = tone('--sky-bottom')
      cloud = tone('--cloud')
      shade = tone('--cloud-shade')
      orb = tone('--orb')
      dusk = tone('--orb-shade', orb) // the moon's dark side; the sun has none
      shown = NaN
    }
    tint()
    const themes = new MutationObserver(tint)
    themes.observe(page, { attributeFilter: ['data-theme'] })

    const backdrop = (shift: number, time: number) => {
      const sunX = cols * (0.08 + arc * 0.84)
      const sunY = rows * (0.5 - Math.sin(arc * Math.PI) * 0.38)
      const reach = night ? 9 : 14 // how far the glow spreads, in dots

      // Where the clouds are. They can form anywhere in the upper half and a bit, thinning out at the very top and
      // towards the page. The field is worked out for every dot first, so that the shapes can be tidied before they're
      // drawn: a dot of cloud with fewer than two neighbours is a speck or the tip of a hook and is dropped, and a dot
      // of sky closed in by cloud on three sides is filled.
      const field = new Float32Array(cols * rows)
      const rough = new Uint8Array(cols * rows)
      const deep = Math.ceil(rows * 0.6)
      for (let j = 0; j < deep; j++) {
        const v = j / rows
        const room = smooth(-0.06, 0.06, v) * (1 - smooth(0.4, 0.58, v))
        for (let i = 0; i < cols; i++) {
          const at = j * cols + i
          field[at] = billow((i - shift) / ACROSS, j / DOWN + time * 0.003) + (room - 1) * 0.5
          rough[at] = +(field[at] > CLOUDY)
        }
      }
      const cloudy = rough.map((on, at) => {
        const around = (rough[at - 1] ?? 0) + (rough[at + 1] ?? 0) + (rough[at - cols] ?? 0) + (rough[at + cols] ?? 0)
        return +(on ? around >= 2 : around >= 3)
      })
      for (let j = 0; j < rows; j++) {
        const v = j / rows
        // The sky gives way to the page over its lower half: its dots fade, and more and more of them drop out at
        // random, so it thins away rather than ending at a line.
        const there = 1 - smooth(0.42, 1, v)
        const depth = smooth(0, 0.7, v)
        for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 4
          const grain = SCREEN[(i & 3) + (j & 3) * 4]
          if (there <= hash(i * 11 + 5, j * 13 + 7) * 0.7) {
            base[k + 3] = 0
            continue
          }
          let r = high[0] + (low[0] - high[0]) * depth
          let g = high[1] + (low[1] - high[1]) * depth
          let b = high[2] + (low[2] - high[2]) * depth
          const mix = (to: RGB, by: number) => {
            r += (to[0] - r) * by
            g += (to[1] - g) * by
            b += (to[2] - b) * by
          }

          // the sun or moon lights the sky around it
          const dx = i - sunX
          const dy = j - sunY
          const far = Math.hypot(dx, dy)
          const glow = Math.exp(-(far * far) / (2 * reach * reach))
          mix(orb, glow * (night ? 0.22 : 0.5))
          if (night && hash(i * 3 + 1, j * 7 + 2) > 0.9962 && v < 0.6)
            mix([255, 255, 255], 0.45 + 0.45 * Math.sin(time * 1.4 + hash(i, j) * 6283)) // a star, twinkling
          // the disc itself: its edge is screened, the moon is darker down one side and pocked
          if (smooth(6.6, 5.6, far) > grain) {
            const lit = Math.hypot(dx + 2.2, dy + 1.6) < 6
            mix(lit ? orb : dusk, 1)
            if (night && lit && hash(i * 5, j * 5) > 0.84) mix(dusk, 0.5)
          }

          // cloud: lit where it faces up and to the left, in shade underneath and to the right. The lower in the sky it
          // is, the further away, so the more it takes on the colour of the sky behind it.
          if (cloudy[j * cols + i]) {
            const facing = field[j * cols + i] - (j > 2 && i > 1 ? field[(j - 3) * cols + i - 2] : 0)
            const haze = 1 - (0.2 + 0.5 * smooth(0.05, 0.5, v))
            mix(facing < -0.03 ? shade : cloud, haze)
            if (facing < -0.1) mix(high, (night ? 0.35 : 0.2) * haze) // deepest shade
            else if (facing >= -0.03) mix(orb, glow * 0.4) // lit cloud near the sun takes its colour
          }
          base[k] = r
          base[k + 1] = g
          base[k + 2] = b
          base[k + 3] = 255 * Math.min(1, there * 1.5)
        }
      }
    }

    const fit = () => {
      const box = el.parentElement!
      // The box can briefly have no size while the page is being laid out; a canvas can't be asked for an image that's
      // nothing wide, so keep the last grid until there's a real one.
      if (!box.clientWidth || !box.clientHeight) return
      cols = Math.ceil(box.clientWidth / CELL)
      rows = Math.ceil(box.clientHeight / CELL)
      el.width = cols
      el.height = rows
      el.style.width = `${cols * CELL}px`
      el.style.height = `${rows * CELL}px`
      base = new Uint8ClampedArray(cols * rows * 4)
      image = pen.createImageData(cols, rows)
      shown = NaN
    }
    fit()
    const watch = new ResizeObserver(fit)
    watch.observe(el.parentElement!)

    const put = (x: number, y: number, r: number, g: number, b: number) => {
      const i = Math.round(x)
      const j = Math.round(y)
      if (i >= 0 && i < cols && j >= 0 && j < rows) image.data.set([r, g, b, 255], (j * cols + i) * 4)
    }

    // One act at a time, picked at random, with a pause between. Each always flies in from outside the sky and out
    // again. `#sky=liner` or `#sky=banner` on the address picks that one every time, for looking at it.
    const ACTS: [string, number, () => Act][] = [
      ['liner', 0.9, () => airliner()],
      ['banner', 0.1, banner], // rare on purpose: once in a while it's a joke, every other flight it's an advert
    ]
    const forced = ACTS.find(([name]) => location.hash === `#sky=${name}`)
    const pick = () => {
      let roll = Math.random()
      return (forced ?? ACTS.find(([, share]) => (roll -= share) < 0) ?? ACTS[0])[2]()
    }
    let act: Act | null = null
    let wait = rand(1, 3)
    // the vapour trail: puffs that thin out and are gone after a few seconds
    let trail: { x: number; y: number; age: number }[] = []
    const smoke = (x: number, y: number) => trail.push({ x, y, age: 0 })
    // The flock crosses either way at a random height. Each bird has its own place in the V and its own wingbeat.
    const flock = { x: 0, y: 0, v: 0, wait: rand(4, 10), birds: [] as { dx: number; dy: number; beat: number }[] }

    let time = 0
    const draw = (dt: number) => {
      if (!cols) return // nothing to draw on yet
      const shift = Math.floor(time * DRIFT)
      if (shift !== shown) {
        backdrop(shift, time)
        shown = shift
      }
      image.data.set(base)

      trail = trail.filter((puff) => (puff.age += dt) < 7)
      for (const { x, y, age } of trail)
        if ((1 - age / 7) * 0.9 > SCREEN[(Math.round(x) & 3) + (Math.round(y) & 3) * 4]) put(x, y, ...cloud)

      if (flock.wait > 0) {
        if ((flock.wait -= dt) <= 0) {
          const way = Math.random() < 0.5 ? 1 : -1
          flock.v = way * rand(8, 11)
          flock.x = way > 0 ? -30 : cols + 30
          flock.y = rand(8, rows * 0.4)
          flock.birds = Array.from({ length: 5 + Math.floor(Math.random() * 5) }, (_, n) => {
            const rank = Math.ceil(n / 2)
            return { dx: -way * rank * 4 + rand(-1, 1), dy: (n % 2 ? 1 : -1) * rank * 2 + rand(-0.7, 0.7), beat: rand(0, 6) }
          })
        }
      } else {
        flock.x += flock.v * dt
        if (flock.x < -40 || flock.x > cols + 40) flock.wait = rand(14, 38)
        for (const { dx, dy, beat } of flock.birds) {
          const up = Math.floor(time * 4 + beat) % 2 ? 1 : -1
          const y = flock.y + dy + Math.sin(time * 0.7 + beat) * 0.9
          for (const wing of BIRD)
            put(flock.x + dx + wing, y + (Math.abs(wing) === 2 ? up : 0), ...((night ? [104, 116, 150] : [62, 74, 98]) as RGB))
        }
      }

      if (!act) {
        if ((wait -= dt) <= 0) act = pick()
      } else if (!act(dt, cols, rows, night, put, smoke)) {
        act = null
        wait = rand(4, 10)
      }
      pen.putImageData(image, 0, 0)
    }

    // With motion turned down the sky is drawn once and left: the airliner part of the way across, no birds.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      act = airliner(0.45)
      flock.wait = Infinity
      draw(0)
      return () => {
        watch.disconnect()
        themes.disconnect()
      }
    }
    let last = 0
    let due = 0
    let raf = 0
    const frame = (now: number) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0
      last = now
      time += dt
      if ((due -= dt) <= 0) {
        draw(REFRESH - due)
        due = REFRESH
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      watch.disconnect()
      themes.disconnect()
    }
  }, [])

  return (
    <div className="relative h-70">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-linear-to-b from-sky-top via-sky-bottom to-bg"
      >
        <span className="gaps" />
        <canvas ref={canvas} className="dots absolute top-0 left-0" />
      </div>
      <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-line" />
      <span aria-hidden="true" className="absolute -bottom-0.5 -left-[3px] size-[5px] bg-fg" />
      <span aria-hidden="true" className="absolute -right-[3px] -bottom-0.5 size-[5px] bg-fg" />
    </div>
  )
}
