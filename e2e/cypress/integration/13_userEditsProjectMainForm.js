import seedOneProject from "../support/seedOneProject"
import truncateAllTables from "../support/truncateAllTables"
import "cypress-file-upload"
/// <reference types="Cypress" />

describe("As a logged in user visiting the Edit Build Page", () => {
  before(() => {
    truncateAllTables()
      .then(() => {
        seedOneProject("exampleUser")
      })
      .then(() => {
        cy.loginUser("exampleUser")
      })
      .then(() => {
        cy.visit("/edit-my-build/1")
      })
  })
  it("has the proper main heading", () => {
    cy.getByData("edit-project-main-heading").should("have.text", "Edit Project")
  })
  it("I can see the existing title", () => {
    cy.getByData("edit-project-title-input").invoke("val").should("include", "Interfacing RGB")
  })
  it("I can change the title", () => {
    cy.getByData("edit-project-title-input").clear().type("My Awesome Edited Project")
    cy.getByData("edit-project-title-input").should("have.value", "My Awesome Edited Project")
  })
  it("I can see the existing Description", () => {
    cy.getByData("edit-project-description-input").should(
      "include.text",
      "how to interface RGB LED",
    )
  })
  it("I can see the tags currently related to the project", () => {
    cy.getByData("tag-input").within(() => {
      cy.contains("Art").should("be.visible")
      cy.contains("Entertainment System").should("be.visible")
      cy.contains("Lights").should("be.visible")
    })
  })
  it("I can remove tags", () => {
    cy.get("[data-testid=ArrowDropDownIcon]").click()
    cy.getByData("tag-input").contains("Art").parent().find('[data-testid="CancelIcon"]').click()
    cy.getByData("tag-input").contains("Art").should("not.exist")
    cy.get("[data-testid=ArrowDropDownIcon]").click()
  })
  it("I can add new tags", () => {
    cy.get("[data-testid=ArrowDropDownIcon]").click()
    cy.getByData("tags-popper").contains("Cars").click()
    cy.getByData("tag-input").contains("Cars").should("be.visible")
  })
  it("I can see the existing thumbnail image", () => {
    cy.getByData("thumbnail-image").should("have.attr", "src").and("contain", "thumbnail.blob")
  })
  it("I can change the thumbnail image", () => {
    cy.fixture("/images/thumbnail1.jpg").then((fileContent) => {
      return cy.getByData("thumbnail-upload-input").attachFile({
        fileContent,
        fileName: "thumbnail1.jpg",
        mimeType: "image/png",
      })
    })
    cy.getByData("thumbnail-image").should("have.attr", "src").and("contain", "production.s3")
  })
  it("I can see the existing apps and platforms", () => {
    cy.getByData("apps-and-platforms-input").should("have.value", "Arduino IDE")
  })
  it("I can change the apps and platforms", () => {
    cy.getByData("apps-and-platforms-input").clear().type("Platform IO")
    cy.getByData("apps-and-platforms-input").should("have.value", "Platform IO")
  })
  it("I can see the existing code for the project", () => {
    cy.getByData("code-input").should("include.text", "//Interfacing RGB LED")
  })
  it("I can change the code for the project", () => {
    cy.getByData("code-input").clear().type("cypress test")
    cy.getByData("code-input").should("have.value", "cypress test")
  })
  it("I can add a URL for my main project file on GitHub", () => {
    cy.getByData("github-file-url").type(
      "https://github.com/antronyx/ServoTester/blob/main/main.ino",
    )
    cy.getByData("github-file-url").should(
      "have.value",
      "https://github.com/antronyx/ServoTester/blob/main/main.ino",
    )
  })
})
