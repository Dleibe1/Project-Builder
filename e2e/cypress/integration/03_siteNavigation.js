/// <reference types="Cypress" />

describe("As a user visiting the website's baseUrl", () => {
  beforeEach(() => {
    cy.visit("/?page=1")
  })

  it("Clicks 'HOW TO USE' (whether it's visible or in the burger menu)", () => {
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

  // it("How to use site has the creator's LinkedIn", () => {
  //   cy.get("#how-to-use-button").click()
  //   cy.contains("LinkedIn").should("have.attr", "href").and("include", "linkedin.com")
  // })
})
