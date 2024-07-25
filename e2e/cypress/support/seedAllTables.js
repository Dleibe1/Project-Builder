const users = [
  {
    email: "dleibe1@google.com",
    password: "password",
    userName: "dleibe1",
    loginMethod: "standard",
    password: "password",
  },
  {
    email: "lukeM2@hotmail.com",
    password: "password",
    userName: "lukeTheMan",
    loginMethod: "standard",
    password: "password",
  },
]

const parentProjects = [
  {
    userId: 1,
    title: "Big Brother is watching you",
    description: "Example Description",
    appsAndPlatforms: "Arduino IDE or PlatformIO",
    code: "Arduino.h",
    githubFileURL:
      "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
    thumbnailImage:
      "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
    parentProjectId: 1,
  },
  {
    userId: 1,
    title: "SmartPhone Controlled Arduino Based Bluetooth Car",
    description: "Cool Car",
    appsAndPlatforms: "Arduino IDE or PlatformIO",
    code: "Servo.h",
    githubFileURL: "",
    thumbnailImage:
      "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
    parentProjectId: 2,
  },
]

const projectForks = [
  {
    userId: 2,
    title: "My version of Big Brother is watching you",
    description: "Ultrasonic Eyes",
    appsAndPlatforms: "Arduino IDE or PlatformIO",
    code: "Ultrasonic.h",
    githubFileURL:
      "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
    thumbnailImage: "https://upload.wikimedia.org/wikipedia/en/c/ca/Big_Brother_US_2020_Logo.png",
    parentProjectId: 1,
  },
  {
    userId: 2,
    title: "SmartPhone Controlled Arduino Based Bluetooth Car Remix!",
    description: "Remix of bluetooth car",
    appsAndPlatforms: "Arduino IDE or PlatformIO",
    code: "Bluetooth.h",
    githubFileURL: "",
    thumbnailImage:
      "https://assets.newatlas.com/dims4/default/692e5c9/2147483647/strip/true/crop/3360x2240+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Fa8%2Fea%2F4bafa7a94a7cbc817052c3a82274%2Findi-09.jpg",
    parentProjectId: 2,
  },
]

const parts = [
  { partName: "Arduino", projectId: 1 },
  { partName: "Breadboard", projectId: 1 },
]

const images = [
  {
    projectId: 1,
    imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg",
  },
  {
    projectId: 1,
    imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg",
  },
]

const seedAllTables = () => {
  cy.task("db:truncate", "User")
    .then(() => {
      return cy.task("db:truncate", "Project")
    })
    .then(() => {
      return cy.task("db:truncate", "Part")
    })
    .then(() => {
      return cy.task("db:truncate", "Image")
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "User",
        json: users,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Project",
        json: parentProjects,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Project",
        json: projectForks,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Part",
        json: parts,
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Image",
        json: images,
      })
    })
}

export default seedAllTables
