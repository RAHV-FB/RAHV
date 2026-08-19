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

### One-time repository setting

Pages has to be switched on by a repository admin before the workflow can
publish:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

Until then the `Configure Pages` step fails with
`Get Pages site failed ... Not Found`. This cannot be automated from the
workflow: the token Actions provides is not allowed to create a Pages site
(`Resource not accessible by integration`), so `enablement: true` does not
work here. Everything else is already in place — the workflow requests the
`pages: write` and `id-token: write` permissions it needs.

GitHub Pages on a **private** repository also requires a paid plan (Pro, Team,
or Enterprise). On a free plan the repository has to be public for Pages to
serve the site.

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
