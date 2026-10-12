import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { TermLink } from '@/components/Linkify'
import {
  GitHubIcon,
  LinkedInIcon,
  MediumIcon,
  NpmIcon,
  XIcon,
} from '@/components/SocialIcons'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function RssIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 5.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v12.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3V5.75Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M7.75 16.25h.01M7.75 11.25a5 5 0 0 1 5 5M7.75 7.25a9 9 0 0 1 9 9"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Subscribe() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <RssIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Follow along</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        New articles show up in the RSS feed. No newsletter, no tracking.
      </p>
      <Button href="/feed.xml" variant="secondary" className="mt-6 w-full">
        Subscribe via RSS
      </Button>
    </div>
  )
}

function WorkWithMe() {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Work with me
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Codebase rescue, architecture reviews and AI-ready engineering
        practices, through Ilities.
      </p>
      <Button href="/work-with-me" variant="secondary" className="mt-6 w-full">
        How I can help
      </Button>
    </div>
  )
}

interface Role {
  company: string
  title: string
  start: string
  end: string
}

function Role({ role }: { role: Role }) {
  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full text-xs font-semibold text-zinc-600 shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-0">
        {role.company
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word[0])
          .join('')}
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${role.start} until ${role.end}`}
        >
          <time dateTime={role.start}>{role.start}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time>{role.end}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Roadie',
      title: 'Head of Engineering',
      start: '2024',
      end: 'Present',
    },
    {
      company: 'Roadie',
      title: 'Founding Engineer',
      start: '2021',
      end: '2024',
    },
    {
      company: 'Ilities',
      title: 'Independent consultant',
      start: '2018',
      end: 'Present',
    },
    {
      company: 'Visma Labs',
      title: 'Software Architect',
      start: '2019',
      end: '2021',
    },
    {
      company: 'VSWare',
      title: 'Head of Frontend Engineering',
      start: '2017',
      end: '2019',
    },
    {
      company: 'Brandtone',
      title: 'Senior Software Engineer',
      start: '2015',
      end: '2017',
    },
    {
      company: 'Liberty IT',
      title: 'Software Engineer',
      start: '2014',
      end: '2015',
    },
    {
      company: 'IBM',
      title: 'BI & Metrics Software Developer',
      start: '2011',
      end: '2014',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role) => (
          <Role key={`${role.company}-${role.start}`} role={role} />
        ))}
      </ol>
      <Button
        href="https://www.linkedin.com/in/jussihallila"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Full history on LinkedIn
      </Button>
    </div>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Software engineer building platforms for developers and their
            agents.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Jussi, a Finnish software engineer based in Arnhem, the
            Netherlands. I’m Head of Engineering at <TermLink term="Roadie" />,
            and through <TermLink term="Ilities" />{' '}
            I help teams untangle codebases and set up the structure that makes
            AI tools useful instead of noisy. In my own time I build{' '}
            <TermLink term="Viberglass" />, an open-source workspace for teams
            and their coding agents.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://x.com/Prof_xan"
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href="https://github.com/Xantier"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/jussihallila"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://medium.com/@xantier"
              aria-label="Read on Medium"
              icon={MediumIcon}
            />
            <SocialLink
              href="https://www.npmjs.com/~xantier"
              aria-label="Packages on npm"
              icon={NpmIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Subscribe />
            <WorkWithMe />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
