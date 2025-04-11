
/// <reference types="Cypress" />

const seedUser = (userFixture) => {
  cy.fixture(userFixture).then((userData) => {
    return cy.task("db:insert", {
      modelName: "User",
      json: userData,
    })
  })
}

export default seedUser