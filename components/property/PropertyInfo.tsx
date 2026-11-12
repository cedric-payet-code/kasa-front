import Collapse from "@/components/ui/Collapse";
import Icon from "@/components/ui/Icon";
import Tag from "@/components/ui/Tag";
import type { PropertyDetail } from "@/lib/schemas/property";

/**
 * Bloc d'informations du logement : titre, lieu, description, puis équipements
 * et catégories dans des sections repliables (collapses du backlog).
 *
 * @param props.property - Logement détaillé renvoyé par l'API.
 * @returns Le bloc d'informations.
 */
export default function PropertyInfo({ property }: { property: PropertyDetail }) {
  const { title, location, description, equipments, tags } = property;

  return (
    <div className="flex flex-col gap-10 rounded-[10px] border border-gris-light bg-blanc p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium text-black">{title}</h1>
          {location && (
            <p className="flex items-center gap-2 text-sm text-gris-dark">
              <Icon name="localisation" />
              {location}
            </p>
          )}
        </div>
        {description && <p className="text-sm text-black">{description}</p>}
      </div>

      {equipments.length > 0 && (
        <Collapse title="Équipements">
          <ul className="flex max-w-[316px] flex-wrap gap-2">
            {equipments.map((equipment) => (
              <li key={equipment}>
                <Tag>{equipment}</Tag>
              </li>
            ))}
          </ul>
        </Collapse>
      )}

      {tags.length > 0 && (
        <Collapse title="Catégorie">
          <ul className="flex flex-wrap gap-[18px]">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </Collapse>
      )}
    </div>
  );
}
