/// <reference types="Cypress" />

describe("As an unauthenticated user viewing the navigation bar on a medium sized screen", () => {
  before(() => {
    cy.logoutUser()
  })
  beforeEach(() => {
    cy.viewport(1150, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["my builds", "create build", "sign out"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  const allUsersItems = ["about", "how to use"]
  it("Only navigation items for unauthenticated users are visible", () => {
    unauthedOnlyItems.forEach((item) => {
      cy.contains(item, { matchCase: false }).should("be.visible")
    })
  })
  it("Navigation items for authenticated users do not exist", () => {
    authedOnlyItems.forEach((item) => {
      cy.contains(item, { matchCase: false }).should("not.exist")
    })
  })
  it("Common navigation items are hidden", () => {
    allUsersItems.forEach((item) => {
      cy.contains(item, { matchCase: false }).should("not.be.visible")
    })
  })
  it("The common navigation items are visible in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-unauthed"]').click()
    cy.get('[data-cy="burger-menu-items-unauthed"]').as("burger-menu-items")
    allUsersItems.forEach((item) => {
      cy.get("@burger-menu-items").contains(item, { matchCase: false }).should("be.visible")
    })
  })
})
