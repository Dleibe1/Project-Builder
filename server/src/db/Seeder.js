import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ProjectSeeder from "./seeders/ProjectSeeder.js"
import PartSeeder from "./seeders/PartSeeder.js"
import TagSeeder from "./seeders/TagSeeder.js"
import ProjectTagsSeeder from"./seeders/ProjectTagsSeeder.js"
import InstructionsSeeder from "./seeders/InstructionSeeder.js"

class Seeder {
  static async seed() {
    await UserSeeder.seed()
    await ProjectSeeder.seed()
    await PartSeeder.seed()
    await TagSeeder.seed()
    await ProjectTagsSeeder.seed()
    await InstructionsSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
