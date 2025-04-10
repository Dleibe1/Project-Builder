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
  
})
