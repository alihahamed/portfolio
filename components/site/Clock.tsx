'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'

// Where Ali is, the time there, and a guess at what he's up to, which is also why the sky is day or night.
// ponytail: the day below is a fixed routine; edit it (or the city) when life changes.
const CITY = 'Mangalore, India'
const ROUTINE: [number, string][] = [
  [0, 'late-night commits'],
  [2, 'asleep, replies by morning'],
  [7, 'morning coffee'],
  [10, 'at the desk'],
  [13, 'lunch break'],
  [14, 'at the desk'],
  [19, 'evening, still around'],
  [23, 'late-night commits'],
]

// The weather there, from Open-Meteo (free, no key), checked every 15 minutes. WMO weather codes, by where each band
// starts.
const WEATHER = 'https://api.open-meteo.com/v1/forecast?latitude=12.91&longitude=74.86&current=temperature_2m,weather_code'
const SKIES: [number, string][] = [
  [0, 'clear'],
  [1, 'mostly clear'],
  [2, 'partly cloudy'],
  [3, 'cloudy'],
  [45, 'foggy'],
  [51, 'drizzle'],
  [61, 'rain'],
  [71, 'snow'],
  [80, 'showers'],
  [95, 'thunderstorm'],
]

const clock = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Kolkata',
})
const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}
const now = () => clock.format(new Date()) // "21:17"
const unknown = () => '' // the server can't know the visitor's moment; the time fills in once the page is running

export default function Clock() {
  const time = useSyncExternalStore(subscribe, now, unknown)
  const [hour, minute] = time.split(':')
  const h = Number(hour)
  const doing = time ? ROUTINE.findLast(([from]) => from <= h)![1] : ''
  const [weather, setWeather] = useState('')

  useEffect(() => {
    const load = () =>
      fetch(WEATHER)
        .then((r) => r.json())
        .then(({ current: now }) => {
          const sky = SKIES.findLast(([from]) => from <= now.weather_code)![1]
          setWeather(`${Math.round(now.temperature_2m)}° ${sky}`)
        })
        .catch(() => {}) // no weather is fine; the clock carries on
    load()
    const id = setInterval(load, 15 * 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="sm:text-right">
      <p className="text-label text-muted lowercase">
        {CITY}
        {weather && <span className="text-fg/45"> · {weather}</span>}
      </p>
      <p className="mt-1 text-h2 tabular-nums">
        {time ? (
          <>
            {h % 12 || 12}
            <span className="motion-safe:animate-[blink_2s_steps(1)_infinite]">:</span>
            {minute} {h < 12 ? 'am' : 'pm'}
          </>
        ) : (
          ' '
        )}
      </p>
      <p className="mt-1 flex items-center gap-2 text-small text-muted sm:justify-end">
        <span
          aria-hidden="true"
          className={`size-[5px] ${doing.startsWith('asleep') ? 'bg-muted' : 'bg-[#3fb950]'} ${doing ? '' : 'invisible'}`}
        />
        {doing || ' '}
      </p>
    </div>
  )
}
