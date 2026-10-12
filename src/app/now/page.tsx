import { type Metadata } from 'next'

import { TermLink } from '@/components/Linkify'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Now',
  description: 'What I am focused on at the moment.',
}

function NowSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Section title={title}>
      <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </Section>
  )
}

export default function Now() {
  return (
    <SimpleLayout
      title="What I’m focused on now."
      intro="Updated 12 October 2026. This is a now page: a snapshot of what has my attention, not a list of everything I do."
    >
      <div className="space-y-20">
        <NowSection title="At work">
          <p>
            Leading engineering at <TermLink term="Roadie" />. Most of my
            attention goes to making the catalog useful to agents as well as
            people: <TermLink term="openroadie" />, a live and permissioned
            graph of services, teams and dependencies, is the centre of that.
          </p>
        </NowSection>
        <NowSection title="Building">
          <p>
            <TermLink term="Viberglass" />, an open-source workspace where a
            team and its coding
            agents work on the same tasks. The current focus is evaluation:
            grading agent runs against real ticket outcomes, measuring
            reliability over repeated runs rather than single passes, and
            treating cost and latency as results, not footnotes.
          </p>
        </NowSection>
        <NowSection title="Learning">
          <p>
            Deliberately deepening in agent evaluation, harness and context
            design, inference economics, and the sandboxes agents run in. Each
            topic ends in something I can measure and write about.
          </p>
        </NowSection>
        <NowSection title="Running at home">
          <p>
            <TermLink term="Qwen3.8-Flash-Next" />, a 125B-parameter model, on
            my NAS at 40–48 tokens per second, served by{' '}
            <TermLink term="Strata" /> next to my file shares.
          </p>
        </NowSection>
        <NowSection title="Writing">
          <p>
            Getting back to it after a long pause. This site was rebuilt in
            October 2026, and the first new articles are about running large
            open models on hardware you already own, and how to evaluate coding
            agents without fooling yourself.
          </p>
        </NowSection>
      </div>
    </SimpleLayout>
  )
}
