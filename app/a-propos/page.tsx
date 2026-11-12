import type { Metadata } from "next";
import Image from "next/image";
import chaletImage from "@/public/images/about-chalet.jpg";
import houseImage from "@/public/images/about-house.jpg";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Kasa met en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région.",
};

const missions = [
  "Offrir une plateforme fiable et simple d’utilisation",
  "Proposer des hébergements variés et de qualité",
  "Favoriser des échanges humains et chaleureux entre hôtes et voyageurs",
];

/**
 * Page « À propos » (maquette) : présentation de Kasa et de sa mission.
 *
 * @returns La page « À propos ».
 */
export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-[1147px] flex-col gap-10 px-4 py-10">
      <section className="flex flex-col items-center gap-10">
        <div className="flex max-w-[742px] flex-col gap-2 text-center">
          <h1 className="text-[32px] font-bold text-main-red">À propos</h1>
          <p className="text-sm text-black">
            Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
          </p>
          <p className="mt-5 text-sm text-black">
            Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité
            avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
          </p>
        </div>

        <div className="relative h-[458px] w-full overflow-hidden rounded-[20px] bg-blanc">
          <Image
            src={houseImage}
            alt=""
            fill
            sizes="(min-width: 1147px) 1115px, calc(100vw - 32px)"
            placeholder="blur"
            className="object-cover"
            preload
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Mobile : texte, photo, conclusion. Desktop : texte et conclusion à gauche, photo à droite. */}
      <section
        aria-labelledby="mission-title"
        className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_494px] lg:grid-rows-[1fr_auto_auto_1fr]"
      >
        <div className="flex flex-col gap-4 lg:row-start-2">
          <h2 id="mission-title" className="text-lg font-bold text-main-red">
            Notre mission est simple :
          </h2>
          <ol className="flex list-decimal flex-col gap-5 pl-[21px] text-sm text-black">
            {missions.map((mission) => (
              <li key={mission}>{mission}</li>
            ))}
          </ol>
        </div>

        <div className="relative h-[458px] overflow-hidden rounded-[20px] bg-blanc lg:col-start-2 lg:row-span-4 lg:row-start-1">
          <Image
            src={chaletImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 494px, calc(100vw - 32px)"
            placeholder="blur"
            className="object-cover"
          />
        </div>

        <p className="text-lg font-medium text-main-red lg:row-start-3">
          Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un
          chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir
          inoubliable.
        </p>
      </section>
    </div>
  );
}
