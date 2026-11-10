import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Sav Haus - Construcții din lemn",
  description: "Case pe structură de lemn, construite pentru generații. Proiectare, structură și montaj complet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ro"><body className={manrope.variable + " font-sans antialiased"}>{children}</body></html>;
}
