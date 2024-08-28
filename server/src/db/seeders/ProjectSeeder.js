import { Project } from "../../models/index.js"
import code from "../ProjectSeederData/code.js"
import descriptions from "../ProjectSeederData/descriptions.js"

class ProjectSeeder {
  static async seed() {
    const parentProjects1 = [
       {
        userId: 1,
        title: "Interfacing RGB Led with Arduino",
        description: descriptions[13],
        appsAndPlatforms: "Arduino IDE",
        code: code[13],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/36ab7d7a-100b-4350-8f17-0b0234582c0b.blob",
      },
      {
        userId: 1,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: descriptions[1],
        appsAndPlatforms: "Arduino IDE, MIT App Inventor 2",
        code: code[1],
        githubFileURL: "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
      },
      {
        userId: 2,
        title: "Automated plants watering system",
        description: descriptions[2],
        appsAndPlatforms: "Arduino IDE",
        code: code[2],
        githubFileURL: "https://github.com/hibit-dev/plants-care/blob/master/src/station/station.ino",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE",
        code: code[3],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
      },
      {
        userId: 2,
        title: "Arduino OLED Eyes Animation for Robotics Projects",
        description: descriptions[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[4],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/0633ba80-aeb9-426a-89fc-ab9197b6191f.jpg",
      },
      {
        userId: 1,
        title: "Build Your Own Object Tracking 4-DOF Robotics Arm With Arduino",
        description: descriptions[5],
        appsAndPlatforms: "Arduino IDE",
        code: code[5],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/d3d28934-f6b8-4626-9fc2-f06fe058b398.png",
      },
      {
        userId: 2,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: descriptions[6],
        appsAndPlatforms: "Arduino IDE",
        code: code[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/bd1eaad5-6738-4bbb-bf71-be3028fa1032.jpg",
      },
      {
        userId: 1,
        title: "DIY Arduino ultrasonic Sonar - Radar on TFT display",
        description: descriptions[7],
        appsAndPlatforms: "Arduino IDE",
        code: code[7],
        githubFileURL:
          "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/bf79fd77-788d-4d92-bc5a-2a628633939a.jpg",
      },
      {
        userId: 3,
        title: "Decode IR Remote Control Signals of any Remote Using Arduino",
        description: descriptions[8],
        appsAndPlatforms: "rogerbit.",
        code: code[8],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/5454a669-2c00-4c8e-8e56-90d863ab3315.blob",
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
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/8b4f6361-dff4-4900-851d-7983e78e338a.blob",
      },
      {
        userId: 4,
        title: "Temperature Monitoring with Arduino IoT Cloud using DHT22",
        description: descriptions[10],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: code[10],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/91fa89b7-2009-4a9c-b8de-aec71f62ee82.png",
      },
      {
        userId: 4,
        title: "Temperature Monitoring with Arduino IoT Cloud using DHT22",
        description: descriptions[11],
        appsAndPlatforms: "NanoEdge AI Studio and Arduino IDE 1.8.19",
        code: code[11],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/4a43b1e1-7bb2-4e8b-8abf-1a805760311b.gif",
      },
      {
        userId: 4,
        title: "How PIR Sensor Works and How To Interface It with Arduino",
        description: descriptions[12],
        appsAndPlatforms: "Arduino IDE",
        code: code[12],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/e4de2c23-7118-4b3f-abf8-50cb8282cf62.jpg",
      },
      {
        userId: 4,
        title: "Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE",
        code: code[0],
        githubFileURL: "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
      },
      {
        userId: 4,
        title: "Using DHT11",
        description: descriptions[14],
        appsAndPlatforms: "Arduino IDE",
        code: code[14],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/70b80f40-3f40-4b90-84d2-a1a66301d7bc.blob",
      },
      {
        userId: 2,
        title: "Ultrasonic sensor with Arduino - Complete Guide",
        description: descriptions[15],
        appsAndPlatforms: "Arduino IDE",
        code: code[15],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/9cf024c7-0b54-4a19-adbf-15ba0889cb32.png",
      },
      {
        userId: 2,
        title: "Simple Soil Moisture Sensor",
        description: descriptions[16],
        appsAndPlatforms: "Arduino IDE",
        code: code[16],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/d06d87dd-8c15-43c1-b987-de6567c72f37.blob",
      },
      {
        userId: 2,
        title: "Control your air conditioner remotely",
        description: descriptions[17],
        appsAndPlatforms: "Arduino IoT Cloud",
        code: code[17],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/876135e3-82cc-462f-83b5-e21ebacd87ea.jpg",
      },
    ]
    const forks = [
      {
        userId: 2,
        title: "Interfacing RGB Led with Arduino",
        description: descriptions[18],
        appsAndPlatforms: "Arduino IDE",
        code: code[18],
        thumbnailImage:
          "https://hackster.imgix.net/uploads/attachments/340746/button_push_color_change_UM2JWnHSDv.JPG",
        parentProjectId: 1
      },
    ]
    await Project.query().insert(exampleUserProjects)
    await Project.query().insert(forks)
  }
}

export default ProjectSeeder
