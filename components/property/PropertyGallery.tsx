"use client";

import Image from "next/image";
import { useState } from "react";
import CarouselModal from "@/components/carousel/CarouselModal";

type PropertyGalleryProps = {
  pictures: string[];
  title: string;
};

/**
 * Galerie de la page logement (maquette) : une grande photo et les 4 suivantes
 * en miniatures. Un clic sur une photo ouvre le carrousel dans une modale,
 * directement sur la photo cliquée.
 * S'il n'y a qu'une photo, elle prend toute la largeur.
 *
 * @param props.pictures - URLs des photos du logement.
 * @param props.title - Nom du logement, utilisé pour les textes alternatifs.
 * @returns La galerie et, si elle est ouverte, la modale carrousel.
 */
export default function PropertyGallery({ pictures, title }: PropertyGalleryProps) {
  // Index de la photo ouverte dans la modale, ou null si la modale est fermée.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [cover, ...others] = pictures;
  const thumbnails = others.slice(0, 4);
  const hasThumbnails = thumbnails.length > 0;

  if (!cover) {
    return <div className="h-[422px] rounded-[10px] bg-gris-light md:h-[357px]" aria-hidden="true" />;
  }

  const buttonClasses =
    "group relative block w-full cursor-zoom-in overflow-hidden rounded-[10px] bg-gris-light " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red";
  const imageClasses = "object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none";

  return (
    <>
      <div className={`grid grid-cols-1 gap-2.5 ${hasThumbnails ? "md:grid-cols-2" : ""}`}>
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`Agrandir la photo 1 sur ${pictures.length} de ${title}`}
          className={`${buttonClasses} h-[422px] md:h-[357px]`}
        >
          <Image
            src={cover}
            alt={`${title} – photo 1`}
            fill
            sizes={hasThumbnails ? "(min-width: 768px) 303px, 100vw" : "(min-width: 768px) 616px, 100vw"}
            className={imageClasses}
            preload
            fetchPriority="high"
          />
        </button>

        {hasThumbnails && (
          <ul className="grid grid-cols-4 gap-2 md:grid-cols-2 md:grid-rows-2 md:gap-2.5">
            {thumbnails.map((src, i) => {
              const index = i + 1;
              return (
                <li key={`${src}-${index}`} className="h-[109px] md:h-[174px]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label={`Agrandir la photo ${index + 1} sur ${pictures.length} de ${title}`}
                    className={`${buttonClasses} h-full`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 147px, 25vw"
                      className={imageClasses}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {openIndex !== null && (
        <CarouselModal
          images={pictures}
          title={title}
          initialIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
