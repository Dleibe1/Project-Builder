/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to check if a user is logged in.
     * @example cy.userIsLoggedIn().should("equal", true)
     */
    userIsLoggedIn(): Chainable<boolean>

    /**
     * Custom command to seed an example user.
     * @example cy.seedExampleUser()
     */
    seedExampleUser(): Chainable<any>

    /**
     * Custom command to log in an example user.
     * @example cy.loginExampleUser()
     */
    loginExampleUser(): Chainable<any>
    /**
     * Custom command to log out any user.
     * @example cy.logoutUser()
     */
    logoutUser(): Chainable<any>
    /**
     * Custom command to select an element by its data-cy attribute.
     * @param selector The value of data-cy to search for.
     * @example cy.getByData("my-selector")
     */
    getByData(selector: string): Chainable<JQuery<HTMLElement>>
  }
}
