/// <reference types="Cypress" />
import "cypress-file-upload"
import truncateAllTables from "../support/truncateAllTables"

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

describe("When I submit a new project form", () => {
  it("I am using Chrome browser because Electron browser will fail testing the TinyMCE instructions sub form component", () => {
    expect(Cypress.isBrowser("chrome")).to.be.true
  })
  it("If I am missing any required information when the form is submitted, errors are displayed", () => {
    cy.getByData("new-project-form").submit()
    cy.getByData("error-list")
      .children()
      .should("contain", "Title must have required property 'title'")
      .and("contain", "Description must have required property 'description'")
      .and("contain", "Thumbnail Image must have required property 'thumbnailImage'")
      .and("contain", "Instructions must have required property 'instructions'")
  })
  it("If I enter all required information I can submit the form", () => {
    cy.getByData("new-project-title-input").type("My Awesome Project")
    cy.getByData("new-project-description-input").type("The following is an awesome project")
    cy.fixture("/images/thumbnail1.jpg").then((fileContent) => {
      return cy.getByData("thumbnail-upload-input").attachFile({
        fileContent,
        fileName: "thumbnail1.jpg",
        mimeType: "image/png",
      })
    })
  })
  cy.get('[data-mce-name="h2-button"]').click()
  getIframeBody().type("Hello")
  cy.get('[data-mce-name="close-editor"]').click()
  cy.getByData("new-project-form").submit()
})
