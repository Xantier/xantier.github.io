import { Feed } from 'feed'

import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-static'

const siteUrl = 'https://jussi.hallila.com'

export async function GET() {
  let author = {
    name: 'Jussi Hallila',
    link: siteUrl,
  }

  let feed = new Feed({
    title: author.name,
    description:
      'Writing on software engineering, agent platforms and running models yourself.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  for (let article of await getAllArticles()) {
    let publicUrl = `${siteUrl}/articles/${article.slug}/`
    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      description: article.description,
      author: [author],
      date: new Date(article.date),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
    },
  })
}
