import type { z } from "zod";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

/**
 * Appelle l'API Kasa et valide la réponse avec un schéma Zod.
 * Lève une erreur si la requête échoue ou si les données ne correspondent pas au schéma.
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
