import { Project } from "../../models/index.js"
import code from "../ProjectSeederData/code.js"
import descriptions from "../ProjectSeederData/descriptions.js"
import richTextInstructions from "../InstructionsSeederData/instructionsMigrationService.js"

class ProjectSeeder {
  static async seed() {
    const parentProjects1 = [
      {
        userId: 1,
        title: "Interfacing RGB Led with Arduino",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE",
        code: code[13],
        thumbnailImage: "/images/projectSeeder/project001/thumbnail.blob",
        instructions: richTextInstructions[0],
      },
      {
        userId: 1,
        title: "Using DHT11",
        description: descriptions[14],
        appsAndPlatforms: "Arduino IDE",
        code: code[14],
        thumbnailImage: "/images/projectSeeder/project002/thumbnail.blob",
        instructions: richTextInstructions[1],
      },
      {
        userId: 2,
        title: "Automated plants watering system",
        description: descriptions[2],
        appsAndPlatforms: "Arduino IDE",
        code: code[2],
        githubFileURL:
          "https://github.com/hibit-dev/plants-care/blob/master/src/station/station.ino",
        thumbnailImage: "/images/projectSeeder/project003/thumbnail.jpg",
        instructions: richTextInstructions[2],
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE",
        code: code[3],
        thumbnailImage: "/images/projectSeeder/project004/thumbnail.jpg",
        instructions: richTextInstructions[3],
      },
      {
        userId: 2,
        title: "Arduino OLED Eyes Animation for Robotics Projects",
        description: descriptions[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[4],
        thumbnailImage: "/images/projectSeeder/project005/thumbnail.jpg",
        instructions: richTextInstructions[4],
      },
      {
        userId: 1,
        title: "Build Your Own Object Tracking 4-DOF Robotics Arm With Arduino",
        description: descriptions[5],
        appsAndPlatforms: "Arduino IDE",
        code: code[5],
        thumbnailImage: "/images/projectSeeder/project006/thumbnail.png",
        instructions: richTextInstructions[5],
      },
      {
        userId: 2,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: descriptions[6],
        appsAndPlatforms: "Arduino IDE",
        code: code[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage: "/images/projectSeeder/project007/thumbnail.jpg",
        instructions: richTextInstructions[6],
      },
      {
        userId: 1,
        title: "DIY Arduino ultrasonic Sonar - Radar on TFT display",
        description: descriptions[7],
        appsAndPlatforms: "Arduino IDE",
        code: code[7],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project008/thumbnail.jpg",
        instructions: richTextInstructions[7],
      },
      {
        userId: 3,
        title: "Decode IR Remote Control Signals of any Remote Using Arduino",
        description: descriptions[8],
        appsAndPlatforms: "rogerbit.",
        code: code[8],
        thumbnailImage: "/images/projectSeeder/project009/thumbnail.blob",
        instructions: richTextInstructions[8],
      },
    ]
    await Project.query().insert(parentProjects1)

    const exampleUserProjects = [
      {
        // id = 10
        userId: 4,
        title: "L298n Motor driver Arduino",
        description: descriptions[9],
        appsAndPlatforms: "Arduino IDE and NanoEdge AI Studio",
        code: code[9],
        thumbnailImage: "/images/projectSeeder/project010/thumbnail.blob",
        instructions: richTextInstructions[9],
      },
      {
        userId: 4,
        title: "Temperature Monitoring with Arduino IoT Cloud using DHT22",
        description: descriptions[10],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: code[10],
        thumbnailImage: "/images/projectSeeder/project011/thumbnail.png",
        instructions: richTextInstructions[10],
      },
      {
        userId: 4,
        title: "Cardboard Gesture Recognition with Embedded AI",
        description: descriptions[11],
        appsAndPlatforms: "NanoEdge AI Studio and Arduino IDE 1.8.19",
        code: code[11],
        thumbnailImage: "/images/projectSeeder/project012/thumbnail.gif",
        instructions: richTextInstructions[11],
      },
      {
        userId: 4,
        title: "How PIR Sensor Works and How To Interface It with Arduino",
        description: descriptions[12],
        appsAndPlatforms: "Arduino IDE",
        code: code[12],
        thumbnailImage: "/images/projectSeeder/project013/thumbnail.jpg",
        instructions: richTextInstructions[12],
      },
      {
        userId: 4,
        title: "Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE",
        code: code[0],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project014/thumbnail.jpg",
        instructions: richTextInstructions[13],
      },
      {
        userId: 4,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: descriptions[1],
        appsAndPlatforms: "Arduino IDE, MIT App Inventor 2",
        code: code[1],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project015/thumbnail.jpg",
        instructions: richTextInstructions[14],
      },
      {
        userId: 2,
        title: "Ultrasonic sensor with Arduino - Complete Guide",
        description: descriptions[15],
        appsAndPlatforms: "Arduino IDE",
        code: code[15],
        thumbnailImage: "/images/projectSeeder/project016/thumbnail.png",
        instructions: richTextInstructions[15],
      },
      {
        userId: 2,
        title: "Simple Soil Moisture Sensor",
        description: descriptions[16],
        appsAndPlatforms: "Arduino IDE",
        code: code[16],
        thumbnailImage: "/images/projectSeeder/project017/thumbnail.blob",
        instructions: richTextInstructions[16],
      },
      {
        userId: 2,
        title: "Control your air conditioner remotely",
        description: descriptions[17],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: code[17],
        thumbnailImage: "/images/projectSeeder/project018/thumbnail.jpg",
        instructions: richTextInstructions[17],
      },
    ]
    const forks = [
      {
        //id: 19
        userId: 2,
        title: "Interfacing RGB Led with Push Button and Arduino",
        description: descriptions[18],
        appsAndPlatforms: "Arduino IDE",
        code: code[18],
        thumbnailImage: "/images/projectSeeder/project001fork001/thumbnail.JPG",
        instructions: richTextInstructions[18],
        parentProjectId: 1,
      },
      {
        userId: 1,
        title: "Using DHT11 with I2C OLED display",
        description: descriptions[19],
        appsAndPlatforms: "Arduino IDE",
        code: code[19],
        thumbnailImage: "/images/projectSeeder/project002fork001/thumbnail.avif",
        instructions: richTextInstructions[19],
        parentProjectId: 2,
      },
    ]
    await Project.query().insert(exampleUserProjects)
    await Project.query().insert(forks)
  }
}

export default ProjectSeeder
