/**
 * Adresse publique du site, utilisée pour les URL absolues
 * (sitemap, robots.txt, balises de partage, données structurées).
 *
 * Ordre de priorité :
 * 1. la variable `SITE_URL` si elle est définie ;
 * 2. l'adresse de production fournie automatiquement par Vercel ;
 * 3. l'adresse locale de développement.
 */
export const siteUrl: string =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3001");
