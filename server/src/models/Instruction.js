const Model = require("./Model")

class Instruction extends Model {
  static get tableName() {
    return "instructions"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: "projectId",
      properties: {
        imageURL: { type: "string" },
        projectId: { type: "integer" },
        instruction: { type: "string" },
      },
      anyOf: [
        { required: ["imageURL"] },
        { required: ["instruction"] }
      ]
    }
  }
  
  static get relationMappings() {
    const { Project } = require("./index.js")
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "instructions.projectId",
          to: "project.id",
        },
      },
    }
  }
}

module.exports = Instruction