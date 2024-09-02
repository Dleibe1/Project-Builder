import { Tag } from "../../models/index.js"
import tags from "../../../../shared/tags.js"

class TagSeeder {
  static async seed() {
    await Tag.query().insert(tags)
  }
}

export default TagSeeder