const Model = require("./Model")

class TestImageUpload extends Model {
  static get tableName() {
    return "imageUploads"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "image"],
      properties: {
        title: { type: "string" },
        image: { type: "string" },
      }
    }
  }
}

module.exports = TestImageUpload