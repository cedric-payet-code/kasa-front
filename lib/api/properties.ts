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
