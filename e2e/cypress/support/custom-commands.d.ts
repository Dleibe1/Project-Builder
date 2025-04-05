
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
     * @example cy.seedExampleUser()
     * @returns {Chainable<ExampleUser>} A chainable that yields the seeded user object.
     */
    loginExampleUser(): Chainable<any>
    /**
     * Custom command to log in an example user.
     * Returns the user's data as an object.
     * @example cy.loginExampleUser().then((userData) => { console.log(userData.email) })
     * @returns {Chainable<object>} The data for the logged in user.
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
