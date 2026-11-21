import Section, { Placeholder } from '@/components/site/Section'

// The end of the page, in place of a contact section and a footer: the email with a copy button, and the socials.
export default function SignOff() {
  return (
    <Section id="hi" label="Say hi">
      <Placeholder className="h-24">Email and socials</Placeholder>
    </Section>
  )
}
