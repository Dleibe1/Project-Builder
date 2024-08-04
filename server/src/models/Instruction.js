const Model = require("./Model")

class Instruction extends Model {
  static get tableName() {
    return "instruction"
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["instruction", "projectId", "imageURL"],
      properties: {
        imageURL: { type: "string" },
        projectId: { type: "integer" },
        instruction: { type: "string" },
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
          from: "instruction.projectId",
          to: "project.id",
        },
      },
    }
  }
}

module.exports = Instruction