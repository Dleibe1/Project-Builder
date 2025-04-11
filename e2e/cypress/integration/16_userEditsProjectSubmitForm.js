/// <reference types="Cypress" />
import seedOneProject from "../support/seedOneProject"
import truncateAllTables from "../support/truncateAllTables"

const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}
describe("When I submit a project", () => {
  beforeEach(() => {
    truncateAllTables()
        seedOneProject("user1")
        cy.loginUser("user1")
  })
  it("I am using Chrome browser because Electron 87 browser cannot interact with TinyMCE form properly", () => {
    expect(Cypress.isBrowser("chrome")).to.be.true
  })
  it("When I submit the form I am re-directed to my-builds-list and the project is visible there", () => {
    cy.visit("/edit-my-build/1")
    cy.getByData("edit-project-title-input").should("have.value", "Interfacing RGB Led with Arduino")
    cy.getByData("edit-project-form").submit()
    cy.location("pathname", { timeout: 10000 }).should("include", "/my-builds-list")
    cy.getByData("my-build-tile", { timeout: 10000 }).should("be.visible")
    cy.getByData("my-build-tile").click()
    cy.url().should("include", "/my-builds")
    cy.getByData("my-build-title-showpage").should("have.text", "Interfacing RGB Led with Arduino")
  })
  it("The project should also be available from the homepage to non-logged in users", () => {
    cy.visit("/edit-my-build/1")
    cy.getByData("edit-project-title-input").should("have.value", "Interfacing RGB Led with Arduino")
    cy.getByData("edit-project-form").submit()
    cy.logoutUser().should("have.property", "status", 200)
    cy.visit("/")
    cy.getByData("project-tile-homepage").click()
    cy.url().should("include", "projects/1")
    cy.getByData("showpage-title").should("have.text", "Interfacing RGB Led with Arduino")
  })
  it("If the form does not contain the required information, the proper errors appear and the form is not submitted", () => {
    cy.visit("/edit-my-build/1")
    cy.getByData("edit-project-title-input").clear()
    cy.getByData("edit-project-description-input").clear()
    cy.getByData("add-or-edit-instructions-button").click()
    cy.getByData("tinymce-container").should("exist").click()
    getIframeBody().should("contain", "RGB LED")
    getIframeBody().clear()
    cy.get('[data-mce-name="close-editor"]').click()
    cy.getByData("edit-project-title-input").clear()
    cy.getByData("edit-project-form").submit()
    cy.getByData("error-list")
      .children()
      .should("contain", "Title must have required property 'title'")
      .and("contain", "Description must have required property 'description'")
      .and("contain", "Instructions must have required property 'instructions'")
    cy.url().should("include", "edit-my-build")
  })
})
