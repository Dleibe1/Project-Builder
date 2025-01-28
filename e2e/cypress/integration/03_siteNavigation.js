/// <reference types="Cypress" />

describe("As a user visiting the website's baseUrl", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Clicking 'HOW TO USE' on the top bar brings the user to instructions for the site", () => {
    cy.get("#how-to-use-button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
  })

  it("Clicking 'HOME' brings the user to the projects-list page", () => {
    cy.get("#projects-button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
  })

  it("How to use site has the creator's LinkedIn", () => {
    cy.get("#how-to-use-button").click()
    cy.contains("LinkedIn").should("have.attr", "href").and("include", "linkedin.com")
  })

  it("Clicking 'HOME' on the top bar brings the user to the landing page", () => {
    cy.get("#homepage-button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/`)
  })
})
