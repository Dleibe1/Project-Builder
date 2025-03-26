describe("As an authenticated user interacting with the navigation bar on a large screen", () => {
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
    cy.viewport(1400, 900)
    cy.visit("/?page=1")
  })

  const authedOnlyItems = ["my builds", "create build", "sign out"]
  const unauthedOnlyItems = ["sign up", "sign in", "login with github"]
  const allUsersItems = ["about", "how to use", "home"]

  describe("Viewing the navigation bar", () => {
    it("shows items for authenticated users and common items", () => {
      authedOnlyItems.concat(allUsersItems).forEach((item) => {
        cy.contains(item, { matchCase: false }).should("be.visible")
      })
    })

    it("does not show items exclusively for unauthenticated users", () => {
      unauthedOnlyItems.forEach((item) => {
        cy.contains(item, { matchCase: false }).should("not.exist")
      })
    })

    it("The burger menu is not visible", () => {
      cy.get("#burger-menu").should("not.be.visible")
    })
  })

  describe("Clicking buttons on the navigation bar", () => {
    it("navigates to the 'How to use' page", () => {
      cy.contains("how to use", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/how-to-use`)
    })

    it("navigates to the homepage", () => {
      cy.contains("home", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
    })

    it("navigates to the 'about' page", () => {
      cy.contains("about", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/about`)
    })

    it("navigates to the 'my builds' page", () => {
      cy.contains("my builds", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/my-builds-list?page=1`)
    })

    it("navigates to the 'create build' page", () => {
      cy.contains("create build", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/create-new-build`)
    })

    it("signs out and redirects to the homepage", () => {
      cy.contains("sign out", { matchCase: false }).click()
      cy.url().should("eq", `${Cypress.config().baseUrl}/?page=1`)
      cy.userIsLoggedIn().should("equal", false)
    })
  })
  after(() => {
    cy.task("db:truncate", "User")
    cy.logoutUser()
  })
})
