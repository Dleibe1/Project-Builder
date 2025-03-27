/// <reference types="Cypress" />

describe("As a logged in user posting a new project to the site", () => {
  before(() => {
	cy.seedExampleUser()
    cy.loginExampleUser()
	cy.visit("/create-new-build")
  })

  it("works",() => {
	
  })
})
