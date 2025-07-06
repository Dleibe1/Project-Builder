/* 
The image_counter table is used to keep track of the number
of images uploaded to AWS S3 to prevent being charged.
*/

const Model = require("./Model")

class ImageCounter extends Model {
  static get tableName() {
    return "image_counter"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["imageURL"],
      properties: {
        imageURL: { type: "string" },
      },
    }
  }
}

module.exports = ImageCounter
