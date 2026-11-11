"use client";

import Button from "@/components/ui/Button";

/**
 * Page affichée si une page plante (ex. API injoignable).
 *
 * @param props.reset - Fonction fournie par Next.js pour réessayer d'afficher la page.
 * @returns Le message d'erreur et un bouton « Réessayer ».
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-[742px] flex-col items-center gap-6 px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-main-red">Oups, un problème est survenu</h1>
      <p className="text-sm text-gris-dark">
        Impossible de charger les logements pour le moment. Vérifiez votre connexion puis réessayez.
      </p>
      <Button onClick={reset}>Réessayer</Button>
    </div>
  );
}
