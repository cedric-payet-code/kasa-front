import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Génère `/robots.txt` : autorise l'exploration du site et indique
 * aux moteurs de recherche où trouver le sitemap.
 *
 * @returns Les règles pour les robots.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
