"use client";

import Link from "next/link";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyGrid from "@/components/property/PropertyGrid";
import PropertyListSkeleton from "@/components/property/PropertyListSkeleton";
import type { Property } from "@/lib/schemas/property";
import { useFavorites } from "./FavoritesProvider";

/**
 * Liste des logements favoris. Les logements viennent de l'API (côté serveur),
 * le filtre se fait ici, côté navigateur, car les favoris sont dans le localStorage.
 */
export default function FavoritesList({ properties }: { properties: Property[] }) {
  const { favorites, isReady } = useFavorites();

  // Avant la lecture du localStorage, on ne sait pas encore quels logements afficher.
  if (!isReady) return <PropertyListSkeleton count={3} />;

  const favoriteProperties = properties.filter((property) => favorites.includes(property.id));

  if (favoriteProperties.length === 0) {
    return (
      <p className="text-center text-sm text-gris-dark">
        Vous n’avez pas encore de favoris.{" "}
        <Link href="/" className="text-main-red underline">
          Découvrir les logements
        </Link>
      </p>
    );
  }

  return (
    <PropertyGrid>
      {favoriteProperties.map((property) => (
        <li key={property.id}>
          <PropertyCard property={property} />
        </li>
      ))}
    </PropertyGrid>
  );
}
