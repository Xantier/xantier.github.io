import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function LabSection({
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

function Item({
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

export const metadata: Metadata = {
  title: 'Lab',
  description:
    'The home server that runs a 125B-parameter language model next to my file shares, with measured numbers.',
}

export default function Lab() {
  return (
    <SimpleLayout
      title="A NAS that also runs a 125B language model."
      intro="My home server stores files, runs Nextcloud and serves a 125B-parameter mixture-of-experts model to everything else on my network. It is a 2019 desktop with a mid-range graphics card. This page records what is in it, what it runs and how fast, so the numbers in my articles have somewhere to point."
    >
      <div className="space-y-20">
        <LabSection title="Hardware">
          <Item title="Ryzen 5 3600 on a B450 board">
            Six cores, AVX2, PCIe 3.0. The board and CPU were already running my
            NAS. The CPU computes the model experts that are not cached on the
            GPU, so its cores and memory bandwidth set much of the output speed.
          </Item>
          <Item title="64 GB of DDR4-2400">
            Four 16 GB sticks, bought used for €200 in October 2026, the most
            expensive RAM market in years. The model keeps all of its experts
            here.
          </Item>
          <Item title="Radeon RX 9070, 16 GB">
            Holds about 7,600 of the model’s 24,576 experts as a cache. VRAM
            capacity matters more than GPU speed for this workload, and the
            card’s full x16 link matters for reading long prompts.
          </Item>
          <Item title="512 GB NVMe, openmediavault 8">
            Debian 13 with a web UI for storage, shares and containers. Its
            scheduled tasks double as one-click buttons for switching models.
          </Item>
        </LabSection>
        <LabSection title="What it runs">
          <Item
            title="Strata, serving Qwen3.8-Flash-Next"
            href="https://github.com/Niko1221/Strata"
          >
            A purpose-built inference engine that keeps hot experts in VRAM and
            the rest in system RAM. It exposes OpenAI- and Anthropic-compatible
            APIs on my network, with 128K tokens of context.
          </Item>
          <Item title="Three quantisations, one at a time">
            IQ3_S is the default: it matches the unquantised model on the
            quantiser’s published benchmarks. IQ2_XS is about 8% faster. Swift
            1.5, a fine-tune, thinks much less before answering. A memory cap
            makes sure the model is what gets killed if RAM runs out, not the
            file shares.
          </Item>
        </LabSection>
        <LabSection title="Measured">
          <Item title="40–48 tokens per second">
            Answer speed across eight task types: 43.7 tok/s with IQ2_XS and
            40.4 tok/s with IQ3_S. Measured with BetterBench 0.6.0, five passes
            per category, October 2026.
          </Item>
          <Item title="About 950 tokens per second of prompt reading">
            For prompts of 24K to 47K tokens. Every request also pays a fixed
            1.8 to 2.5 seconds before the first token, which matters more than
            throughput for agents making many small calls.
          </Item>
        </LabSection>
        <LabSection title="Next">
          <Item title="Evaluations, not just speed">
            Running intelligence benchmarks that are not yet saturated against
            each quantisation, and pointing Viberglass’s coding agents at this
            endpoint to see how a home-hosted model does on real tickets.
          </Item>
          <Item title="A 24 GB card">
            By my own model of where the time goes, more VRAM would help more
            than any other single upgrade. It is the next thing to measure.
          </Item>
        </LabSection>
      </div>
    </SimpleLayout>
  )
}
