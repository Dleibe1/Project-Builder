/// <reference types="Cypress" />

const getIframeDocument = () => {
  return (
    cy
      .get("iframe")
      // Cypress yields jQuery element, which has the real
      // DOM element under property "0".
      // From the real DOM iframe element we can get
      // the "document" element, it is stored in "contentDocument" property
      // Cypress "its" command can access deep properties using dot notation
      // https://on.cypress.io/its
      .its("0.contentDocument")
      .should("exist")
  )
}

const getIframeBody = () => {
  // get the document
  return (
    getIframeDocument()
      // automatically retries until body is loaded
      .its("body")
      .should("not.be.undefined")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      .then(cy.wrap)
  )
}

describe("As a logged in user visiting the Create Build Page", () => {
  before(() => {
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
        cy.getByData("add-or-edit-instructions-button").click()
      })
    cy.getByData("tinymce-container").should("exist")
  })
  describe("I can add Instructions", () => {
    it("can add content to the editor", () => {
      cy.wait(100)
      getIframeBody()
        .invoke("html", "<p>Hello, this is test content!</p>")
        .then(() => {
          getIframeBody().invoke("text").should("contain", "Hello, this is test content!")
        })
    })
  })
})
