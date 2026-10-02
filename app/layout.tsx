import type { Metadata, Viewport } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Outfit } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { project } from "@/config/project";
import { assets } from "@/lib/assets";
import { publicSiteOrigin } from "@/lib/project";
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
  "An Ethereum meme token inspired by superintelligence, digital culture, and human–AI collaboration.";

const title = `${project.PROJECT_NAME} (${project.DISPLAY_TICKER})`;

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const origin = publicSiteOrigin(host, headerList.get("x-forwarded-proto"));
  const shareImage = origin
    ? {
        url: `${origin}${assets.socialPreview.src}`,
        width: assets.socialPreview.width,
        height: assets.socialPreview.height,
        alt: `${project.PROJECT_NAME}, ${project.DISPLAY_TICKER}`,
      }
    : null;

  return {
    title,
    description,
    ...(origin ? { metadataBase: new URL(origin) } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: project.PROJECT_NAME,
      ...(origin ? { url: origin } : {}),
      ...(shareImage ? { images: [shareImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(shareImage ? { images: [shareImage.url] } : {}),
    },
  };
}

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
