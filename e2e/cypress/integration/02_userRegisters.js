/// <reference types="Cypress" />

describe("As a user visiting the registration page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/users/new")
  }

  before(() => {
    cy.task("db:truncate", "User")
  })

  it("If I provide a valid email, username, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage()
    cy.get("[data-cy='registration-form']").within(() => {
      cy.get('[data-cy="registration-form__email-input"]').type("user@example.com")
      cy.get('[data-cy="registration-form__username-input"]').type("Dan")
      cy.get('[data-cy="registration-form__password-input"]').type("password")
      cy.get('[data-cy="registration-form__password-confirmation-input"]').type("password")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })
    cy.contains("Sign Out")
  })

  it("If I provide an invalid email I will be notified", () => {
    visitRegistrationPage()
    cy.get("[data-cy='registration-form']").within(() => {
      cy.get('[data-cy="registration-form__email-input"]').type("noAtSymbol")
      cy.get('[data-cy="registration-form__username-input"]').type("Mark")
      cy.get('[data-cy="registration-form__password-input"]').type("password")
      cy.get('[data-cy="registration-form__password-confirmation-input"]').type("password")
      cy.root().submit()
      cy.contains("is invalid")
    })
  })

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage()
    cy.get("[data-cy='registration-form']").within(() => {
      cy.get('[data-cy="registration-form__email-input"]').type("user@example.com")
      cy.get('[data-cy="registration-form__username-input"]').type("Dan")
      cy.get('[data-cy="registration-form__password-input"]').type("password")
      cy.get('[data-cy="registration-form__password-confirmation-input"]').type("passwordNotAMatch")
      cy.root().submit()
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`)
    })
  })

  it("I will see an error message when no email is provided", () => {
    visitRegistrationPage()
    cy.get("[data-cy='registration-form']").within(() => {
      cy.get('[data-cy="registration-form__username-input"]').type("Dan")
      cy.get('[data-cy="registration-form__password-input"]').type("password")
      cy.get('[data-cy="registration-form__password-confirmation-input"]').type("password")
      cy.root().submit()
      cy.contains("is invalid")
    })
  })
  it("I will see an error message when no Username is provided", () => {
    visitRegistrationPage()
    cy.get("[data-cy='registration-form']").within(() => {
      cy.get('[data-cy="registration-form__email-input"]').type("user@example.com")
      cy.get('[data-cy="registration-form__password-input"]').type("password")
      cy.get('[data-cy="registration-form__password-confirmation-input"]').type("password")
      cy.root().submit()
      cy.contains("is required")
    })
  })
})
