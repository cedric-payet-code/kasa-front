import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

/**
 * Bouton « call to action » de la maquette, en 3 variantes :
 * - texte seul (par défaut)
 * - icône + texte (`icon` + `children`)
 * - icône seule (`icon` + `label`, sans `children`)
 *
 * Deux styles : `primary` (rouge, par défaut) et `secondary` (gris clair,
 * ex. « Retour aux annonces »).
 * Avec `href`, il est rendu comme un lien Next.js ; sinon comme un <button>.
 */

type CommonProps = {
  icon?: IconName;
  /** Texte accessible, obligatoire pour un bouton icône seule. */
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-1 text-sm font-medium leading-[1.426] whitespace-nowrap transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-red " +
  "disabled:bg-gris-light disabled:text-gris-dark disabled:cursor-not-allowed " +
  "aria-disabled:bg-gris-light aria-disabled:text-gris-dark aria-disabled:pointer-events-none";

const variants = {
  primary: "bg-main-red text-blanc hover:bg-dark-orange",
  secondary: "bg-gris-light text-gris-dark hover:text-noir",
};

export default function Button(props: ButtonProps) {
  const { icon, label, variant = "primary", className = "", children } = props;
  const iconOnly = icon && !children;

  const shape = iconOnly
    ? "size-8 rounded-[5px]"
    : icon
      ? "px-4 py-2 rounded-[10px]"
      : "px-8 py-2 rounded-[10px]";

  const classes = `${base} ${variants[variant]} ${shape} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { icon: _i, label: _l, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <Link {...rest} className={classes} aria-label={iconOnly ? label : undefined}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon: _i, label: _l, variant: _v, className: _c, children: _ch, type = "button", ...rest } =
    props;
  return (
    <button {...rest} type={type} className={classes} aria-label={iconOnly ? label : undefined}>
      {content}
    </button>
  );
}
