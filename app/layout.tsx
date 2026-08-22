import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sav Haus - Construcții din lemn",
  description:
    "Case pe structură de lemn, construite pentru generații. Proiectare, structură și montaj complet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
