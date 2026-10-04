# Superintelligent Vitalik

A landing page for **Superintelligent Vitalik** (`$SIVITALIK`) on Ethereum Mainnet. The page runs from the hero through About, How to Buy, and Tokenomics.

The imagery is artistic. The site does not claim a working AI product, a partnership, or an endorsement.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Saved build

`npm run release` creates a production server and saves it as `public/superintelligent-vitalik-build.zip`. The archive includes `BUILD.txt` with the package version and commit.

Unzip it and start the site with Node 20 or newer:

```bash
node server.js
```

It listens on `PORT` (default 3000). To publish the same project on Vercel, save the repository, then use Publish. Vercel builds from this source; the zip is the self-hosted copy.

## Artwork

Optimized files live in `public/brand/`. Originals are kept in `assets/brand/originals/`.

| File | Role |
| --- | --- |
| `hero-character.webp` | Transparent figure in the hero |
| `hero-background.webp` | Landscape behind the hero |
| `social-preview.jpg` | 1200×630 share image |
| `scene-intelligence.webp` | Intelligence scene |
| `scene-ethereum.webp` | Ethereum scene, also a small tokenomics decoration |
| `scene-humanity.webp` | Humanity scene |
| `scene-community.webp` | Community scene and the closing invitation |
| `banner.webp` | Narrative banner at its natural ratio |
| `logo.webp` | Circular logo in the navigation and footer |

Do not stretch these files or place new text over the banner or the share image.

## Configuration

Edit only `config/project.ts`.

Unknown values stay `null`. Do not substitute `0`, an empty string, or a sample number. A buy or sell tax of `0` is published only when the token actually charges no tax.

Trading is live only when `LAUNCH_STATUS` is `"live"` and `BUY_URL` is a real `http` or `https` link. A contract address by itself does not turn on the buy button.

When trading is verified, the navigation action is **Buy $SIVITALIK** and opens `BUY_URL`. Until then that button stays hidden.

`SITE_ORIGIN` is the public `https` origin used for share metadata, such as `https://example.com`. Leave it `null` until that domain exists. Local hosts are never written into the share image URL.

`TOTAL_SUPPLY` and allocation percents are exact decimal strings. Token amounts are calculated in integers.

There is no wallet connection. A purchase happens on the published trading page.

X is https://x.com/sivitalik_eth. Telegram is https://t.me/sivitalik.

## Still needed before launch

These stay `null` on purpose:

- Token standard, if you want it named
- Public site origin
- Pool or pair address
- Block explorer URL
- Trading URL
- Chart URL
- Confirmed trading venues in `TRADING_VENUES`
- Total supply, if you want the large supply figure shown
- Allocation basis and category list
- Liquidity evidence
- Administrative controls
- `LAUNCH_STATUS` set to `"live"` only after the trading link is verified

No launch date is configured, so the site does not show a countdown.
