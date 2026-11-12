"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import Button from "@/components/ui/Button";

type CarouselProps = {
  /** URLs des images à faire défiler. */
  images: string[];
  /** Nom du logement, utilisé pour les textes alternatifs. */
  title: string;
  /** Valeur `sizes` transmise à next/image. */
  sizes?: string;
  /** Index de la photo affichée au départ (0 par défaut). */
  initialIndex?: number;
  /** Charge la première photo en priorité (si le carrousel est visible dès l'arrivée sur la page). */
  priority?: boolean;
  className?: string;
};

/**
 * Carrousel d'images (règles du backlog) :
 * - navigation par flèches, avec une transition fluide ;
 * - boucle entre la dernière et la première image ;
 * - hauteur fixe (donnée par le parent), images centrées et recadrées ;
 * - accessible au clavier (flèches gauche/droite quand le carrousel a le focus) ;
 * - pas de flèches lorsqu'il n'y a qu'une image.
 *
 * @param props.images - URLs des images à faire défiler.
 * @param props.title - Nom du logement, utilisé pour les textes alternatifs.
 * @param props.sizes - Valeur `sizes` transmise à next/image.
 * @param props.initialIndex - Index de la photo affichée au départ.
 * @param props.priority - Charge la photo de départ en priorité.
 * @param props.className - Classes CSS supplémentaires, notamment la hauteur.
 * @returns Le carrousel, ou un cadre gris vide s'il n'y a aucune image.
 */
export default function Carousel({
  images,
  title,
  sizes = "100vw",
  initialIndex = 0,
  priority = false,
  className = "",
}: CarouselProps) {
  const [current, setCurrent] = useState(initialIndex);
  // Photos déjà chargées : au départ seulement celle affichée, pour ne pas ralentir
  // l'affichage de la page. Les voisines sont chargées dès que le visiteur
  // s'intéresse au carrousel (survol, focus) ou change de photo.
  const [loaded, setLoaded] = useState<ReadonlySet<number>>(() => new Set([initialIndex]));
  const count = images.length;
  const hasMany = count > 1;

  if (count === 0) {
    return <div className={`rounded-[10px] bg-gris-light ${className}`} aria-hidden="true" />;
  }

  /** Marque comme à charger la photo `index` et ses deux voisines. */
  const loadAround = (index: number) => {
    const wanted = [index, index + 1, index - 1].map((i) => (i + count) % count);
    if (wanted.every((i) => loaded.has(i))) return;
    setLoaded((previous) => new Set([...previous, ...wanted]));
  };

  const goTo = (index: number) => {
    const target = (index + count) % count;
    loadAround(target);
    setCurrent(target);
  };
  const previous = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!hasMany) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      previous();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section
      aria-roledescription="carrousel"
      aria-label={`Photos du logement ${title}`}
      tabIndex={hasMany ? 0 : undefined}
      onKeyDown={onKeyDown}
      onPointerEnter={hasMany ? () => loadAround(current) : undefined}
      onFocus={hasMany ? () => loadAround(current) : undefined}
      className={`relative overflow-hidden rounded-[10px] bg-gris-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red ${className}`}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
        aria-live="polite"
      >
        {images.map((src, index) => {
          const isCurrent = index === current;
          return (
            <div
              key={`${src}-${index}`}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`Photo ${index + 1} sur ${count}`}
              aria-hidden={!isCurrent}
              className="relative h-full w-full shrink-0"
            >
              {loaded.has(index) && (
                <Image
                  src={src}
                  alt={`${title} – photo ${index + 1}`}
                  fill
                  sizes={sizes}
                  className="object-cover object-center"
                  preload={priority && index === initialIndex}
                  fetchPriority={priority && index === initialIndex ? "high" : undefined}
                />
              )}
            </div>
          );
        })}
      </div>

      {hasMany && (
        <>
          <Button
            icon="back"
            label="Photo précédente"
            onClick={previous}
            className="absolute top-1/2 left-4 -translate-y-1/2"
          />
          <Button
            icon="back"
            label="Photo suivante"
            onClick={next}
            className="absolute top-1/2 right-4 -translate-y-1/2 [&_svg]:rotate-180"
          />
        </>
      )}
    </section>
  );
}
