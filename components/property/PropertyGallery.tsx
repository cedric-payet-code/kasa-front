import Image from "next/image";
import Carousel from "@/components/carousel/Carousel";

type PropertyGalleryProps = {
  pictures: string[];
  title: string;
};

/**
 * Galerie de la page logement (maquette) : la grande photo est un carrousel,
 * accompagnée des 4 photos suivantes en miniatures (affichage seul).
 * S'il n'y a qu'une photo, le carrousel prend toute la largeur.
 */
export default function PropertyGallery({ pictures, title }: PropertyGalleryProps) {
  const thumbnails = pictures.slice(1, 5);
  const hasThumbnails = thumbnails.length > 0;

  return (
    <div
      className={`grid grid-cols-1 gap-2.5 ${hasThumbnails ? "md:grid-cols-2" : ""}`}
    >
      <Carousel
        images={pictures}
        title={title}
        sizes={hasThumbnails ? "(min-width: 768px) 303px, 100vw" : "(min-width: 768px) 616px, 100vw"}
        className="h-[422px] md:h-[357px]"
      />

      {hasThumbnails && (
        <ul className="grid grid-cols-4 gap-2 md:grid-cols-2 md:grid-rows-2 md:gap-2.5">
          {thumbnails.map((src, index) => (
            <li
              key={`${src}-${index}`}
              className="relative h-[109px] overflow-hidden rounded-[10px] bg-gris-light md:h-[174px]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 147px, 25vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
