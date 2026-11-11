import type { z } from "zod";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

/**
 * Appelle l'API Kasa et valide la réponse avec un schéma Zod.
 *
 * @template T - Schéma Zod décrivant la forme attendue de la réponse.
 * @param path - Chemin de la route, à partir de la racine de l'API (ex. `/api/properties`).
 * @param schema - Schéma Zod utilisé pour valider le JSON reçu.
 * @param init - Options passées à `fetch` (méthode, en-têtes, cache…).
 * @returns Les données validées et typées d'après le schéma.
 * @throws {Error} Si la réponse HTTP n'est pas un succès (statut hors 2xx).
 * @throws {Error} Si les données reçues ne correspondent pas au schéma.
 *
 * @example
 * const properties = await apiFetch("/api/properties", PropertyListSchema);
 */
export async function apiFetch<T extends z.ZodType>(
  path: string,
  schema: T,
  init?: RequestInit,
): Promise<z.infer<T>> {
  const res = await fetch(`${API_URL}${path}`, init);

  if (!res.ok) {
    throw new Error(`API ${res.status} sur ${path}`);
  }

  const data: unknown = await res.json();
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error(`Réponse invalide pour ${path}`, parsed.error.issues);
    throw new Error(`Données invalides reçues de ${path}`);
  }

  return parsed.data;
}
