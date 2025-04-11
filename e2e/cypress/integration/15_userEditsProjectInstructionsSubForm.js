/// <reference types="Cypress" />
import seedOneProject from "../support/seedOneProject"
import truncateAllTables from "../support/truncateAllTables"

const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}

describe("I can use the TinyMCE editor to edit instructions", () => {
  before(() => {
    truncateAllTables()
      .then(() => {
        seedOneProject("user1")
      })
      .then(() => {
        cy.loginUser("user1")
      })
      .then(() => {
        cy.visit("/edit-my-build/1")
      })
  })
  it("I am using Chrome browser because Electron 87 browser cannot interact with buttons in TinyMCE form", () => {
	expect(Cypress.isBrowser("chrome")).to.be.true
   })
  it("I can navigate to the editor", () => {
    cy.getByData("add-or-edit-instructions-button").click()
    cy.getByData("tinymce-container").should("exist")
  })
  it("I can see existing instructions from the project being edited", () => {
    getIframeBody().should("include.text", "how to interface the RGB led")
  })
  it("I can add instructions to the editor and that content is present when I return to the main form", () => {
    getIframeBody().type("Hello from cypress")
    getIframeBody().contains("Hello from cypress")
	cy.get('[data-mce-name="close-editor"]').click()
    cy.getByData("instructions-text").contains("Hello from cypress")
  })
})
