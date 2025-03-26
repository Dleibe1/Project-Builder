/// <reference types="Cypress" />
describe("As an unauthenticated user viewing the navigation bar on a small screen", () => {
  before(() => {
    cy.request("DELETE", "/api/v1/user-sessions")
  })
  beforeEach(() => {
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["sign out", "my builds", "create build"]
  const allUnauthedItems = ["about", "how to use", "sign up", "sign in", "login with github"]
  it("Navigation items for unauthenticated users are hidden in the nav bar", () => {
    allUnauthedItems.forEach((unauthedItem) => {
      cy.contains(unauthedItem, { matchCase: false }).should("not.be.visible")
    })
  })
  it("All navigation items for unauthenticated users are visible in the burger menu", () => {
    cy.openUnauthedBurgerMenu().as("burger-menu-items")
    allUnauthedItems.forEach((unauthedItem) => {
      cy.get("@burger-menu-items").contains(unauthedItem, { matchCase: false }).should("be.visible")
    })
  })
  it("Items for authenticated users do not exist in the burger menu", () => {
    cy.openUnauthedBurgerMenu().as("burger-menu-items")
    authedOnlyItems.forEach((authedItem) => {
      cy.get("@burger-menu-items").contains(authedItem, { matchCase: false }).should("not.exist")
    })
  })
  it("I can navigate to the sign in page from the burger menu", () => {
    cy.openUnauthedBurgerMenu().as("burger-menu-items")
    cy.get("@burger-menu-items").contains("sign in", { matchCase: false }).click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
  })
  it("I can navigate to the registration form from the burger menu", () => {
    cy.openUnauthedBurgerMenu().as("burger-menu-items")
    cy.get("@burger-menu-items").contains("sign up", { matchCase: false }).click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
  })
  it("I can navigate to the 'How To Use page' from the burger menu", () => {
    cy.openUnauthedBurgerMenu().as("burger-menu-items")
    cy.get("@burger-menu-items").contains("how to use", { matchCase: false }).click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
  })
  //TODO github login test
})
