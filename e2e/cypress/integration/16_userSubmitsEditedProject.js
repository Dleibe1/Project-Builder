/// <reference types="Cypress" />
import seedOneProject from "../support/seedOneProject"
import truncateAllTables from "../support/truncateAllTables"
before(() => {
  truncateAllTables()
    .then(() => {
      seedOneProject()
    })
    .then(() => {
      cy.loginExampleUser()
    })
    .then(() => {
      cy.visit("/edit-my-build/1")
    })
})
describe("When I submit a project", () => {
  it("When I submit the form I am re-directed to my-builds-list", () => {
    cy.getByData("edit-project-form")
      .root()
      .submit()
      .then(() => {
        cy.url().should("include", "/my-builds-list")
      })
  })
  it("The project I edited should be in my builds list and I can navigate to the project's show page", () => {
    cy.getByData("my-build-tile").should("be.visible")
    cy.getByData("my-build-tile").click()
    cy.getByData("my-build-title-showpage").should("have.text", "My Awesome Edited Project")
  })
  it("The project should also be available from the homepage to non-logged in users", () => {
    cy.logoutUser().then(() => {
      cy.visit("/")
      cy.getByData("project-tile-homepage").click()
      cy.getByData("showpage-title").should("have.text", "Interfacing RGB Led with Arduino")
    })
  })
})
