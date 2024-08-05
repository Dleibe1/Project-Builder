import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ProjectSeeder from "./seeders/ProjectSeeder.js"
import PartSeeder from "./seeders/PartSeeder.js"
import InstructionSeeder from "./seeders/InstructionSeeder.js"

class Seeder {
  static async seed() {
    await UserSeeder.seed()
    await ProjectSeeder.seed()
    await PartSeeder.seed()
    await InstructionSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
