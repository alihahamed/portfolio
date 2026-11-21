// How the vehicles on the road move. Nothing here is scripted: each one has a speed it would like to go, speeds up and
// brakes smoothly, keeps a safe gap from whatever is ahead, and pulls out to pass something slower when the other lane
// is clear. Distances are px, times are seconds. The road runs left to right.

export type Car = {
  x: number // where its back end is
  v: number // how fast it's going
  v0: number // how fast it would like to go
  len: number
  lane: 0 | 1 // the lane it's heading for: 0 is the near one, 1 the far one, used for passing
  y: number // where it actually is between them, 0 to 1
}

const PUSH = 45 // how hard a driver speeds up
const BRAKE = 70 // how hard they're happy to brake
const GAP = 22 // the gap they keep when stopped
const HEADWAY = 1.1 // and the seconds they leave on top of that when moving

// The "intelligent driver" model: speed up towards the speed you want, less and less as you approach it, and ease off
// by however much the gap ahead is smaller than the one you'd like, given how fast you're closing on it.
export const accel = (v: number, v0: number, gap: number, closing: number) => {
  const want = GAP + Math.max(0, v * HEADWAY + (v * closing) / (2 * Math.sqrt(PUSH * BRAKE)))
  return Math.max(-3 * BRAKE, PUSH * (1 - (v / v0) ** 4 - (want / Math.max(gap, 1)) ** 2))
}

const inLane = (c: Car, lane: number) => Math.abs(c.y - lane) < 0.6
// Is a lane empty alongside this car, from `back` behind it to `front` ahead of it?
const clear = (cars: Car[], me: Car, lane: number, back: number, front: number) =>
  !cars.some((c) => c !== me && inLane(c, lane) && c.x + c.len > me.x - back && c.x < me.x + me.len + front)

export function step(cars: Car[], dt: number) {
  const push = cars.map((me) => {
    // whoever is ahead in the lane it's heading for, or is still alongside in the one it's leaving
    const lead = cars
      .filter((c) => c !== me && c.x > me.x && (inLane(c, me.lane) || Math.abs(c.y - me.y) < 0.5))
      .sort((a, b) => a.x - b.x)[0]
    const gap = lead ? lead.x - me.x - me.len : Infinity
    // pull out to pass something slower when the far lane is clear; pull back in once there's room in front of it
    if (me.lane === 0 && lead && gap < 90 && lead.v0 < me.v0 * 0.85 && clear(cars, me, 1, 140, 220)) me.lane = 1
    else if (me.lane === 1 && clear(cars, me, 0, 50, 110)) me.lane = 0
    return accel(me.v, me.v0, gap, lead ? me.v - lead.v : 0)
  })
  cars.forEach((me, i) => {
    me.v = Math.max(0, me.v + push[i] * dt)
    me.x += me.v * dt
    me.y += (me.lane - me.y) * Math.min(1, dt * 3)
  })
}

// Run with: node -e "import('./components/site/traffic.ts').then((m) => m.check())"
// A fast car comes up behind a slow one. It must never touch it, and it must end up in front, back in the near lane.
export function check() {
  const slow: Car = { x: 300, v: 50, v0: 50, len: 84, lane: 0, y: 0 }
  const fast: Car = { x: 0, v: 110, v0: 110, len: 152, lane: 0, y: 0 }
  for (let t = 0; t < 40 * 60; t++) {
    step([slow, fast], 1 / 60)
    const apart = fast.x + fast.len < slow.x || slow.x + slow.len < fast.x
    if (!apart && Math.abs(fast.y - slow.y) < 0.5) throw new Error(`they touched after ${(t / 60).toFixed(1)}s`)
  }
  if (!(fast.x > slow.x + slow.len && fast.lane === 0 && fast.y < 0.05)) throw new Error('the fast car never got past')
  console.log('traffic ok')
}
