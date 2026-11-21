import Image from 'next/image'
import Clock from '@/components/site/Clock'
import Vine from '@/components/site/Vine'

// Who this is: the portrait, the name, the role and where to find him on the left; his clock on the right. The vine
// stands on the line below and trails into the next section.

// [name, what the tooltip says, link, icon drawn on a 24 grid]
const LINKS: [string, string, string, React.ReactNode][] = [
  [
    'GitHub',
    'alihahamed',
    'https://github.com/alihahamed',
    <path
      key="github"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      transform="scale(1.5)"
    />,
  ],
  [
    'LinkedIn',
    'ali ahmed',
    'https://www.linkedin.com/in/ali-ahmed-83613b271/',
    <path
      key="linkedin"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />,
  ],
  [
    'X',
    '@AhmedAli8177',
    'https://x.com/AhmedAli8177',
    <path
      key="x"
      d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"
    />,
  ],
  [
    'Email',
    'aliahmedyus@gmail.com',
    'mailto:aliahmedyus@gmail.com',
    <g key="email" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M2.5 5h19v14h-19z" />
      <path d="m3 6 9 7 9-7" />
    </g>,
  ],
  [
    'Résumé',
    'pdf',
    '/resume.pdf',
    <g key="resume" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round">
      <path d="M5.5 2.5h9l4 4v15h-13z" />
      <path d="M14.5 2.5v4h4M9 12h6M9 16h6" />
    </g>,
  ],
]

// A tooltip below whatever it's in (that element needs `group relative`), hanging from a dot like the frame's corner
// nodes. It's the page turned inside out, light on dark by day and dark on light at night, so it stands off the page.
// It grows a touch from where it hangs as it fades in, quickly and easing out, so it feels attached to its icon.
const TIP =
  'pointer-events-none absolute top-full left-1/2 z-20 mt-1 flex origin-top -translate-x-1/2 scale-[0.97] flex-col items-center opacity-0 transition-[opacity,scale] duration-[125ms] ease-soft group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100'

export default function Intro() {
  return (
    <section
      aria-labelledby="name"
      className="relative flex flex-wrap items-start justify-between gap-x-8 gap-y-6 px-4 py-3 sm:px-6"
    >
      <div className="flex items-center gap-6">
        {/* The portrait sits in a porthole: an outer hairline ring with the photo inset inside it. 136px tall with
            12px above and below keeps the block at 160px. */}
        <div className="relative size-34 shrink-0 rounded-full border border-line">
          <Image
            src="/portrait.jpg"
            alt="" // the name sits right beside it
            width={112}
            height={112}
            preload
            className="absolute inset-[11px] rounded-full object-cover"
          />
        </div>
        <div>
          <h1 id="name" className="text-name">
            Ali Ahmed
          </h1>
          <p className="mt-1 text-label text-muted lowercase">Dev &amp; designer</p>
          {/* each icon is a 28px target round a 16px glyph, so the row is pulled 6px left to line the first glyph up
              with the name above it */}
          <ul className="mt-3 -ml-1.5 flex gap-1 text-muted">
            {LINKS.map(([label, handle, href, icon]) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(!href.startsWith('mailto') && { target: '_blank', rel: 'noreferrer' })}
                  className="group relative grid size-7 place-items-center transition-[color,scale] duration-150 ease-soft hover:text-fg focus-visible:text-fg active:scale-[0.97]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                    {icon}
                  </svg>
                  <span aria-hidden="true" className={TIP}>
                    <span className="mb-1 size-[3px] bg-fg" />
                    <span className="bg-fg px-2 py-1 text-label whitespace-nowrap text-bg">
                      <span className="lowercase">{label}</span> <span className="text-bg/60">{handle}</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Clock />
      <Vine />
    </section>
  )
}
