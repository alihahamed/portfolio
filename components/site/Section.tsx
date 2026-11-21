// The shell every labelled section shares: a hairline across the whole screen at its top, a square node where that
// line crosses each rail, the label tucked up under that line, then the content. 24px in from the rails (16px on
// phones), 24px above the label and 48px below the content.

const NODE = 'absolute -top-0.5 size-[5px] bg-fg' // 5px, so it centres on the 1px lines

export default function Section({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="relative px-4 pt-6 pb-12 sm:px-6">
      <span aria-hidden="true" className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-line" />
      <span aria-hidden="true" className={`${NODE} -left-[3px]`} />
      <span aria-hidden="true" className={`${NODE} -right-[3px]`} />
      <h2 id={`${id}-label`} className="text-label text-muted lowercase">
        {label}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

// One compartment of a compact bento (a `ul` laid out as a grid): what it is over the fact itself, with 16px above and
// below, and optionally a picture before it in a 44px column (11 dots) with 16px between. The bento draws its own dividers and sets the gutter
// either side of them; both come in through `className`.
export function Cell({
  label,
  icon,
  className = '',
  children,
}: {
  label: string
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <li className={`relative flex items-center gap-4 py-4 ${className}`}>
      {icon && <span className="grid w-11 shrink-0 place-items-center text-fg/50">{icon}</span>}
      <p className="min-w-0 text-small">
        <span className="mb-1 block text-label text-muted lowercase">{label}</span>
        {children}
      </p>
    </li>
  )
}

// A picture in the sky's dots, 3px on a 4px grid, drawn as rows of characters. `inks` says what colour each character
// is (as a fill class); by default '#' is a dot in the text colour and anything else a gap.
export function Dots({
  art,
  inks = { '#': 'fill-current' },
  className = '',
}: {
  art: string[]
  inks?: Record<string, string>
  className?: string
}) {
  return (
    <svg aria-hidden="true" width={art[0].length * 4} height={art.length * 4} className={`shrink-0 ${className}`}>
      {art.flatMap((row, y) =>
        [...row].map((dot, x) =>
          inks[dot] ? <rect key={`${x}-${y}`} x={x * 4} y={y * 4} width="3" height="3" className={inks[dot]} /> : null,
        ),
      )}
    </svg>
  )
}

// A stand-in for a part that hasn't been designed yet: a hatched box that says what goes there.
export function Placeholder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`grid place-items-center border border-line bg-[repeating-linear-gradient(135deg,var(--color-line)_0_1px,transparent_1px_6px)] text-center text-label text-muted lowercase ${className}`}
    >
      {children}
    </div>
  )
}
