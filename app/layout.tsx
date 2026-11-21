import type { Metadata } from 'next'
import { Mona_Sans, Caveat } from 'next/font/google'
import './globals.css'

const mona = Mona_Sans({ variable: '--font-mona-sans', subsets: ['latin'] })
const caveat = Caveat({ variable: '--font-caveat', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ali Ahmed',
  description: 'High-craft portfolio',
}

// The theme follows the clock where Ali is, not the visitor's: day from 6 to 18 IST, night otherwise. It runs before
// paint so the page never flashes the wrong sky.
// It also sets --arc, how far through that day or night it is (0 to 1), which places the sun or moon in the sky.
// ponytail: fixed hours; swap in real sunrise and sunset if the difference ever shows.
const THEME = `(e=>{const p=new Intl.DateTimeFormat('en-GB',{hour:'numeric',minute:'numeric',hourCycle:'h23',timeZone:'Asia/Kolkata'}).formatToParts(new Date()),g=t=>+p.find(x=>x.type===t).value,h=g('hour')+g('minute')/60;e.dataset.theme=h>=6&&h<18?'day':'night';e.style.setProperty('--arc',(((h+18)%12)/12).toFixed(3))})(document.documentElement)`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // the script above sets data-theme before React hydrates
      className={`${mona.variable} ${caveat.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME }} />
        {children}
      </body>
    </html>
  )
}
