import { z } from "zod";

/** Clé utilisée dans le localStorage du navigateur. */
export const FAVORITES_STORAGE_KEY = "kasa:favorites";

/** Événement émis quand les favoris changent dans cet onglet. */
const CHANGE_EVENT = "kasa:favorites-change";

const FavoritesSchema = z.array(z.string());

const EMPTY: readonly string[] = Object.freeze([]);

// Cache de la dernière lecture : useSyncExternalStore exige que la même
// valeur (même référence) soit renvoyée tant que les données n'ont pas changé.
let cachedRaw: string | null = null;
let cachedFavorites: readonly string[] = EMPTY;

/** Lit la valeur brute dans localStorage (null si indisponible : navigation privée, serveur…). */
function readRaw(): string | null {
  try {
    return window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Transforme la valeur brute en liste d'ids, en ignorant une donnée corrompue. */
function parse(raw: string | null): readonly string[] {
  if (!raw) return EMPTY;
  try {
    const result = FavoritesSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : EMPTY;
  } catch {
    return EMPTY;
  }
}

/** Renvoie la liste des ids favoris enregistrés dans le navigateur. */
export function getFavorites(): readonly string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedFavorites = parse(raw);
  }
  return cachedFavorites;
}

/** Valeur utilisée pendant le rendu serveur : le serveur ne connaît pas les favoris. */
export function getServerFavorites(): readonly string[] {
  return EMPTY;
}

/** Enregistre la liste des favoris et prévient les composants abonnés. */
function saveFavorites(favorites: readonly string[]) {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Stockage indisponible (quota, navigation privée) : on ignore silencieusement.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Ajoute l'id s'il n'est pas en favori, le retire sinon. */
export function toggleFavorite(id: string) {
  const favorites = getFavorites();
  saveFavorites(
    favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id],
  );
}

/**
 * Abonne un composant aux changements des favoris :
 * dans cet onglet (CHANGE_EVENT) et dans les autres onglets (événement "storage").
 */
export function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
