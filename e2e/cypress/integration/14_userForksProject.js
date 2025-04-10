import "cypress-file-upload"
import truncateAllTables from "../support/truncateAllTables"
/// <reference types="Cypress" />
// Electron 87 browser is incompatible with the TinyMCE component,
// you must use a different browser (like Chrome134) for testing.
// Check the chrome console for errors as these will not cause this test to fail.
Cypress.on("fail", (err, runnable) => {
  console.error(
    "Make sure you are not using Electron broswer, some tests in this file will fail when testing the TinyMCE component.",
  )
  cy.log("Make sure you are not using Electron broswer, some tests in this file will fail when testing the TinyMCE component.")
  console.error(err.message)
  return false
})
// const deleteAllParts = () => {
//   cy.getByData("form-parts-list").then(($list) => {
//     if (Cypress.$($list).find('[data-cy="delete-part-button"]').length) {
//       cy.wrap($list).find('[data-cy="delete-part-button"]').first().click({ force: true })
//       deleteAllParts()
//     }
//   })
// }
const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}

describe("As a logged in user visiting the Fork Project Page", () => {
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
        cy.visit("/fork-project/1")
      })
  })
  it("Has the proper heading", () => {
    cy.getByData("new-project-form").get("h1").should("have.text", "Fork Project")
  })
  it("I can see the existing title", () => {
    cy.getByData("fork-project-title-input").invoke("val").should("include", "Interfacing RGB")
  })
  it("I can change the title", () => {
    cy.getByData("fork-project-title-input").clear().type("My Awesome Forked Project")
  })
  it("I can see the existing Description", () => {
    cy.getByData("edit-project-description-input")
      .invoke("val")
      .should("include", "how to interface RGB LED")
  })
  it("I can see the tags already related with the project", () => {
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
    cy.getByData("code-input").invoke("val").should("include", "//Interfacing RGB LED")
  })
  it("I can change the code for the project", () => {
    cy.getByData("code-input").clear().type("cypress test")
    cy.getByData("code-input").should("have.value", "cypress test")
  })
})
