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

## Game of Life playground

The technical note at `/insights/game-of-life/` embeds the independently deployed
[Game of Life](https://github.com/matlux/game-of-life) application. Its production
address is `https://game-of-life.os.matlux.net/`, configured by
`params.game_of_life_url` in `hugo.toml`.

The compiler and game load only after the visitor selects **Launch playground**.
The iframe uses a separate origin and a restricted sandbox; the parent accepts
height messages only from that frame and its configured origin. The full-screen
link remains available if embedding fails. Each frame/tab owns a separate,
in-memory experiment.

For local integration testing, first build and serve the game on port 8766 using
its README, then run this site with:

```bash
HUGO_GAME_OF_LIFE_PREVIEW_URL=http://127.0.0.1:8766/game-of-life/ \
  hugo server --port 1314 --baseURL http://127.0.0.1:1314/
```

Open `http://127.0.0.1:1314/insights/game-of-life/`. The override is restricted to
`hugo server`; production builds always use the configured HTTPS address.

Deploy the modern game and verify its custom-domain HTTPS certificate before
merging this article. Then merge this website change into `main` to publish it
through the existing GitHub Actions deployment.
