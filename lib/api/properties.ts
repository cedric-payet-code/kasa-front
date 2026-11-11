import { cache } from "react";
import {
  PropertyDetailSchema,
  PropertyListSchema,
  type Property,
  type PropertyDetail,
} from "@/lib/schemas/property";
import { apiFetch } from "./client";

/**
 * Récupère la liste de toutes les propriétés, sans cache (toujours à jour).
 *
 * @returns La liste des propriétés, au format résumé (sans photos, équipements ni tags).
 * @throws {Error} Si l'API est injoignable ou renvoie des données invalides.
 */
export function getProperties(): Promise<Property[]> {
  return apiFetch("/api/properties", PropertyListSchema, { cache: "no-store" });
}

/**
 * Récupère le détail complet d'une propriété à partir de son id.
 *
 * @param id - Identifiant de la propriété (ex. `"c67ab8a7"`).
 * @returns La propriété avec ses photos, équipements et tags.
 * @throws {Error} Si la propriété n'existe pas (404) ou si l'API renvoie des données invalides.
 */
export function getPropertyById(id: string): Promise<PropertyDetail> {
  return apiFetch(`/api/properties/${encodeURIComponent(id)}`, PropertyDetailSchema, {
    cache: "no-store",
  });
}

/**
 * Récupère le détail d'une propriété à partir de son slug.
 *
 * L'API ne permet de chercher que par id : on retrouve d'abord l'id dans la liste,
 * puis on demande le détail. `cache` (React) évite de refaire ces appels quand la
 * fonction est utilisée plusieurs fois pendant le même rendu (ex. `generateMetadata` + la page).
 *
 * @param slug - Slug de la propriété, tel qu'il apparaît dans l'URL (ex. `"appartement-cosy"`).
 * @returns La propriété détaillée, ou `null` si aucune propriété ne correspond à ce slug.
 * @throws {Error} Si l'API est injoignable ou renvoie des données invalides.
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<PropertyDetail | null> => {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);
  if (!match) return null;
  return getPropertyById(match.id);
});
