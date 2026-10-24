import Image from "next/image";

/** Pied de page commun à toutes les pages (server component). */
export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-gris-light bg-blanc px-10 py-2">
      <Image src="/images/logo-picto.svg" alt="Kasa" width={46} height={53} />
      <p className="text-xs font-medium text-gris-dark">
        © {new Date().getFullYear()} Kasa. All rights reserved
      </p>
    </footer>
  );
}
