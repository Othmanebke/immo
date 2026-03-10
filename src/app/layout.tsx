import type { Metadata } from "next";
import { Syne, Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dm = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORMA — Immobilier de Prestige",
  description:
    "Agence immobilière de prestige depuis 2009. Des propriétés d'exception pour des clients d'exception. Paris · Lyon · Côte d'Azur · Monaco.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${fraunces.variable} ${dm.variable}`}>
        {children}
      </body>
    </html>
  );
}
