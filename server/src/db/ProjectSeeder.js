import { Project } from "../models/index.js"
import code from "./ProjectSeederData/code.js"
import descriptions from "./ProjectSeederData/descriptions.js"


class ProjectSeeder {
  static async seed() {
   const parentProjects = [
      {
        userId: 1,
        title: "Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[0],
        githubFileURL:
          "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
        thumbnailImageURL:
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
        thumbnailImageURL:
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
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
        parentProjectId: 3,
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[3],
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
        parentProjectId: 4,
      },
    ]

    const forks = [
      {
        userId: 2,
        title: "My version of Big Brother is watching you",
        description: descriptions[0],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[0],
        githubFileURL:
          "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
        thumbnailImageURL:
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
        thumbnailImageURL:
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
        thumbnailImageURL:
          "https://m.media-amazon.com/images/I/71HHUsbSsrL.jpg",
        parentProjectId: 3,
      },
      {
        userId: 1,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: descriptions[3],
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: code[3],
        thumbnailImageURL:
          "https://www.siraudiotools.com/pics/spectrumAnalyzer_slide0.jpg",
        parentProjectId: 4,
      },
    ]
    await Project.query().insert(parentProjects)
    await Project.query().insert(forks)
  }
}

export default ProjectSeeder