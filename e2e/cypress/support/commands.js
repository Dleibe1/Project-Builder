import "@testing-library/cypress/add-commands"

Cypress.Commands.add("openUnauthedBurgerMenu", () => {
  cy.get('[data-cy="burger-menu-button-unauthed"]').click()
  cy.get('[data-cy="burger-menu-items-unauthed"]')
})

Cypress.Commands.add("openAuthedBurgerMenu", () => {
  cy.get('[data-cy="burger-menu-button-authed"]')
    .should("be.visible")
    .then(($menu) => {
      cy.wrap($menu).click()
      cy.get('[data-cy="burger-menu-items-authed"]')
    })
})
