# YourHome

A static site for **YourHome**, published with GitHub Pages.

Live site: https://rahv-fb.github.io/RAHV/

## Layout

```
site/                  # everything published to GitHub Pages
  index.html
  404.html             # styles inlined (served at any URL depth)
  .nojekyll
  assets/
    styles.css
    main.js
    favicon.svg
.github/workflows/pages.yml   # build + deploy workflow
```

## Deployment

`.github/workflows/pages.yml` uploads `site/` as a Pages artifact and deploys it.
It runs on every push that touches `site/` or the workflow itself, publishing
only from the repository's default branch (whatever it is named), and can also
be run manually from the Actions tab (**Run workflow**).

### Repository settings

The `Configure Pages` step runs with `enablement: true`, so it turns Pages on
(source: **GitHub Actions**) on the first run — no manual
**Settings → Pages** step is required. The workflow already requests the
`pages: write` and `id-token: write` permissions this needs.

Note that GitHub Pages on a **private** repository requires a paid plan
(Pro, Team, or Enterprise). On a free plan, make the repository public or the
deploy will be rejected.

## Local preview

```sh
python3 -m http.server 8000 --directory site
# then open http://localhost:8000
```

## Editing

Edit the files under `site/` and push to the default branch; the workflow republishes.
Asset paths in `index.html` are relative (`./assets/...`) so the site works
both at `/RAHV/` and at a domain root.

## Custom domain

Add a `CNAME` file containing the bare domain to `site/` (so it ends up in the
published artifact), then point DNS at GitHub Pages and set the domain under
**Settings → Pages**.
