import { Tag } from "../../models/index.js"
import allowedTags from "../../../../shared/allowedTags.js"

class TagSeeder {
  static async seed() {
    await Tag.query().insert(allowedTags)
  }
}

export default TagSeeder