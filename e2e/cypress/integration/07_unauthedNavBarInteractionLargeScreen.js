/// <reference types="Cypress" />

describe("As an unauthenticated user interacting with the navigation bar on a large screen", () => {
  before(() => {
    cy.logoutUser()
  })
  beforeEach(() => {
    cy.viewport(1400, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["my builds", "create build", "sign out"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  const allUsersItems = ["about", "how to use"]
  describe("Viewing the navigation bar", () => {
    it("I can only see items for unauthenticated users common items", () => {
      unauthedOnlyItems.concat(allUsersItems).forEach((item) => {
        cy.contains(item, { matchCase: false }).should("be.visible")
      })
    })
    it("Navigation items for authenticated users do not exist", () => {
      authedOnlyItems.forEach((authedItem) => {
        cy.contains(authedItem, { matchCase: false }).should("not.exist")
      })
    })
    it("The burger menu is not visible", () => {
      cy.get("#burger-menu").should("not.be.visible")
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
