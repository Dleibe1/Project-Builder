/// <reference types="Cypress" />

import seedAllTables from "../support/seedAllTables.js"
import truncateAllTables from "../support/truncateAllTables.js"

describe("As a user visiting the sign in page", () => {
  const visitSignInPage = () => {
    cy.visit("/user-sessions/new")
  }

  before(() => {
    seedAllTables()
    cy.task("db:insert", {
      modelName: "User",
      json: {
        email: "user@example.com",
        password: "password",
        userName: "Dan",
        loginMethod: "standard",
      },
    })
  })

  it("If I provide a valid email and password, I will be signed in", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com")

      cy.findByLabelText("Password").type("password")

      cy.root().submit()

      cy.url().should("eq", `${Cypress.config().baseUrl}/project-list`)
    })
    cy.contains("Sign Out")
  })

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("just@a.joke")
      cy.findByLabelText("Password").type("password")
      cy.root().submit()

      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })
  })

  it("I will see an error message when no email is provided", () => {
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Password").type("password")
      cy.root().submit()

      cy.contains("is invalid")
    })
  })

  after(() => {
    truncateAllTables()
  })
})
