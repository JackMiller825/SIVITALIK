import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-display-face",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const description =
  "An Ethereum meme token inspired by superintelligence, digital culture, and the possibilities of human–AI collaboration.";

export const metadata: Metadata = {
  title: "Superintelligent Vitalik ($SIVITALIK)",
  description,
  openGraph: {
    title: "Superintelligent Vitalik ($SIVITALIK)",
    description,
    images: [
      {
        url: "/brand/banner.webp",
        width: 2000,
        height: 667,
        alt: "Superintelligent Vitalik banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superintelligent Vitalik ($SIVITALIK)",
    description: "Ethereum culture. Artificial imagination.",
    images: ["/brand/banner.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#040615",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${outfit.variable} ${mono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="focus-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-silver focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
