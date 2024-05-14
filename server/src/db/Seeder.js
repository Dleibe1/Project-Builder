/* eslint-disable no-console */
import { connection } from "../boot.js"
import { User, Project } from "../models/index.js"

class Seeder {
  static async seed() {
    // include individual seed commands here

    await User.query().insert({ email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1" })
    await User.query().insert({ email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan" })
    await User.query().insert({ email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris" })

    await Project.query().insert({
      userId: 1,
      title: "Spider Robot",
      description: "This walking robot uses the 3d printed parts and servo motors to walk in any direction",
      parts: "6 servos, Arduino, breadboard, breadboard wire",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nServo servo",
    })
    await Project.query().insert({
      userId: 1,
      title: "Automatic Plant Waterer",
      description: "This project is for automatic watering of indoor plants and hydroponic gardens",
      parts: "5v relay, capacitive soil sensor, Arduino",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, INPUT)\nPinMode(6, OUTPUT)",
    })
    await Project.query().insert({
      userId: 2,
      title: "Macanum Wheel Car",
      parts: "Macanum wheel robot chassis, hookup wire, Arduino ",
      description: "This car can move in any direction without turning its wheels!",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
    })

    await Project.query().insert({
      userId: 2,
      title: "Drone",
      parts: "Carbon fiber frame, 4 large brushless motors, ESP32 microcontroller, 1800 MAH lipo battery ",
      description: "Self leveling drone!",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
    })

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
