import truncateAllTables from "../support/truncateAllTables"
/// <reference types="Cypress" />

const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}
before(() => {
  truncateAllTables()
  cy.fixture("exampleUser")
    .then((userData) => {
      return cy
        .intercept("GET", "/api/v1/user-sessions/current", {
          statusCode: 200,
          body: userData,
        })
        .as("currentUser")
    })
    .then(() => {
      cy.visit("/create-new-build")
    })
})

describe("I can use the TinyMCE instructions editor", () => {
  //TinyMCE tests will fail if you are testing with the Electron browser
  if (Cypress.isBrowser("chrome")) {
    it("I can navigate to the editor", () => {
      cy.getByData("add-or-edit-instructions-button").click()
      cy.getByData("tinymce-container").should("exist")
    })
    it("I can add content to the editor", () => {
      cy.get('[data-mce-name="h2-button"]').click()
      getIframeBody().type("Heading")
      getIframeBody().contains("h2", "Heading")
    })
    it("When I close the editor, I return to the create build form and the text has been added", () => {
      cy.get('[data-mce-name="close-editor"]').click()
      cy.getByData("instructions-text").contains("Heading")
    })
  } else {
    it("Logs an error if you're not using chrome browser", () => {
      cy.log("You may only use chrome browser for this test")
    })
  }
})
