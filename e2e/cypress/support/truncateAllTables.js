const truncateAllTables = () => {
  cy.task("db:truncate", "User")
    .then(() => {
      return cy.task("db:truncate", "Project")
    })
    .then(() => {
      return cy.task("db:truncate", "Part")
    })
    .then(() => {
      return cy.task("db:truncate", "Image")
    })
}

export default truncateAllTables
