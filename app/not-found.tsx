import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { routes } from "@/components/layout/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/**
 * Page 404 (maquette) : affichée pour toute adresse qui n'existe pas,
 * et pour un logement introuvable.
 *
 * @returns La page « 404 ».
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-160px)] max-w-[374px] flex-col items-center justify-center gap-10 px-4 py-10 text-center">
      <div className="flex flex-col">
        <h1 className="text-[100px] leading-[1.426] font-black text-main-red">
          404
          <span className="sr-only"> – Page introuvable</span>
        </h1>
        <p className="text-sm text-black">
          Il semble que la page que vous cherchez ait pris des vacances… ou n’ait jamais existé.
        </p>
      </div>

      <div className="flex w-[200px] flex-col gap-3.5">
        <Button href={routes.home} className="w-full">
          Accueil
        </Button>
        <Button href={`${routes.home}#logements`} className="w-full">
          Logements
        </Button>
      </div>
    </div>
  );
}
