/// <reference types="Cypress" />

describe("As an unauthenticated user viewing the navigation bar on a large screen", () => {
  before(() => {
    cy.request("DELETE", "/api/v1/user-sessions")
  })
  beforeEach(() => {
    cy.viewport(1400, 900)
    cy.visit("/?page=1")
  })
  // const allUnauthedItems = ["about", "how to use", "sign up", "sign in", "login with github"]
  // it("All navigation items unauthenticated users are visible in the nav bar", () => {
  //   allUnauthedItems.forEach((unauthedItem) => {
  //     cy.contains(unauthedItem, { matchCase: false }).should("be.visible")
  //   })
  // })
  // it("Navigation items for authenticated users do not exist", () => {
  //   cy.contains("my builds", { matchCase: false }).should("not.exist")
  //   cy.contains("create build", { matchCase: false }).should("not.exist")
  //   cy.contains("sign out", { matchCase: false }).should("not.exist")
  // })
  // it("The burger menu is not visible", () => {
  //   cy.get("#burger-menu").should("not.be.visible")
  // })

  it("navigates to the GitHub login endpoint when clicking the GitHub login button", () => {
    cy.get("#github-login-button").click()
  })
})
