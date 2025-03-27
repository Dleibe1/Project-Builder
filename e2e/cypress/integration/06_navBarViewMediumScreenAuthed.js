/// <reference types="Cypress" />

describe("As an authenticated user viewing the navigation bar on a medium sized screen", () => {
  before(() => {
    cy.seedExampleUser()
    cy.loginExampleUser()
    cy.viewport(1150, 900)
    cy.visit("/?page=1")
  })

  const authedOnlyOptions = ["my builds", "create build", "sign out"]
  const unauthedOnlyOptions = ["sign up", "sign in", "login with github"]
  const commonOptions = ["about", "how to use"]

  it("Navigation options for authenticated users are visible in the nav bar", () => {
    authedOnlyOptions.forEach((option) => {
      cy.contains(option, { matchCase: false }).should("be.visible")
    })
  })

  it("Navigation options for unauthenticated users do not exist in the nav bar", () => {
    unauthedOnlyOptions.forEach((option) => {
      cy.contains(option, { matchCase: false }).should("not.exist")
    })
  })

  it("Common navigation options are not visible", () => {
    commonOptions.forEach((option) => {
      cy.contains(option, { matchCase: false }).should("not.be.visible")
    })
  })

  it("Common navigation options are visible in the burger menu", () => {
    cy.getByData("burger-menu-button-authed").should("be.visible").click()
    cy.getByData("burger-menu-items-authed").as("burger-menu-items")
    commonOptions.forEach((option) => {
      cy.get("@burger-menu-items").contains(option, { matchCase: false }).should("be.visible")
    })
  })

  after(() => {
    cy.task("db:truncate", "User")
    cy.logoutUser()
  })
})
