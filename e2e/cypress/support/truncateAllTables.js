/// <reference types="Cypress" />

const truncateAllTables = () => {
  return cy
    .task("db:truncate", ["User", "Project", "Part", "Tag"])
    .task("dbTable:truncate", "project_tags")
}

export default truncateAllTables