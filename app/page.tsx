import Sky from '@/components/site/Sky'
import Intro from '@/components/site/Intro'
import Now from '@/components/site/Now'
import Work from '@/components/site/Work'
import Activity from '@/components/site/Activity'
import Toolbox from '@/components/site/Toolbox'
import SignOff from '@/components/site/SignOff'
import Dock from '@/components/site/Dock'

// One centred column, 768px wide, framed like a sheet: down each side runs a band between two hairline rails, filled
// with the sky's own dots (3px on a 4px grid, drawn by ruling page-coloured gaps over a tint) so the display carries on
// down the page. The sections run top to bottom in this order, each designed on its own; the dock floats over the
// bottom of the screen.
const BAND =
  'pointer-events-none absolute inset-y-0 w-3 border-line bg-line bg-[linear-gradient(to_right,var(--color-bg)_1px,transparent_1px),linear-gradient(var(--color-bg)_1px,transparent_1px)] bg-[length:4px_4px] sm:w-8'

export default function Home() {
  return (
    <div className="overflow-x-clip px-2 pb-24 sm:px-4">
      <main className="relative mx-auto max-w-[calc(var(--container-frame)+1.5rem)] border-x border-line px-3 sm:max-w-[calc(var(--container-frame)+4rem)] sm:px-8">
        <span aria-hidden="true" className={`${BAND} left-0 border-r`} />
        <span aria-hidden="true" className={`${BAND} right-0 border-l`} />
        <Sky />
        <Intro />
        <Now />
        <Work />
        <Activity />
        <Toolbox />
        <SignOff />
      </main>
      <Dock />
    </div>
  )
}
