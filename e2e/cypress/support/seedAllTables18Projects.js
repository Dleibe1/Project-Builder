import connection from "../../../src/boot/model.cjs"
import { parts, partsForForkedProjects } from "../../../server/src/db/seeders/PartSeeder"
import { parentProjects, exampleUserProjects, extraProjects, forks } from "../../../server/src/db/seeders/ProjectSeeder"
import { allowedTags as tags } from "../../../shared/allowedTags"
import { projectTags } from "../../../server/src/db/seeders/ProjectTagsSeeder"

const allParts = [
  ...parts,
  ...partsForForkedProjects
]

const allProjects = [
  ...parentProjects,
  ...exampleUserProjects,
  ...extraProjects,
  ...forks
]

const users = [
	{ email: "dleibe1@google.com", password: "password", userName: "dleibe1", loginMethod: "standard" },
	{ email: "lukeM2@hotmail.com", password: "password", userName: "lukeTheMan", loginMethod: "standard" },
	{ email: "chrisC@google.com", password: "password", userName: "BigChris", loginMethod: "standard" },
	{ email: "example@example.com", password: "password", userName: "Example", loginMethod: "standard" },
  ]

return cy
  .task("db:truncate", ["User", "Project", "Part", "Tag" ])
  .then(() => {
    return cy.task("db:insert", {
      modelName: "User",
      json: users,
    })
  })
  .then(() => {
    return cy.task("db:insert", {
      modelName: "Project",
      json: allProjects
    })
  })
  .then(() => {
    return cy.task("db:insert", {
      modelName: "Part",
      json: allParts
    })
  })
  .then(()=> {
    return cy.task("db:insert", {
      modelName: "tag",
      json: tags,
    })
  })
  .then(() => {
    return cy.task("db:insert", {
      modelName: "project_tags",
      json: tags,
    })
  })
