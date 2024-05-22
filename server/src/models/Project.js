const Model = require("./Model")

class Project extends Model {
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
        appsAndPlatforms: { type: "string" },
        tags: { type: "string" },
        description: { type: "string", minLength: 1 },
        documentation: { type: "string" },
        code: { type: "string" },
        githubFileURL: { type: "string" },
        thumbnailImageURL: { type: "string" }
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
          to: "projects.id"
        }
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
          to: "images.projectId"
        }
      }
    }
  }
}

module.exports = Project
