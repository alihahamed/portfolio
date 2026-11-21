// The aircraft. They aren't pictures: each is a small 3D model, and each frame it's turned to face the way it's flying,
// banked into its turn, and looked at through a camera. Whichever dots of the sky it covers are lit in its colours. So
// it can come in small from far away, curve towards you and climb out past the edge, on the same dot grid as
// everything else. At this size a plane is recognised by its outline, so the proportions are a toy's.
//
// This file holds the camera and the drawing, shared with the banner plane (banner.ts), and the airliner.

export type V = [number, number, number]
export type RGB = [number, number, number]
// `over` marks a marking that lies on another face. It's treated as clearly nearer than it is, so that it wins every dot
// it covers and doesn't flicker in and out against the face underneath as the plane moves.
export type Face<I extends string> = { ink: I; pts: V[]; over?: boolean }
export type Pose = { nose: V; up: V; right: V }
export type Put = (x: number, y: number, r: number, g: number, b: number) => void
// One act in the sky. Called every frame with the seconds since the last; draws itself and says whether it's still
// going. `smoke` leaves a puff of vapour trail behind.
export type Act = (dt: number, cols: number, rows: number, night: boolean, put: Put, smoke: (x: number, y: number) => void) => boolean

export const add = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const mul = (a: V, k: number): V => [a[0] * k, a[1] * k, a[2] * k]
export const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
export const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
export const unit = (a: V) => mul(a, 1 / Math.hypot(...a))
export const rand = (a: number, b: number) => a + Math.random() * (b - a)

// A box, for engines, wheels and the like. Its last face is the end that faces forward.
export function box<I extends string>(x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, ink: I, front: I) {
  const p = (x: number, y: number, z: number): V => [x, y, z]
  return [
    [p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)],
    [p(x0, y0, z0), p(x1, y0, z0), p(x1, y0, z1), p(x0, y0, z1)],
    [p(x0, y0, z0), p(x1, y0, z0), p(x1, y1, z0), p(x0, y1, z0)],
    [p(x0, y0, z1), p(x1, y0, z1), p(x1, y1, z1), p(x0, y1, z1)],
    [p(x0, y0, z0), p(x0, y1, z0), p(x0, y1, z1), p(x0, y0, z1)],
    [p(x1, y0, z0), p(x1, y1, z0), p(x1, y1, z1), p(x1, y0, z1)],
  ].map((pts, n): Face<I> => ({ ink: n === 5 ? front : ink, pts }))
}
// A hull: a tube of eight-sided rings, each [x, half width, half height, how far its centre is lifted]. `paint` picks
// the ink for a side from which ring it starts at and how much it faces up (1) or down (-1).
export function tube<I extends string>(rings: number[][], paint: (ring: number, facing: number) => I) {
  const SIDES = 8
  const at = (ring: number[], n: number): V => {
    const turn = ((n + 0.5) / SIDES) * 2 * Math.PI // corner n of a ring, going round from the top
    return [ring[0], ring[3] + Math.cos(turn) * ring[2], Math.sin(turn) * ring[1]]
  }
  return rings.slice(1).flatMap((b, i) =>
    Array.from({ length: SIDES }, (_, n): Face<I> => ({
      ink: paint(i, Math.cos(((n + 1) / SIDES) * 2 * Math.PI)),
      pts: [at(rings[i], n), at(rings[i], n + 1), at(b, n + 1), at(b, n)],
    })),
  )
}
// Everything on one side of a model mirrored to the other.
export const mirror = <I extends string>(faces: Face<I>[]) => faces.map((f) => ({ ...f, pts: f.pts.map(([x, y, z]): V => [x, y, -z]) }))

export const CAMERA = 4 // the view is 2 tall at the distance where things are drawn life-size, this far from the camera
const EYE: V = [0, 0, CAMERA]
export const HORIZON = 0.42 // how far down the sky the camera is looking
const LIGHT = unit([-0.4, 0.8, 0.45]) // from above, behind the viewer's left shoulder
// Which way is up for a plane flying level. It leans towards the viewer, as if the sky were seen from somewhat above,
// so a plane flying level shows its back and one side, and rolling shows more of its back or its belly.
export const UP = unit([0, 0.67, 0.74])
// How much the near end of a plane is enlarged over the far end, beyond what the distance alone would give. A real
// plane this far off would look flat; this is the wide-angle look that makes the nose loom as it comes at you.
const LOOM = 2.6

// Where a point given as it appears (`x` across in half-heights of the sky from the middle, `y` up from the camera's
// line, `z` towards the viewer, far away very negative) really is: further away there's more room across and up.
export const world = ([x, y, z]: V): V => {
  const room = (CAMERA - z) / CAMERA
  return [x * room, y * room, z]
}

// Draws a model at `here`, facing `pose`, `size` being half its length, into a grid of `cols` by `rows` dots by calling
// `put` for each dot it covers. `color` gives each face's colour from its ink and how much light falls on it (0 to 1).
// Returns `onto`, which finds where any point of the model (in its own coordinates) lands on the grid.
export function render<I extends string>(
  model: Face<I>[],
  color: (ink: I, light: number) => RGB,
  size: number,
  here: V,
  { nose, up, right }: Pose,
  cols: number,
  rows: number,
  night: boolean,
  put: Put,
) {
  const scale = (CAMERA * rows) / 2 // dots per unit, for something at the life-size distance
  const middle = CAMERA - here[2]
  const at = ([x, y, z]: V) => add(here, mul(add(add(mul(nose, x), mul(up, y)), mul(right, z)), size))
  // Where a point lands on the dot grid, and how far away it's treated as being. The plane's middle goes where it truly
  // is; the rest of it is laid out around that, each part enlarged or shrunk by how much nearer or further it is.
  const project = (p: V): V => {
    const [x, y, z] = sub(p, here)
    const away = Math.max(0.4, middle - z * LOOM)
    return [cols / 2 + (here[0] * scale) / middle + (x * scale) / away, rows * HORIZON - (here[1] * scale) / middle - (y * scale) / away, away]
  }
  const lit = new Map<number, [number, RGB]>() // for each dot: how far away the nearest face is, and its colour
  for (const face of model) {
    const pts = face.pts.map(at)
    let normal = unit(cross(sub(pts[1], pts[0]), sub(pts[2], pts[0])))
    if (dot(normal, sub(EYE, pts[0])) < 0) normal = mul(normal, -1) // whichever side we can see
    const ink = color(face.ink, Math.max(0, dot(normal, LIGHT)))
    const on = pts.map(project)
    const xs = on.map((p) => p[0])
    const ys = on.map((p) => p[1])
    // how its distance changes across the grid, worked out from three of its corners
    const [[x0, y0, d0], [x1, y1, d1], [x2, y2, d2]] = on
    const spread = (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0)
    const perX = Math.abs(spread) < 1e-6 ? 0 : ((d1 - d0) * (y2 - y0) - (d2 - d0) * (y1 - y0)) / spread
    const perY = Math.abs(spread) < 1e-6 ? 0 : ((d2 - d0) * (x1 - x0) - (d1 - d0) * (x2 - x0)) / spread
    for (let y = Math.floor(Math.min(...ys)) - 1; y <= Math.max(...ys) + 1; y++)
      for (let x = Math.floor(Math.min(...xs)) - 1; x <= Math.max(...xs) + 1; x++) {
        // a dot belongs to the face if its middle is inside it, give or take a third of a dot so thin things like the
        // fin seen edge-on don't break up
        let inside = 0
        let outside = 0
        on.forEach(([ax, ay], i) => {
          const [bx, by] = on[(i + 1) % on.length]
          const side = ((bx - ax) * (y + 0.5 - ay) - (by - ay) * (x + 0.5 - ax)) / (Math.hypot(bx - ax, by - ay) || 1)
          if (side > -0.35) inside++
          if (side < 0.35) outside++
        })
        if (inside !== on.length && outside !== on.length) continue
        // the nearest face wins the dot
        const away = d0 + perX * (x + 0.5 - x0) + perY * (y + 0.5 - y0) - (face.over ? 0.2 : 0)
        const key = y * 4096 + x
        if (away < (lit.get(key)?.[0] ?? Infinity)) lit.set(key, [away, ink])
      }
  }
  outline(lit, night, put)
  lit.forEach(([, [r, g, b]], key) => put(key % 4096, Math.floor(key / 4096), r, g, b))
  return (p: V) => project(at(p))
}

// A ring of dots a little darker than the sky round the outside of whatever's in `lit` (keyed y * 4096 + x), so it
// stays clear of whatever it passes over, white clouds included, without looking outlined in ink.
export function outline(lit: Map<number, unknown>, night: boolean, put: Put) {
  const [r, g, b]: RGB = night ? [16, 22, 46] : [112, 150, 196]
  lit.forEach((_, key) => {
    for (const next of [key - 1, key + 1, key - 4096, key + 4096])
      if (!lit.has(next)) put(next % 4096, Math.floor(next / 4096), r, g, b)
  })
}

// ---- The airliner ----

// The model: x runs from tail (-1) to nose (1), y is up, z is out along the right wing.
type Ink = 'hull' | 'belly' | 'wing' | 'flap' | 'fin' | 'pod' | 'dark' | 'pane' | 'port' | 'starboard'
// the two top sides just behind the nose are the cockpit glass; the undersides are the belly
const hull = tube<Ink>(
  [
    [1, 0.03, 0.03, -0.01],
    [0.84, 0.12, 0.11, 0],
    [0.62, 0.16, 0.14, 0],
    [-0.5, 0.16, 0.14, 0],
    [-1, 0.04, 0.05, 0.06],
  ],
  (ring, facing) => (ring === 1 && facing > 0.6 ? 'dark' : facing < -0.6 ? 'belly' : 'hull'),
)
// Everything on the right-hand side, then mirrored for the left. `light` is the lamp on the wingtip, which differs.
const side = (light: Ink): Face<Ink>[] => [
  { ink: 'wing', pts: [[0.3, -0.02, 0.14], [-0.2, -0.02, 0.14], [-0.55, 0.02, 1.15], [-0.3, 0.02, 1.15]] },
  { ink: 'flap', over: true, pts: [[-0.08, -0.015, 0.2], [-0.2, -0.015, 0.2], [-0.5, 0.02, 1], [-0.42, 0.02, 1]] },
  { ink: 'fin', pts: [[-0.3, 0.02, 1.15], [-0.55, 0.02, 1.15], [-0.64, 0.2, 1.22], [-0.45, 0.2, 1.22]] }, // upturned tip
  { ink: light, over: true, pts: [[-0.3, 0.02, 1.13], [-0.36, 0.02, 1.13], [-0.36, 0.02, 1.19], [-0.3, 0.02, 1.19]] },
  { ink: 'fin', pts: [[-0.66, 0.05, 0.05], [-0.95, 0.05, 0.05], [-1.06, 0.07, 0.5], [-0.9, 0.07, 0.5]] }, // tailplane
  ...box<Ink>(-0.02, 0.3, -0.2, -0.06, 0.36, 0.5, 'pod', 'dark'), // engine, poking out ahead of the wing, with its intake
  { ink: 'pane', over: true, pts: [[0.55, 0.075, 0.166], [-0.45, 0.075, 0.166], [-0.45, 0, 0.166], [0.55, 0, 0.166]] },
]
const MODEL: Face<Ink>[] = [
  ...hull,
  ...side('starboard'),
  ...mirror(side('port')),
  { ink: 'fin', pts: [[-0.5, 0.14, 0], [-0.95, 0.12, 0], [-1.06, 0.62, 0], [-0.86, 0.62, 0]] },
]

const INKS: Record<Ink, RGB> = {
  hull: [255, 255, 255],
  belly: [184, 192, 208],
  wing: [222, 229, 240],
  flap: [190, 199, 216],
  fin: [47, 95, 208],
  pod: [128, 136, 152],
  dark: [40, 42, 48],
  pane: [56, 64, 84], // windows: dark by day, and lit at night
  port: [236, 70, 70], // the red lamp on the left wingtip
  starboard: [64, 200, 112], // and the green one on the right
}
const GLOWS: string[] = ['port', 'starboard'] // lamps aren't shaded and don't dim at night

// Shading shared by the planes: four steps of light, so a plane stays made of flat tones but its hull still looks round,
// and dimmer and bluer at night. Lamps glow either way; `lit` inks are lit windows at night.
export const shade =
  <I extends string>(inks: Record<I, RGB>, night: boolean, glows: string[] = [], lit: Partial<Record<I, RGB>> = {}) =>
  (ink: I, light: number): RGB => {
    if (glows.includes(ink)) return inks[ink]
    if (night && lit[ink]) return lit[ink]
    const tone = 0.7 + 0.3 * (Math.round(light * 4) / 4)
    const [r, g, b] = inks[ink].map((c) => c * tone)
    return night ? [r * 0.5, g * 0.55, b * 0.72] : [r, g, b]
  }

const SIZE = 0.85 // half the airliner's length
const LEAN = 20 // how readily it banks into a turn
const STEEPEST = 0.95 // and the most it will bank, in radians (about 55 degrees)
const FLIGHT = 26 // seconds for one crossing

// The three ways across. Each is a curve through three points, given as they'd appear: how far across the sky (-1 is
// the left edge, 1 the right), how far up from the middle (about 0.85 is the top edge), and how far towards the viewer
// (far away is very negative). Every route starts and ends outside the edges, so the plane always flies in and flies
// out and never appears or vanishes in mid-air. Each can also be flown mirrored, which makes six.
export const ROUTES: [V, V, V][] = [
  [[-1.15, 0.45, -14], [-0.1, -0.25, -4], [1.5, 1.05, 0.2]], // in from far off on one side, out close by on the other
  [[1.55, 0.65, 0.6], [0.1, -0.35, -4], [-1.12, 0.5, -13]], // in close over your shoulder, away into the distance
  [[0.75, 1.6, -3], [-0.05, -1.15, -6], [-0.8, 1.6, -3]], // down out of the top, round in a banked turn, and back up
]

// Draws the airliner a fraction `t` of the way along a route. Returns the dot its tail is over, for the vapour trail.
export function jet(t: number, route: number, flip: number, lift: number, cols: number, rows: number, night: boolean, put: Put) {
  const wide = cols / rows
  // from where a point appears to where it is: the further away, the more room there is across and up
  const [p0, p1, p2] = ROUTES[route].map(([x, y, z]) => world([x * flip * wide, y + lift, z]))
  const here = add(add(mul(p0, (1 - t) ** 2), mul(p1, 2 * t * (1 - t))), mul(p2, t * t))
  const going = add(mul(sub(p1, p0), 2 * (1 - t)), mul(sub(p2, p1), 2 * t))
  const turning = mul(add(sub(p2, mul(p1, 2)), p0), 2)
  // Which way it faces: nose along its heading, wings level, then rolled into the turn in proportion to how hard it's
  // being pulled sideways.
  const nose = unit(going)
  const level = unit(cross(nose, UP))
  const bank = Math.max(-STEEPEST, Math.min(STEEPEST, (dot(turning, level) / dot(going, going)) * LEAN))
  const up0 = cross(level, nose)
  const pose: Pose = {
    nose,
    right: add(mul(level, Math.cos(bank)), mul(up0, -Math.sin(bank))),
    up: add(mul(up0, Math.cos(bank)), mul(level, Math.sin(bank))),
  }
  const onto = render(MODEL, shade(INKS, night, GLOWS, { pane: [232, 190, 104] }), SIZE, here, pose, cols, rows, night, put)
  return onto([-1, 0, 0])
}

// One crossing by the airliner on a random route, leaving a vapour trail. `start` skips into the flight.
export function airliner(start = 0): Act {
  const route = Math.floor(Math.random() * ROUTES.length)
  const flip = Math.random() < 0.5 ? 1 : -1
  const lift = rand(-0.1, 0.12)
  let t = start
  return (dt, cols, rows, night, put, smoke) => {
    if ((t += dt / FLIGHT) >= 1) return false
    const [x, y] = jet(t, route, flip, lift, cols, rows, night, put)
    smoke(x, y)
    return true
  }
}
