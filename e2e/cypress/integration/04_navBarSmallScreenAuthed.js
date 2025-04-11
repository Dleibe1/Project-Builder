/// <reference types="Cypress" />

describe("As an authenticated user interacting with the navigation bar on a small screen", () => {
  const clickAuthedBurgerMenuOption = (option) => {
    cy.getByData("burger-menu-button-authed").click()
    return cy.getByData("burger-menu-items-authed").contains(option, { matchCase: false }).click()
  }

  before(() => {
    cy.task("db:truncate", "User").then(() => {
      cy.fixture("user1").then((userData) => {
        return cy.task("db:insert", {
          modelName: "User",
          json: userData,
        })
      })
    })
  })

  beforeEach(() => {
    cy.loginUser("user1")
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })

  const authedOnlyOptions = ["my builds", "create build", "sign out"]
  const unauthedOnlyOptions = ["sign up", "sign in", "login with github"]
  const commonOptions = ["about", "how to use"]

  describe("When I view the options in the burger menu", () => {
    it("I can only see options for authenticated users and common options", () => {
      cy.getByData("burger-menu-button-authed").click()
      authedOnlyOptions.concat(commonOptions).forEach((option) => {
        cy.getByData("burger-menu-items-authed")
          .contains(option, { matchCase: false })
          .should("be.visible")
      })
      unauthedOnlyOptions.forEach((option) => {
        cy.getByData("burger-menu-items-authed")
          .contains(option, { matchCase: false })
          .should("not.exist")
      })
    })
  })

  describe("When I click the buttons in the burger menu", () => {
    it("I can navigate to the 'my builds' page", () => {
      clickAuthedBurgerMenuOption("my builds")
      cy.url().should("eq", `${Cypress.config().baseUrl}/my-builds-list?page=1`)
    })

    it("I can navigate to the 'create build' page", () => {
      clickAuthedBurgerMenuOption("create build")
      cy.url().should("eq", `${Cypress.config().baseUrl}/create-new-build`)
    })

    it("I am signed out when I click 'sign out'", () => {
      clickAuthedBurgerMenuOption("sign out")
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
      cy.userIsLoggedIn().should("equal", false)
    })
  })

  describe("When I view the navigation bar", () => {
    it("I see the 'home' button, search bar, and burger menu", () => {
      cy.contains("home", { matchCase: false }).should("be.visible")
      cy.getByData("search-bar").should("be.visible")
      cy.getByData("burger-menu-button-authed").should("be.visible")
    })

    it("I only see options for authenticated users and common options", () => {
      authedOnlyOptions.concat(commonOptions).forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.be.visible")
      })
    })

    it("Options for unauthenticated users do not exist", () => {
      unauthedOnlyOptions.forEach((option) => {
        cy.contains(option, { matchCase: false }).should("not.exist")
      })
    })
  })

  after(() => {
    cy.task("db:truncate", "User")
    cy.logoutUser()
  })
})
