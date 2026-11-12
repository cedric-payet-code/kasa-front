import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/api/properties";
import { siteUrl } from "@/lib/site";

/**
 * Génère `/sitemap.xml` : la liste des pages publiques du site, pour aider les
 * moteurs de recherche à toutes les trouver, notamment chaque page logement.
 * La page des favoris n'y figure pas : son contenu dépend de chaque visiteur.
 *
 * @returns Les entrées du sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties();

  return [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/a-propos`, changeFrequency: "yearly", priority: 0.5 },
    ...properties.map((property) => ({
      url: `${siteUrl}/logement/${property.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
