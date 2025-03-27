/// <reference types="Cypress" />

describe("As an unauthenticated user interacting with the navigation bar on a small screen", () => {
  const clickUnauthedBurgerMenuOption = (option) => {
    cy.getByData("burger-menu-button-unauthed").click()
    return cy
      .getByData("burger-menu-items-unauthed")
      .contains(option, { matchCase: false })
      .click()
  }

  before(() => {
    cy.logoutUser()
  })

  beforeEach(() => {
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })

  const authedOnlyOptions = ["sign out", "my builds", "create build"]
  const unauthedOnlyOptions = ["sign up", "sign in", "login with github"]
  const commonOptions = ["about", "how to use"]

  describe("When I view the burger menu", () => {
    it("Options for authenticated users and common options are visible. Options for unauthenticated users do not exist", () => {
      cy.getByData("burger-menu-button-unauthed").click()
      unauthedOnlyOptions.concat(commonOptions).forEach((option) => {
        cy.getByData("burger-menu-items-unauthed")
          .contains(option, { matchCase: false })
          .should("be.visible")
      })
      authedOnlyOptions.forEach((authedOption) => {
        cy.getByData("burger-menu-items-unauthed")
          .contains(authedOption, { matchCase: false })
          .should("not.exist")
      })
    })
  })

  describe("Clicking buttons in the burger menu", () => {
    it("I can navigate to the sign in page", () => {
      clickUnauthedBurgerMenuOption("sign in")
      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })

    it("I can navigate to the registration form", () => {
      clickUnauthedBurgerMenuOption("sign up")
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })

    it("I can navigate to the 'How To Use page'", () => {
      clickUnauthedBurgerMenuOption("how to use")
      cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
    })

    it("The 'login with github' burger menu option is a link to the server's GitHub API endpoint", () => {
      cy.getByData("burger-menu-button-unauthed").click()
      cy.getByData("burger-menu-items-unauthed")
        .contains("login with github", { matchCase: false })
        .should("have.attr", "href", "/api/v1/github-user-sessions/login")
    })
  })

  describe("When I view the navigation bar", () => {
    it("I can only see the 'home' button, search bar, and burger menu", () => {
      cy.contains("home", { matchCase: false }).should("be.visible")
      cy.getByData("search-bar").should("be.visible")
      cy.getByData("burger-menu-button-unauthed").should("be.visible")
    })

    it("Options for unauthenticated users and common options are not visible", () => {
      unauthedOnlyOptions.concat(commonOptions).forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.be.visible")
      })
    })

    it("Options for authenticated users do not exist", () => {
      authedOnlyOptions.forEach((authedOnlyOption) => {
        cy.contains(authedOnlyOption, { matchCase: false }).should("not.exist")
      })
    })
  })
})