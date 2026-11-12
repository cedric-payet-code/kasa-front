"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Carousel from "./Carousel";

type CarouselModalProps = {
  /** URLs des photos à faire défiler. */
  images: string[];
  /** Nom du logement, utilisé pour les textes alternatifs. */
  title: string;
  /** Index de la photo à afficher à l'ouverture. */
  initialIndex: number;
  /** Appelée quand la modale se ferme (bouton, touche Échap ou clic sur le fond). */
  onClose: () => void;
};

/**
 * Modale plein écran contenant le carrousel des photos d'un logement.
 *
 * Elle repose sur l'élément natif `<dialog>` ouvert avec `showModal()` : le
 * navigateur gère lui-même l'affichage au-dessus de la page, le blocage du focus
 * dans la modale, la touche Échap et le retour du focus sur la photo cliquée.
 *
 * @param props.images - URLs des photos.
 * @param props.title - Nom du logement.
 * @param props.initialIndex - Photo affichée à l'ouverture.
 * @param props.onClose - Fonction appelée à la fermeture.
 * @returns La modale.
 */
export default function CarouselModal({ images, title, initialIndex, onClose }: CarouselModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Place le focus sur le carrousel pour pouvoir naviguer directement avec les flèches du clavier.
    dialog.querySelector<HTMLElement>('[aria-roledescription="carrousel"]')?.focus();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Photos du logement ${title}`}
      onClose={onClose}
      // Un clic sur le fond (en dehors du contenu) ferme la modale.
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-noir/80 md:p-10"
    >
      <div className="mx-auto flex h-full max-w-5xl flex-col justify-center gap-4">
        <Button
          icon="close"
          label="Fermer"
          variant="secondary"
          onClick={() => dialogRef.current?.close()}
          className="self-end"
        />
        <Carousel
          images={images}
          title={title}
          initialIndex={initialIndex}
          sizes="(min-width: 1104px) 1024px, 100vw"
          className="h-[min(70vh,680px)] w-full"
        />
      </div>
    </dialog>
  );
}
