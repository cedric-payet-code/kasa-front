import { describe, expect, it } from "vitest";
import { getMockProperties, getMockPropertyById } from "./properties";

describe("données mockées", () => {
  it("renvoie la liste des logements au format de l'API (sans le détail)", async () => {
    const properties = await getMockProperties();
    expect(properties).toHaveLength(20);
    expect(properties[0]).toHaveProperty("slug");
    expect(properties[0]).not.toHaveProperty("pictures");
  });

  it("renvoie le détail d'un logement à partir de son id", async () => {
    const property = await getMockPropertyById("c67ab8a7");
    expect(property.title).toBe("Appartement cosy");
    expect(property.pictures.length).toBeGreaterThan(0);
  });

  it("lève une erreur pour un id inconnu, comme l'API", async () => {
    await expect(getMockPropertyById("inconnu")).rejects.toThrow();
  });
});
