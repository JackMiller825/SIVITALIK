import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A self-contained server in .next/standalone, packed by `npm run release`.
  output: "standalone",
  // The dev server is opened at 127.0.0.1 while Next treats that host as
  // cross-origin unless it is listed here. Without this, dev chunk requests
  // from the browser are rejected and the page cannot hydrate.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {
    // The debug channel holds hydration open until a second stream closes.
    // That stream depends on the dev websocket, which is not reliable here.
    // Leaving it on keeps the server HTML visible while click handlers never attach.
    reactDebugChannel: false,
  },
};

export default nextConfig;
