"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import NavLink from "./NavLink";
import { routes } from "./navigation";

const links = [
  { href: routes.home, label: "Accueil" },
  { href: routes.about, label: "À propos" },
  { href: routes.messages, label: "Messagerie" },
  { href: routes.favorites, label: "Favoris" },
];

/**
 * Header mobile : logo + bouton burger qui ouvre un menu plein écran.
 * Composant client car il gère l'état ouvert/fermé.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Bloque le scroll de la page et permet de fermer avec Échap quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex items-center justify-between bg-blanc p-4 lg:hidden">
      <Link href={routes.home}>
        <Image src="/images/logo-picto.svg" alt="Kasa - Accueil" width={46} height={53} priority />
      </Link>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Ouvrir le menu"
        className="text-noir"
      >
        <Icon name="menu" size={46} />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-0 z-50 flex flex-col items-start gap-10 overflow-y-auto bg-blanc px-4 pt-4"
        >
          <div className="flex w-full items-start justify-between">
            <Link href={routes.home} onClick={close}>
              <Image src="/images/logo-picto.svg" alt="Kasa - Accueil" width={46} height={53} />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Fermer le menu"
              className="text-noir"
              autoFocus
            >
              <Icon name="close" size={46} />
            </button>
          </div>

          <nav aria-label="Navigation principale" className="w-full">
            <ul className="flex flex-col gap-7">
              {links.map((link, i) => (
                <li
                  key={link.href}
                  className={i < links.length - 1 ? "border-b border-gris-light pb-7" : undefined}
                >
                  <NavLink href={link.href} onClick={close} className="text-2xl text-noir">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Button href={routes.addProperty} onClick={close}>Ajouter un logement</Button>
        </div>
      )}
    </div>
  );
}
