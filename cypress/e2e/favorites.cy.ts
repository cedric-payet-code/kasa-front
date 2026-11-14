describe("Favoris", () => {
  it("ajoute un favori, le garde après rechargement et l'affiche dans « Vos favoris »", () => {
    cy.visitPage("/");
    cy.get("button[aria-label='Ajouter Appartement cosy aux favoris']:visible").click();

    // On quitte le site et on revient : le favori est toujours là
    cy.reload();
    cy.get("button[aria-label='Retirer Appartement cosy des favoris']:visible").should("exist");

    cy.visitPage("/favoris");
    cy.get("main article").should("have.length", 1).and("contain.text", "Appartement cosy");
  });
});
