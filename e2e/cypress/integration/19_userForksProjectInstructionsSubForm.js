import truncateAllTables from "../support/truncateAllTables"
/// <reference types="Cypress" />

const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}

describe("I can use the TinyMCE instructions editor", () => {
	before(() => {
	  truncateAllTables()
	  cy.fixture("user1")
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
	//TinyMCE tests will fail if you are testing with the Electron 87 browser
	it("I am using Chrome browser because Electron 87 browser cannot interact with buttons in TinyMCE form", () => {
	  expect(Cypress.isBrowser("chrome")).to.be.true
	})
	it("I can navigate to the editor", () => {
	  cy.getByData("add-or-edit-instructions-button").click()
	  cy.getByData("tinymce-container").should("exist")
	})
	it("I can add instructions to the editor and that content is present when I return to the main form", () => {
	  cy.get('[data-mce-name="h2-button"]').click()
	  getIframeBody().type("Heading")
	  getIframeBody().contains("h2", "Heading")
	  cy.get('[data-mce-name="close-editor"]').click()
	  cy.getByData("instructions-text").contains("Heading")
	})
  })