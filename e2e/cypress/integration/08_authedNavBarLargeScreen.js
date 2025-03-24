describe("As an authenticated user viewing the navigation bar on a large screen", () => {
  before(() => {
    cy.task("db:truncate", "User").then(() => {
      return cy.task("db:insert", {
        modelName: "User",
        json: {
          email: "user@example.com",
          password: "password",
          userName: "Dan",
          loginMethod: "standard",
        },
      })
    })
  })
  beforeEach(() => {
    cy.fixture("user")
      .then((userData) => {
        cy.request("POST", "/api/v1/user-sessions", userData)
      })
      .its("status")
      .should("eq", 201)
	  cy.viewport(1400, 900)
    cy.visit("/?page=1")
  })
  const allAuthedItems = ["my builds", "create build", "sign out", "about", "how to use"]
  it("All navigation items for authenticated users are visible in the nav bar", () => {
    allAuthedItems.forEach((authedItem) => {
      cy.contains(authedItem, { matchCase: false }).should("be.visible")
    })
  })
  it("Navigation options for unauthenticated users do not exist in the nav bar", () => {
    cy.contains("sign in", { matchCase: false }).should("not.exist")
    cy.contains("sign up", { matchCase: false }).should("not.exist")
    cy.contains("login with github", { matchCase: false }).should("not.exist")
  })
  it("The burger menu is not visible", () => {
    cy.get('#burger-menu')
      .should("not.be.visible")
  })
  after(() => {
    cy.task("db:truncate", "User")
    cy.request("DELETE", "/api/v1/user-sessions/")
  })
})
