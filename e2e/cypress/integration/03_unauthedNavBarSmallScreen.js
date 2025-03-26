/// <reference types="Cypress" />
describe("As an unauthenticated user interacting with the navigation bar on a small screen", () => {
  const clickUnauthedBurgerMenuItem = (item) => {
    cy.get('[data-cy="burger-menu-button-unauthed"]').click()
    return cy
      .get('[data-cy="burger-menu-items-unauthed"]')
      .contains(item, { matchCase: false })
      .click()
  }
  before(() => {
    cy.request("DELETE", "/api/v1/user-sessions")
  })
  beforeEach(() => {
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["sign out", "my builds", "create build"]
  const allUnauthedItems = ["about", "how to use", "sign up", "sign in", "login with github"]
  describe("When I use the burger menu", () => {
    it("I can only see items for unauthenticated users", () => {
      cy.get('[data-cy="burger-menu-button-unauthed"]').click()
      authedOnlyItems.forEach((authedItem) => {
        cy.get('[data-cy="burger-menu-items-unauthed"]')
          .contains(authedItem, { matchCase: false })
          .should("not.exist")
      })
      allUnauthedItems.forEach((unauthedItem) => {
        cy.get('[data-cy="burger-menu-items-unauthed"]')
          .contains(unauthedItem, { matchCase: false })
          .should("be.visible")
      })
    })
    it("I can navigate to the sign in page", () => {
      clickUnauthedBurgerMenuItem("sign in")
      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })
    it("I can navigate to the registration form", () => {
      clickUnauthedBurgerMenuItem("sign up")
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })
    it("I can navigate to the 'How To Use page'", () => {
      clickUnauthedBurgerMenuItem("how to use")
      cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
    })
    it("the 'login with github' burger menu item is a link to the server's github API endpoint'", () => {
      cy.get('[data-cy="burger-menu-button-unauthed"]').click()
      cy.get('[data-cy="burger-menu-items-unauthed"]')
        .contains("login with github", { matchCase: false })
        .should("have.attr", "href", "/api/v1/github-user-sessions/login")
    })
  })
  describe("When I view the navigation bar", () => {
    it("I can only see the 'home' button, search bar, and burger menu", () => {
      cy.contains("home", { matchCase: false }).should("be.visible")
      cy.get('[data-cy="search-bar"]').should("be.visible")
      cy.get('[data-cy="burger-menu-button-unauthed"]').should("be.visible")
    })
    it("Options for unauthed users are not visible", () => {
      allUnauthedItems.forEach((unauthedItem) => {
        cy.contains(unauthedItem, { matchCase: false }).should("not.be.visible")
      })
    })
    it("Options for authed users do not exist", () => {
      authedOnlyItems.forEach((authedOnlyItem) => {
        cy.contains(authedOnlyItem, { matchCase: false }).should("not.exist")
      })
    })
  })
})
