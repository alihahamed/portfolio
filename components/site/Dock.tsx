'use client'

// The dock: the page's only navigation, fixed to the bottom centre so the sky stays clear. Section jumps, then the
// theme switch. The inspect toggle joins it when it's designed.
const LINKS = [
  ['Work', '#work'],
  ['Activity', '#activity'],
  ['Toolbox', '#toolbox'],
  ['Say hi', '#hi'],
]
const ITEM = 'whitespace-nowrap text-muted transition-[color,scale] duration-150 ease-soft hover:text-fg active:scale-[0.97]'

// The page opens on day or night by the clock where Ali is (the script in layout.tsx). This flips it for the rest of
// the visit. The theme lives on <html> rather than in React, so the button holds both labels and CSS shows the right
// one, which also means the server never has to guess which it is.
// ponytail: the choice isn't remembered; the next visit follows the clock again. Store it if that's ever wanted.
const flip = () => {
  const page = document.documentElement
  page.dataset.theme = page.dataset.theme === 'night' ? 'day' : 'night'
}

export default function Dock() {
  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-4 border border-line bg-bg px-4 py-3 text-label lowercase"
    >
      {LINKS.map(([label, href]) => (
        <a key={href} href={href} className={ITEM}>
          {label}
        </a>
      ))}
      <button type="button" onClick={flip} className={`${ITEM} cursor-pointer border-l border-line pl-4 lowercase`}>
        <span className="[[data-theme=night]_&]:hidden">Night</span>
        <span className="hidden [[data-theme=night]_&]:inline">Day</span>
        <span className="sr-only"> theme</span>
      </button>
    </nav>
  )
}
