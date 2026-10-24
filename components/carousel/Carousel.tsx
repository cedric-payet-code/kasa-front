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
  className?: string;
};

/**
 * Carrousel d'images (règles du backlog) :
 * - navigation par flèches, avec une transition fluide ;
 * - boucle entre la dernière et la première image ;
 * - hauteur fixe (donnée par le parent), images centrées et recadrées ;
 * - accessible au clavier (flèches gauche/droite quand le carrousel a le focus) ;
 * - pas de flèches lorsqu'il n'y a qu'une image.
 */
export default function Carousel({ images, title, sizes = "100vw", className = "" }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const count = images.length;
  const hasMany = count > 1;

  if (count === 0) {
    return <div className={`rounded-[10px] bg-gris-light ${className}`} aria-hidden="true" />;
  }

  const goTo = (index: number) => setCurrent((index + count) % count);
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
              <Image
                src={src}
                alt={`${title} – photo ${index + 1}`}
                fill
                sizes={sizes}
                className="object-cover object-center"
                preload={index === 0}
              />
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
