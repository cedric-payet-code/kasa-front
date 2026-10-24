import { cache } from "react";
import {
  PropertyDetailSchema,
  PropertyListSchema,
  type Property,
  type PropertyDetail,
} from "@/lib/schemas/property";
import { apiFetch } from "./client";

/** Récupère la liste de toutes les propriétés (toujours à jour, sans cache). */
export function getProperties(): Promise<Property[]> {
  return apiFetch("/api/properties", PropertyListSchema, { cache: "no-store" });
}

/** Récupère le détail d'une propriété à partir de son id. */
export function getPropertyById(id: string): Promise<PropertyDetail> {
  return apiFetch(`/api/properties/${encodeURIComponent(id)}`, PropertyDetailSchema, {
    cache: "no-store",
  });
}

/**
 * Récupère le détail d'une propriété à partir de son slug.
 * L'API ne permet de chercher que par id : on retrouve d'abord l'id dans la liste.
 * Renvoie `null` si aucune propriété ne correspond.
 *
 * `cache` (React) évite de refaire les appels quand la fonction est utilisée
 * plusieurs fois pendant le même rendu (ex. generateMetadata + la page).
 */
export const getPropertyBySlug = cache(async (slug: string): Promise<PropertyDetail | null> => {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);
  if (!match) return null;
  return getPropertyById(match.id);
});
