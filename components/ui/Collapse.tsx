"use client";

import { useId, useState, type ReactNode } from "react";
import Icon from "./Icon";

type CollapseProps = {
  /** Titre toujours visible, qui sert de bouton d'ouverture/fermeture. */
  title: string;
  /** Contenu affiché quand la section est ouverte. */
  children: ReactNode;
  /** Section ouverte au départ (true par défaut, pour garder la page conforme à la maquette). */
  defaultOpen?: boolean;
  className?: string;
};

/**
 * Section repliable (« collapse » du backlog) : un clic sur le titre ouvre ou
 * ferme le contenu, avec une animation de hauteur fluide et discrète.
 *
 * Accessibilité : le titre est un vrai bouton (clavier : Entrée ou Espace),
 * avec `aria-expanded` et `aria-controls`. Fermé, le contenu est `inert` :
 * il ne reçoit plus le focus et n'est plus lu par les lecteurs d'écran.
 *
 * @param props.title - Titre de la section.
 * @param props.children - Contenu repliable.
 * @param props.defaultOpen - Section ouverte au départ.
 * @param props.className - Classes CSS supplémentaires.
 * @returns La section repliable.
 */
export default function Collapse({ title, children, defaultOpen = true, className = "" }: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className={`flex flex-col ${className}`}>
      <h2 className="text-sm font-medium text-black">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-2 rounded-[5px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red"
        >
          {title}
          <Icon
            name="back"
            className={`shrink-0 text-gris-dark transition-transform duration-300 motion-reduce:transition-none ${
              open ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button>
      </h2>

      {/* Animation : la grille passe d'une hauteur 0fr (fermé) à 1fr (ouvert). */}
      <div
        id={contentId}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}
