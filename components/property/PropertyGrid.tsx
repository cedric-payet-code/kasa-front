import type { ReactNode } from "react";

/** Grille responsive des cartes : 1 colonne en mobile, 2 en tablette, 3 en desktop. */
export default function PropertyGrid({ children }: { children: ReactNode }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>
  );
}
