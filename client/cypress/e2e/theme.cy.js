/// <reference types="cypress" />

describe("Theme Toggle - JOWI Bug Tracker", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Toggles from light to dark mode", () => {
    cy.get("html").should("have.attr", "data-theme", "light");

    cy.get("[data-testid='theme-toggle']").click();

    cy.get("html").should("have.attr", "data-theme", "dark");
  });

  it("Persists theme on refresh", () => {
    cy.get("[data-testid='theme-toggle']").click();

    cy.reload();

    cy.get("html").should("have.attr", "data-theme", "dark");
  });
});
