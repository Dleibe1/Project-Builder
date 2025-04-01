import "cypress-file-upload"
/// <reference types="Cypress" />

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
      })
  })
  it("Has the proper heading", () => {
    cy.getByData("new-project-form")
      .as("new-project-form")
      .get("h1")
      .should("have.text", "New Project")
  })

  it("I can add a title", () => {
    cy.getByData("new-project-title-input").type("My new project")
    cy.getByData("new-project-title-input").find("input").should("have.value", "My new project")
  })
  it("I can add and remove tags", () => {
    cy.getByData("tag-input").click()
    cy.get('[role="option"]').contains("Art").click()
    cy.getByData("tag-input").click()
    cy.get('[role="option"]').contains("Audio").click()
    cy.getByData("tag-input").within(() => {
      cy.contains("Art")
      cy.contains("Audio")
    })
    cy.getByData("tag-input").within(() => {
      cy.contains("Art").parent().find('[data-testid="CancelIcon"]').click()
      cy.contains("Art").should("not.exist")
    })
  })
  it("I can add a description for my project", () => {
    cy.getByData("new-project-description-input").type("The following is an awesome project")
    cy.getByData("new-project-description-input")
      .find("textarea")
      .should("have.value", "The following is an awesome project")
  })
  it("I can upload a thumbnail image", () => {
    cy.getByData("thumbnail-upload-input").closest('[data-cy="upload-thumbnail-button"]')
    cy.fixture("/images/thumbnail1.jpg").then((fileContent) => {
      return cy.getByData("thumbnail-upload-input").attachFile({
        fileContent,
        fileName: "thumbnail1.jpg",
        mimeType: "image/png",
      })
    })
    cy.getByData("thumbnail-image").should("have.attr", "src").and("contain", "production.s3")
  })
  it("I can add apps and platforms for my project", () => {
    cy.getByData("apps-and-platforms-input").type("Arduino IDE")
    cy.getByData("apps-and-platforms-input").find("input").should("have.value", "Arduino IDE")
  })
  it("I can add code to my project", () => {
    cy.getByData("code-input").type("#include Arduino.h")
    cy.getByData("code-input").find("textarea").should("have.value", "#include Arduino.h")
  })
  it("I can add a URL for my main project file on GitHub", () => {
    cy.getByData("github-file-url").type("https://github.com/antronyx/ServoTester/blob/main/main.ino")
    cy.getByData("github-file-url").find("input").should("have.value", "https://github.com/antronyx/ServoTester/blob/main/main.ino")
  })
})
