import seedOneProject from "../support/seedOneProject"
import truncateAllTables from "../support/truncateAllTables"
import "cypress-file-upload"
/// <reference types="Cypress" />

// Electron browser is incompatible with the TinyMCE component,
// you must use a different browser (like Chrome134) for testing.
// Check the chrome console for errors as these will not cause this test to fail.
// Cypress.on("fail", (err, runnable) => {
//   console.error(
//     "Make sure you are using Chrome browser when testing TinyMCE components, Electron browser will cause errors",
//   )
//   console.error(err.message)
//   return false
// })
const deleteAllParts = () => {
  cy.getByData("form-parts-list").then(($list) => {
    if (Cypress.$($list).find('[data-cy="delete-part-button"]').length) {
      cy.wrap($list).find('[data-cy="delete-part-button"]').first().click({ force: true })
      deleteAllParts()
    }
  })
}
const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}
describe("As a logged in user visiting the Edit Build Page", () => {
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
  describe("I can use the parts subform", () => {
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
  describe("I can use the TinyMCE editor to edit instructions", () => {
    it("I can navigate to the editor", () => {
      cy.getByData("add-or-edit-instructions-button").click()
      cy.getByData("tinymce-container").should("exist")
    })
    it("I can see existing instructions from the project being edited", () => {
      getIframeBody().should("include.text", "how to interface the RGB led")
    })
    it("I can add content to the editor", () => {
      cy.get('[data-mce-name="h2-button"]').click()
      getIframeBody().type("Heading")
      getIframeBody().contains("h2", "Heading")
    })
    it("When I close the editor, I return to the edit build form and the text has been added", () => {
      cy.get('[data-mce-name="close-editor"]').click()
      cy.getByData("instructions-text").contains("Heading")
    })
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
        cy.getByData("showpage-title").should("have.text", "My Awesome Project")
      })
    })
  })
})
