"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getFavorites, getServerFavorites, subscribe, toggleFavorite } from "@/lib/favorites/store";

type FavoritesContextValue = {
  /** Ids des logements favoris. */
  favorites: readonly string[];
  /** Indique si un logement est en favori. */
  isFavorite: (id: string) => boolean;
  /** Ajoute le logement aux favoris, ou l'en retire s'il y est déjà. */
  toggleFavorite: (id: string) => void;
  /** false pendant le rendu serveur et le premier rendu : les favoris ne sont pas encore lus. */
  isReady: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const noopSubscribe = () => () => {};

/**
 * Fournit les favoris à toute l'application (Context React).
 * Les favoris sont stockés dans le localStorage du navigateur, ils sont donc
 * conservés quand on quitte le site et qu'on revient plus tard.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useSyncExternalStore(subscribe, getFavorites, getServerFavorites);
  const isReady = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, isReady }),
    [favorites, isFavorite, isReady],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

/** Accès aux favoris depuis n'importe quel composant client. */
export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé dans un <FavoritesProvider>.");
  }
  return context;
}
