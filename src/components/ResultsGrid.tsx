type Outcome = 'full' | 'gaps' | 'broken' | 'none'

type Cell = { outcome: Outcome; value: string; note?: string; detail: string }

const TASKS = [
  'DeepSeek Harness',
  'Settings validation',
  'Asana',
  'local-ctx OAuth',
  'ArgoCD namespaces',
  'Report',
  'Presen\u00ADtation',
]

const NOT_RUN: Cell = { outcome: 'none', value: '–', note: 'not run', detail: 'Dropped after its API stopped responding.' }

const NO_CREDIT: Cell = { outcome: 'none', value: '–', note: 'not run', detail: 'Not run: the 20 dollars of API credit ran out.' }

const ROWS: { model: string; cells: Cell[] }[] = [
  {
    model: 'Caturra (local)',
    cells: [
      { outcome: 'gaps', value: '8/13', note: 'checks', detail: 'Cleanest code of the five; wrong wire format for custom endpoints.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden check passed.' },
      { outcome: 'broken', value: '3rd', note: '2 bugs', detail: 'Platform side right; reads the event id from the wrong place and posts comments to an endpoint that does not exist.' },
      { outcome: 'full', value: '16/16', detail: 'Every hidden test passed.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden test passed.' },
      { outcome: 'full', value: '4/4', note: '0 errors', detail: 'All answers right, no wrong facts.' },
      { outcome: 'full', value: '13/13', note: 'best deck', detail: 'Every fact right, nothing from the later spec revision.' },
    ],
  },
  {
    model: 'DeepSeek 4.1 Flash',
    cells: [
      { outcome: 'gaps', value: '11/13', note: 'checks', detail: 'The only PR with the right wire format; ran the real dsh against a mock.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden check passed.' },
      { outcome: 'gaps', value: '1st', note: 'works', detail: 'The only integration that works end to end; docs point at a read-only field, and a mixed batch can drop an event.' },
      { outcome: 'full', value: '16/16', detail: 'Every hidden test passed.' },
      { outcome: 'gaps', value: '13/14', detail: 'An annotation for an unconfigured instance leaks its namespace into requests.' },
      { outcome: 'gaps', value: '4/4', note: '1 wrong fact', detail: 'Slowest merge given as 15.6 days; it was 15.6 hours.' },
      { outcome: 'gaps', value: '12/13', note: '3 later rules', detail: 'Presents SSRF, scope minimisation and later confused deputy rules as 2025-06-18.' },
    ],
  },
  {
    model: 'Claude Haiku 5.5',
    cells: [
      { outcome: 'gaps', value: '8/13', note: 'checks', detail: 'Wrong wire format; endpoint runs never get their key.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden check passed.' },
      { outcome: 'broken', value: '2nd', note: '1 blocker', detail: 'Best design; never stores the secret, so every real delivery fails its signature check.' },
      { outcome: 'full', value: '16/16', detail: 'Every hidden test passed.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden test passed.' },
      { outcome: 'full', value: '4/4', note: '0 errors', detail: 'All answers right, no wrong facts.' },
      { outcome: 'gaps', value: '12/13', note: '2 later rules', detail: 'Two later-revision risks under 2025-06-18, with a general warning.' },
    ],
  },
  {
    model: 'GPT-6 Luna',
    cells: [
      { outcome: 'gaps', value: '4/13', note: 'checks', detail: 'Sets the API key to the variable name; edited a test fixture to make its assertion pass.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden check passed.' },
      { outcome: 'broken', value: '4th', note: '3 blockers', detail: 'Deliveries get an event type the filter drops, project ids compared with space ids, secret never stored.' },
      { outcome: 'gaps', value: '14/16', detail: 'Metadata served at a non-RFC 9728 path.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden test passed.' },
      { outcome: 'gaps', value: '3/4', detail: 'Median time to merge wrong.' },
      { outcome: 'gaps', value: '11/13', note: 'thin', detail: 'Accurate, but never mentions the new security best practices page.' },
    ],
  },
  {
    model: 'MiMo 2.6 Flash',
    cells: [
      { outcome: 'gaps', value: '7/13', note: 'checks', detail: 'Changed a correct model id into one that does not exist.' },
      { outcome: 'full', value: '14/14', detail: 'Passed on its second run; the first stalled.' },
      NOT_RUN,
      NOT_RUN,
      NOT_RUN,
      NOT_RUN,
      NOT_RUN,
    ],
  },
  {
    model: 'Claude Opus 4.6',
    cells: [
      NO_CREDIT,
      NO_CREDIT,
      NO_CREDIT,
      { outcome: 'full', value: '16/16', detail: 'Every hidden test passed.' },
      NO_CREDIT,
      { outcome: 'full', value: '4/4', note: '0 errors', detail: 'All answers right, no wrong facts.' },
      { outcome: 'gaps', value: '10/13', note: '3 later rules', detail: 'Whole slides on SSRF and scope minimisation, linked to sections the 2025-06-18 text does not have.' },
    ],
  },
  {
    model: 'Claude Opus 4.7',
    cells: [
      NO_CREDIT,
      NO_CREDIT,
      NO_CREDIT,
      { outcome: 'full', value: '16/16', detail: 'Every hidden test passed.' },
      { outcome: 'full', value: '14/14', detail: 'Every hidden test passed, on its second run; the first stalled at the 2 GB worker limit.' },
      { outcome: 'full', value: '4/4', note: '0 errors', detail: 'All answers right, no wrong facts.' },
      { outcome: 'gaps', value: '11/13', note: '1 wrong fact', detail: 'Accurate and closely sourced; says client RFC 8414 support went from SHOULD to MUST, and pulls two small items from the later page.' },
    ],
  },
]

const STYLE: Record<Outcome, { icon: string; label: string; cell: string; mark: string }> = {
  full: {
    icon: '✓',
    label: 'Full marks',
    cell: 'bg-[#0ca30c]/12 dark:bg-[#0ca30c]/22',
    mark: 'bg-[#0ca30c] text-white',
  },
  gaps: {
    icon: '!',
    label: 'Works, with gaps or errors',
    cell: 'bg-[#fab219]/18 dark:bg-[#fab219]/20',
    mark: 'bg-[#fab219] text-zinc-900',
  },
  broken: {
    icon: '✗',
    label: "Doesn't work as delivered",
    cell: 'bg-[#d03b3b]/12 dark:bg-[#d03b3b]/25',
    mark: 'bg-[#d03b3b] text-white',
  },
  none: {
    icon: '–',
    label: 'Not run',
    cell: 'bg-zinc-100 dark:bg-zinc-800/60',
    mark: 'bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-200',
  },
}

function Mark({ outcome }: { outcome: Outcome }) {
  return (
    <span
      aria-hidden
      className={`inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none ${STYLE[outcome].mark}`}
    >
      {STYLE[outcome].icon}
    </span>
  )
}

export function ResultsGrid() {
  return (
    <figure className="not-prose my-10">
      <figcaption className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
        Every task, every model. Hover or focus a cell for the details.
      </figcaption>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
        {(['full', 'gaps', 'broken', 'none'] as Outcome[]).map((o) => (
          <li key={o} className="flex items-center gap-1.5">
            <Mark outcome={o} />
            {STYLE[o].label}
          </li>
        ))}
      </ul>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] table-fixed border-separate border-spacing-[2px] text-sm">
          <thead>
            <tr>
              <th scope="col" className="w-[6rem]">
                <span className="sr-only">Model</span>
              </th>
              {TASKS.map((t) => (
                <th
                  key={t}
                  scope="col"
                  className="px-1.5 pb-1 text-left align-bottom text-xs font-medium leading-tight text-zinc-600 dark:text-zinc-400"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, r) => (
              <tr key={row.model}>
                <th
                  scope="row"
                  className="py-2 pr-2 text-left text-xs font-medium leading-tight text-zinc-800 dark:text-zinc-100"
                >
                  {row.model}
                </th>
                {row.cells.map((c, i) => (
                  <td key={TASKS[i]} className={`group relative rounded px-1.5 py-1.5 align-top ${STYLE[c.outcome].cell}`}>
                    <span
                      tabIndex={0}
                      className="block rounded outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                      aria-label={`${row.model}, ${TASKS[i]}: ${STYLE[c.outcome].label}. ${c.value}${c.note ? `, ${c.note}` : ''}. ${c.detail}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Mark outcome={c.outcome} />
                        <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{c.value}</span>
                      </span>
                      {c.note && <span className="mt-0.5 block text-xs leading-tight text-zinc-600 dark:text-zinc-300">{c.note}</span>}
                    </span>
                    <span
                      role="tooltip"
                      className={`pointer-events-none invisible absolute z-10 w-56 ${r < 2 ? 'top-full mt-1' : 'bottom-full mb-1'} rounded-md ${i >= TASKS.length - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2'} bg-zinc-900 px-3 py-2 text-xs text-zinc-50 shadow-lg group-focus-within:visible group-hover:visible dark:bg-zinc-100 dark:text-zinc-900`}
                    >
                      <span className="block font-medium">
                        {row.model} · {TASKS[i]}
                      </span>
                      {c.detail}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
