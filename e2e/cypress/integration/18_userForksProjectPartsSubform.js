import seedOneProject from "../support/seedOneProject"
import seedUser from "../support/seedUser"
import truncateAllTables from "../support/truncateAllTables"
/// <reference types="Cypress" />

const deleteAllParts = () => {
  cy.getByData("form-parts-list").then(($list) => {
    if (Cypress.$($list).find('[data-cy="delete-part-button"]').length) {
      cy.wrap($list).find('[data-cy="delete-part-button"]').first().click({ force: true })
      deleteAllParts()
    }
  })
}

describe("As a user forking a project", () => {
  before(() => {
    truncateAllTables()
      .then(() => {
        seedOneProject("user1")
      })
      .then(() => {
        seedUser("user2")
      })
      .then(() => {
        cy.loginUser("user2")
      })
    cy.visit("/fork-project/1")
  })
  it("I can see existing parts", () => {
    cy.getByData("form-parts-list")
      .children(":nth-child(1)")
      .find("p")
      .should("have.text", "RGB Diffused Common Anode")
  })
  it("I can delete existing parts", () => {
    cy.getByData("form-parts-list")
      .children(":nth-child(1)")
      .within(() => {
        cy.getByData("delete-part-button").click()
      })
    cy.getByData("form-parts-list")
      .children(":nth-child(1)")
      .find("p")
      .should("not.have.text", "RGB Diffused Common Anode")
  })
  describe("I can only add parts if I enter the correct information", () => {
    beforeEach(() => {
      deleteAllParts()
      cy.getByData("partname-input").clear()
      cy.getByData("part-purchase-url-input").clear()
      cy.getByData("form-parts-list").find('[data-cy="part-item-in-form"]').should("not.exist")
    })
    it("I can add a part without entering a purchase url", () => {
      const partName = "Arduino"
      cy.getByData("partname-input").type(partName)
      cy.getByData("partname-input").should("have.value", partName)
      cy.getByData("submit-part-button").click()
      cy.getByData("part-text-no-purchase-link").should("have.text", partName)
    })
    it("I can add a part with a purchase URL", () => {
      const partPurchaseURL = "https://www.digikey.com/"
      const partName = "Red LED"
      cy.getByData("partname-input").type(partName)
      cy.getByData("part-purchase-url-input").type(partPurchaseURL)
      cy.getByData("part-purchase-url-input").should("have.value", partPurchaseURL)
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
