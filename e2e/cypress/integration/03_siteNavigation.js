/// <reference types="Cypress" />

describe("As a user visiting the website's baseUrl", () => {
  it("Has a link to the creator's LinkedIn profile", () => {
    cy.visit("/")
    cy.contains("LinkedIn").should("have.attr", "href").and("include", "linkedin.com")
  })

  it("Clicking 'Click here to continue to the site' brings the user to /project-list", () => {
    cy.get(".main-link").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/project-list`)
  })

  it("Clicking 'HOW TO USE' on the top bar brings the user back to the welcome page", () => {
    cy.get("#how-to-use-button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/`)
  })

  it("Clicking 'HOME' on the top bar brings the user to the list of projects", () => {
    cy.get("#homepage-button").click()
    cy.url().should("eq", `${Cypress.config().baseUrl}/project-list`)
  })
})
