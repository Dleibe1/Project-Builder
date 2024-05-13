const Model = require("./Model")

class Project extends Model {
  static get tableName() {
    return "projects"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "parts", "description", "code"],
      properties: {
        userId: { type: "integer" },
        title: { type: "string", minLength: 1 },
        parts: { type: "string", minLength: 1 },
        appsAndPlatforms: { type: "string" },
        tags: { type: "string" },
        description: { type: "string", minLength: 1 },
        documentation: { type: "string" },
        code: { type: "string", minLength: 1 },
      },
    }
  }

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "projects.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Project