const Model = require("./Model")
const unique = require("objection-unique")

const uniqueFunc = unique({
  fields: ["thumbnailImageURL", "githubFileURL"],
  identifiers: ["id"],
})

class Project extends uniqueFunc(Model) {
  static get tableName() {
    return "projects"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "userId"],
      properties: {
        userId: { type: "integer" },
        title: { type: "string", minLength: 1 },
        appsAndPlatforms: { oneOf: [{ type: "string" }, { type: "null" }] },
        thumbnailImageURL: {
          oneOf: [{ type: "string" }, { type: "null" }]
        },
        tags: {
          oneOf: [{ type: "string" }, { type: "null" }]
        },
        documentation: {
          oneOf: [{ type: "string" }, { type: "null" }]
        },
        description: { type: "string", minLength: 1 },
        code: { type: "string" },
        githubFileURL: {
          oneOf: [{ type: "string" }, { type: "null" }]
        },
        parentProjectId: {
          oneOf: [{ type: "integer" }, { type: "null" }]
        },
      },
    }
  }

  static get relationMappings() {
    const { User, Part, Image } = require("./index.js")
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "projects.userId",
          to: "users.id",
        },
      },
      parentProject: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "projects.parentProjectId",
          to: "projects.id",
        },
      },
      parts: {
        relation: Model.HasManyRelation,
        modelClass: Part,
        join: {
          from: "projects.id",
          to: "parts.projectId",
        },
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: Image,
        join: {
          from: "projects.id",
          to: "images.projectId",
        },
      },
    }
  }
}

module.exports = Project
