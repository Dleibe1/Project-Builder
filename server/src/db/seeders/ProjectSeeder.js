import { Project } from "../../models/index.js"
import projectCodeSeedData from "../ProjectSeederData/projectCodeSeedData.js"
import projectDescriptionsSeedData from "../ProjectSeederData/projectDescriptionsSeedData.js"
import projectInstructionsSeedData from "../ProjectSeederData/projectInstructionsSeedData.js"

class ProjectSeeder {
  static async seed() {
    const parentProjects = [
      {
        userId: 1,
        title: "Interfacing RGB Led with Arduino",
        description: projectDescriptionsSeedData[0],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[13],
        thumbnailImage: "/images/projectSeeder/project001/thumbnail.blob",
        instructions: projectInstructionsSeedData[0],
      },
      {
        userId: 1,
        title: "Using DHT11",
        description: projectDescriptionsSeedData[14],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[14],
        thumbnailImage: "/images/projectSeeder/project002/thumbnail.blob",
        instructions: projectInstructionsSeedData[1],
      },
    ]
    const extraProjects = [
      {
        userId: 2,
        title: "Automated plants watering system",
        description: projectDescriptionsSeedData[2],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[2],
        githubFileURL:
          "https://github.com/hibit-dev/plants-care/blob/master/src/station/station.ino",
        thumbnailImage: "/images/projectSeeder/project003/thumbnail.jpg",
        instructions: projectInstructionsSeedData[2],
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: projectDescriptionsSeedData[3],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[3],
        thumbnailImage: "/images/projectSeeder/project004/thumbnail.jpg",
        instructions: projectInstructionsSeedData[3],
      },
      {
        userId: 2,
        title: "Arduino OLED Eyes Animation for Robotics Projects",
        description: projectDescriptionsSeedData[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: projectCodeSeedData[4],
        thumbnailImage: "/images/projectSeeder/project005/thumbnail.jpg",
        instructions: projectInstructionsSeedData[4],
      },
      {
        userId: 1,
        title: "Build Your Own Object Tracking 4-DOF Robotics Arm With Arduino",
        description: projectDescriptionsSeedData[5],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[5],
        thumbnailImage: "/images/projectSeeder/project006/thumbnail.png",
        instructions: projectInstructionsSeedData[5],
      },
      {
        userId: 2,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: projectDescriptionsSeedData[6],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage: "/images/projectSeeder/project007/thumbnail.jpg",
        instructions: projectInstructionsSeedData[6],
      },
      {
        userId: 1,
        title: "DIY Arduino ultrasonic Sonar - Radar on TFT display",
        description: projectDescriptionsSeedData[7],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[7],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project008/thumbnail.jpg",
        instructions: projectInstructionsSeedData[7],
      },
      {
        userId: 3,
        title: "Decode IR Remote Control Signals of any Remote Using Arduino",
        description: projectDescriptionsSeedData[8],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[8],
        thumbnailImage: "/images/projectSeeder/project009/thumbnail.blob",
        instructions: projectInstructionsSeedData[8],
      },
    ]
    const exampleUserProjects = [
      {
        // id = 10
        userId: 4,
        title: "L298n Motor driver Arduino",
        description: projectDescriptionsSeedData[9],
        appsAndPlatforms: "Arduino IDE and NanoEdge AI Studio",
        code: projectCodeSeedData[9],
        thumbnailImage: "/images/projectSeeder/project010/thumbnail.blob",
        instructions: projectInstructionsSeedData[9],
      },
      {
        userId: 4,
        title: "Temperature Monitoring with Arduino IoT Cloud using DHT22",
        description: projectDescriptionsSeedData[10],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: projectCodeSeedData[10],
        thumbnailImage: "/images/projectSeeder/project011/thumbnail.png",
        instructions: projectInstructionsSeedData[10],
      },
      {
        userId: 4,
        title: "Cardboard Gesture Recognition with Embedded AI",
        description: projectDescriptionsSeedData[11],
        appsAndPlatforms: "NanoEdge AI Studio and Arduino IDE 1.8.19",
        code: projectCodeSeedData[11],
        thumbnailImage: "/images/projectSeeder/project012/thumbnail.gif",
        instructions: projectInstructionsSeedData[11],
      },
      {
        userId: 4,
        title: "How PIR Sensor Works and How To Interface It with Arduino",
        description: projectDescriptionsSeedData[12],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[12],
        thumbnailImage: "/images/projectSeeder/project013/thumbnail.jpg",
        instructions: projectInstructionsSeedData[12],
      },
      {
        userId: 4,
        title: "Big Brother is watching you",
        description: projectDescriptionsSeedData[0],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[0],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project014/thumbnail.jpg",
        instructions: projectInstructionsSeedData[13],
      },
      {
        userId: 4,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: projectDescriptionsSeedData[1],
        appsAndPlatforms: "Arduino IDE, MIT App Inventor 2",
        code: projectCodeSeedData[1],
        githubFileURL: "",
        thumbnailImage: "/images/projectSeeder/project015/thumbnail.jpg",
        instructions: projectInstructionsSeedData[14],
      },
      {
        userId: 2,
        title: "Ultrasonic sensor with Arduino - Complete Guide",
        description: projectDescriptionsSeedData[15],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[15],
        thumbnailImage: "/images/projectSeeder/project016/thumbnail.png",
        instructions: projectInstructionsSeedData[15],
      },
      {
        userId: 2,
        title: "Simple Soil Moisture Sensor",
        description: projectDescriptionsSeedData[16],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[16],
        thumbnailImage: "/images/projectSeeder/project017/thumbnail.blob",
        instructions: projectInstructionsSeedData[16],
      },
      {
        userId: 2,
        title: "Control your air conditioner remotely",
        description: projectDescriptionsSeedData[17],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: projectCodeSeedData[17],
        thumbnailImage: "/images/projectSeeder/project018/thumbnail.jpg",
        instructions: projectInstructionsSeedData[17],
      },
    ]
    const forks = [
      {
        //id: 19
        userId: 2,
        title: "Interfacing RGB Led with Push Button and Arduino",
        description: projectDescriptionsSeedData[18],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[18],
        thumbnailImage: "/images/projectSeeder/project001fork001/thumbnail.JPG",
        instructions: projectInstructionsSeedData[18],
        parentProjectId: 1,
      },
      {
        userId: 1,
        title: "Using DHT11 with I2C OLED display",
        description: projectDescriptionsSeedData[19],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[19],
        thumbnailImage: "/images/projectSeeder/project002fork001/thumbnail.png",
        instructions: projectInstructionsSeedData[19],
        parentProjectId: 2,
      },
    ]
    await Project.query().insert(parentProjects)
    await Project.query().insert(extraProjects)
    await Project.query().insert(exampleUserProjects)
    await Project.query().insert(forks)
  }
}

export default ProjectSeeder
