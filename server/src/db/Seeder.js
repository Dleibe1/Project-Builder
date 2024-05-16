
import { connection } from "../boot.js"
import { User, Project, Part } from "../models/index.js"

class Seeder {
  static async seed() {
    await User.query().insert({ email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1" })
    await User.query().insert({ email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan" })
    await User.query().insert({ email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris" })

    await Project.query().insert({
      userId: 1,
      title: "Spider Robot",
      description: "This walking robot uses the 3d printed parts and servo motors to walk in any direction",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nServo servo",
    })
    await Project.query().insert({
      userId: 1,
      title: "Automatic Plant Waterer",
      description: "This project is for automatic watering of indoor plants and hydroponic gardens",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, INPUT)\nPinMode(6, OUTPUT)",
    })
    await Project.query().insert({
      userId: 2,
      title: "Macanum Wheel Car",
      description: "This car can move in any direction without turning its wheels!",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
    })
    await Project.query().insert({
      userId: 2,
      title: "Drone",
      description: "Self leveling drone!",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
    })

    await Part.query().insert({partName: "Arduino", projectId: 1})
    await Part.query().insert({partName: "Breadboard", projectId: 1})
    await Part.query().insert({partName: "Arduino", projectId: 2})
    await Part.query().insert({partName: "H-bridge", projectId: 2})
    await Part.query().insert({partName: "ESP32", projectId: 3})
    await Part.query().insert({partName: "H-bridge", projectId: 3})
    await Part.query().insert({partName: "Arduino", projectId: 4})
    await Part.query().insert({partName: "RBG LED", projectId: 4})


    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
