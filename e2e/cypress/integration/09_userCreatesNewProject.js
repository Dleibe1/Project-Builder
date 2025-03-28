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
  describe("I can create and submit a project", () => {
    it("Add a title", () => {
      cy.getByData("new-project-title-input").type("My new project")
      cy.getByData("new-project-title-input").find("input").should("have.value", "My new project")
    })
  })
  after(() => {
    cy.logoutUser()
  })
})
