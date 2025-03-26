import "@testing-library/cypress/add-commands"

Cypress.Commands.add("userIsLoggedIn", () => {
  cy.request({
    method: "GET",
    url: "/api/v1/user-sessions/current",
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 401) {
      return false
    } else if (response.status === 201) {
      return true
    } else {
      throw new Error(`Unexpected response status: ${response.status}`)
    }
  })
})

Cypress.Commands.add("loginExampleUser", () => {
  cy.fixture("exampleUser").then((userData) => {
    cy.request({ method: "POST", url: "/api/v1/user-sessions", body: userData })
  })
})

Cypress.Commands.add("logoutUser", () => {
  cy.request("DELETE", "/api/v1/user-sessions/")
})
