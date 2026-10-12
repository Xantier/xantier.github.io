import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Books',
  description:
    'Books on my shelf, rated by how useful I have found them during my career.',
}

function ratingValue(rating: string) {
  let value = parseFloat(rating)
  return Number.isNaN(value) ? 0 : value
}

export default function Books() {
  let sorted = [...books].sort(
    (a, z) =>
      ratingValue(z.rating) - ratingValue(a.rating) ||
      a.title.localeCompare(z.title),
  )

  return (
    <SimpleLayout
      title="Books on my shelf."
      intro="Rated by how useful I have found them during my career. Short notes, not full reviews."
    >
      <ul role="list" className="space-y-16">
        {sorted.map((book) => (
          <Card as="li" key={book.slug} id={book.slug}>
            <Card.Title as="h2" href={book.link || undefined}>
              {book.title}
            </Card.Title>
            <Card.Eyebrow decorate>
              {[book.author, book.rating && `Rating ${book.rating}`]
                .filter(Boolean)
                .join(' · ')}
            </Card.Eyebrow>
            {book.review && <Card.Description>{book.review}</Card.Description>}
            {book.genre.length > 0 && (
              <p className="relative z-10 mt-4 text-xs text-zinc-400 dark:text-zinc-500">
                {book.genre.join(', ')}
              </p>
            )}
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
