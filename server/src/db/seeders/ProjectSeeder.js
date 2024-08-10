import { Project } from "../../models/index.js"
import code from "../ProjectSeederData/code.js"
import descriptions from "../ProjectSeederData/descriptions.js"

class ProjectSeeder {
  static async seed() {
    const parentProjects1 = [
      {
        userId: 1,
        title: "Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE",
        code: code[0],
        githubFileURL: "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
        parentProjectId: 1,
      },
      {
        userId: 1,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: descriptions[1],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[1],
        githubFileURL: "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
        parentProjectId: 2,
      },
      {
        userId: 2,
        title: "Automated plants watering system",
        description: descriptions[2],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[2],
        githubFileURL: "",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
        parentProjectId: 3,
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[3],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
        parentProjectId: 4,
      },
      {
        userId: 2,
        title: "Arduino OLED Eyes Animation for Robotics Projects",
        description: descriptions[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[4],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/0633ba80-aeb9-426a-89fc-ab9197b6191f.jpg",
        parentProjectId: 5,
      },
      {
        userId: 1,
        title: "Build Your Own Object Tracking 4-DOF Robotics Arm With Arduino",
        description: descriptions[5],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[5],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/d3d28934-f6b8-4626-9fc2-f06fe058b398.png",
        parentProjectId: 6,
      },
      {
        userId: 2,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: descriptions[6],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/bd1eaad5-6738-4bbb-bf71-be3028fa1032.jpg",
        parentProjectId: 7,
      },
      {
        userId: 1,
        title: "Arduino UNO game engine with composite video output",
        description: descriptions[7],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[7],
        githubFileURL:
          "https://github.com/Smashcat/UNO_Manic_Miner/blob/main/games/ManicMiner/ManicMiner.ino",
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/a5e8e30a-2819-4b67-8d5b-604723ac43af.png",
        parentProjectId: 8,
      },
      {
        userId: 3,
        title: "To Boil Or Not To Boil? That Is The Question!",
        description: descriptions[8],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[8],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/946b62af-00b7-4230-8925-6bcae9614ede.gif",
        parentProjectId: 9,
      },
    ]

    const forks1 = [
      {
        //id = 10
        userId: 2,
        title: "My version of Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[0],
        githubFileURL:
          "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
        thumbnailImage:
          "https://upload.wikimedia.org/wikipedia/en/c/ca/Big_Brother_US_2020_Logo.png",
        parentProjectId: 1,
      },
      {
        userId: 2,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car Remix!",
        description: descriptions[1],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[1],
        githubFileURL: "",
        thumbnailImage:
          "https://assets.newatlas.com/dims4/default/692e5c9/2147483647/strip/true/crop/3360x2240+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fa8%2Fea%2F4bafa7a94a7cbc817052c3a82274%2Findi-09.jpg",
        parentProjectId: 2,
      },
      {
        userId: 1,
        title: "Automated plants watering system",
        description: descriptions[2],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[2],
        githubFileURL: "",
        thumbnailImage: "https://m.media-amazon.com/images/I/71HHUsbSsrL.jpg",
        parentProjectId: 3,
      },
      {
        userId: 1,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[3],
        thumbnailImage: "https://www.siraudiotools.com/pics/spectrumAnalyzer_slide0.jpg",
        parentProjectId: 4,
      },
      {
        userId: 3,
        title: "New Version of OLED Eyes Animation for Robotics Projects",
        description: descriptions[4],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[4],
        thumbnailImage: "https://i.ytimg.com/vi/n3Fj2zCOv98/sddefault.jpg",
        parentProjectId: 5,
      },
      {
        userId: 2,
        title: "Modified Object Tracking 4-DOF Robotics Arm With Arduino",
        description: descriptions[5],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[5],
        thumbnailImage:
          "https://wp.technologyreview.com/wp-content/uploads/2019/06/eva-main-imageedited-10.jpg",
        parentProjectId: 6,
      },
      {
        userId: 1,
        title: "ARPoLAN: Network Monitoring and Security Tool",
        description: descriptions[6],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[6],
        githubFileURL:
          "https://github.com/cifertech/ARPoLAN/blob/main/Code/EthernetDucky/EthernetDucky.ino",
        thumbnailImage: "https://hackaday.com/wp-content/uploads/2018/09/ducky_feat.jpg",
        parentProjectId: 7,
      },
      {
        userId: 2,
        title: "Arduino UNO modified game system",
        description: descriptions[7],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[7],
        githubFileURL:
          "https://github.com/Smashcat/UNO_Manic_Miner/blob/main/games/ManicMiner/ManicMiner.ino",
        thumbnailImage:
          "https://cdn.mobygames.com/screenshots/1971819-basketball-atari-2600-the-game-in-black-and-white-mode.png",
        parentProjectId: 8,
      },
      {
        // id = 18
        userId: 2,
        title: "To Boil Or Not To Boil? That Is The Question!",
        description: descriptions[8],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[8],
        thumbnailImage:
          "https://www.smartmachine.com/wp-content/uploads/2018/05/Cooper-River-Brewery.jpg",
        parentProjectId: 9,
      },
    ]
    await Project.query().insert(parentProjects1)
    await Project.query().insert(forks1)

    const exampleUserProjects = [
      {
        // id = 19
        userId: 4,
        title: "How To Do Automatic Song classification",
        description: descriptions[9],
        appsAndPlatforms: "Arduino IDE and NanoEdge AI Studio",
        code: code[9],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/898064f0-ad8a-4ea9-a666-c2afbea15f41.gif",
        parentProjectId: 19
      },
      {
        userId: 4,
        title: "How to make simplest possible autorange Capacitance meter",
        description: descriptions[10],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[10],
        thumbnailImage:
          "https://projects.arduinocontent.cc/cover-images/cea949c5-d9fa-40cd-b847-d5db51a3f787.jpg",
        parentProjectId: 20
      },
    ]
    const exampleUserProjectForks = [
      {
        // id = 19
        userId: 3,
        title: "My version of How To Do Automatic Song classification",
        description: descriptions[9],
        appsAndPlatforms: "Arduino IDE and NanoEdge AI Studio",
        code: code[9],
        thumbnailImage:
          "https://cdn.sparkfun.com/assets/9/1/e/4/8/515b4656ce395f8a38000000.png",
        parentProjectId: 19
      },
      {
        userId: 3,
        title: "My version of simplest possible autorange Capacitance meter",
        description: descriptions[10],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[10],
        thumbnailImage:
          "https://content.instructables.com/FIO/94AS/IDH7U229/FIO94ASIDH7U229.png",
        parentProjectId: 20
      },
    ]
    await Project.query().insert(exampleUserProjects)
    await Project.query().insert(exampleUserProjectForks)


  }
}

export default ProjectSeeder
