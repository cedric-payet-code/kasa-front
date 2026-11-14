/**
 * Fichier chargé avant chaque test Cypress : configuration et commandes communes.
 */

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Ouvre une page et attend que React l'ait rendue interactive (hydratation),
       * pour ne pas cliquer sur un bouton qui ne réagit pas encore.
       *
       * @param url - Adresse de la page.
       * @param options - Options de `cy.visit` (ex. `failOnStatusCode: false` pour une 404).
       */
      visitPage(url: string, options?: Partial<Cypress.VisitOptions>): Chainable<void>;
    }
  }
}

Cypress.Commands.add("visitPage", (url: string, options?: Partial<Cypress.VisitOptions>) => {
  cy.visit(url, options);
  cy.get("html[data-hydrated='true']");
  // Les pages envoyées en streaming affichent d'abord un skeleton : on attend la fin du chargement.
  cy.get("[role='status']").should("not.exist");
});
