"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Lien de navigation qui signale la page courante (`aria-current="page"`).
 * Composant client car il a besoin de l'URL courante.
 */
export default function NavLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return <Link href={href} aria-current={isActive ? "page" : undefined} {...props} />;
}
