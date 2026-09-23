import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/src/styles/main.css";
import SmoothScroll from "../motion/SmoothScroll";
import { siteUrl } from "@/src/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant-garamond",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Restobar KHAO | Cozinha Tailandesa Contemporânea",
    template: "%s | Restobar KHAO",
  },
  description:
    "A essência da Tailândia, transformada em uma experiência contemporânea.",
  applicationName: "Restobar KHAO",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Restobar KHAO",
    title: "Restobar KHAO | Cozinha Tailandesa Contemporânea",
    description:
      "A essência da Tailândia, transformada em uma experiência contemporânea.",
    images: [
      {
        url: "/assets/hero/hero-khao-chef.opt.webp",
        width: 1512,
        height: 915,
        alt: "Experiência gastronômica do Restobar KHAO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restobar KHAO | Cozinha Tailandesa Contemporânea",
    description:
      "A essência da Tailândia, transformada em uma experiência contemporânea.",
    images: ["/assets/cta/cta-khao-aerial.opt.webp"],
  },
  icons: {
    icon: "/icon.ico",
    apple: "/icon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${cormorantGaramond.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
