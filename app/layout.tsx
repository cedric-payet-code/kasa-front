import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kasa",
    template: "%s | Kasa",
  },
  description: "Location d'appartements et de maisons entre particuliers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <FavoritesProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
