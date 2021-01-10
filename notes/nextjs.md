# NextJS

## Hydration

"Hydration" describes the process of the browser loads the Javascript to make the page interactive.

- Note: This assumes the HTML already pre-rendered

## Static Site Genration (SSG)

Static Site Genration (SSG) is a pre-render process that runs during build time

### Pros:

- Pre-rendered HTML can be cached in CDN so users don't have to load the content again

### Cons:

- Can't pass data from the browsers (e.g. query params, HTTP Headers)
- In NextJS, SSG can also do data-fetching. NextJS exposes "getStaticProps()" that tells NextJS to wait for the pre-render until the data is resolved. getStaticProps() can only be used in pages b/c React requires all props to be defined before rendering.
  - SSG data-fetching can communicate to any BE data-sources, including Database. The code is removed from the client-side.
- For dynamic paths, NextJS exposes `getStaticPaths`

  - If `fallback` is `false`, then any paths not returned by getStaticPaths will result in a 404 page.
  - If `fallback` is `true`, then the behavior of getStaticProps changes:

    - The paths returned from getStaticPaths will be rendered to HTML at build time.
    - The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
    - In the background, Next.js will statically generate the requested path. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

- `getStaticPaths` can fetch data from any data source

## Server Side Rendering (SSR)

Server Side Rendering (SSR) is a pre-render process that runs for each request

- Intensive data-fetching in SSR could impact TTFB

## Folder Structure

"\_app.js" renders the app shell
"\_document.js" renders the document level (e.g. html, head, body)

## APIs:

`import Head from 'next/head'`

- renders the HTML head

`import Link from 'next/link'`

- renders the link

"public" folder stores static files for entire app (e.g. images, icons)

- NextJS supports CSS, SCSS, and CSS-Modules out of the box.

- Within an app, NextJS can pre-render pages through either SSG or SSR

# Page Path Depends on External Data

- Pages that begin with `[` and end with `]` are dynamic routes

- The page file, /pages/posts/[id].js, must contain

  1. A React component to render the page
  2. getStaticPaths which returns an array of possible values for ID
  3. getStaticProps which fetches necessary data for the post with ID

- The `paths.params[].id` in getStaticPaths matches with the dynamic filename `[id].js`

- Catch all routes can be defined using the filename `[...param].js`. For example, given `posts/[...id].js`, if URL is `/posts/a`, the query will be `{ "id": ["a"] }`. And if URL is `/posts/a/b`, the query is `{ "id": ["a", "b"] }`.
  - By `query `, it is from Next's `useRouter()` (i.e. `const { query } = useRouter()`)

## Caveats

- Predefined routes take precendence over dynamic routes,and dynamic routes over catch all routes.

# API Routes

- `API Routes` let you create an API endpoint as Node.js serverless function

- Do **NOT** Fetch an API Route from `getStaticProps` or `getStaticPaths`

- Use cases:

  - Handling Form Input - A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a POST request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

  ```Javascript
    export default function handler(req, res) {

    const email = req.body.email
      // Then save email to your database, etc...
    }
  ```

  - Other use-cases include:
    - Saving incoming data to DB
    - Securely communicating with a third-party API
    - Previewing draft content from CMS
