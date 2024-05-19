
import { connection } from "../boot.js"
import { User, Project, Part } from "../models/index.js"

class Seeder {
  static async seed() {
    await User.query().insert({ email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1" })
    await User.query().insert({ email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan" })
    await User.query().insert({ email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris" })

    await Project.query().insert({
      userId: 1,
      title: "Servo Controlled By Remote",
      description: "Control Servo Motor using IR Remote",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "Should be showing github code",
      githubFileURL: "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp"
    })
    await Project.query().insert({
      userId: 1,
      title: "Dice Roller",
      description: "Dice Rolling Simulator",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "Should be showing github code",
      githubFileURL: "https://github.com/AashiDutt/Arduino_Projects/blob/master/Dice%20Roller/sketch_jul19a/sketch_jul19a.ino"

    })
    await Project.query().insert({
      userId: 2,
      title: "Combat Robot",
      description: "Fighting Robot",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "Should be showing github code",
      githubFileURL: "https://github.com/MexsonFernandes/ArduinoProjects/blob/master/combatRobot2.ino"
    })
    await Project.query().insert({
      userId: 2,
      title: "Drone",
      description: "Self leveling drone!",
      appsAndPlatforms: "Arduino IDE or PlatformIO",
      code: "Manually Entered Code: import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
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
