import type { Metadata } from "next";
import {Manrope, Cormorant_Garamond} from "next/font/google"
import "../styles/main.css";


const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

export const metadata: Metadata = {
  title: "Restobar KHAO | Cozinha Tailandesa Contemporânea",
  description: "A essência da Tailândia, transformada em uma experiência contemporânea.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${cormorantGaramond.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
