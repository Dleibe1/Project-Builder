const Model = require("./Model")

class Project extends Model {
  static get tableName() {
    return "projects"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description", "userId", "thumbnailImage"],
      properties: {
        userId: { type: "integer" },
        title: { type: "string", maxLength: 70 },
        appsAndPlatforms: { oneOf: [{ type: "string" }, { type: "null" }] },
        thumbnailImage: { type: "string" },
        tags: {
          oneOf: [{ type: "string" }, { type: "null" }],
        },
        documentation: {
          oneOf: [{ type: "string" }, { type: "null" }],
        },
        description: { type: "string" },
        code: { type: "string" },
        githubFileURL: {
          oneOf: [{ type: "string" }, { type: "null" }],
        },
        parentProjectId: {
          oneOf: [{ type: "integer" }, { type: "null" }],
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
