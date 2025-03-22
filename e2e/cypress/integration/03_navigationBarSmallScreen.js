/// <reference types="Cypress" />

describe("As a logged out user viewing the page on a small screen", () => {
  beforeEach(() => {
    cy.visit("/?page=1")
  })
  cy.viewport(600, 900)
  it("Clicks the burger menu and sees navigation options", () => {
    cy.visit("/?page=1")
    cy.get("body").then(($body) => {
      if ($body.find("#how-to-use-button:visible").length > 0) {
        cy.get("#how-to-use-button").click()
      } else {
        // open the burger menu and click the 'How to use' item within it
        cy.get("#burger-menu").click()
        cy.get("#menu-appbar").contains("How to use").click()
      }
    })
    cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
    it("Has a working link to the developer's LinkedIn", () => {
      cy.get("#developer-linkedin").click()
      cy.url().should(incl, `${Cypress.config().baseUrl}/how-to-use`)
    })
  })

  it("Clicking 'HOME' brings the user to the projects-list page", () => {
    cy.get("#homepage-button").click()
    cy.url().should("include", "linkedin.com")
  })


})
