/// <reference types="Cypress" />

describe("As an unauthenticated user viewing the navigation bar on a medium screen", () => {
	before(() => {
	  cy.request("DELETE", "/api/v1/user-sessions")
	})
	beforeEach(() => {
	  cy.viewport(1150, 900)
	  cy.visit("/?page=1")
	})
	it("Some navigation items for unauthenticated users are visible in the nav bar", () => {
	  cy.contains("sign up", { matchCase: false }).should("be.visible")
	  cy.contains("sign in", { matchCase: false }).should("be.visible")
	  cy.contains("login with github", { matchCase: false }).should("be.visible")
	})
	it("Navigation items for authenticated users do not exist", () => {
		cy.contains("my builds", { matchCase: false }).should("not.exist")
		cy.contains("create build", { matchCase: false }).should("not.exist")
		cy.contains("sign out", { matchCase: false }).should("not.exist")
	  })
	it("Some navigation options are hidden in the nav bar", () => {
		cy.contains("about", { matchCase: false }).should("not.be.visible")
		cy.contains("how to use", { matchCase: false }).should("not.be.visible")
	  })
	it("The hidden navigation items are available in the burger menu", () => {
	  cy.get('[data-cy="burger-menu-button-unauthed"]').click()
	  cy.get('[data-cy="burger-menu-items-unauthed"]').as("burger-menu-items")
	  cy.get("@burger-menu-items").contains("about", { matchCase: false }).should("be.visible")
	  cy.get("@burger-menu-items").contains("how to use", { matchCase: false }).should("be.visible")
	})
  })
  