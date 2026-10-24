import { getProperties } from "@/lib/api/properties";
import PropertyCard from "./PropertyCard";
import PropertyGrid from "./PropertyGrid";

/**
 * Liste de toutes les propriétés, récupérées côté serveur depuis l'API.
 * À envelopper dans un <Suspense> pour afficher un skeleton pendant le chargement.
 */
export default async function PropertyList() {
  const properties = await getProperties();

  if (properties.length === 0) {
    return <p className="text-center text-gris-dark">Aucun logement disponible pour le moment.</p>;
  }

  return (
    <PropertyGrid>
      {properties.map((property, index) => (
        <li key={property.id}>
          <PropertyCard property={property} preload={index < 3} />
        </li>
      ))}
    </PropertyGrid>
  );
}
