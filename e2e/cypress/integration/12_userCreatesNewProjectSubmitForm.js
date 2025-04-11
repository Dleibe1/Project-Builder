/// <reference types="Cypress" />
import "cypress-file-upload"
import truncateAllTables from "../support/truncateAllTables"

const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}

describe("When I submit a new project form", () => {
  beforeEach(() => {
    truncateAllTables()
    cy.seedUser("user1")
    cy.loginUser("user1")
      .then(() => {
        cy.visit("/create-new-build")
      })
  })
  it("I am using Chrome browser because Electron 87 browser cannot interact with TinyMCE form properly", () => {
    expect(Cypress.isBrowser("chrome")).to.be.true
  })
  it("If I enter all required information I can submit the form", () => {
    cy.getByData("add-or-edit-instructions-button").click()
    cy.get('[data-mce-name="h2-button"]').click()
    getIframeBody().type("Heading")
    getIframeBody().contains("h2", "Heading")
    getIframeBody().contains("Heading")
    cy.get('[data-mce-name="close-editor"]').click()
    cy.getByData("new-project-title-input").type("My Awesome Project")
    cy.fixture("/images/thumbnail1.jpg").then((fileContent) => {
      return cy.getByData("thumbnail-upload-input").attachFile({
        fileContent,
        fileName: "thumbnail1.jpg",
        mimeType: "image/png",
      })
    })
    cy.getByData("code-input").type("#include Arduino.h")
    cy.getByData("new-project-description-input").type("The following is an awesome project")
    cy.getByData("new-project-form").submit()
    cy.url().should("include", `${Cypress.config().baseUrl}/my-builds-list`)
    cy.contains("My Awesome Project")
  })
  it("If I am missing any required information when the form is submitted, the proper errors are displayed", () => {
    cy.getByData("new-project-form").submit()
    cy.getByData("error-list")
      .children()
      .should("contain", "Title must have required property 'title'")
      .and("contain", "Description must have required property 'description'")
      .and("contain", "Thumbnail Image must have required property 'thumbnailImage'")
      .and("contain", "Instructions must have required property 'instructions'")
  })
})
