/// <reference types="Cypress" />

describe("As an unauthenticated user viewing the navigation bar on a medium sized screen", () => {
  before(() => {
    cy.logoutUser()
  })
  beforeEach(() => {
    cy.viewport(1150, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyOptions = ["my builds", "create build", "sign out"]
  const unauthedOnlyOptions = ["sign up", "sign in", "login with github"]
  const commonOptions = ["about", "how to use"]
  describe("Viewing navigation options", () => {
    it("Only navigation options for unauthenticated users are visible", () => {
      unauthedOnlyOptions.forEach((option) => {
        cy.contains(option, { matchCase: false }).should("be.visible")
      })
    })
    it("Navigation options for authenticated users do not exist", () => {
      authedOnlyOptions.forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.exist")
      })
    })
    it("Common navigation options are hidden", () => {
      commonOptions.forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.be.visible")
      })
    })
    it("All common navigation options are visible in the burger menu", () => {
      cy.getByData("burger-menu-button-unauthed").click()
      cy.getByData("burger-menu-items-unauthed").as("burger-menu-items")
      commonOptions.forEach((option) => {
        cy.get("@burger-menu-items").contains(option, { matchCase: false }).should("be.visible")
      })
    })
  })
  describe("Using the navigation bar", () => {
    it("I can navigate to the homepage", () => {
      cy.contains("home", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })
    it("I can navigate to the 'sign in' page", () => {
      cy.contains("sign in", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })
    it("I can navigate to the 'sign up' page", () => {
      cy.contains("sign up", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })
  })
  it("the 'login with github' button on the nav bar is a link to the server's github API endpoint'", () => {
    cy.contains("login with github", { matchCase: false }).should(
      "have.attr",
      "href",
      "/api/v1/github-user-sessions/login",
    )
  })
})
