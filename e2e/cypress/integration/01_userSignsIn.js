/// <reference types="Cypress" />

describe("As a user visiting the sign in page", () => {
  const visitSignInPage = () => {
    cy.visit("/user-sessions/new")
  }

  before(() => {
    cy.task("db:truncate", "User").then(() => {
      return cy.task("db:insert", {
        modelName: "User",
        json: {
          email: "user@example.com",
          password: "password",
          userName: "Dan",
          loginMethod: "standard",
        },
      })
    })
  })

  it("If I provide a valid email and password, I will be signed in", () => {
    visitSignInPage()
    cy.getByData("sign-in-form").within(() => {
      cy.getByData("sign-in-form__email-input").type("user@example.com")
      cy.getByData("sign-in-form__password-input").type("password")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })
    cy.contains("Sign Out")
  })

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitSignInPage()
    cy.getByData("sign-in-form").within(() => {
      cy.getByData("sign-in-form__email-input").type("invalidEmail@google.com")
      cy.getByData("sign-in-form__password-input").type("password")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/user-sessions/new`)
    })
  })

  it("I will see an error message when no email is provided", () => {
    visitSignInPage()
    cy.getByData("sign-in-form").within(() => {
      cy.getByData("sign-in-form__password-input").type("password")
      cy.root().submit()
      cy.contains("is required")
    })
  })

  after(() => {
    cy.task("db:truncate", "User")
    cy.request("DELETE", "/api/v1/user-sessions")
  })
})
