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
    cy.logoutUser()
  })
  beforeEach(() => {
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["sign out", "my builds", "create build"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  const allUsersItems = ["about", "how to use"]
  describe("When I view the burger menu", () => {
    it("Items for authenticated users and common items are visible. Items for unauthenticated users do not exist", () => {
      cy.get('[data-cy="burger-menu-button-unauthed"]').click()
      unauthedOnlyItems.concat(allUsersItems).forEach((item) => {
        cy.get('[data-cy="burger-menu-items-unauthed"]')
          .contains(item, { matchCase: false })
          .should("be.visible")
      })
      authedOnlyItems.forEach((authedItem) => {
        cy.get('[data-cy="burger-menu-items-unauthed"]')
          .contains(authedItem, { matchCase: false })
          .should("not.exist")
      })
    })
  })
  describe("When I interact with buttons in the burger menu", () => {
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
    it("Options for unauthed users common options are not visible", () => {
      unauthedOnlyItems.concat(allUsersItems).forEach((item) => {
        cy.contains(item, { matchCase: false }).should("not.be.visible")
      })
    })
    it("Options for authed users do not exist", () => {
      authedOnlyItems.forEach((authedOnlyItem) => {
        cy.contains(authedOnlyItem, { matchCase: false }).should("not.exist")
      })
    })
  })
})
