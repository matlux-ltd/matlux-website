# Matlux Ltd Hugo Website

This repository contains the Hugo source for the Matlux Ltd website.

The site uses GitHub Actions to build Hugo on pushes to `main` and deploy the generated static site to GitHub Pages.

## Local Development

Install Hugo Extended, then run:

```bash
hugo server -D
```

Open <http://localhost:1313>.

## Production Build

```bash
hugo --minify
```

The production output is generated in `public/`. The GitHub Actions workflow publishes this output automatically; do not commit `public/`.

## Deployment

Deployment is configured in `.github/workflows/deploy.yml`.

The current production URL in `hugo.toml` is:

```toml
baseURL = "https://www.matlux.net/"
```

Before switching DNS, confirm whether the canonical site should be `www.matlux.net` or `matlux.net`, then configure the GitHub Pages custom domain and DNS records to match.
