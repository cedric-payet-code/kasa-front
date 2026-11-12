import { getProperties } from "@/lib/api/properties";
import PropertyCard from "./PropertyCard";
import PropertyGrid from "./PropertyGrid";

/**
 * Liste de toutes les propriétés, récupérées côté serveur depuis l'API.
 * À envelopper dans un `<Suspense>` pour afficher un skeleton pendant le chargement.
 *
 * @returns La grille des logements, ou un message s'il n'y en a aucun.
 * @throws {Error} Si l'API échoue (l'erreur est affichée par `app/error.tsx`).
 */
export default async function PropertyList() {
  const properties = await getProperties();

  if (properties.length === 0) {
    return <p className="text-center text-gris-dark">Aucun logement disponible pour le moment.</p>;
  }

  return (
    <PropertyGrid>
      {properties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </PropertyGrid>
  );
}
