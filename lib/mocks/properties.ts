import {
  PropertyDetailSchema,
  PropertyListSchema,
  type Property,
  type PropertyDetail,
} from "@/lib/schemas/property";
import mockData from "./properties.json";

/**
 * Données mockées : copie des 20 logements renvoyés par l'API Kasa
 * (`lib/mocks/properties.json`). Utilisées quand `USE_MOCK_DATA=true`,
 * par exemple pour le site déployé sur Vercel, où le back-end n'est pas en ligne.
 *
 * Les données passent par les mêmes schémas Zod que les réponses de l'API :
 * un fichier mal formé est détecté de la même façon.
 */
const mockProperties: PropertyDetail[] = PropertyDetailSchema.array().parse(mockData);

/**
 * Version mockée de `GET /api/properties`.
 *
 * @returns La liste des logements au format résumé (sans photos, équipements ni tags),
 * comme l'API.
 */
export async function getMockProperties(): Promise<Property[]> {
  // Le schéma de liste retire les champs propres au détail, comme le fait l'API.
  return PropertyListSchema.parse(mockProperties);
}

/**
 * Version mockée de `GET /api/properties/:id`.
 *
 * @param id - Identifiant du logement.
 * @returns Le logement détaillé.
 * @throws {Error} Si aucun logement ne correspond, comme l'API qui renvoie une 404.
 */
export async function getMockPropertyById(id: string): Promise<PropertyDetail> {
  const property = mockProperties.find((item) => item.id === id);
  if (!property) {
    throw new Error(`Logement mocké introuvable : ${id}`);
  }
  return property;
}
