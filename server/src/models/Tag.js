const unique = require("objection-unique")
const Model = require("./Model")

const uniqueFunc = unique({
  fields: ["tagName"],
  identifiers: ["id"],
})

class Tag extends uniqueFunc(Model) {
  static get tableName() {
    return "tags"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tagName"],
      properties: {
        tagName: { type: "string" },
      },
    }
  }

  static get relationMappings() {
    const { Project } = require("./index.js")

    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: "tags.id",
          through: {
            from: "project_tags.tagId",
            to: "project_tags.projectId",
          },
          to: "projects.id",
        },
      },
    }
  }
}

module.exports = Tag
