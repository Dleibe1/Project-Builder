
/// <reference types="Cypress" />
//These commands are defined in commands.js
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to check if a user is logged in.
     * @example cy.userIsLoggedIn().should("equal", true)
     */
    userIsLoggedIn(): Chainable<boolean>
    /**
     * Custom command to seed an example user
     * using a Cypress fixture
     * @example cy.seedUser("user1")
     */
    seedUser(fixture: string): Chainable<any>
    /**
     * Custom command to log in a user from a Cypress fixture.
     * @example cy.seedUser("user1")
     * @returns {Chainable<any>} A chainable that yields the seeded user object.
     */
    loginUser(fixture: String): Chainable<any>
    /**
     * Custom command to log in a user using a Cypress fixture.
     * Returns the user's data as an object.
     * @example cy.loginUser("user1").then((userData) => { console.log(userData.email) })
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
