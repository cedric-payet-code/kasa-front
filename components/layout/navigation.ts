/** Routes principales du site, partagées par le header desktop et le menu mobile. */
export const routes = {
  home: "/",
  about: "/a-propos",
  addProperty: "/ajouter-un-logement",
  favorites: "/favoris",
  messages: "/messagerie",
} as const;

/**
 * Pages du menu pas encore développées (sprint 2) : elles affichent la page 404.
 * Next.js ne les précharge pas, pour éviter des erreurs 404 dans la console.
 */
const plannedRoutes: readonly string[] = [routes.addProperty, routes.messages];

/**
 * Indique si un lien doit être préchargé par Next.js.
 *
 * @param href - Adresse du lien.
 * @returns `false` pour une page pas encore développée, `undefined` sinon (comportement par défaut).
 */
export function prefetchFor(href: string): false | undefined {
  return plannedRoutes.includes(href) ? false : undefined;
}
