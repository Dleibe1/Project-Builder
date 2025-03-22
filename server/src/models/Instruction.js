const Model = require("./Model.js")

class Instruction extends Model {
	static get tableName() {
	  return "instructions"
	}
	static get jsonSchema() {
	  return {
		type: "object",
		required: ["projectId", "instructionHTML"],
		properties: {
		  projectId: { type: "integer" },
		  instructionHTML: { type: "string" },
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
			from: "instructions.projectId",
			to: "project.id",
		  },
		},
	  }
	}
  }
  
  module.exports = Instruction