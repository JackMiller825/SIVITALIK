# Superintelligent Vitalik

A cinematic site for **Superintelligent Vitalik** (`$SIVITALIK`) on Ethereum. It introduces the name, the ticker, the banner’s symbolism, and a place for verified token details.

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

## Replace the logo and banner

Optimized copies live in `public/brand/`.

| File | Role |
| --- | --- |
| `public/brand/logo.webp` | Circular emblem in the navigation, hero, core, and footer |
| `public/brand/banner.webp` | Full panoramic artwork in the Narrative section |
| `app/icon.png` | Browser tab icon |
| `app/apple-icon.png` | Apple touch icon |

Keep the full artwork. Do not crop the name, ticker, portrait, or the banner’s main symbols. After replacing a file, use the same filename or update the `src` in `components/brand-logo.tsx` and `components/narrative-section.tsx`.

A wide banner should stay near a 3:1 ratio so the page does not stretch it. The logo should stay square.

## Add verified token details

Edit only `config/project.ts`.

Leave a string empty when a fact is not public yet. The page shows **Not announced** or hides the control. Do not invent market cap, holders, volume, price, audits, listings, locks, burns, or renounced ownership.

| Field | What to enter |
| --- | --- |
| `CONTRACT_ADDRESS` | The full token contract, after it is deployed |
| `EXPLORER_URL` | `https://` link to that contract on a block explorer |
| `BUY_URL` | `https://` link to the trading page you have checked |
| `CHART_URL` | Optional `https://` chart link. Leave empty to hide it |
| `TELEGRAM_URL` | Official Telegram invite, or empty |
| `X_URL` | Official X profile, or empty |
| `OTHER_CHANNELS` | Extra official links: `{ label, url }` |
| `TOTAL_SUPPLY` | Exact supply text, or empty |
| `BUY_TAX` / `SELL_TAX` | Exact tax text, or empty |
| `ALLOCATIONS` | Real shares only, for example `{ label: "Liquidity", percent: 90 }` |
| `LIQUIDITY_DETAILS` | What is actually known about liquidity, or empty |
| `ADMIN_CONTROLS` | Ownership or admin powers, in plain language, or empty |
| `LAUNCH_STATUS` | `"prelaunch"` or `"live"` |

The **Buy $SIVITALIK** button appears only when `LAUNCH_STATUS` is `"live"` and `BUY_URL` is an `http` or `https` link. The How to Buy notice stays until that is true **and** `CONTRACT_ADDRESS` is set.

Allocation bars are drawn from the percentages you enter. If they do not add up to 100, the site says so instead of silently filling the gap.

There is no wallet connection. Do not add one unless you intend to.

## Still needed before launch

These fields are empty on purpose:

- Contract address
- Block explorer URL
- Trading URL
- Chart URL, if you want one
- Telegram URL
- X URL
- Any other official channel
- Total supply
- Buy tax and sell tax
- Allocation breakdown
- Liquidity status
- Ownership or admin controls
- `LAUNCH_STATUS` set to `"live"` only after the trading link is verified

No launch date is configured, so the site does not show a countdown.
