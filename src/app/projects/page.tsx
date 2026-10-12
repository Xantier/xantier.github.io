import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { GitHubIcon } from '@/components/SocialIcons'

const projects = [
  {
    name: 'Viberglass',
    year: '2026',
    description:
      'An open-source, self-hosted workspace where a team and its coding agents work on the same tasks, from the first question to the final reviewed artifact.',
    link: { href: 'https://github.com/Ilities/viberglass', label: 'github.com' },
    repo: true,
  },
  {
    name: 'openroadie',
    year: '2026',
    description:
      'A live graph of your services, teams, concepts and dependencies: highly available, permissioned and agent-ready. Built at Roadie.',
    link: { href: 'https://github.com/RoadieHQ/openroadie', label: 'github.com' },
    repo: true,
  },
  {
    name: 'ctxpack',
    year: '2025',
    description:
      'An early MCP gateway: curate tools, prompts and resources into context packs and deploy them to Claude, ChatGPT or any MCP client with one click over OAuth 2.1.',
    link: { href: 'https://ctxpack.com', label: 'ctxpack.com' },
    repo: false,
  },
  {
    name: 'local-ctx',
    year: '2025',
    description:
      'Exposes local stdio MCP servers as OAuth-secured endpoints, so web clients like claude.ai can use servers running on your own machine.',
    link: { href: 'https://github.com/Ilities/local-ctx', label: 'github.com' },
    repo: true,
  },
  {
    name: 'roadie-agent',
    year: '2022',
    description:
      'A JS/TS library for building services that extend Roadie’s built-in functionality from inside your own network.',
    link: { href: 'https://github.com/RoadieHQ/roadie-agent', label: 'github.com' },
    repo: true,
  },
  {
    name: 'Kollections',
    year: '2017',
    description:
      'A primer and cheat sheet for Kotlin’s collection extension functions.',
    link: { href: 'https://github.com/Xantier/Kollections', label: 'github.com' },
    repo: true,
  },
  {
    name: 'fullstack-kotlin',
    year: '2017',
    description:
      'A full-stack Kotlin course: a Kotlin React frontend on a Kotlin Spring Boot 2 backend.',
    link: {
      href: 'https://github.com/Xantier/fullstack-kotlin',
      label: 'github.com',
    },
    repo: true,
  },
  {
    name: 'NERD stack',
    year: '2015',
    description:
      'Hipsterer than MEAN: a Node.js, Express, React and database application skeleton from back when isomorphic React was a novel idea.',
    link: { href: 'https://github.com/Xantier/nerd-stack', label: 'github.com' },
    repo: true,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source things I have built, newest first.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve built, mostly in the open."
      intro="Lately that means infrastructure for AI agents: where they work, what context they get, and how they reach tools. Further down are older open-source projects, kept here because some of them still get the odd star."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              {project.repo ? (
                <GitHubIcon className="h-7 w-7 fill-zinc-700 dark:fill-zinc-300" />
              ) : (
                <LinkIcon className="h-7 w-7 text-zinc-700 dark:text-zinc-300" />
              )}
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <p className="relative z-10 mt-1 text-xs text-zinc-400 dark:text-zinc-500">
              {project.year}
            </p>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
