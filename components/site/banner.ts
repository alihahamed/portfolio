// A little yellow high-wing plane crossing the sky towing a long cloth banner, the way they do over beaches. The banner
// carries one line, spelled in a small dot font at double size, and ripples more and more towards its loose
// end. The plane is a 3D model like the others (jet.ts); the banner is drawn flat, side-on to the viewer.
import { type Act, type Face, type RGB, type V, CAMERA, HORIZON, box, cross, dot, mirror, mul, outline, rand, render, shade, sub, tube, unit } from '@/components/site/jet'

const LINE = 'if you can read this, hire ali'

// The font: lowercase, three dots wide (m and w five, i and l narrower), five tall with a sixth row for descenders.
const FONT: Record<string, string[]> = {
  a: ['...', '.##', '#.#', '#.#', '.##'],
  b: ['#..', '##.', '#.#', '#.#', '##.'],
  c: ['...', '.##', '#..', '#..', '.##'],
  d: ['..#', '.##', '#.#', '#.#', '.##'],
  e: ['...', '.#.', '###', '#..', '.##'],
  f: ['..#', '.#.', '###', '.#.', '.#.'],
  g: ['...', '.##', '#.#', '.##', '..#', '##.'],
  h: ['#..', '##.', '#.#', '#.#', '#.#'],
  i: ['#', '.', '#', '#', '#'],
  j: ['.#', '..', '.#', '.#', '.#', '#.'],
  k: ['#..', '#.#', '##.', '##.', '#.#'],
  l: ['#.', '#.', '#.', '#.', '.#'],
  m: ['.....', '####.', '#.#.#', '#.#.#', '#.#.#'],
  n: ['...', '##.', '#.#', '#.#', '#.#'],
  o: ['...', '.#.', '#.#', '#.#', '.#.'],
  p: ['...', '##.', '#.#', '#.#', '##.', '#..'],
  q: ['...', '.##', '#.#', '#.#', '.##', '..#'],
  r: ['...', '#.#', '##.', '#..', '#..'],
  s: ['...', '.##', '##.', '..#', '##.'],
  t: ['.#.', '###', '.#.', '.#.', '..#'],
  u: ['...', '#.#', '#.#', '#.#', '.##'],
  v: ['...', '#.#', '#.#', '#.#', '.#.'],
  w: ['.....', '#...#', '#.#.#', '#.#.#', '.#.#.'],
  x: ['...', '#.#', '.#.', '.#.', '#.#'],
  y: ['...', '#.#', '#.#', '.##', '..#', '##.'],
  z: ['...', '###', '..#', '#..', '###'],
  ' ': ['..', '..', '..', '..', '..'],
  '.': ['.', '.', '.', '.', '#'],
  ',': ['.', '.', '.', '.', '#', '#'],
  "'": ['#', '#', '.', '.', '.'],
  '!': ['#', '#', '#', '.', '#'],
  '?': ['##.', '..#', '.#.', '...', '.#.'],
  '-': ['..', '..', '##', '..', '..'],
}
// A line of text as six rows of on and off, a dot of space after each letter.
export const spell = (text: string) => {
  const grid: boolean[][] = Array.from({ length: 6 }, () => [])
  for (const letter of text) {
    const glyph = FONT[letter] ?? FONT[' ']
    grid.forEach((row, r) => row.push(...[...glyph[0]].map((_, c) => glyph[r]?.[c] === '#'), false))
  }
  return grid
}

// The plane: x from tail (-1) to nose (1), y up, z out along the right wing.
type Ink = 'body' | 'belly' | 'wing' | 'tail' | 'pane' | 'dark' | 'prop'
const side: Face<Ink>[] = [
  { ink: 'wing', pts: [[0.44, 0.21, 0.05], [0.12, 0.21, 0.05], [0.12, 0.21, 1.15], [0.42, 0.21, 1.15]] }, // high wing
  { ink: 'dark', pts: [[0.3, -0.1, 0.13], [0.25, -0.1, 0.13], [0.24, 0.21, 0.62], [0.29, 0.21, 0.62]] }, // strut
  { ink: 'wing', pts: [[-0.7, 0.1, 0.02], [-0.98, 0.12, 0.02], [-1.02, 0.12, 0.42], [-0.84, 0.12, 0.42]] }, // tailplane
  { ink: 'dark', pts: [[0.44, -0.08, 0.1], [0.4, -0.08, 0.1], [0.4, -0.26, 0.19], [0.44, -0.26, 0.19]] }, // leg
  ...box<Ink>(0.35, 0.49, -0.36, -0.22, 0.15, 0.24, 'dark', 'dark'), // wheel
]
const MODEL: Face<Ink>[] = [
  // the cabin's sides are its windows
  ...tube<Ink>(
    [
      [1, 0.05, 0.06, 0],
      [0.78, 0.13, 0.15, 0.02],
      [0.3, 0.14, 0.17, 0.04],
      [-0.35, 0.09, 0.11, 0.07],
      [-1, 0.03, 0.04, 0.13],
    ],
    (ring, facing) => (ring === 1 && Math.abs(facing) < 0.1 ? 'pane' : facing < -0.6 ? 'belly' : 'body'),
  ),
  ...side,
  ...mirror(side),
  { ink: 'tail', pts: [[-0.55, 0.12, 0], [-1, 0.15, 0], [-1.06, 0.58, 0], [-0.84, 0.58, 0]] },
  // the propeller, spinning too fast to see: a pale disc
  { ink: 'prop', pts: Array.from({ length: 8 }, (_, k): V => [1.03, 0.3 * Math.cos((k * Math.PI) / 4), 0.3 * Math.sin((k * Math.PI) / 4)]) },
]
const INKS: Record<Ink, RGB> = {
  body: [246, 198, 52],
  belly: [214, 164, 40],
  wing: [250, 214, 96],
  tail: [214, 62, 48],
  pane: [52, 60, 80],
  dark: [44, 46, 54],
  prop: [200, 204, 214],
}

const SIZE = 0.85 // half the plane's length
const DEPTH = -5 // how far off it flies
const SPEED = 18 // dots a second
const ROPE = 16 // dots of towline
const BIG = 2 // each dot of the font is this many dots across and down
const PAD = 6 // dots of bare cloth at each end
const TALL = 18 // the banner: a stripe, two clear, twelve of letters, two clear, a stripe

export function banner(): Act {
  const text = spell(LINE)
  const long = text[0].length * BIG + PAD * 2
  const way = Math.random() < 0.5 ? 1 : -1
  const height = rand(0.2, 0.28) // where across the sky it flies, as a share of the sky's height
  let x = NaN
  let time = 0

  return (dt, cols, rows, night, put) => {
    const dots = (CAMERA * rows) / 2 / (CAMERA - DEPTH) // dots per unit of length, at its distance
    const half = SIZE * dots
    if (Number.isNaN(x)) x = way > 0 ? -half - 4 : cols + half + 4 // starts just off one side
    x += way * SPEED * dt
    time += dt
    // done once the end of the banner has gone off the far side
    const end = x - way * (half + ROPE + long + 4)
    if (way > 0 ? end > cols : end < 0) return false

    const y = rows * height + 1.2 * Math.sin(time * 0.6)
    const tail: [number, number] = [x - way * half, y]
    const pole = tail[0] - way * ROPE
    const top = Math.round(y + 3 - TALL / 2) // the banner hangs a little below the line of the plane

    // at night the cloth is moonlit: a little dimmer and bluer, but still the brightest thing up there after the moon
    const ink = (c: RGB, k: number): RGB => (night ? [c[0] * 0.8 * k, c[1] * 0.83 * k, c[2] * 0.95 * k] : [c[0] * k, c[1] * k, c[2] * k])
    const cloth: RGB = [250, 246, 236]
    const red: RGB = [206, 58, 48]
    const cells = new Map<number, RGB>()
    const cell = (cx: number, cy: number, c: RGB) => {
      cx = Math.round(cx)
      cy = Math.round(cy)
      if (cx >= -1 && cx <= cols && cy >= 0) cells.set(cy * 4096 + cx, c)
    }
    for (let u = 0; u < long; u++) {
      // the cloth ripples, a little near the pole and more and more towards the loose end; folds facing up catch light
      const phase = u * 0.12 - time * 4
      const reach = 0.4 + 2.2 * (u / long) ** 1.5
      const slope = reach * 0.12 * Math.cos(phase)
      const k = slope > 0.1 ? 0.82 : slope < -0.1 ? 1 : 0.91
      const cx = pole - way * (u + 1)
      const lift = reach * Math.sin(phase)
      // the letters read left to right whichever way it's going
      const column = (way > 0 ? long - 1 - u : u) - PAD
      for (let r = 0; r < TALL; r++) {
        const row = r - 3
        const letter = column >= 0 && row >= 0 && row < 6 * BIG && text[Math.floor(row / BIG)][Math.floor(column / BIG)]
        cell(cx, top + r + lift, ink(r === 0 || r === TALL - 1 || letter ? red : cloth, k))
      }
    }
    for (let r = -1; r <= TALL; r++) cell(pole, top + r, ink([60, 62, 70], 1)) // the pole along its leading edge
    outline(cells, night, put)
    cells.forEach(([r, g, b], key) => put(key % 4096, Math.floor(key / 4096), r, g, b))

    // the towline, splitting into a bridle to the top and bottom of the pole
    const line = (ax: number, ay: number, bx: number, by: number) => {
      const steps = Math.ceil(Math.max(Math.abs(bx - ax), Math.abs(by - ay)))
      for (let n = 0; n <= steps; n++) put(ax + ((bx - ax) * n) / steps, ay + ((by - ay) * n) / steps, ...ink([70, 74, 86], 1))
    }
    const fork = pole + way * 5
    line(tail[0], tail[1], fork, top + TALL / 2)
    line(fork, top + TALL / 2, pole, top)
    line(fork, top + TALL / 2, pole, top + TALL - 1)

    // Seen nearly side-on, only a little from above (the others lean further towards you), so it reads by its profile:
    // high wing, wheels, tail, the disc of the propeller.
    const climb = 1.2 * 0.6 * Math.cos(time * 0.6) // dots a second, downwards
    const nose = unit([way * SPEED, -climb, 0])
    const tilt: V = [0, 0.95, 0.3]
    const up = unit(sub(tilt, mul(nose, dot(tilt, nose))))
    const here: V = [(x - cols / 2) / dots, (rows * HORIZON - y) / dots, DEPTH]
    render(MODEL, shade(INKS, night), SIZE, here, { nose, up, right: cross(nose, up) }, cols, rows, night, put)
    return true
  }
}
