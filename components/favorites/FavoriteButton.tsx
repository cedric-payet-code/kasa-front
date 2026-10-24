"use client";

import Icon from "@/components/ui/Icon";
import { useFavorites } from "./FavoritesProvider";

type FavoriteButtonProps = {
  propertyId: string;
  propertyTitle: string;
  className?: string;
};

/**
 * Bouton cœur de la carte logement (maquette : 32×32, fond gris clair).
 * Le cœur devient rouge quand le logement est en favori.
 */
export default function FavoriteButton({ propertyId, propertyTitle, className = "" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(propertyId)}
      aria-pressed={active}
      aria-label={
        active ? `Retirer ${propertyTitle} des favoris` : `Ajouter ${propertyTitle} aux favoris`
      }
      className={`flex size-8 items-center justify-center rounded-[5px] bg-gris-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red ${
        active ? "text-main-red" : "text-noir hover:text-main-red"
      } ${className}`}
    >
      <Icon name={active ? "favorisPlein" : "favoris"} />
    </button>
  );
}
