describe("As an authenticated user viewing the navigation bar on a medium sized screen", () => {
  before(() => {
    cy.task("db:truncate", "User").then(() => {
      cy.fixture("exampleUser").then((userData) => {
        return cy.task("db:insert", {
          modelName: "User",
          json: userData,
        })
      })
    })
  })

  before(() => {
    cy.loginExampleUser()
    cy.viewport(1150, 900)
    cy.visit("/?page=1")
  })
  const authedOnlyItems = ["my builds", "create build", "sign out"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  const allUsersItems = ["about", "how to use"]
  it("Navigation options for authenticated users are visible in the nav bar", () => {
    authedOnlyItems.forEach((item) => {
      cy.contains(item, { matchCase: false }).should("be.visible")
    })
  })
  it("Navigation options for unauthenticated users do not exist in the nav bar", () => {
    unauthedOnlyItems.forEach((unauthedItem) => {
      cy.contains(unauthedItem, { matchCase: false }).should("not.exist")
    })
  })
  it("Common navigation items are not visible", () => {
    allUsersItems.forEach((item) => {
      cy.contains(item, { matchCase: false }).should("not.be.visible")
    })
  })
  it("Common navigation items are visible in the burger menu", () => {
    cy.get('[data-cy="burger-menu-button-authed"]')
      .should("be.visible")
      .then(($menu) => {
        cy.wrap($menu).click()
        cy.get('[data-cy="burger-menu-items-authed"]').as("burger-menu-items")
        allUsersItems.forEach((item) => {
          cy.get("@burger-menu-items").contains(item, { matchCase: false })
        })
      })
  })
  after(() => {
    cy.task("db:truncate", "User")
    cy.logoutUser()
  })
})
