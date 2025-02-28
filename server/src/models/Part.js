const Model = require("./Model")

class Part extends Model {
  static get tableName() {
    return "parts"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["partName", "projectId"],
      properties: {
        projectId: { type: "integer" },
        partName: { type: "string", maxLength: 100 },
        partPurchaseURL: { type: "string" },
      },
    }
  }

  static get relationMappings() {
    const { Project } = require("./index.js")
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "parts.projectId",
          to: "project.id",
        },
      },
    }
  }
}

module.exports = Part
