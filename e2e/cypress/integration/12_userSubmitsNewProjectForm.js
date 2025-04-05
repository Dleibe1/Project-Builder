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
