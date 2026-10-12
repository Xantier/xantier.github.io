import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Uses',
  description: 'The hardware and software I build and experiment with.',
}

export default function Uses() {
  return (
    <SimpleLayout
      title="What I build and experiment with."
      intro="Less a gear list than a record of what actually runs things here, including the home server that does far more than a NAS should."
    >
      <div className="space-y-20">
        <ToolsSection title="Home lab">
          <Tool title="A NAS that also runs a 125B model">
            Ryzen 5 3600 on a B450 board, 64 GB of DDR4 and a 16 GB Radeon RX
            9070, running openmediavault. It serves files, Nextcloud and a
            125B mixture-of-experts language model at 40–48 tokens per second.
            How that works is in{' '}
            <a href="/articles/" className="underline">
              the articles
            </a>
            .
          </Tool>
          <Tool title="Strata" href="https://github.com/Niko1221/Strata">
            The inference engine behind it: purpose-built for one model family,
            keeping hot experts in VRAM and the rest in system RAM.
          </Tool>
          <Tool title="openmediavault" href="https://www.openmediavault.org">
            Debian with a sensible web UI for storage, shares and containers.
            Scheduled tasks double as one-click buttons for switching models.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development">
          <Tool title="Linux Mint">
            My desktop OS. It stays out of the way.
          </Tool>
          <Tool title="JetBrains IDEs">
            Still where I read and navigate large codebases.
          </Tool>
          <Tool title="Claude Code" href="https://claude.com/claude-code">
            The coding agent I use daily, and one of the harnesses Viberglass
            runs against.
          </Tool>
          <Tool title="Docker">
            For everything that should be reproducible, which is most things.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
