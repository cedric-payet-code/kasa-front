import { getProperties, getPropertyById } from "@/lib/api/properties";

// Page temporaire de l'étape 2 : vérifie que les données de l'API arrivent bien.
// À supprimer une fois la page d'accueil en place.

export const dynamic = "force-dynamic";

export default async function TestApiPage() {
  const properties = await getProperties();
  const first = properties[0] ? await getPropertyById(properties[0].id) : null;

  return (
    <main className="mx-auto max-w-5xl p-8 font-mono text-sm">
      <h1 className="mb-6 text-2xl font-bold">Test API : {properties.length} propriétés</h1>

      <table className="mb-10 w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Titre</th>
            <th className="p-2">Lieu</th>
            <th className="p-2">Prix / nuit</th>
            <th className="p-2">Note</th>
            <th className="p-2">Hôte</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.title}</td>
              <td className="p-2">{p.location}</td>
              <td className="p-2">{p.price_per_night} €</td>
              <td className="p-2">{p.rating_avg}</td>
              <td className="p-2">{p.host?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {first && (
        <>
          <h2 className="mb-2 text-xl font-bold">Détail de « {first.title} »</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded bg-zinc-100 p-4 text-zinc-900">
            {JSON.stringify(first, null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}
