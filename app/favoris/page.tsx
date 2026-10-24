import type { Metadata } from "next";
import FavoritesList from "@/components/favorites/FavoritesList";
import { getProperties } from "@/lib/api/properties";

export const metadata: Metadata = {
  title: "Vos favoris",
  description: "Retrouvez les logements que vous avez aimés sur Kasa.",
};

export default async function FavoritesPage() {
  const properties = await getProperties();

  return (
    <div className="mx-auto flex max-w-[1147px] flex-col gap-10 px-4 py-10">
      <div className="mx-auto flex max-w-[742px] flex-col gap-2 text-center">
        <h1 className="text-[32px] font-bold text-main-red">Vos favoris</h1>
        <p className="text-sm text-black">
          Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver ? Un simple clic et
          votre prochain séjour est en route.
        </p>
      </div>

      <FavoritesList properties={properties} />
    </div>
  );
}
