describe("As an authenticated user viewing the navigation bar on a small screen", () => {
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
  before(() => {
    cy.fixture("user")
      .then((userData) => {
        cy.request("POST", "/api/v1/user-sessions", userData)
      })
      .its("status")
      .should("eq", 201)
    cy.viewport(1150, 900)
    cy.visit("/?page=1")
  })
  it("Most navigation options for authenticated users are visible in the nav bar", () => {
    cy.contains("my builds", { matchCase: false }).should("be.visible")
    cy.contains("create build", { matchCase: false }).should("be.visible")
    cy.contains("sign out", { matchCase: false }).should("be.visible")
  })
  it("Navigation options for unauthenticated users do not exist in the nav bar", () => {
    cy.contains("sign in", { matchCase: false }).should("not.exist")
    cy.contains("sign up", { matchCase: false }).should("not.exist")
    cy.contains("login with github", { matchCase: false }).should("not.exist")
  })
  it("Some navigation options are not visible in the nav bar", () => {
    cy.contains("how to use", { matchCase: false }).should("not.be.visible")
    cy.contains("about", { matchCase: false }).should("not.be.visible")
  })
  it("The navigation options that are not visible in the nav bar are visible in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-authed"]')
      .should("be.visible")
      .then(($menu) => {
        cy.wrap($menu).click()
		cy.get('[data-cy="burger-menu-items-authed"]').as("burger-menu-items")
        cy.get("@burger-menu-items").contains("how to use", { matchCase: false }).should("be.visible")
        cy.get("@burger-menu-items").contains("about", { matchCase: false }).should("be.visible")
      })
  })
  after(() => {
    cy.task("db:truncate", "User")
    cy.request("DELETE", "/api/v1/user-sessions/")
  })
})
