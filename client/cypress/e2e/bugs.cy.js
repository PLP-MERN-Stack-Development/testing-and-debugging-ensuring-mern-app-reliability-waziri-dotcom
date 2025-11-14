/// <reference types="cypress" />

describe("JOWI Bug Tracker - Bug CRUD Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Loads the homepage successfully", () => {
    cy.contains("JOWI Bug Tracker").should("be.visible");
    cy.get("[data-testid='create-bug-btn']").should("be.visible");
  });

  it("Creates a new bug successfully", () => {
    cy.get("[data-testid='create-bug-btn']").click();

    cy.get("[data-testid='bug-title-input']").type("Login page not loading");
    cy.get("[data-testid='bug-description-input']").type("The login page freezes on submit.");

    cy.get("[data-testid='bug-priority-select']").select("High");
    cy.get("[data-testid='submit-bug-btn']").click();

    cy.contains("Bug created successfully").should("be.visible");
    cy.contains("Login page not loading").should("be.visible");
  });

  it("Updates an existing bug status", () => {
    cy.contains("Login page not loading")
      .parents("[data-testid='bug-card']")
      .within(() => {
        cy.get("[data-testid='status-select']").select("resolved");
      });

    cy.contains("Bug updated successfully").should("be.visible");

    cy.contains("Login page not loading")
      .parents("[data-testid='bug-card']")
      .within(() => {
        cy.contains("resolved").should("be.visible");
      });
  });

  it("Deletes a bug successfully", () => {
    cy.contains("Login page not loading")
      .parents("[data-testid='bug-card']")
      .within(() => {
        cy.get("[data-testid='delete-btn']").click();
      });

    cy.contains("Bug deleted successfully").should("be.visible");
    cy.contains("Login page not loading").should("not.exist");
  });
});
