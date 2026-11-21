import Image from 'next/image'
import Section, { Cell, Dots } from '@/components/site/Section'
import NowPlaying from '@/components/site/NowPlaying'

// Who Ali is in a few sentences, then what he's up to at the moment as a compact bento of plain text, with one picture
// in dots: the shelf. The paragraph keeps to the left two thirds of the frame; the vine hangs into the space on the right.

// A wooden shelf hung by two ropes from the divider line above its compartment, the ropes passing through the plank and
// knotted underneath. On it is a packed row of cases in different heights and colours, the last one leaning on the
// rest, and a cactus: what Ali spends time on away from work. Coloured like the vine, and dimmer at night.
const SHELF = [
  '..|............................|..',
  '..|............................|..',
  '..|............................|..',
  '..|............................|..',
  '..|.rrR.....tT............g....|..',
  '..|.rrRnN...tTccC.......g.g....|..',
  '..|.rwRnNyyYtTccCmMkK...ggg.g..|..',
  '..|.rwRnNyyYtTnnNmMkK.....ggg..|..',
  '..|.rrRnNyyYtTccCmM.kK....G....|..',
  '..|.rrRnNyyYtTccCmM.kK..ppppP..|..',
  '..|.rrRnNyyYtTccCmM..kK..ppP...|..',
  '..|.rrRnNyyYtTccCmM..kK..ppP...|..',
  '==================================',
  '----------------------------------',
  '..|............................|..',
]
// each thing in two tones, lit and in shade, by day and by night
const WOOD: Record<string, string> = {
  '|': 'fill-[#b89b6a] [[data-theme=night]_&]:fill-[#6b5c44]', // rope
  '=': 'fill-[#c9a26b] [[data-theme=night]_&]:fill-[#74603f]', // the plank
  '-': 'fill-[#a07c4c] [[data-theme=night]_&]:fill-[#564630]',
  r: 'fill-[#d8483c] [[data-theme=night]_&]:fill-[#8c3a38]', // the cases: red, with a label
  R: 'fill-[#a8322c] [[data-theme=night]_&]:fill-[#6a2a2c]',
  w: 'fill-[#f4ece0] [[data-theme=night]_&]:fill-[#b8b4b0]',
  n: 'fill-[#3d4f8a] [[data-theme=night]_&]:fill-[#46548a]', // navy
  N: 'fill-[#2c3a6b] [[data-theme=night]_&]:fill-[#333f6c]',
  y: 'fill-[#e0b040] [[data-theme=night]_&]:fill-[#8f743a]', // mustard
  Y: 'fill-[#b88a2c] [[data-theme=night]_&]:fill-[#6c582e]',
  t: 'fill-[#3f9a8c] [[data-theme=night]_&]:fill-[#356e6a]', // teal
  T: 'fill-[#2c7468] [[data-theme=night]_&]:fill-[#27524f]',
  c: 'fill-[#efe6d2] [[data-theme=night]_&]:fill-[#a8a294]', // cream, with a navy band
  C: 'fill-[#cfc4ac] [[data-theme=night]_&]:fill-[#7e796e]',
  m: 'fill-[#8a4a7c] [[data-theme=night]_&]:fill-[#6a4266]', // plum
  M: 'fill-[#683660] [[data-theme=night]_&]:fill-[#4e3050]',
  k: 'fill-[#4a4e5a] [[data-theme=night]_&]:fill-[#5a6078]', // and the grey one that leans
  K: 'fill-[#8a90a0] [[data-theme=night]_&]:fill-[#8a92b0]',
  g: 'fill-[#6aa35a] [[data-theme=night]_&]:fill-[#3f6a4c]', // the cactus
  G: 'fill-[#46803f] [[data-theme=night]_&]:fill-[#2f5040]',
  p: 'fill-[#c46e48] [[data-theme=night]_&]:fill-[#7a4a3c]', // and its pot
  P: 'fill-[#9c5438] [[data-theme=night]_&]:fill-[#5c382e]',
}

// The bento: two rows of two compartments, each row split two thirds to one third so the divider between them is in the
// same place in both. Every compartment is 92px tall with a 24px gutter either side of that divider.
// Its dividers don't close into boxes: each is solid where it meets another and fades away before its far end. One runs
// across between the rows, one up from it and one down from it. On a phone, where the compartments stack, each just
// has a fading line above it.
const ABOVE =
  'before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-line before:from-40% before:to-transparent'
const ABOVE_STACKED =
  'max-sm:before:absolute max-sm:before:inset-x-0 max-sm:before:top-0 max-sm:before:h-px max-sm:before:bg-linear-to-r max-sm:before:from-line max-sm:before:from-40% max-sm:before:to-transparent'
const BESIDE = 'sm:after:absolute sm:after:inset-y-0 sm:after:right-0 sm:after:w-px sm:after:from-line sm:after:from-25% sm:after:to-transparent'

export default function Now() {
  return (
    <Section id="now" label="About & now">
      <p className="max-w-lg text-body">
        fourth year cs student. i love design and i love code, and a design engineer gets to do both, so that&apos;s the
        plan. until then i&apos;m learning design by doing it, on client projects.
      </p>
      <ul className="mt-6 grid sm:grid-cols-6">
        <Cell
          label="Learning"
          className={`sm:col-span-4 sm:pr-6 ${ABOVE_STACKED} ${BESIDE} sm:after:bg-linear-to-t`}
        >
          self-taught in design, which so far means pinterest, x and{' '}
          <a
            href="https://emilkowal.ski"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line underline-offset-4 hover:decoration-fg"
          >
            emil kowalski
          </a>
          .
        </Cell>
        {/* This one is a single line with no dot picture: the studio's own boxed wordmark is the picture. It's drawn in
            near-black, so it's turned light at night. */}
        <li className={`relative flex items-center gap-3 py-4 text-small sm:col-span-2 sm:pl-6 ${ABOVE_STACKED}`}>
          interning at
          <a
            href="https://wokeworks.ai"
            target="_blank"
            rel="noreferrer"
            aria-label="wokeworks"
            className="shrink-0 opacity-80 transition-[opacity,scale] duration-150 ease-soft hover:opacity-100 active:scale-[0.97]"
          >
            <Image
              src="/wokeworks.svg"
              alt=""
              width={82}
              height={24}
              unoptimized
              className="h-6 w-auto [[data-theme=night]_&]:invert"
            />
          </a>
        </li>
        <li role="presentation" className="col-span-full hidden h-px bg-linear-to-r from-line from-55% to-transparent sm:block" />
        {/* No padding above this one, so the shelf's ropes start right at the line it hangs from. */}
        <li className={`relative flex items-center gap-4 pb-4 sm:col-span-4 sm:pr-6 ${ABOVE_STACKED} ${BESIDE} sm:after:bg-linear-to-b`}>
          <Dots art={SHELF} inks={WOOD} className="self-start" />
          <p className="min-w-0 text-small">
            <span className="mb-1 block text-label text-muted lowercase">Off the clock</span>
            tv shows and games. <span className="text-muted">right now, red dead redemption 2 for the second time.</span>
          </p>
        </li>
        <Cell label="Open to" className={`sm:col-span-2 sm:pl-6 ${ABOVE_STACKED}`}>
          freelance projects <span className="text-muted">and</span> full-time design engineer roles
        </Cell>
        <NowPlaying className={`sm:col-span-6 ${ABOVE}`} />
      </ul>
    </Section>
  )
}
