#!/usr/bin/env python3
"""One-off migration of the legacy Jekyll content to the Spotlight (Next.js + MDX) site.

Reads legacy/_posts and legacy/_books, writes:
  src/app/articles/<slug>/page.mdx      one MDX page per post
  src/data/books.ts                     book list data for /books/
  public/<old jekyll path>.html         redirect stubs so old post URLs keep working
"""

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEGACY = ROOT / "legacy"
ARTICLES = ROOT / "src" / "app" / "articles"
PUBLIC = ROOT / "public"
DATA = ROOT / "src" / "data"
SITE = "https://jussi.hallila.com"
AUTHOR = "Jussi Hallila"

POST_RE = re.compile(r"^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|markdown)$")
VOID_TAGS = ("br", "hr", "img", "input", "meta", "link", "source")
HTML_TAGS = "|".join(
    (
        "a abbr b blockquote br code dd del details div dl dt em figcaption figure "
        "h1 h2 h3 h4 h5 h6 hr i iframe img input kbd li ol p pre small source span "
        "strong sub summary sup table tbody td th thead tr u ul video"
    ).split()
)


def parse_front_matter(text):
    if not text.startswith("---"):
        return {}, text
    _, fm, body = text.split("---", 2)
    data, key = {}, None
    for line in fm.splitlines():
        if not line.strip():
            continue
        item = re.match(r"^\s+-\s+(.*)$", line)
        if item and key:
            if not isinstance(data.get(key), list):
                data[key] = []
            data[key].append(item.group(1).strip().strip("\"'"))
            continue
        kv = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if kv:
            key, value = kv.group(1), kv.group(2).strip()
            data[key] = value.strip("\"'") if value else ""
    return data, body.lstrip("\n")


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def post_slugs():
    slugs = {}
    for path in sorted((LEGACY / "_posts").iterdir()):
        m = POST_RE.match(path.name)
        if m:
            slugs[path.stem] = slugify(m.group(4))
    return slugs


def escape_prose(segment):
    """Make a non-code Markdown segment safe for MDX."""
    segment = re.sub(r"<!--(.*?)-->", r"{/*\1*/}", segment, flags=re.S)
    segment = re.sub(r"<(https?://[^>\s]+)>", r"[\1](\1)", segment)
    segment = re.sub(r"(?<!\\)\{(?!/\*)", r"\\{", segment)
    segment = re.sub(r"(?<!\*/)(?<!\\)\}", r"\\}", segment)
    segment = re.sub(r"\\\{/\*", "{/*", segment)
    segment = re.sub(r"\*/\\\}", "*/}", segment)
    segment = re.sub(rf"<(?!/?(?:{HTML_TAGS})\b)(?!!)", "&lt;", segment)
    for tag in VOID_TAGS:
        segment = re.sub(
            rf"<({tag})(\b[^>]*?)(?<!/)>", r"<\1\2 />", segment, flags=re.I
        )
    segment = re.sub(r'\sstyle="[^"]*"', "", segment)
    segment = re.sub(r"\sclass=", " className=", segment)
    return segment


def to_mdx_body(body, slugs):
    body = re.sub(r"\{\{\s*site\.url\s*\}\}", "", body)
    body = re.sub(
        r"\{%\s*post_url\s+([^\s%]+)\s*%\}",
        lambda m: f"/articles/{slugs.get(m.group(1), slugify(m.group(1)))}/",
        body,
    )
    body = re.sub(r"\{%\s*(end)?raw\s*%\}", "", body)
    body = re.sub(
        r"\{%\s*highlight\s+(\w+)[^%]*%\}", r"```\1", body
    ).replace("{% endhighlight %}", "```")

    out, fence = [], None
    for chunk in re.split(r"(^```.*$)", body, flags=re.M):
        if chunk.startswith("```"):
            fence = None if fence else chunk
            out.append(chunk)
        elif fence:
            out.append(chunk)
        else:
            parts = re.split(r"(`[^`\n]+`)", chunk)
            out.append(
                "".join(p if p.startswith("`") else escape_prose(p) for p in parts)
            )
    return "".join(out).strip() + "\n"


def plain_text(markdown):
    text = re.sub(r"```.*?```", " ", markdown, flags=re.S)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>|\{%.*?%\}|\{\{.*?\}\}|[#*_>`]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def describe(front, body):
    for key in ("description", "teaser", "excerpt"):
        if front.get(key):
            return front[key]
    paragraphs = [p for p in re.split(r"\n\s*\n", body) if p.strip() and not p.lstrip().startswith(("#", "```", "!", "<", "|", "-", "*"))]
    text = plain_text(paragraphs[0] if paragraphs else body)
    return text if len(text) <= 200 else text[:197].rsplit(" ", 1)[0] + "…"


def old_url(path, front):
    m = POST_RE.match(path.name)
    cats = front.get("categories") or ""
    cats = cats if isinstance(cats, list) else cats.split()
    prefix = "".join(f"/{c}" for c in cats)
    return f"{prefix}/{m.group(1)}/{m.group(2)}/{m.group(3)}/{m.group(4)}.html"


def redirect_page(target):
    url = f"{SITE}{target}"
    return (
        "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">"
        f"<title>Moved</title><link rel=\"canonical\" href=\"{url}\">"
        f"<meta http-equiv=\"refresh\" content=\"0; url={target}\">"
        f"<meta name=\"robots\" content=\"noindex\"></head>"
        f"<body><p>This post moved to <a href=\"{target}\">{url}</a>.</p></body></html>\n"
    )


def migrate_posts():
    slugs = post_slugs()
    redirects = {}
    for path in sorted((LEGACY / "_posts").iterdir()):
        m = POST_RE.match(path.name)
        if not m:
            continue
        front, body = parse_front_matter(path.read_text(encoding="utf-8"))
        title = front.get("title") or m.group(4).replace("-", " ")
        body = re.sub(rf"^#\s+{re.escape(title)}\s*\n", "", body.lstrip())
        slug = slugs[path.stem]
        article = {
            "author": AUTHOR,
            "date": f"{m.group(1)}-{m.group(2)}-{m.group(3)}",
            "title": title,
            "description": describe(front, body),
        }
        mdx = (
            "import { ArticleLayout } from '@/components/ArticleLayout'\n\n"
            f"export const article = {json.dumps(article, indent=2, ensure_ascii=False)}\n\n"
            "export const metadata = {\n  title: article.title,\n  description: article.description,\n}\n\n"
            "export default function Layout({ children }) {\n"
            "  return <ArticleLayout article={article}>{children}</ArticleLayout>\n}\n\n"
            + to_mdx_body(body, slugs)
        )
        target = ARTICLES / slug / "page.mdx"
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(mdx, encoding="utf-8")

        old = old_url(path, front)
        stub = PUBLIC / old.lstrip("/")
        stub.parent.mkdir(parents=True, exist_ok=True)
        stub.write_text(redirect_page(f"/articles/{slug}/"), encoding="utf-8")
        redirects[old] = f"/articles/{slug}/"
    return redirects


def migrate_books():
    books = []
    for path in sorted((LEGACY / "_books").iterdir()):
        front, body = parse_front_matter(path.read_text(encoding="utf-8"))
        genre = front.get("genre") or []
        books.append(
            {
                "slug": path.stem,
                "title": front.get("title", path.stem),
                "author": front.get("author", ""),
                "rating": front.get("rating", ""),
                "genre": genre if isinstance(genre, list) else [genre],
                "link": front.get("link", ""),
                "review": plain_text(body),
            }
        )
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "books.ts").write_text(
        "export interface Book {\n  slug: string\n  title: string\n  author: string\n"
        "  rating: string\n  genre: string[]\n  link: string\n  review: string\n}\n\n"
        f"export const books: Book[] = {json.dumps(books, indent=2, ensure_ascii=False)}\n",
        encoding="utf-8",
    )
    return len(books)


if __name__ == "__main__":
    redirects = migrate_posts()
    count = migrate_books()
    print(f"posts: {len(redirects)} articles + redirect stubs, books: {count}")
    for old, new in sorted(redirects.items()):
        print(f"  {old} -> {new}")
