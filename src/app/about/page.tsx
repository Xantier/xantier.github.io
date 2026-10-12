import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Jussi Hallila, a Finnish software engineer living in Arnhem, the Netherlands.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Jussi Hallila"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Jussi Hallila. I build the platforms other engineers, and now
            their agents, build on.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’m a Finnish software engineer living in Arnhem, the Netherlands.
              I studied software engineering in Lapland, with detours to Missouri
              and Shanghai, and wrote my first production code at CERN, building
              a database and web frontend for the TOTEM experiment.
            </p>
            <p>
              Most of my career has been in Dublin: business intelligence at IBM,
              insurance services at Liberty IT, a mobile marketing platform at
              Brandtone, and then leading frontend engineering and architecture
              at VSWare and Visma Labs. Somewhere along the way I became the
              person who cares about build pipelines, deployment and the
              boundaries between systems as much as the features on top.
            </p>
            <p>
              Today I’m Head of Engineering at Roadie. Alongside that I run
              Ilities, a small consultancy for codebase rescue, architecture
              reviews and AI-ready engineering practices. In 2025 I built
              ctxpack there, one of the early MCP gateways, and now I build
              Viberglass, an open-source platform for running coding agents
              against real tickets, and I spend more time than is reasonable
              measuring how fast large open models run on hardware I already
              own.
            </p>
            <p>
              This site started in 2016 as notes to myself on JVM and frontend
              work. The older articles are still here; some of them have aged
              better than others.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/Prof_xan" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://github.com/Xantier"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/jussihallila"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:jussi@hallila.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              jussi@hallila.com
            </SocialLink>
          </ul>
        </div>
      </div>
      <Experience />
    </Container>
  )
}

const experience = [
  {
    company: 'Roadie',
    title: 'Head of Engineering',
    period: '2021 – present',
    highlights: [
      'Lead engineering for Roadie’s developer platform built on Backstage.',
      'Shipped openroadie, a live, permissioned, agent-ready graph of services, teams and dependencies.',
      'Built roadie-agent, the library customers use to extend Roadie from inside their own networks.',
    ],
  },
  {
    company: 'Ilities',
    title: 'Independent consultant',
    period: '2018 – present',
    highlights: [
      'Codebase rescue, architecture reviews and migrations that modernise legacy systems without full rewrites.',
      'Built ctxpack (2025), one of the early MCP gateways: context packs of tools, prompts and resources, deployed to Claude, ChatGPT or any MCP client over OAuth 2.1.',
      'Building Viberglass, an open-source workspace for teams and coding agents, and multi-agent orchestration for clients.',
    ],
  },
  {
    company: 'Visma Labs',
    title: 'Software Architect',
    period: '2019 – 2021',
    highlights: [
      'Planned and led the migration from a monolith to a modular monolith and microservices.',
      'Moved workloads from VMs to containers and owned the frontend and backend build pipelines.',
    ],
  },
  {
    company: 'VSWare',
    title: 'Head of Frontend Engineering',
    period: '2017 – 2019',
    highlights: [
      'Led customer-facing development and user experience for a school administration platform, managing a team of 18 developers.',
      'Architected the migration from a jQuery/JSP frontend to a modular Vue.js single-page app.',
    ],
  },
  {
    company: 'Brandtone',
    title: 'Senior Software Engineer',
    period: '2015 – 2017',
    highlights: [
      'Led development of the core capabilities of the company’s largest product, a mobile marketing platform.',
      'Introduced DevOps practice: Ansible, immutable infrastructure, chat-ops and an automated Jenkins deployment pipeline.',
      'Modernised the frontend with React, Webpack and the Node.js toolchain.',
    ],
  },
  {
    company: 'Liberty IT',
    title: 'Software Engineer',
    period: '2014 – 2015',
    highlights: [
      'Built SOA web services that calculate insurance rates.',
    ],
  },
  {
    company: 'IBM',
    title: 'BI & Metrics Software Developer',
    period: '2011 – 2014',
    highlights: [
      'Built business intelligence solutions for IBM delivery centres across EMEA and the US.',
      'Introduced continuous integration, automated testing and Scrum to the team.',
    ],
  },
  {
    company: 'CERN',
    title: 'Web Developer and Database Administrator',
    period: '2009',
    highlights: [
      'Designed and built the database and web frontend for the TOTEM experiment.',
    ],
  },
]

function Experience() {
  return (
    <section className="mt-24 border-t border-zinc-100 pt-16 sm:mt-32 dark:border-zinc-700/40">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Experience
        </h2>
        <Link
          href="https://www.linkedin.com/in/jussihallila"
          className="text-sm font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
        >
          Full CV on LinkedIn →
        </Link>
      </div>
      <ol className="mt-10 space-y-12">
        {experience.map((role) => (
          <li
            key={role.company}
            className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-8"
          >
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {role.period}
            </p>
            <div className="md:col-span-3">
              <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                {role.title}, {role.company}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            Education
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Bachelor of Software Engineering, Lapland University of Applied
              Sciences (2006 – 2011). Thesis graded 5/5.
            </li>
            <li>
              Exchange studies at Missouri State University (2008) and Shanghai
              University (2009).
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            Certifications
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>AWS Certified Solutions Architect – Professional (2019)</li>
            <li>AWS Certified Solutions Architect – Associate (2019)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
