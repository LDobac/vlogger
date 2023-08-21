// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import postMeta from "../assets/.build/post.json" assert {type: "json"};

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(
  fs.readFileSync(toAbsolute('../../ssg/static/ssr-manifest.json'), 'utf-8'),
)
const template = fs.readFileSync(toAbsolute('../../ssg/static/index.html'), 'utf-8')
// eslint-disable-next-line
const { render } = await import('../../ssg/server/entry-server.js')

const routesToPrerender = [
    "/", "/about",
    ...postMeta.map((v) => `/post/${v.slug}`)
];
console.log(routesToPrerender);

if (!fs.existsSync(toAbsolute("../../ssg/static/post")))
{
  fs.mkdirSync(toAbsolute("../../ssg/static/post"), {recursive: true});
}

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `../../ssg/static${url === '/' ? '/index' : url}.html`
    console.log('pre-rendered:', filePath)
    fs.writeFileSync(toAbsolute(filePath), html )
  }

  // done, delete ssr manifest
  // fs.unlinkSync(toAbsolute('../../ssg/static/ssr-manifest.json'))
})()
