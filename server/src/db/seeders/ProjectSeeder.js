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
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/36ab7d7a-100b-4350-8f17-0b0234582c0b.blob",
        instructions: projectInstructionsSeedData[0],
      },
      {
        userId: 2,
        title: "Using a DHT11 Temperature and Humidity Sensor",
        description: projectDescriptionsSeedData[14],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[14],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/70b80f40-3f40-4b90-84d2-a1a66301d7bc.blob",
        instructions: projectInstructionsSeedData[1],
      },
    ]
    const extraProjects = [
      {
        userId: 3,
        title: "Automated Plants Watering System",
        description: projectDescriptionsSeedData[2],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[2],
        githubFileURL:
          "https://github.com/hibit-dev/plants-care/blob/master/src/station/station.ino",
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
        instructions: projectInstructionsSeedData[2],
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: projectDescriptionsSeedData[3],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[3],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
        instructions: projectInstructionsSeedData[3],
      },
      {
        userId: 5,
        title: "Arduino OLED Eyes Animation for Robotics Projects",
        description: projectDescriptionsSeedData[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: projectCodeSeedData[4],
        thumbnailImage: "https://i.imgur.com/944ugZj.jpeg",
        instructions: projectInstructionsSeedData[4],
      },
      {
        userId: 6,
        title: "Build Your Own Object Tracking 4-DOF Robotics Arm With Arduino",
        description: projectDescriptionsSeedData[5],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[5],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/d3d28934-f6b8-4626-9fc2-f06fe058b398.png",
        instructions: projectInstructionsSeedData[5],
      },
      {
        userId: 7,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: projectDescriptionsSeedData[6],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/bd1eaad5-6738-4bbb-bf71-be3028fa1032.jpg",
        instructions: projectInstructionsSeedData[6],
      },
      {
        userId: 8,
        title: "DIY Arduino Ultrasonic Sonar - Radar on TFT Display",
        description: projectDescriptionsSeedData[7],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[7],
        githubFileURL: "",
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/bf79fd77-788d-4d92-bc5a-2a628633939a.jpg",
        instructions: projectInstructionsSeedData[7],
      },
      {
        userId: 1,
        title: "Decode IR Remote Control Signals of any Remote Using Arduino",
        description: projectDescriptionsSeedData[8],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[8],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/5454a669-2c00-4c8e-8e56-90d863ab3315.blob",
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
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/8b4f6361-dff4-4900-851d-7983e78e338a.blob",
        instructions: projectInstructionsSeedData[9],
      },
      {
        userId: 4,
        title: "Temperature Monitoring with a DHT22 and Arduino IoT Cloud",
        description: projectDescriptionsSeedData[10],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: projectCodeSeedData[10],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/91fa89b7-2009-4a9c-b8de-aec71f62ee82.png",
        instructions: projectInstructionsSeedData[10],
      },
      {
        userId: 4,
        title: "Cardboard Gesture Recognition with Embedded AI",
        description: projectDescriptionsSeedData[11],
        appsAndPlatforms: "NanoEdge AI Studio and Arduino IDE 1.8.19",
        code: projectCodeSeedData[11],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/4a43b1e1-7bb2-4e8b-8abf-1a805760311b.gif",
        instructions: projectInstructionsSeedData[11],
      },
      {
        userId: 4,
        title: "How PIR Sensor Works and How To Interface It with Arduino",
        description: projectDescriptionsSeedData[12],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[12],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/9f9d0833-a94f-491b-9f4d-20518987bfe5.jpg",
        instructions: projectInstructionsSeedData[12],
      },
      {
        userId: 4,
        title: "Big Brother is watching you",
        description: projectDescriptionsSeedData[13],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[0],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
        instructions: projectInstructionsSeedData[13],
      },
      {
        userId: 4,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: projectDescriptionsSeedData[1],
        appsAndPlatforms: "Arduino IDE, MIT App Inventor 2",
        code: projectCodeSeedData[1],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
        instructions: projectInstructionsSeedData[14],
      },
    ]
    const moreExtraProjects = [
      {
        userId: 2,
        title: "Ultrasonic sensor with Arduino - Complete Guide",
        description: projectDescriptionsSeedData[15],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[15],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/9cf024c7-0b54-4a19-adbf-15ba0889cb32.png",
        instructions: projectInstructionsSeedData[15],
      },
      {
        userId: 3,
        title: "Simple Soil Moisture Sensor",
        description: projectDescriptionsSeedData[16],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[16],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/d06d87dd-8c15-43c1-b987-de6567c72f37.blob",
        instructions: projectInstructionsSeedData[16],
      },
      {
        userId: 5,
        title: "Control Your Air Conditioner Remotely",
        description: projectDescriptionsSeedData[17],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: projectCodeSeedData[17],
        thumbnailImage: "https://projects.arduinocontent.cc/cover-images/876135e3-82cc-462f-83b5-e21ebacd87ea.jpg",
        instructions: projectInstructionsSeedData[17],
      },
    ]

    const forks = [
      {
        //id: 19
        userId: 2,
        title: "Interfacing RGB Led with Arduino and Push Button",
        description: projectDescriptionsSeedData[18],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[18],
        thumbnailImage: "https://i.imgur.com/W10ht6R.jpeg",
        instructions: projectInstructionsSeedData[18],
        parentProjectId: 1,
      },
      {
        userId: 1,
        title: "Using a DHT11 Sensor With an OLED display",
        description: projectDescriptionsSeedData[19],
        appsAndPlatforms: "Arduino IDE",
        code: projectCodeSeedData[19],
        thumbnailImage: "https://i.imgur.com/MBYqjId.png",
        instructions: projectInstructionsSeedData[19],
        parentProjectId: 2,
      },
    ]
    await Project.query().insert(parentProjects)
    await Project.query().insert(extraProjects)
    await Project.query().insert(exampleUserProjects)
    await Project.query().insert(moreExtraProjects)
    await Project.query().insert(forks)
  }
}

export default ProjectSeeder
