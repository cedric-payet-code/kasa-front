import type { ReactNode } from "react";

/** Étiquette grise de la maquette (équipements, catégories). */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-w-[100px] items-center justify-center rounded-[5px] bg-gris-light px-4 py-2 text-xs text-gris-dark">
      {children}
    </span>
  );
}
