import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Collapse from "./Collapse";

describe("Collapse", () => {
  it("est ouvert par défaut", () => {
    render(<Collapse title="Équipements">Contenu</Collapse>);
    expect(screen.getByRole("button", { name: "Équipements" })).toHaveAttribute("aria-expanded", "true");
  });

  it("se ferme puis se rouvre au clic sur le titre", async () => {
    const user = userEvent.setup();
    render(<Collapse title="Équipements">Contenu</Collapse>);
    const button = screen.getByRole("button", { name: "Équipements" });

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Contenu").closest("[inert]")).not.toBeNull();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Contenu").closest("[inert]")).toBeNull();
  });

  it("peut être fermé au départ", () => {
    render(
      <Collapse title="Catégorie" defaultOpen={false}>
        Contenu
      </Collapse>,
    );
    expect(screen.getByRole("button", { name: "Catégorie" })).toHaveAttribute("aria-expanded", "false");
  });
});
