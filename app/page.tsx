import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PropertyList from "@/components/property/PropertyList";
import PropertyListSkeleton from "@/components/property/PropertyListSkeleton";

/**
 * Page d'accueil : bandeau, liste des logements (chargée en streaming avec un
 * skeleton) et section « Comment ça marche ? ».
 *
 * @returns La page d'accueil.
 */
export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1147px] flex-col gap-10 px-4 py-10">
      <Hero />

      <section id="logements" aria-label="Nos logements" className="scroll-mt-6">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyList />
        </Suspense>
      </section>

      <HowItWorks />
    </div>
  );
}
