import { useId, type CSSProperties } from 'react'

// The sky scene's objects, drawn side-on with a thin border; the top and the far side just show, as if seen from
// slightly above and to the left. Measurements are px at real size, with y up from the ground and z going away from you.
//
// A part is an outline in the side view (corners listed anticlockwise), pushed back by its depth. Faces that look up
// come out lighter and faces that look forward darker, so a sloped bonnet or a raked windscreen shades itself.
// A part with no depth is flat on the near side: a window, a door handle. Two points make a line (a door seam) or,
// given a depth, a patch on a face that looks forward (the windscreen, a headlight). Parts are drawn in the order
// they're listed, so list them back to front.

type Pt = [number, number]
// paint takes the object's own colour, or the part's `fill` when it has one. A part with one point is a disc of radius
// `r` (a head, a lamp); a wheel is a car's and a spoked one is a bicycle's. A limb is a line of width `w` through its
// points with round ends and round bends: an arm, a leg, a bicycle tube. A pane is a window that's dark by day and lit
// at night. A flat part can be `smooth`, which rounds its outline off through its points (repeat a point to keep that
// corner sharp), and `bare`, which leaves off its border. A beam is light falling from a lamp and a ray is light thrown
// forward by a headlight: both fade as they go and only show at night.
type Kind = 'paint' | 'trim' | 'glass' | 'pane' | 'light' | 'tail' | 'wheel' | 'spoked' | 'limb' | 'beam' | 'ray'
export type Part = {
  pts: Pt[]
  z?: number
  d?: number
  r?: number
  w?: number
  kind?: Kind
  fill?: string
  smooth?: boolean
  bare?: boolean
}

// a step back moves a point half a step right and a quarter up
const KX = 0.5
const KY = 0.25

const DARK = '#232326' // tyres, bumpers and handles
// At night a colour keeps its hue but loses lightness and some strength, the way paint does in the dark.
export const dim = (colour: string) => `oklch(from ${colour} calc(l * var(--night-l)) calc(c * var(--night-c)) h)`
const FILL: Record<Kind, string> = {
  paint: dim('var(--paint)'),
  trim: DARK,
  glass: 'var(--glass)',
  pane: 'var(--pane)',
  light: 'var(--lamp)',
  tail: '#e5484d',
  wheel: DARK,
  spoked: DARK,
  limb: dim('var(--paint)'),
  beam: 'var(--lamp)',
  ray: 'var(--lamp)',
}

const THIN = 'non-scaling-stroke' // the border stays 1px at any size; it isn't inherited, so every outline takes it

// Rounded, because the server and the browser don't agree on the last few decimals of a sine, and the page has to come
// out the same from both.
const round = (n: number) => Math.round(n * 100) / 100
const at = ([x, y]: Pt, z: number) => `${round(x + z * KX)},${round(-(y + z * KY))}`

// a closed curve that passes through the middle of each side and bends at each point
const curve = (pts: Pt[], z: number) => {
  const mid = (a: Pt, b: Pt) => at([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], z)
  return `M${mid(pts[pts.length - 1], pts[0])}${pts.map((p, i) => `Q${at(p, z)} ${mid(p, pts[(i + 1) % pts.length])}`).join('')}Z`
}

export function Obj({ parts, paint, scale = 2 }: { parts: Part[]; paint?: string; scale?: number }) {
  const beam = useId()
  const ends = parts.flatMap(({ pts, z = 0, d = 0, r = 0, w = 0 }) =>
    pts.flatMap(([x, y]) => [
      [x - (r || w / 2) + z * KX, y - (r || w / 2) + z * KY],
      [x + (r || w / 2) + (z + d) * KX, y + (r || w / 2) + (z + d) * KY],
    ]),
  )
  const x0 = Math.floor(Math.min(...ends.map((e) => e[0])))
  const y0 = Math.floor(Math.min(...ends.map((e) => e[1])))
  const w = Math.ceil(Math.max(...ends.map((e) => e[0]))) - x0
  const h = Math.ceil(Math.max(...ends.map((e) => e[1]))) - y0
  return (
    <svg
      aria-hidden="true"
      width={(w + 3) * scale}
      height={(h + 3) * scale}
      // half a pixel out, so a 1px border on whole coordinates lands on whole pixels
      viewBox={`${x0 - 1.5} ${-(y0 + h) - 1.5} ${w + 3} ${h + 3}`}
      stroke="var(--edge)"
      strokeLinejoin="round"
      style={{ '--paint': paint } as CSSProperties}
    >
      <linearGradient id={beam} x2="0" y2="1">
        <stop stopColor="var(--lamp)" stopOpacity="0.55" />
        <stop offset="1" stopColor="var(--lamp)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${beam}ray`}>
        <stop stopColor="var(--lamp)" stopOpacity="0.5" />
        <stop offset="1" stopColor="var(--lamp)" stopOpacity="0" />
      </linearGradient>
      {parts.map(({ pts, z = 0, d = 0, r = 0, w: thick = 0, kind = 'paint', fill, smooth, bare }, i) => {
        const colour = fill ? dim(fill) : FILL[kind]
        if (kind === 'beam' || kind === 'ray')
          return (
            <polygon
              key={i}
              points={pts.map((p) => at(p, z)).join(' ')}
              fill={`url(#${beam}${kind === 'ray' ? 'ray' : ''})`}
              stroke="none"
              style={{ opacity: 'var(--beam)' }}
            />
          )
        if (kind === 'limb') {
          const points = pts.map((p) => at(p, z)).join(' ')
          return (
            <g key={i} fill="none" strokeLinecap="round">
              {/* the border is the same line, a pixel wider on each side, underneath */}
              <polyline points={points} strokeWidth={thick + 2 / scale} />
              <polyline points={points} stroke={colour} strokeWidth={thick} />
            </g>
          )
        }
        if (pts.length === 1 && kind !== 'wheel' && kind !== 'spoked')
          return <circle key={i} r={r} fill={colour} vectorEffect={THIN} transform={`translate(${at(pts[0], z)})`} />
        if (kind === 'spoked')
          return (
            <g key={i} transform={`translate(${at(pts[0], z)})`}>
              {[0, 30, 60, 90, 120, 150].map((turn) => (
                <line
                  key={turn}
                  x1={-r}
                  x2={r}
                  strokeOpacity="0.35"
                  vectorEffect={THIN}
                  transform={`rotate(${turn})`}
                />
              ))}
              <circle r={r - 0.6} fill="none" stroke={DARK} strokeWidth="1.2" />
              <circle r={r - 1.5} fill="none" stroke={dim('#b9bdc7')} strokeWidth="0.6" />
              <circle r="1" fill={DARK} stroke="none" />
            </g>
          )
        if (kind === 'wheel')
          return (
            <g key={i} transform={`translate(${at(pts[0], z)})`}>
              <circle r={r} fill={DARK} vectorEffect={THIN} />
              <circle r={r / 2} fill={dim('#d4d4d0')} stroke="none" />
              <circle r="0.75" fill={DARK} stroke="none" />
            </g>
          )
        return (
          <g key={i} fill={colour}>
            {/* the faces along the outline that you can see: the ones looking up or forward */}
            {d > 0 &&
              pts.map((a, j) => {
                const b = pts[(j + 1) % pts.length]
                const nx = b[1] - a[1]
                const ny = a[0] - b[0]
                if (nx * KX + ny * KY <= 0) return null
                const lit = (ny - nx) / Math.hypot(nx, ny) // 1 looking straight up, -1 straight forward
                const points = `${at(a, z)} ${at(b, z)} ${at(b, z + d)} ${at(a, z + d)}`
                return (
                  <g key={j}>
                    <polygon points={points} vectorEffect={THIN} />
                    {kind === 'paint' && (
                      <polygon
                        points={points}
                        fill={lit > 0 ? '#fff' : '#000'}
                        // the highlight fades at night; the shadow doesn't
                        style={{
                          fillOpacity: `calc(${Math.min(Math.abs(lit), 1) * 0.25} * ${lit > 0 ? 'var(--glint)' : 1})`,
                        }}
                        stroke="none"
                      />
                    )}
                  </g>
                )
              })}
            {smooth ? (
              <path d={curve(pts, z)} stroke={bare ? 'none' : undefined} vectorEffect={THIN} />
            ) : (
              <polygon
                points={pts.map((p) => at(p, z)).join(' ')}
                stroke={bare ? 'none' : undefined}
                vectorEffect={THIN}
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

const box = (x: number, y: number, w: number, h: number): Pt[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]

const limb = (w: number, fill: string | undefined, pts: Pt[], z = 0): Part => ({ pts, w, z, fill, kind: 'limb' })

// part of a circle, angles in degrees anticlockwise from straight ahead: closed up it's a head of hair
const arc = (cx: number, cy: number, r: number, from: number, to: number) =>
  Array.from({ length: 9 }, (_, i): Pt => {
    const a = ((from + ((to - from) * i) / 8) * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  })
// a round thing lying on a face that looks forward, so the view squashes it to half its width and leans it: a headlight
const onFront = (x: number, y: number, z: number, r: number) =>
  arc(0, 0, r, 0, 320).map(([dz, dy]): Pt => [x + (z + dz) * KX, y + dy + (z + dz) * KY])
// a strip that follows part of a circle: a mudguard
const band = (cx: number, cy: number, r: number, from: number, to: number, w: number): Pt[] => [
  ...arc(cx, cy, r + w / 2, from, to),
  ...arc(cx, cy, r - w / 2, from, to).reverse(),
]

// what a headlight at (x, y) throws forward onto the road
const ray = (x: number, y: number): Part => ({
  kind: 'ray',
  pts: [[x - 1, y - 1.5], [x + 1, y + 1.5], [x + 47, y + 7], [x + 47, 0], [x + 23, 0]],
})

// a wheel under an angular arch
const wheel = (cx: number): Part[] => [
  { pts: [[cx - 7, 4], [cx + 7, 4], [cx + 7, 8], [cx + 4, 11], [cx - 4, 11], [cx - 7, 8]], kind: 'trim' },
  { pts: [[cx, 5]], r: 5, kind: 'wheel' },
]

// The cars all face right and are 20 deep. Each is one painted outline; glass, seams, trim and lights go on top of it.

export const SEDAN: Part[] = [
  ray(81, 13),
  {
    d: 20,
    pts: [
      [2, 4], [74, 4], [76, 6], [76, 12], [74, 14], // the nose
      [54, 16], [47, 25], [45, 26], // bonnet, windscreen
      [23, 26], [21, 25], [13, 16], // roof, rear screen
      [2, 15], [0, 13], [0, 6], // boot
    ],
  },
  { pts: [[53, 17.3], [48, 23.7]], z: 2, d: 16, kind: 'glass' }, // windscreen
  { pts: [[76, 6], [76, 8]], d: 20, kind: 'trim' }, // bumper, across the nose
  { pts: [[76, 9.5], [76, 12]], z: 1, d: 5, kind: 'light' },
  { pts: [[76, 9.5], [76, 12]], z: 7, d: 6, kind: 'trim' }, // grille
  { pts: [[76, 9.5], [76, 12]], z: 14, d: 5, kind: 'light' },
  { pts: [[16.5, 17], [33, 17], [33, 24], [22.5, 24]], kind: 'glass' },
  { pts: [[35, 17], [50.5, 17], [45.5, 24], [35, 24]], kind: 'glass' },
  { pts: [[0, 6], [2, 4], [7, 4], [7, 8], [0, 8]], kind: 'trim' }, // bumpers
  { pts: [[69, 4], [74, 4], [76, 6], [76, 8], [69, 8]], kind: 'trim' },
  { pts: [[23, 6], [23, 16]] }, // door seams
  { pts: [[34, 6], [34, 26]] },
  { pts: [[51, 6], [51, 16]] },
  { pts: box(24.5, 13, 3, 1), kind: 'trim' }, // handles
  { pts: box(36, 13, 3, 1), kind: 'trim' },
  { pts: box(72, 9.5, 4, 2.5), kind: 'light' },
  { pts: box(0, 9, 2, 4), kind: 'tail' },
  ...wheel(15),
  ...wheel(59),
]

export const HATCH: Part[] = [
  ray(67, 14),
  {
    d: 20,
    pts: [
      [2, 4], [60, 4], [62, 6], [62, 13], [60, 15], // the nose
      [46, 17], [39.5, 27], [37.5, 28], // short bonnet, windscreen
      [12, 28], [10, 27], [3, 17], // roof, hatch
      [0, 14], [0, 6],
    ],
  },
  { pts: [[45.2, 18.2], [40.3, 25.8]], z: 2, d: 16, kind: 'glass' }, // windscreen
  { pts: [[62, 6], [62, 8]], d: 20, kind: 'trim' }, // bumper, across the nose
  { pts: [[62, 10.5], [62, 13]], z: 1, d: 5, kind: 'light' },
  { pts: [[62, 10.5], [62, 13]], z: 7, d: 6, kind: 'trim' }, // grille
  { pts: [[62, 10.5], [62, 13]], z: 14, d: 5, kind: 'light' },
  { pts: [[6.5, 18], [25, 18], [25, 26], [12, 26]], kind: 'glass' },
  { pts: [[27, 18], [42.5, 18], [37.5, 26], [27, 26]], kind: 'glass' },
  { pts: [[0, 6], [2, 4], [6, 4], [6, 8], [0, 8]], kind: 'trim' }, // bumpers
  { pts: [[56, 4], [60, 4], [62, 6], [62, 8], [56, 8]], kind: 'trim' },
  { pts: [[26, 6], [26, 28]] }, // door seams
  { pts: [[41, 6], [41, 17]] },
  { pts: box(28, 14, 3, 1), kind: 'trim' }, // handle
  { pts: box(58, 10.5, 4, 2.5), kind: 'light' },
  { pts: box(0, 9, 2, 4), kind: 'tail' },
  ...wheel(13),
  ...wheel(49),
]

export const VAN: Part[] = [
  ray(75, 14),
  {
    d: 20,
    pts: [
      [2, 4], [68, 4], [70, 6], [70, 16], // the nose
      [64, 32], [62, 34], // windscreen
      [3, 34], [0, 31], [0, 6], // a long roof and a flat back
    ],
  },
  { pts: [[69.25, 18], [64.75, 30]], z: 2, d: 16, kind: 'glass' }, // windscreen
  { pts: [[70, 6], [70, 8]], d: 20, kind: 'trim' }, // bumper, across the nose
  { pts: [[70, 10], [70, 13]], z: 1, d: 5, kind: 'light' },
  { pts: [[70, 10], [70, 13]], z: 14, d: 5, kind: 'light' },
  { pts: box(6, 20, 19, 10), kind: 'glass' },
  { pts: box(28, 20, 19, 10), kind: 'glass' },
  { pts: [[50, 20], [66, 20], [62.25, 30], [50, 30]], kind: 'glass' },
  { pts: [[0, 6], [2, 4], [6, 4], [6, 8], [0, 8]], kind: 'trim' }, // bumpers
  { pts: [[65, 4], [68, 4], [70, 6], [70, 8], [65, 8]], kind: 'trim' },
  { pts: [[0, 17], [69.6, 17]] }, // waistline
  { pts: [[26.5, 6], [26.5, 34]] }, // door seams
  { pts: [[48.5, 6], [48.5, 34]] },
  { pts: box(44, 14, 3, 1), kind: 'trim' }, // handles
  { pts: box(50, 14, 3, 1), kind: 'trim' },
  { pts: box(67, 10, 3, 3), kind: 'light' },
  { pts: box(0, 9, 2, 5), kind: 'tail' },
  ...wheel(14),
  ...wheel(57),
]

const SKIN = '#e2a67a'

// An auto-rickshaw: three wheels, and no bonnet. The front is a tall rounded shield with one headlight in the middle
// and the windscreen straight above it; the front wheel tucks in underneath. The cabin is
// open on both sides, so you see the far side through it. Its paint is the body; the canopy and the band under the
// windscreen are always yellow. Listed far side first, then the body, what's inside the cabin, the roof and the wheels.
const AUTO_BODY: Pt[] = [
  [1, 6], [31, 6], [32, 7], [32, 15], // floor pan and the flat wall behind the front
  [30, 15], [30, 9], [12, 9], [12, 17], // down into the cabin and back up the seat wall
  [0, 17], [0, 8], // rear panel
]
const SHADED = 'color-mix(in srgb, var(--paint) 70%, #000)'
const CANOPY = '#f2c230'
const KHAKI = '#b9a26a'
const SEAT = '#8a5a3c'
export const RICKSHAW: Part[] = [
  ray(39.6, 13.3),
  { pts: [[8, 4.5]], z: 16, r: 4.5, kind: 'wheel' }, // far rear wheel
  { pts: AUTO_BODY, z: 16, fill: SHADED }, // far side
  { pts: [[0, 17], [10, 17], [12, 26.5], [0, 26.5]], z: 16, fill: '#c2981c' },
  { pts: [[0.5, 17], [1.5, 26.5]], d: 16, fill: '#d6aa22' }, // the canopy's back wall, from inside
  { pts: AUTO_BODY, d: 16 },
  { pts: [[30, 15], [32, 15], [32, 17.5], [30, 17.5]], d: 16, fill: CANOPY }, // band under the windscreen
  // The front is rounded like a shield, so it's a narrower piece standing proud of the wall, curved from top to bottom.
  { pts: [[32, 6.5], [34.4, 7.2], [35.6, 9.6], [35.6, 13], [34.6, 14.6], [32, 15.4]], z: 3, d: 10 },
  { pts: onFront(35.6, 11.3, 8, 1.6), kind: 'light' }, // the one headlight
  { pts: box(12, 9, 7, 3.5), z: 1, d: 14, fill: SEAT }, // passenger bench
  { pts: [[12, 12.5], [12, 21]], z: 1, d: 14, fill: SEAT },
  { pts: box(21, 9, 5, 3.5), z: 4, d: 8, fill: SEAT }, // driver's seat
  limb(0.8, DARK, [[30, 10], [29.2, 17.4]], 6), // handlebar
  limb(2.4, '#8f7b4c', [[23.4, 14], [27.4, 13.6], [28.2, 10]], 6), // the driver, in khaki
  limb(4.2, KHAKI, [[23.4, 14.4], [24.1, 20.4]], 6),
  limb(1.4, SKIN, [[24.4, 21.4], [24.7, 22.6]], 6),
  { pts: [[27.1, 23.7]], z: 6, r: 0.5, fill: SKIN }, // nose
  { pts: [[24.9, 24]], z: 6, r: 2.2, fill: SKIN },
  { pts: arc(24.9, 24, 2.4, 20, 200), z: 6, kind: 'trim' }, // hair
  { pts: [[26.2, 24.3]], z: 6, r: 0.3, fill: DARK },
  limb(1.7, KHAKI, [[24.5, 20.4], [26.2, 17.8]], 6), // sleeve, forearm, hand
  limb(1.3, SKIN, [[26.2, 17.8], [28.8, 17.6]], 6),
  { pts: [[29, 17.6]], z: 6, r: 0.8, fill: SKIN },
  { pts: [[32, 17.5], [30.6, 26.5]], z: 1, d: 14, kind: 'glass' }, // windscreen
  limb(0.9, DARK, [[20.5, 9], [20.5, 26.5]]), // the bar behind the driver
  { pts: [[0, 17], [10, 17], [12, 26.5], [0, 26.5]], fill: CANOPY }, // near side of the canopy
  {
    d: 16,
    fill: CANOPY, // roof, rounded off at both ends
    pts: [[-0.5, 26.5], [31, 26.5], [32, 27.5], [31, 29], [27, 30], [6, 30], [1.5, 28.8]],
  },
  // The front wheel is drawn on the ground line, tucked under the middle of the front. Set back to the true middle of
  // the body, this view would lift it off the road.
  { pts: [[37.5, 4.2]], r: 4.2, kind: 'wheel' },
  { pts: band(37.5, 4.2, 4.9, 30, 150, 1.2) }, // mudguard
  { pts: box(0, 11, 1.5, 3), kind: 'tail' },
  { pts: [[2.5, 6], [13.5, 6], [13.5, 8.5], [11, 11], [5, 11], [2.5, 8.5]], kind: 'trim' }, // rear arch
  { pts: [[8, 4.5]], r: 4.5, kind: 'wheel' },
]

// A roadster bicycle with mudguards, a carrier and a lamp, and a rider with a backpack. Its paint is the rider's shirt.
// Listed far leg first, then the bicycle, then the rest of the rider over it.
const HIP: Pt = [11.5, 17.5]
const TUBE = 0.9
const FRAME = '#e5533d'
const STEEL = '#b9bdc7'
const JEANS = '#2f3b59'
const CAP = '#f3ead7'
const CRANK = 2.6
const BONE = 7.6 // thigh and shin are the same length
// One leg, from the hip to the knee to the ankle above a pedal. The knee is wherever a thigh and a shin of fixed length
// meet, bending forward.
const leg = ([px, py]: Pt): Pt[] => {
  const dx = px + 0.4 - HIP[0]
  const dy = py + 1.6 - HIP[1]
  const reach = Math.min(Math.hypot(dx, dy), 2 * BONE - 0.01)
  const a = Math.atan2(dy, dx) + Math.acos(reach / (2 * BONE))
  return [HIP, [HIP[0] + BONE * Math.cos(a), HIP[1] + BONE * Math.sin(a)], [px + 0.4, py + 1.6]]
}
const shoe = ([x, y]: Pt): Pt[] => [[x - 1.1, y + 0.2], [x + 1.8, y + 0.2]]

// `turn` is the angle of the cranks; lower it steadily and the rider pedals forward.
export const cyclist = (turn: number): Part[] => {
  const near: Pt = [14 + CRANK * Math.cos(turn), 5 + CRANK * Math.sin(turn)]
  const far: Pt = [14 - CRANK * Math.cos(turn), 5 - CRANK * Math.sin(turn)]
  return [
    limb(2.4, '#232c44', leg(far)), // far leg
    limb(1.7, '#d8d8d4', shoe(far)),
    { pts: band(6.5, 6, 7, 15, 175, 0.7), fill: STEEL }, // mudguards
    { pts: band(26, 6, 7, 30, 150, 0.7), fill: STEEL },
    { pts: [[6.5, 6]], r: 6, kind: 'spoked' },
    { pts: [[26, 6]], r: 6, kind: 'spoked' },
    limb(0.6, STEEL, [[3.4, 13.7], [11.6, 14.2]]), // carrier
    limb(0.5, STEEL, [[4.4, 13.6], [6.5, 6]]),
    { pts: [[14, 6.6], [6.5, 6.9]] }, // chain
    { pts: [[14, 3.4], [6.5, 5.1]] },
    { pts: [[6.5, 6]], r: 1, fill: STEEL },
    limb(TUBE, FRAME, [[14, 5], [6.5, 6], [12, 14]]), // frame: rear triangle, then the main one
    limb(TUBE, FRAME, [[11.5, 15.2], [14, 5], [23, 12]]),
    limb(TUBE, FRAME, [[12, 14], [22.3, 15.2]]),
    limb(1.2, FRAME, [[22.3, 15.4], [23, 12]]), // head tube
    limb(TUBE, FRAME, [[23, 12], [24.4, 8.4], [26, 6]]), // fork, curving forward
    limb(0.7, STEEL, [[22.3, 15.4], [21.8, 18.4], [24.2, 18.9]]), // stem and handlebar
    limb(1.2, DARK, [[23.2, 18.7], [24.5, 18.95]]), // grip
    { pts: [[22, 19.4]], r: 0.6, fill: STEEL }, // bell
    limb(0.5, DARK, [[22.8, 13.8], [23.8, 14.2]]), // the lamp, on a bracket off the head tube
    { pts: [[24.5, 14.3]], r: 1.1, kind: 'light' },
    { pts: box(2.6, 12.2, 1.2, 1.2), kind: 'tail' }, // reflector
    { pts: [[14, 5]], r: 1.7, fill: STEEL }, // chainring and cranks
    limb(0.6, DARK, [far, [14, 5], near]),
    { pts: [[8.6, 15.2], [14.2, 15], [14.4, 16], [12, 16.6], [9, 16.4]], fill: '#5a3a26' }, // saddle
    limb(2.4, JEANS, leg(near)), // near leg
    limb(1.7, '#f1f1ee', shoe(near)),
    limb(2, '#c95f2e', [[9, 23.2], [10.1, 24.6]]), // backpack: its pocket, then the bag flat against the back
    limb(4, '#e0703a', [[10.2, 22], [13, 25.4]]),
    limb(4.6, undefined, [HIP, [17.4, 24.6]]), // shirt, over the bag's inner edge
    // the strap: over the shoulder, down the chest, and back under the arm to the bottom of the bag
    limb(0.7, '#b5562a', [[15.1, 25.4], [16.9, 25.9], [18.2, 22.8], [15.6, 21.4], [12, 21.5]]),
    limb(1.6, SKIN, [[18.1, 25.4], [19.2, 26.8]]), // neck
    limb(2, undefined, [[17.7, 24.3], [19.8, 21]]), // sleeve
    limb(1.4, SKIN, [[19.8, 21], [23.3, 19.1]]), // forearm and hand
    { pts: [[23.6, 19]], r: 0.9, fill: SKIN },
    { pts: [[22.5, 28]], r: 0.55, fill: SKIN }, // nose
    { pts: [[20, 28.5]], r: 2.6, fill: SKIN }, // head
    { pts: [[21.5, 28.6]], r: 0.3, fill: DARK }, // eye
    { pts: arc(20, 28.5, 2.75, 150, 250), kind: 'trim' }, // hair, showing under the cap at the back
    { pts: arc(20, 28.8, 2.9, 5, 185), fill: CAP }, // cap
    limb(0.8, CAP, [[22.7, 29.4], [25, 29]]), // and its peak
  ]
}
export const CYCLIST = cyclist(-0.9)

// A jet engine with its intake at x: a pod that tapers to the exhaust, and the intake seen at an angle, with a bright
// lip, the fan inside and a spinner in the middle.
const engine = (x: number, y: number): Part[] => [
  { pts: [[x - 9, y + 0.8], [x - 11.4, y], [x - 9, y - 0.8]], fill: '#8f8f8a' }, // exhaust cone
  {
    smooth: true,
    fill: '#cfcfca',
    pts: [
      [x, y - 2], [x, y - 2], [x, y + 2], [x, y + 2], // the front, square
      [x - 5, y + 2.2], [x - 9, y + 1.2], [x - 9, y + 1.2], // tapering back
      [x - 9, y - 1.2], [x - 9, y - 1.2], [x - 5, y - 2.3],
    ],
  },
  { pts: [[x - 6.5, y + 1.8], [x - 6.5, y - 1.9]] }, // a panel line
  { smooth: true, pts: onFront(x, y, 0, 2.1), fill: '#ecece8' }, // intake lip
  { smooth: true, pts: onFront(x, y, 0, 1.5), fill: '#6b6e75' }, // fan
  ...[0, 2, 4, 6, 8].map((k): Part => ({ pts: [[x, y], onFront(x, y, 0, 1.5)[k]] })), // blades
  { pts: [[x, y]], r: 0.5, fill: '#e2e2de' }, // spinner
]

// An airliner, seen from far off. Its paint is the tail fin and the stripe. The hull is one rounded shape with a pointed
// tail; the wings are flat shapes drawn already tilted, since they sweep back, with an engine under each. Its windows
// light up at night, and it carries a red beacon on the roof and a light on the wingtip.
const HULL = '#f4f4f1'
const WING = '#e4e4e0'
export const PLANE: Part[] = [
  ...engine(62, 12.9), // far engine and wing
  { pts: [[40, 10.5], [52, 10.5], [64, 17.5], [59, 17.5]], fill: '#cdcdc8' },
  { pts: [[19, 11], [10, 24.5], [4.5, 24.5], [5.5, 10.5]] }, // fin
  {
    smooth: true,
    fill: HULL,
    pts: [
      [0, 9.6], [0, 9.6], [14, 4.5], [30, 2.5], [70, 2.5], // tail cone, belly
      [80, 3.6], [84.5, 6.6], [80, 10], [72, 11.5], // nose
      [20, 11.5], [6, 11], // roof
    ],
  },
  {
    smooth: true,
    bare: true,
    fill: '#d6d6d1', // the shaded underside, just inside the hull's border
    pts: [[3.4, 8.4], [14, 4.9], [30, 2.8], [70, 2.8], [79.8, 3.9], [83, 5.6], [70, 4.8], [30, 4.8], [16, 6.2]],
  },
  limb(0.8, undefined, [[14, 6.3], [81.5, 6.3]]), // stripe
  ...Array.from({ length: 11 }, (_, i): Part => ({ pts: [[25 + i * 4, 8.5]], r: 0.75, kind: 'pane' })),
  // the cockpit: a side window and the windscreen, following the curve of the nose
  { pts: [[73.6, 8.3], [76.4, 8.3], [76.7, 9.8], [73.6, 10.1]], kind: 'glass' },
  { pts: [[77.3, 8.3], [80.7, 8.3], [79.4, 9.3], [77.6, 9.8]], kind: 'glass' },
  { pts: [[31, 11.9]], r: 0.7, kind: 'tail' }, // beacon, on the roof clear of the wing
  { pts: [[5, 8.8], [13.5, 8.8], [5, 5.2], [1.5, 5.2]], fill: WING }, // tailplane
  ...engine(47, -2.6), // near engine, and the wing over the back of it
  { pts: [[37, 4.4], [53, 4.4], [30, -6], [24.5, -6]], fill: WING },
  { pts: [[27.2, -6]], r: 0.7, kind: 'light' }, // wingtip light
]

// A street lamp: a round pole that thins as it rises and curves over into an arm, with a lamp head at the end and a
// lens under it. At night the lens is lit and light falls from it onto the road.
const POLE = '#5d616c'
export const LAMP: Part[] = [
  { pts: [[13.2, 44.9], [18.8, 45.5], [31, 0], [3, 0]], kind: 'beam' },
  { pts: box(-1.6, 0, 5.2, 1.2), fill: '#3f424a' }, // base plate
  limb(2.6, '#4a4d55', [[1, 1.8], [1, 5]]), // the sleeve the pole stands in
  limb(1.6, POLE, [[1, 5], [1, 24]]),
  limb(1.2, POLE, [[1, 24], [1, 38.5], [1.6, 42], [3.6, 44.4], [7, 45.8], [12, 46.6]]), // thinner, curving into an arm that keeps rising
  {
    smooth: true,
    fill: '#727682', // lamp head
    pts: [[11, 47.3], [11, 47.3], [18.6, 48], [20.4, 47.2], [18.8, 46.1], [11.4, 45.5], [11.4, 45.5]],
  },
  { pts: [[13, 45.5], [18.6, 46], [18.9, 45.4], [13.2, 44.8]], kind: 'light' }, // lens
]

// Round things: clouds and treetops. Each is a heap of round puffs that merge into one shape inside one thin border, with
// nothing drawn inside it but its shade: the lit part is the same shape nudged up and to the left, so what's left over
// is a shaded underside that follows the puffs. Puffs are [centre x, centre y, radius].
export type Puffs = [number, number, number][]

const BELLY = 8

const bounds = (puffs: Puffs) => ({
  left: Math.min(...puffs.map(([cx, , r]) => cx - r)),
  right: Math.max(...puffs.map(([cx, , r]) => cx + r)),
  top: Math.max(...puffs.map(([, cy, r]) => cy + r)),
  base: Math.min(...puffs.map(([, cy, r]) => cy - r)),
})

// The heap without its svg, so a tree can put a trunk under it. A cloud has a flat belly joining its lowest puffs; a
// treetop doesn't, and takes `glint`, a third, brightest tone at the top left.
function Heap({ puffs, lit, shade, glint }: { puffs: Puffs; lit: string; shade: string; glint?: string }) {
  const id = useId()
  const from = Math.min(...puffs.map(([cx]) => cx))
  const shape = (
    <>
      {/* the belly runs between the outermost puffs' centres, so its ends are hidden inside them */}
      {!glint && (
        <rect
          x={from}
          y={-(bounds(puffs).base + BELLY)}
          width={Math.max(...puffs.map(([cx]) => cx)) - from}
          height={BELLY}
          vectorEffect={THIN}
        />
      )}
      {puffs.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={-cy} r={r} vectorEffect={THIN} />
      ))}
    </>
  )
  return (
    <>
      <clipPath id={id}>{shape}</clipPath>
      {/* the border is drawn double width underneath the fill, so only the half outside the whole shape survives */}
      <g fill="none" stroke="var(--edge)" strokeWidth="2">
        {shape}
      </g>
      <g clipPath={`url(#${id})`} stroke="none">
        <g fill={shade}>{shape}</g>
        <g fill={lit} transform="translate(-3 -4)">
          {shape}
        </g>
        {glint && (
          <g fill={glint} transform="translate(-9 -12)">
            {shape}
          </g>
        )}
      </g>
    </>
  )
}

export function Cloud({ puffs, scale = 2 }: { puffs: Puffs; scale?: number }) {
  const { left, right, top } = bounds(puffs)
  return (
    <svg
      aria-hidden="true"
      width={(right - left + 3) * scale}
      height={(top + 3) * scale}
      viewBox={`${left - 1.5} ${-(top + 1.5)} ${right - left + 3} ${top + 3}`}
    >
      <Heap puffs={puffs} lit="var(--cloud)" shade="var(--cloud-shade)" />
    </svg>
  )
}

// A tree is a heap of leaves on a trunk that flares at the foot and is darker down one side.
export function Tree({ puffs, scale = 2 }: { puffs: Puffs; scale?: number }) {
  const { left, right, top, base } = bounds(puffs)
  const c = (left + right) / 2
  const h = base + 4
  const trunk = (xs: number[][]) => xs.map(([x, y]) => `${c + x},${-y}`).join(' ')
  return (
    <svg
      aria-hidden="true"
      width={(right - left + 3) * scale}
      height={(top + 3) * scale}
      viewBox={`${left - 1.5} ${-(top + 1.5)} ${right - left + 3} ${top + 3}`}
      strokeLinejoin="round"
    >
      <polygon
        points={trunk([[-4.5, 0], [4.5, 0], [2, 4], [1.5, h], [-1.5, h], [-2, 4]])}
        fill={dim('#8a6642')}
        stroke="var(--edge)"
        vectorEffect={THIN}
      />
      <polygon
        points={trunk([[0.6, 0.4], [4, 0.4], [1.7, 4], [1.2, h], [0.6, h]])}
        fill={dim('#6a4c30')}
      />
      <Heap puffs={puffs} lit={dim('#4fae6a')} shade={dim('#2f7d4c')} glint={dim('#7dcb8b')} />
    </svg>
  )
}

export const CLOUD: Puffs = [
  [30, 22, 15], [52, 27, 20], [74, 20, 13], // back row
  [14, 12, 12], [38, 14, 14], [64, 13, 13], [84, 9, 9], // front row
]
export const CLOUDLET: Puffs = [[20, 14, 10], [36, 17, 13], [10, 8, 8], [26, 10, 10], [46, 8, 8]]
export const SAPLING: Puffs = [[9, 21, 7], [18, 20, 7], [5, 27, 6], [22, 27, 6], [13, 31, 8]]
export const TREETOP: Puffs = [
  [9, 25, 9], [18, 23, 9], [27, 26, 8], // the bottom of the crown, hanging over the trunk
  [5, 32, 7], [30, 33, 7], [13, 37, 10], [23, 38, 9],
]
