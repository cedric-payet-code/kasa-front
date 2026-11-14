import { defineConfig } from "cypress";

/**
 * Configuration des tests end-to-end (Cypress).
 * Les tests visitent le site lancé sur http://localhost:3001 :
 * démarrer le front-end (et l'API, ou USE_MOCK_DATA=true) avant de les lancer.
 */
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    // Les pages Next.js peuvent mettre un peu de temps à se compiler en mode dev.
    defaultCommandTimeout: 8000,
  },
});
