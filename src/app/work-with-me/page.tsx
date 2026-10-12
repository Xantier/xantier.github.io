import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'Codebase rescue, architecture reviews and AI-ready engineering practices through Ilities.',
}

const services = [
  {
    title: 'Codebase rescue and migrations',
    description:
      'Untangling legacy systems and modernising them step by step, without betting the business on a full rewrite.',
  },
  {
    title: 'Architecture reviews',
    description:
      'Finding the structural weaknesses that slow a team down, and a practical order in which to fix them.',
  },
  {
    title: 'MCP servers and gateways',
    description:
      'Safe, queryable interfaces that give AI tools access to your code, documentation and internal systems, with authentication done properly.',
  },
  {
    title: 'Agent workflows and team practices',
    description:
      'Multi-agent orchestration, plus the playbooks, ADRs and team agreements that make AI output reliable instead of noisy.',
  },
]

export default function WorkWithMe() {
  return (
    <SimpleLayout
      title="Work with me."
      intro="Alongside my role at Roadie I take on a small number of consulting engagements through Ilities. I untangle codebases, review architecture, and set up the structure that makes AI tools useful instead of noisy."
    >
      <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2">
        {services.map((service) => (
          <Card as="li" key={service.title}>
            <Card.Title as="h2">{service.title}</Card.Title>
            <Card.Description>{service.description}</Card.Description>
          </Card>
        ))}
      </ul>
      <div className="mt-20 max-w-2xl rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Get in touch
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Tell me what you are working with and what is getting in the way. Most
          engagements start with a short review and a written plan, so you can
          decide what to do next with or without me.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="mailto:jussi@hallila.com">Email me</Button>
          <Button href="https://ilities.dev" variant="secondary">
            ilities.dev
          </Button>
        </div>
      </div>
    </SimpleLayout>
  )
}
