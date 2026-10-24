import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import type { Property } from "@/lib/schemas/property";

type PropertyCardProps = {
  property: Property;
  /** À activer pour les premières cartes visibles sans scroller (chargement prioritaire). */
  preload?: boolean;
};

/** Carte d'un logement dans la liste (composant « Card propriété » de la maquette). */
export default function PropertyCard({ property, preload = false }: PropertyCardProps) {
  const { id, slug, title, location, cover, price_per_night } = property;

  return (
    <article className="group relative flex h-[552px] flex-col overflow-hidden rounded-[10px] bg-blanc">
      <div className="relative h-[376px] shrink-0 bg-gris-light">
        {cover && (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 355px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            preload={preload}
          />
        )}
        {/* z-10 : le bouton passe au-dessus du lien qui couvre toute la carte */}
        <FavoriteButton
          propertyId={id}
          propertyTitle={title}
          className="absolute top-4 right-4 z-10"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between px-6 pt-4 pb-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-noir">
            {/* Le lien couvre toute la carte grâce au pseudo-élément ::after */}
            <Link
              href={`/logement/${slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[10px] focus-visible:after:outline-2 focus-visible:after:outline-main-red"
            >
              {title}
            </Link>
          </h2>
          {location && <p className="text-sm text-gris-dark">{location}</p>}
        </div>

        <p className="flex items-center gap-1.5 text-sm">
          <span className="font-medium text-noir">{price_per_night}€</span>
          <span className="text-gris-dark">par nuit</span>
        </p>
      </div>
    </article>
  );
}
