import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FavoritesProvider } from "@/components/favorites/FavoritesProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base des URL absolues (balises de partage Open Graph, etc.)
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kasa",
    template: "%s | Kasa",
  },
  description: "Location d'appartements et de maisons entre particuliers.",
};

/**
 * Layout racine : police, fournisseur des favoris, header et footer communs à toutes les pages.
 *
 * @param props.children - La page affichée.
 * @returns Le document HTML complet.
 */
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
