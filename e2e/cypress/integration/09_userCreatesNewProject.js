import "cypress-file-upload"
/// <reference types="Cypress" />

describe("As a logged in user visiting the Create Build Page", () => {
  const models = ["User", "Project", "Part", "Tag"]
  const tables = ["project_tags"]
  before(() => {
    cy.fixture("exampleUser").then((userData) => {
      return cy
        .intercept("GET", "/api/v1/user-sessions/current", {
          statusCode: 200,
          body: userData,
        })
        .as("currentUser")
    })
    cy.task("db:truncate", models)
    cy.task("dbTable:truncate", tables).then(() => {
      return cy.visit("/create-new-build")
    })
  })
  it("Has the proper heading", () => {
    cy.getByData("new-project-form")
      .as("new-project-form")
      .get("h1")
      .should("have.text", "New Project")
  })
  describe("I can fill out all items in the form", () => {
    it("I can add a title", () => {
      cy.getByData("new-project-title-input").type("My new project")
      cy.getByData("new-project-title-input").find("input").should("have.value", "My new project")
    })

    it("I can add tags", () => {
      cy.getByData("tag-input").click()
      cy.get('[role="option"]').contains("Art").click()
      cy.getByData("tag-input").click()
      cy.get('[role="option"]').contains("Audio").click()
    })

    it("I can see the tags I've added", () => {
      cy.getByData("tag-input").within(() => {
        cy.contains("Art")
        cy.contains("Audio")
      })
    })
    it("I can add a description for my project", () => {
      cy.getByData("new-project-description-input").type("The following is an awesome project")
      cy.getByData("new-project-title-input").find("input").should("have.value", "My new project")
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
    describe("I can add a list of parts", () => {
      it("I can add a part without giving the purchase url", () => {
        cy.getByData("partname-input").type("Arduino")
        cy.getByData("partname-input").find("input").should("have.value", "Arduino")
        cy.getByData("submit-part-button").click()
        cy.getPartsListItemByIndex(0).find("p").should("have.text", "Arduino")
      })
      it("I can add a part with a purchase URL", () => {
        cy.getByData("partname-input").type("Red LED")
        cy.getByData("part-purchase-url-input").type("https://www.digikey.com/")
        cy.getByData("part-purchase-url-input")
          .find("input")
          .should("have.value", "https://www.digikey.com/")
        cy.getByData("submit-part-button").click()
        cy.getPartsListItemByIndex(1)
          .find("a")
          .as("part-with-purchase-link")
          .should("have.attr", "href", "https://www.digikey.com/")
        cy.get("@part-with-purchase-link").find("p").should("have.text", "Red LED")
      })
      it("I can delete a part I added by mistake", () => {
        cy.getPartsListItemByIndex(1).contains("Delete Part").click()
        cy.getByData("form-parts-list").within(() => {
          cy.contains("Red LED").should("not.exist")
        })
      })
    })
  })
  after(() => {
    cy.task("db:truncate", models)
    cy.task("dbTable:truncate", tables)
    cy.logoutUser()
  })
})
