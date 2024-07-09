import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import ProjectSeeder from "./seeders/ProjectSeeder.js"
import PartSeeder from "./seeders/PartSeeder.js"
import ImageSeeder from "./seeders/ImageSeeder.js"

class Seeder {
  static async seed() {
    await UserSeeder.seed()
    await ProjectSeeder.seed()
    await PartSeeder.seed()
    await ImageSeeder.seed()
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
