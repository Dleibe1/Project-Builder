/// <reference types="Cypress" />

describe("As an unauthenticated user viewing the navigation bar on a small screen", () => {
  before(() => {
    cy.request("DELETE", "/api/v1/user-sessions")
  })
  beforeEach(() => {
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["my builds", "create build", "sign out"]
  const allUnauthedItems = ["about", "how to use", "sign up", "sign in", "login with github"]
  it("Navigation items for unauthenticated users are hidden in the nav bar", () => {
    allUnauthedItems.forEach((unauthedItem) => {
      cy.contains(unauthedItem, { matchCase: false }).should("not.be.visible")
    })
  })
  it("All navigation items for unauthenticated users are visible in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-unauthed"]').click()
    cy.get('[data-cy="burger-menu-items-unauthed"]').as("burger-menu-items")
    allUnauthedItems.forEach((unauthedItem) => {
      cy.get("@burger-menu-items").contains(unauthedItem, { matchCase: false }).should("be.visible")
    })
  })
  it("Items for authenticated users do not exist in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-unauthed"]').click()
    cy.get('[data-cy="burger-menu-items-unauthed"]').as("burger-menu-items")
    authedOnlyItems.forEach((authedItem) => {
      cy.get("@burger-menu-items").contains(authedItem, { matchCase: false }).should("not.exist")
    })
  })
})
