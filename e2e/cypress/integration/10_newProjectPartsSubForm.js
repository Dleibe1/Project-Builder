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
  describe("I can use the Parts subform to add or remove parts", () => {
    afterEach(() => {
      cy.getByData("form-parts-list").then(($list) => {
        const partItems = $list.find('[data-cy="part-item-in-form"]')
        if (partItems.length) {
          cy.wrap(partItems).each(($item) => {
            cy.wrap($item).getByData("delete-part-button").click()
          })
        }
      })
      cy.getByData("partname-input").find("input").clear()
      cy.getByData("part-purchase-url-input").find("input").clear()
      cy.getByData("form-parts-list").find('[data-cy="part-item-in-form"]').should("not.exist")
    })
    it("I can add a part without entering a purchase url", () => {
      const partName = "Arduino"
      cy.getByData("partname-input").type(partName)
      cy.getByData("partname-input").find("input").should("have.value", partName)
      cy.getByData("submit-part-button").click()
      cy.getByData("part-text-no-purchase-link").should("have.text", partName)
    })
    it("I can add a part with a purchase URL", () => {
      const partPurchaseURL = "https://www.digikey.com/"
      const partName = "Red LED"
      cy.getByData("partname-input").type(partName)
      cy.getByData("part-purchase-url-input").type(partPurchaseURL)
      cy.getByData("part-purchase-url-input").find("input").should("have.value", partPurchaseURL)
      cy.getByData("submit-part-button").click()
      cy.getByData("part-item-in-form").within(() => {
        cy.getByData("purchase-link").should("have.attr", "href", partPurchaseURL)
        cy.getByData("purchase-link").find("p").should("have.text", partName)
      })
    })
    it("I cannot add a part without providing a part name", () => {
      cy.getByData("submit-part-button").click()
      cy.getByData("form-parts-list").find('[data-cy="part-item-in-form"]').should("not.exist")
    })
    it("If I enter an invalid URL, an error message is displayed and I cannot submit the part", () => {
      cy.getByData("partname-input").type("Arduino")
      cy.getByData("part-purchase-url-input").type("arduino.cc")
      cy.getByData("form-part-input-container")
        .find('[data-cy="invalid-url-message"]')
        .should("exist")
      cy.getByData("submit-part-button").click()
      cy.getByData("form-parts-list").find('[data-cy="part-item-in-form"]').should("not.exist")
    })
    it("If I enter a valid URL there is no error message displayed and I can submit the part", () => {
      cy.getByData("partname-input").type("Arduino")
      cy.getByData("part-purchase-url-input").type("https://www.arduino.cc/")
      cy.getByData("form-part-input-container")
        .find('[data-cy="invalid-url-message"]')
        .should("not.exist")
      cy.getByData("submit-part-button").click()
      cy.getByData("form-parts-list").find('[data-cy="part-item-in-form"]').should("exist")
    })
  })
})
