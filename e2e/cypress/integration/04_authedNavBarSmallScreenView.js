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
  beforeEach(() => {
    cy.fixture("user")
      .then((userData) => {
        cy.request("POST", "/api/v1/user-sessions", userData)
      })
      .its("status")
      .should("eq", 201)
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const allAuthedItems = ["my builds", "create build", "sign out", "about", "how to use"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  it("Navigation options for authenticated users are hidden in the navigation bar", () => {
    allAuthedItems.forEach((authedItem) => {
      cy.contains(authedItem, { matchCase: false }).should("not.be.visible")
    })
  })
  it("Navigation options for unauthenticated users do not exist in the navigation bar", () => {
    unauthedOnlyItems.forEach((unauthedItem) => {
      cy.contains(unauthedItem, { matchCase: false }).should("not.exist")
    })
  })
  it("Navigation items for authenticated users are visible in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-authed"]')
      .should("be.visible")
      .then(($menu) => {
        cy.wrap($menu).click()
        cy.get('[data-cy="burger-menu-items-authed"]').as("burger-menu-items")
        allAuthedItems.forEach((authedItem) => {
          cy.get("@burger-menu-items").contains(authedItem, { matchCase: false }).should("be.visible")
        })
      })
  })
  it("Navigation items for unauthenticated users do not exist in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-authed"]')
      .should("be.visible")
      .then(($menu) => {
        cy.wrap($menu).click()
        cy.get('[data-cy="burger-menu-items-authed"]').as("burger-menu-items")
        unauthedOnlyItems.forEach((authedItem) => {
          cy.get("@burger-menu-items").contains(authedItem, { matchCase: false }).should("not.exist")
        })
      })
  })
  after(() => {
    cy.task("db:truncate", "User")
    cy.request("DELETE", "/api/v1/user-sessions/")
  })
})
