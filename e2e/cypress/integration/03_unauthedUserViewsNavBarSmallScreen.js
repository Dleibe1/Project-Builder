/// <reference types="Cypress" />

describe("As an unauthenticated user interacting with the navigation bar", () => {
  beforeEach(() => {
    cy.intercept("DELETE", "/api/v1/user-sessions")
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  it("Navigation options for unauthenticated users are hidden on a small screen", () => {
    cy.contains("about", { matchCase: false }).should("not.be.visible")
    cy.contains("How to use", { matchCase: false }).should("not.be.visible")
    cy.contains("sign up", { matchCase: false }).should("not.be.visible")
    cy.contains("sign in", { matchCase: false }).should("not.be.visible")
    cy.contains("login with github", { matchCase: false }).should("not.be.visible")
  })
  it("All navigation items for unauthenticated users are visible in the burger menu", () => {
    cy.get('[data-cy="nav-bar-burger-menu-unauthed"]').click()
    cy.get("#menu-appbar").as("burger-menu-items")
    cy.get("@burger-menu-items").contains("about", { matchCase: false }).should("be.visible")
    cy.get("@burger-menu-items").contains("how to use", { matchCase: false }).should("be.visible")
    cy.get("@burger-menu-items").contains("sign in", { matchCase: false }).should("be.visible")
    cy.get("@burger-menu-items").contains("sign up", { matchCase: false }).should("be.visible")
    cy.get("@burger-menu-items")
      .contains("login with github", { matchCase: false })
      .should("be.visible")
  })
  it("Items for authenticated users do not exist in the burger menu", () => {
    cy.get('[data-cy="nav-bar-burger-menu-unauthed"]').click()
    cy.get("#menu-appbar").as("burger-menu-items")
    cy.get("@burger-menu-items").contains("my builds", { matchCase: false }).should("not.exist")
    cy.get("@burger-menu-items").contains("create build", { matchCase: false }).should("not.exist")
    cy.get("@burger-menu-items").contains("sign out", { matchCase: false }).should("not.exist")
  })
})