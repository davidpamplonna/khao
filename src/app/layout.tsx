import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/src/styles/main.css";

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
  title: "Restobar KHAO | Cozinha Tailandesa Contemporânea",
  description:
    "A essência da Tailândia, transformada em uma experiência contemporânea.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${cormorantGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}