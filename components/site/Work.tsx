import Section, { Placeholder } from '@/components/site/Section'

// The client work, as one index: websites two to a row, then the two mobile apps side by side. To design: the cards,
// the dot print-in of each preview, the phone outlines, the all / web / mobile filter.
const SLOTS = ['Web project', 'Web project', 'Web project', 'Web project', 'Mobile app', 'Mobile app']

export default function Work() {
  return (
    <Section id="work" label="Work">
      <div className="grid gap-4 sm:grid-cols-2">
        {SLOTS.map((slot, i) => (
          <Placeholder key={i} className="aspect-4/3">
            {slot}
          </Placeholder>
        ))}
      </div>
    </Section>
  )
}
