# jussi.hallila.com

Source for my personal site, built with Next.js and MDX and deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # static export in out/
```

- Articles live in `src/app/articles/<slug>/page.mdx`. Unpublished drafts live in `drafts/`.
- `scripts/migrate-jekyll.py` was a one-off migration from the old Jekyll site. The Jekyll sources were removed afterwards; they are in git history at commit `4031cf1`.
- Old post URLs (`/2019/04/20/<slug>.html`) redirect to `/articles/<slug>/` through static stubs in `public/`.

## License

The written content is © Jussi Hallila, all rights reserved.

The site's code is based on [Spotlight](https://tailwindcss.com/plus/templates/spotlight), a commercial
template licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license). This
repository is therefore **not** released under an open-source license, and forking it as a base for
your own site is not permitted by the template's license.
