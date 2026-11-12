import type { PropertyDetail } from "@/lib/schemas/property";
import { siteUrl } from "@/lib/site";

/**
 * Données structurées schema.org (format JSON-LD) de la page logement.
 * Elles décrivent le logement aux moteurs de recherche (nom, photos, prix par nuit,
 * lieu, équipements), qui peuvent l'afficher en « résultat enrichi ».
 *
 * Type `Product` avec une offre (`Offer`) : c'est le type reconnu par le test des
 * résultats enrichis de Google pour afficher un prix. `VacationRental` exigerait
 * des coordonnées GPS que l'API ne fournit pas.
 *
 * @param props.property - Logement détaillé renvoyé par l'API.
 * @returns Une balise `<script type="application/ld+json">`.
 */
export default function PropertyJsonLd({ property }: { property: PropertyDetail }) {
  const url = `${siteUrl}/logement/${property.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url,
    url,
    name: property.title,
    description: property.description ?? undefined,
    image: property.pictures.length > 0 ? property.pictures : property.cover ?? undefined,
    category: "Location de vacances",
    brand: { "@type": "Brand", name: "Kasa" },
    additionalProperty: [
      ...(property.location
        ? [{ "@type": "PropertyValue", name: "Localisation", value: property.location }]
        : []),
      ...property.equipments.map((equipment) => ({
        "@type": "PropertyValue",
        name: "Équipement",
        value: equipment,
      })),
    ],
    offers: {
      "@type": "Offer",
      url,
      price: property.price_per_night,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: property.price_per_night,
        priceCurrency: "EUR",
        unitText: "nuit",
      },
    },
    // La note n'est ajoutée que si de vrais avis existent (exigence de Google).
    ...(property.ratings_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: property.rating_avg,
        ratingCount: property.ratings_count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      // Le remplacement de « < » empêche toute injection de balise HTML via les données.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
