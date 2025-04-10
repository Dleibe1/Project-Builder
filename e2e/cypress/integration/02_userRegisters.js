/// <reference types="Cypress" />

describe("As a user visiting the registration page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/users/new")
  }

  before(() => {
    cy.task("db:truncate", "User")
    cy.logoutUser()
  })

  it("If I provide a valid email, username, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage()
    cy.getByData("registration-form").within(() => {
      cy.getByData("registration-form__email-input").type("user@example.com")
      cy.getByData("registration-form__username-input").type("Dan")
      cy.getByData("registration-form__password-input").type("password")
      cy.getByData("registration-form__password-confirmation-input").type("password")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })
    cy.contains("Sign Out")
  })

  it("If I provide an invalid email I will be notified", () => {
    visitRegistrationPage()
    cy.getByData("registration-form").within(() => {
      cy.getByData("registration-form__email-input").type("noAtSymbol")
      cy.getByData("registration-form__username-input").type("Mark")
      cy.getByData("registration-form__password-input").type("password")
      cy.getByData("registration-form__password-confirmation-input").type("password")
      cy.root().submit()
      cy.contains("is invalid")
    })
  })

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage()
    cy.getByData("registration-form").within(() => {
      cy.getByData("registration-form__email-input").type("user@example.com")
      cy.getByData("registration-form__username-input").type("Dave")
      cy.getByData("registration-form__password-input").type("password")
      cy.getByData("registration-form__password-confirmation-input").type("passwordNotAMatch")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })
  })

  it("I will see an error message when no email is provided", () => {
    visitRegistrationPage()
    cy.getByData("registration-form").within(() => {
      cy.getByData("registration-form__username-input").type("Matt")
      cy.getByData("registration-form__password-input").type("password")
      cy.getByData("registration-form__password-confirmation-input").type("password")
      cy.root().submit()
      cy.contains("is invalid")
    })
  })

  it("I will see an error message when no Username is provided", () => {
    visitRegistrationPage()
    cy.getByData("registration-form").within(() => {
      cy.getByData("registration-form__email-input").type("user@example.com")
      cy.getByData("registration-form__password-input").type("password")
      cy.getByData("registration-form__password-confirmation-input").type("password")
      cy.root().submit()
      cy.contains("is required")
    })
  })

  after(()=> {
    cy.task("db:truncate", "User")
    cy.intercept("DELETE", "/api/v1/user-sessions")
  })
})