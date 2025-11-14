Cypress.Commands.add("createBug", (title, description, priority = "Low") => {
  cy.get("[data-testid='create-bug-btn']").click();
  cy.get("[data-testid='bug-title-input']").type(title);
  cy.get("[data-testid='bug-description-input']").type(description);
  cy.get("[data-testid='bug-priority-select']").select(priority);
  cy.get("[data-testid='submit-bug-btn']").click();
});
