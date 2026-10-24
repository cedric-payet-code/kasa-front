import PropertyGrid from "./PropertyGrid";

/** Squelette affiché pendant le chargement de la liste des propriétés. */
export default function PropertyListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Chargement des logements">
      <PropertyGrid>
        {Array.from({ length: count }, (_, i) => (
          <li key={i} aria-hidden="true">
            <div className="flex h-[552px] animate-pulse flex-col overflow-hidden rounded-[10px] bg-blanc">
              <div className="h-[376px] bg-gris-light" />
              <div className="flex flex-1 flex-col justify-between px-6 pt-4 pb-6">
                <div className="flex flex-col gap-2">
                  <div className="h-6 w-3/4 rounded bg-gris-light" />
                  <div className="h-5 w-1/2 rounded bg-gris-light" />
                </div>
                <div className="h-5 w-1/3 rounded bg-gris-light" />
              </div>
            </div>
          </li>
        ))}
      </PropertyGrid>
    </div>
  );
}
