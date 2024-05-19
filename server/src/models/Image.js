const Model = require("./Model")

class Image extends Model {
  static get tableName(){
    return "images"
  }

  static get jsonSchema() {
    return{
      type: "object",
      required: ["projectId", "imageURL"],
      properties : {
        projectId: { type: "integer" },
        imageURL: { type: "string" }
      }
    }
  }

  static get relationMappings(){
    const { Project } = require("./index.js")
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "images.projectId",
          to: "project.id"
        }
      }
    }
  }
}

module.exports = Image