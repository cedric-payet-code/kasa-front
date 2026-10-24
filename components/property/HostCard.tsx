import Image from "next/image";
import Button from "@/components/ui/Button";
import { routes } from "@/components/layout/navigation";
import type { PropertyHost } from "@/lib/schemas/property";

type HostCardProps = {
  host: PropertyHost;
  rating: number;
};

/** Encadré « Votre hôte » : photo, nom, note et actions de contact. */
export default function HostCard({ host, rating }: HostCardProps) {
  const formattedRating = rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

  return (
    <section
      aria-labelledby="host-title"
      className="flex flex-col gap-2 rounded-[10px] border border-gris-light bg-blanc p-6"
    >
      <h2 id="host-title" className="text-base font-medium text-black">
        Votre hôte
      </h2>

      <div className="flex items-center gap-[18px] py-4">
        <div className="relative size-[82px] shrink-0 overflow-hidden rounded-[10px] bg-gris-light">
          {host.picture && (
            <Image src={host.picture} alt="" fill sizes="82px" className="object-cover" />
          )}
        </div>
        <p className="text-base text-black">{host.name}</p>
        <p className="flex items-center gap-1 rounded-[10px] bg-gris-light p-2 text-base text-black">
          <svg width="15" height="17" viewBox="0 0 15 17" aria-hidden="true" className="text-main-red">
            <path
              d="M6.41993 0.740832C6.68503 -0.246854 8.08645 -0.246854 8.35156 0.740831L9.3198 4.34812C9.43709 4.7851 9.83316 5.08888 10.2856 5.08888H13.7696C14.6917 5.08888 15.1224 6.23081 14.43 6.83978L11.3032 9.58975C11.0176 9.84097 10.8992 10.2325 10.9978 10.5999L12.1123 14.7517C12.3689 15.7077 11.2293 16.4156 10.486 15.7619L8.04616 13.616C7.66852 13.2839 7.10297 13.2839 6.72533 13.616L4.28546 15.7619C3.5422 16.4156 2.40263 15.7077 2.65923 14.7517L3.77364 10.5999C3.87225 10.2325 3.75388 9.84097 3.46824 9.58975L0.341498 6.83978C-0.350916 6.23081 0.0798023 5.08888 1.00191 5.08888H4.48588C4.93832 5.08888 5.3344 4.7851 5.45169 4.34812L6.41993 0.740832Z"
              fill="currentColor"
            />
          </svg>
          <span className="sr-only">Note : </span>
          {formattedRating}
          <span className="sr-only"> sur 5</span>
        </p>
      </div>

      <Button href={routes.messages} className="w-full">
        Contacter l’hôte
      </Button>
      <Button href={routes.messages} className="w-full">
        Envoyer un message
      </Button>
    </section>
  );
}
