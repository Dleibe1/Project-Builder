import { connection } from "../boot.js"
import { Part, Image } from "../models/index.js"
import UserSeeder from "./UserSeeder.js"
import ProjectSeeder from "./ProjectSeeder.js"

class Seeder {
  static async seed() {
    await UserSeeder.seed()
    await ProjectSeeder.seed()

    await Part.query().insert([
      { partName: "Arduino", projectId: 1 },
      { partName: "Breadboard", projectId: 1 },
      { partName: "Arduino", projectId: 2 },
      { partName: "H-bridge", projectId: 2 },
      { partName: "ESP32", projectId: 3 },
      { partName: "H-bridge", projectId: 3 },
      { partName: "Arduino", projectId: 4 },
      { partName: "RBG LED", projectId: 4 },
    ])

    await Image.query().insert([
      {
        projectId: 1,
        imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg",
      },
      {
        projectId: 1,
        imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg",
      },
      {
        projectId: 2,
        imageURL:
          "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png",
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/schemas/watering_system.png",
      },
      {
        projectId: 4,
        imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg",
      },
      {
        projectId: 4,
        imageURL: "https://projects.arduinocontent.cc/baa52ff1-ba12-4836-8e73-c7d2ea01f084.jpg",
      },
    ])

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
