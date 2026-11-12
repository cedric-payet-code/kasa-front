import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes } from "@/components/layout/navigation";
import HostCard from "@/components/property/HostCard";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyInfo from "@/components/property/PropertyInfo";
import Button from "@/components/ui/Button";
import { getPropertyBySlug } from "@/lib/api/properties";

/**
 * Titre, description et image de partage propres à chaque logement (SEO).
 *
 * @param props.params - Paramètres de l'URL, contenant le `slug` du logement.
 * @returns Les métadonnées de la page.
 */
export async function generateMetadata({
  params,
}: PageProps<"/logement/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return {
    title: property.title,
    description: property.description ?? `Découvrez ${property.title} sur Kasa.`,
    openGraph: {
      title: property.title,
      description: property.description ?? undefined,
      images: property.cover ? [property.cover] : undefined,
    },
  };
}

/**
 * Page détail d'un logement : galerie avec carrousel, informations et hôte.
 * Affiche une 404 si aucun logement ne correspond au slug.
 *
 * @param props.params - Paramètres de l'URL, contenant le `slug` du logement.
 * @returns La page du logement.
 */
export default async function PropertyPage({ params }: PageProps<"/logement/[slug]">) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  return (
    <div className="mx-auto flex max-w-[1003px] flex-col gap-6 px-4 pt-2.5 pb-10 lg:pt-10">
      <div className="lg:border-b lg:border-gris-light lg:px-[7px] lg:py-4">
        <Button href={routes.home} variant="secondary" icon="back" className="px-4">
          Retour aux annonces
        </Button>
      </div>

      <div className="grid grid-cols-1 items-start gap-2.5 lg:grid-cols-[616px_345px] lg:gap-x-2.5 lg:gap-y-6">
        <PropertyGallery pictures={property.pictures} title={property.title} />
        <PropertyInfo property={property} />
        {property.host && (
          <div className="lg:col-start-2 lg:row-start-1">
            <HostCard host={property.host} rating={property.rating_avg} />
          </div>
        )}
      </div>
    </div>
  );
}
