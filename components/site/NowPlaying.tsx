'use client'

import { useEffect, useState } from 'react'
import { Cell } from '@/components/site/Section'

// The last compartment of the "now" bento: the song Ali has on (with a little dot equaliser) or the last one he
// played, from /api/playing. Checks again every minute; it isn't there at all until Spotify is connected.
type Track = { live: boolean; title: string; artist: string; url: string } | null

const BAR = 'w-[3px] bg-[repeating-linear-gradient(to_top,currentColor_0_3px,transparent_3px_4px)]'

export default function NowPlaying({ className }: { className: string }) {
  const [track, setTrack] = useState<Track>(null)

  useEffect(() => {
    const load = () =>
      fetch('/api/playing')
        .then((r) => r.json())
        .then(setTrack, () => {}) // offline or failing: keep whatever was shown
    load()
    const id = setInterval(load, 60_000)
    return () => clearInterval(id)
  }, [])

  if (!track) return null
  return (
    <Cell
      label={track.live ? 'Listening' : 'Last played'}
      className={className}
      icon={
        <span aria-hidden="true" className="flex h-[19px] items-end gap-px text-ink">
          {[0, 0.3, 0.15, 0.45].map((delay) => (
            <span
              key={delay}
              className={`${BAR} h-[11px] ${track.live ? 'motion-safe:animate-[eq_1.2s_steps(1)_infinite]' : ''}`}
              style={{ animationDelay: `-${delay * 4}s` }}
            />
          ))}
        </span>
      }
    >
      <a href={track.url} target="_blank" rel="noreferrer" className="hover:underline">
        {track.title}
      </a>{' '}
      <span className="text-muted">by {track.artist}</span>
    </Cell>
  )
}
