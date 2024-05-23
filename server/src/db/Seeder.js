import { connection } from "../boot.js"
import { User, Project, Part, Image } from "../models/index.js"

class Seeder {
  static async seed() {
    await User.query().insert([
      { email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1" },
      { email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan" },
      { email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris" },
    ])

    await Project.query().insert([
      {
        userId: 1,
        title: "Big Brother is watching you",
        description: "Big Brother's eyes follow your movements and squint when you get closer.",
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: "Should be showing github code",
        githubFileURL:
          "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
          parentProjectId: 1
      },
      {
        userId: 1,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: "Have you ever dreamt of commanding a robot car with just your phone? Well, dream no more! This project equips you with the tools and know-how to build your very own Bluetooth-controlled robot car, ready to zoom and zip at your every whim.",
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: "Should be showing github code",
        githubFileURL:
          "https://github.com/AashiDutt/Arduino_Projects/blob/master/Dice%20Roller/sketch_jul19a/sketch_jul19a.ino",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
          parentProjectId: 2
      },
      {
        userId: 2,
        title: "Automated plants watering system",
        description: "Fighting Robot",
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: "Should be showing github code",
        githubFileURL:
          "https://github.com/MexsonFernandes/ArduinoProjects/blob/master/combatRobot2.ino",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
          parentProjectId: 3
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: "This is an extremely simple, but still visually very effective project, and can serve as a gadget on your desktop, or as an addition to an audio device.",
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: "Manually Entered Code: import arduino.h\nPinMode(5, OUTPUT)\nPinMode(6, OUTPUT)",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
          parentProjectId: 4
      },
    ])

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
      { projectId: 1, imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg" },
      { projectId: 2, imageURL: "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png" },
      { projectId: 3, imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png" },
      { projectId: 4, imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg" },
    ])

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
