/// <reference types="Cypress" />
import "@testing-library/cypress/add-commands"

Cypress.Commands.add("userIsLoggedIn", () => {
  return cy
    .request({
      method: "GET",
      url: "/api/v1/user-sessions/current",
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status === 401) {
        return false
      } else if (response.status === 200) {
        return true
      } else {
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    })
})

Cypress.Commands.add("seedExampleUser", () => {
  return cy.task("db:truncate", "User").then(() => {
    return cy.fixture("exampleUser").then((userData) => {
      return cy
        .task("db:insert", {
          modelName: "User",
          json: userData,
        })
        .then(() => {
          return userData
        })
    })
  })
})

Cypress.Commands.add("loginExampleUser", () => {
  cy.fixture("exampleUser").then((userData) => {
    return cy.request({ method: "POST", url: "/api/v1/user-sessions", body: userData })
  })
})

Cypress.Commands.add("logoutUser", () => {
  return cy.request("DELETE", "/api/v1/user-sessions/")
})

Cypress.Commands.add("getByData", (selector, options = {}) => {
  return cy.get(`[data-cy=${selector}]`, options)
})
