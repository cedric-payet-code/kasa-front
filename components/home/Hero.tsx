import Image from "next/image";
import heroImage from "@/public/images/hero.jpg";

/** Bandeau d'accueil : titre, accroche et grande photo. */
export default function Hero() {
  return (
    <section className="flex flex-col items-center gap-10">
      <div className="flex max-w-[742px] flex-col gap-2 text-center">
        <h1 className="text-[32px] font-bold text-main-red">Chez vous, partout et ailleurs</h1>
        <p className="text-sm text-black">
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec
          soin par nos hôtes.
        </p>
      </div>

      <div className="relative h-[458px] w-full overflow-hidden rounded-[20px] bg-blanc">
        <Image
          src={heroImage}
          alt=""
          fill
          sizes="(min-width: 1147px) 1115px, calc(100vw - 32px)"
          placeholder="blur"
          className="object-cover"
          preload
        />
      </div>
    </section>
  );
}
