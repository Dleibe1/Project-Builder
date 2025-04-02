import "cypress-file-upload"
/// <reference types="Cypress" />
//Make sure you are testing this spec with chrome browser.  Electron browser will throw errors testing the TinyMCE component
const getIframeDocument = () => {
  return cy.get("iframe").its("0.contentDocument").should("exist")
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument().its("body").should("not.be.undefined").then(cy.wrap)
}
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
    cy.getByData("new-project-title-input").type("My Awesome Project")
    cy.getByData("new-project-title-input").find("input").should("have.value", "My Awesome Project")
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
    cy.getByData("github-file-url").type(
      "https://github.com/antronyx/ServoTester/blob/main/main.ino",
    )
    cy.getByData("github-file-url")
      .find("input")
      .should("have.value", "https://github.com/antronyx/ServoTester/blob/main/main.ino")
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
  describe("I can enter instructions into the editor", () => {
    Cypress.on("fail", (err, runnable) => {
      console.error(
        "Make sure you are using Chrome browser when testing TinyMCE components, Electron browser will cause errors",
      )
      console.error(err.message)
      return false
    })
    it("I can navigate to the editor", () => {
      cy.getByData("add-or-edit-instructions-button").click()
      cy.getByData("tinymce-container").should("exist")
    })
    it("I can add content to the editor", () => {
      cy.get('[data-mce-name="h2-button"]').click()
      getIframeBody().type("Heading")
      getIframeBody().contains("h2", "Heading")
    })
    it("When I close the editor, I return to the create build form and the instructions have been added", () => {
      cy.get('[data-mce-name="close-editor"]').click()
      cy.getByData("instructions-text").contains("Heading")
    })
    it("When I submit the form I am re-directed to my-builds-list", () => {
      cy.get('[data-cy="new-project-form"]').submit()
      cy.url.should("include", "/my-builds-list")
    })
    it("My New project should be in my builds list and I can navigate to the project's show page", () => {
      cy.getByData("my-build-tile").should("be.visible")
      cy.getByData("my-build-tile").click()
      cy.getByData("my-build-title-showpage").should("have.text", "My Awesome Project")
    })
  })
})
