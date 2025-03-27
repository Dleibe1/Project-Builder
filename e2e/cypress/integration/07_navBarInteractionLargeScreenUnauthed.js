/// <reference types="Cypress" />

describe("As an unauthenticated user interacting with the navigation bar on a large screen", () => {
  before(() => {
    cy.logoutUser()
  })
  beforeEach(() => {
    cy.viewport(1400, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyOptions = ["my builds", "create build", "sign out"]
  const unauthedOnlyOptions = ["sign up", "sign in", "login with github"]
  const allUsersOptions = ["about", "how to use"]
  describe("Viewing the navigation bar", () => {
    it("I can only see options for unauthenticated users common options", () => {
      unauthedOnlyOptions.concat(allUsersOptions).forEach((option) => {
        cy.contains(option, { matchCase: false }).should("be.visible")
      })
    })
    it("Navigation options for authenticated users do not exist", () => {
      authedOnlyOptions.forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.exist")
      })
    })
    it("The burger menu for unauthed users is not visible", () => {
      cy.get('[data-cy="burger-menu-button-unauthed"]').should("not.be.visible")
    })
    it("The burger menu for authed users does not exist", () => {
      cy.get('[data-cy="burger-menu-button-authed"]').should("not.exist")
    })
  })
  describe("Clicking buttons on the navigation bar", () => {
    it("I can navigate to the 'How to use' page", () => {
      cy.contains("how to use", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
    })
    it("I can navigate to the homepage", () => {
      cy.contains("home", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })
    it("I can navigate to the 'about' page", () => {
      cy.contains("about", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/about`)
    })
    it("I can navigate to the 'sign up' page", () => {
      cy.contains("sign up", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })
    it("I can navigate to the 'sign in' page", () => {
      cy.contains("sign in", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })
  })
  it("the 'login with github' button is a link to the server's github API endpoint'", () => {
    cy.get('[data-cy="burger-menu-items-unauthed"]')
      .contains("login with github", { matchCase: false })
      .should("have.attr", "href", "/api/v1/github-user-sessions/login")
  })
})
