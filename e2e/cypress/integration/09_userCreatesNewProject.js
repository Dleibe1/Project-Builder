/// <reference types="Cypress" />

describe("As a logged in user visiting the Create Build Page", () => {
  before(() => {
    cy.seedExampleUser()
      .then(() => {
        cy.loginExampleUser()
      })
      .then(() => {
        cy.userIsLoggedIn().should("eq", true)
      })
      .then(() => {
        cy.visit("/create-new-build")
      })
  })
  it("Has the proper heading", () => {
    cy.getByData("new-project-form").get("h1").should("have.text", "New Project")
  })
  describe("I can type into all of the text fields and see the text", () => {})

  after(() => {
    after(() => {
      cy.task("db:truncate", "User")
      cy.logoutUser()
    })
  })
})
