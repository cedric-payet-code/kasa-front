import { z } from "zod";

/**
 * Hôte d'une propriété, tel que renvoyé par l'API.
 */
export const PropertyHostSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  picture: z.string().nullable(),
});

/**
 * Propriété telle que renvoyée par GET /api/properties (liste).
 */
export const PropertySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  cover: z.string().nullable(),
  location: z.string().nullable(),
  price_per_night: z.number(),
  rating_avg: z.number(),
  ratings_count: z.number().int(),
  host: PropertyHostSchema.optional(),
});

/**
 * Propriété détaillée, renvoyée par GET /api/properties/:id.
 * Ajoute les photos, équipements et tags à la propriété de base.
 */
export const PropertyDetailSchema = PropertySchema.extend({
  pictures: z.array(z.string()),
  equipments: z.array(z.string()),
  tags: z.array(z.string()),
});

export const PropertyListSchema = z.array(PropertySchema);

export type PropertyHost = z.infer<typeof PropertyHostSchema>;
export type Property = z.infer<typeof PropertySchema>;
export type PropertyDetail = z.infer<typeof PropertyDetailSchema>;
