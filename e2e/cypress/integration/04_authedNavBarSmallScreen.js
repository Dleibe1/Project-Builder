describe("As an authenticated user viewing the navigation bar on a small screen", () => {
  const clickAuthedBurgerMenuItem = (item) => {
    cy.get('[data-cy="burger-menu-button-authed"]').click()
    return cy
      .get('[data-cy="burger-menu-items-authed"]')
      .contains(item, { matchCase: false })
      .click()
  }
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
  beforeEach(() => {
    cy.loginExampleUser()
    cy.viewport(600, 900)
    cy.visit("/?page=1")
  })
  const allAuthedItems = ["my builds", "create build", "sign out", "about", "how to use"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]

  describe("When I use the burger menu", () => {
    it("I can only see items for authenticated users", () => {
      cy.get('[data-cy="burger-menu-button-authed"]').click()
      allAuthedItems.forEach((authedItem) => {
        cy.get('[data-cy="burger-menu-items-authed"]')
          .contains(authedItem, { matchCase: false })
          .should("be.visible")
      })
      unauthedOnlyItems.forEach((unauthedItem) => {
        cy.get('[data-cy="burger-menu-items-authed"]')
          .contains(unauthedItem, { matchCase: false })
          .should("not.exist")
      })
    })

    it("I can navigate to the 'my builds' page", () => {
      clickAuthedBurgerMenuItem("my builds")
      cy.url().should("eq", `${Cypress.config().baseUrl}/my-builds-list?page=1`)
    })

    it("I can navigate to the 'create build' page", () => {
      clickAuthedBurgerMenuItem("create build")
      cy.url().should("eq", `${Cypress.config().baseUrl}/create-new-build`)
    })
    it("I am signed out when I click 'sign out'", () => {
      clickAuthedBurgerMenuItem("sign out")
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
      cy.userIsLoggedIn().should("equal", false)
    })
  })
  describe("When I view the navigation bar", () => {
    it("I can only see the 'home' button, search bar, and burger menu", () => {
      cy.contains("home", { matchCase: false }).should("be.visible")
      cy.get('[data-cy="search-bar"]').should("be.visible")
      cy.get('[data-cy="burger-menu-button-authed"]').should("be.visible")
    })
    it("Options for authenticated users are not visible", () => {
      allAuthedItems.forEach((item) => {
        cy.contains(item, { matchCase: false }).should("not.be.visible")
      })
    })
    it("Options for unauthenticated users are not exist", () => {
      unauthedOnlyItems.forEach((item) => {
        cy.contains(item, { matchCase: false }).should("not.exist")
      })
    })
  })
})
after(() => {
  cy.task("db:truncate", "User")
  cy.logoutUser()
})
