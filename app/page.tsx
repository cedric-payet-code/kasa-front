import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import PropertyList from "@/components/property/PropertyList";
import PropertyListSkeleton from "@/components/property/PropertyListSkeleton";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1147px] flex-col gap-10 px-4 py-10">
      <Hero />

      <section aria-label="Nos logements">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyList />
        </Suspense>
      </section>

      <HowItWorks />
    </div>
  );
}
