import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { FAVORITES_STORAGE_KEY, getFavorites, toggleFavorite } from "@/lib/favorites/store";
import FavoriteButton from "./FavoriteButton";
import { FavoritesProvider } from "./FavoritesProvider";

/** Lit les favoris tels qu'ils sont enregistrés dans le localStorage. */
function storedFavorites() {
  return JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]");
}

function renderButton(id = "c67ab8a7", title = "Appartement cosy") {
  return render(
    <FavoritesProvider>
      <FavoriteButton propertyId={id} propertyTitle={title} />
    </FavoritesProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("store des favoris (localStorage)", () => {
  it("renvoie une liste vide quand rien n'est enregistré", () => {
    expect(getFavorites()).toEqual([]);
  });

  it("ajoute puis retire un favori", () => {
    act(() => toggleFavorite("a"));
    expect(storedFavorites()).toEqual(["a"]);
    act(() => toggleFavorite("b"));
    expect(storedFavorites()).toEqual(["a", "b"]);
    act(() => toggleFavorite("a"));
    expect(storedFavorites()).toEqual(["b"]);
  });

  it("ignore une valeur corrompue dans le localStorage", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "pas du JSON");
    expect(getFavorites()).toEqual([]);
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify({ id: 1 }));
    expect(getFavorites()).toEqual([]);
  });
});

describe("FavoriteButton", () => {
  it("affiche un cœur non sélectionné par défaut", () => {
    renderButton();
    const button = screen.getByRole("button", { name: "Ajouter Appartement cosy aux favoris" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(button).not.toHaveClass("text-main-red");
  });

  it("ajoute le logement aux favoris au clic et passe le cœur en rouge", async () => {
    const user = userEvent.setup();
    renderButton();
    await user.click(screen.getByRole("button", { name: /aux favoris/ }));

    const button = screen.getByRole("button", { name: "Retirer Appartement cosy des favoris" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button).toHaveClass("text-main-red");
    expect(storedFavorites()).toEqual(["c67ab8a7"]);
  });

  it("retire le logement des favoris au second clic", async () => {
    const user = userEvent.setup();
    renderButton();
    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(storedFavorites()).toEqual([]);
  });

  it("retrouve les favoris enregistrés quand on revient sur le site", () => {
    // Simule une visite précédente : le favori est déjà dans le localStorage.
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(["c67ab8a7"]));
    renderButton();

    expect(screen.getByRole("button", { name: "Retirer Appartement cosy des favoris" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("met à jour tous les boutons du même logement", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <FavoriteButton propertyId="x" propertyTitle="Studio" />
        <FavoriteButton propertyId="x" propertyTitle="Studio" />
        <FavoriteButton propertyId="y" propertyTitle="Loft" />
      </FavoritesProvider>,
    );
    await user.click(screen.getAllByRole("button", { name: "Ajouter Studio aux favoris" })[0]);

    expect(screen.getAllByRole("button", { name: "Retirer Studio des favoris" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Ajouter Loft aux favoris" })).toBeInTheDocument();
  });
});
