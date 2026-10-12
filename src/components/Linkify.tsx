import Link from 'next/link'
import { Fragment } from 'react'

export const links: Record<string, string> = {
  Viberglass: 'https://viberglass.io',
  openroadie: 'https://github.com/RoadieHQ/openroadie',
  'roadie-agent': 'https://github.com/RoadieHQ/roadie-agent',
  Roadie: 'https://roadie.io',
  Backstage: 'https://backstage.io',
  Ilities: 'https://ilities.dev',
  ctxpack: 'https://ctxpack.com',
  'local-ctx': 'https://github.com/Ilities/local-ctx',
  Strata: 'https://github.com/Niko1221/Strata',
  'Qwen3.8-Flash-Next': 'https://huggingface.co/Qwen/Qwen3.8-Flash-Next',
  'Swift 1.5':
    'https://huggingface.co/ukisai/Swift-1.5-Qwen3.8-Flash-Next-GSQ-RCO-GGUF',
  BetterBench: 'https://github.com/GGZ14/BetterBench',
  openmediavault: 'https://www.openmediavault.org',
  Nextcloud: 'https://nextcloud.com',
  npm: 'https://www.npmjs.com/~xantier',
  MCP: 'https://modelcontextprotocol.io',
}

const linkClassName =
  'underline decoration-zinc-300 underline-offset-2 transition hover:text-teal-500 hover:decoration-teal-500 dark:decoration-zinc-600'

export function TermLink({
  term,
  children,
}: {
  term: keyof typeof links
  children?: React.ReactNode
}) {
  return (
    <Link href={links[term]} className={linkClassName}>
      {children ?? term}
    </Link>
  )
}

const pattern = new RegExp(
  `(?<![\\w-])(${Object.keys(links)
    .sort((a, z) => z.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})(?![\\w-])`,
  'g',
)

export function Linkify({ text }: { text: string }) {
  let seen = new Set<string>()
  return (
    <>
      {text.split(pattern).map((part, index) => {
        if (index % 2 === 1 && !seen.has(part)) {
          seen.add(part)
          return <TermLink key={index} term={part} />
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
