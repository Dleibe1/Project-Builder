before(() => {
  cy.task("db:truncate", "User")
    .then(() => {
      cy.task("db:truncate", "Project")
    })
    .then(() => {
      cy.task("db:truncate", "Part")
    })
    .then(() => {
      cy.task("db:truncate", "Image")
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "User",
        json: {
          email: "user@example.com",
          password: "password",
          userName: "Dan",
          githubUserName: "None",
        },
      })
    })
    .then((user) => {
      return cy.task("db:insert", {
        modelName: "Project",
        json: [
          {
            userId: parseInt(user.id),
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
            userId: parseInt(user.id),
            title: "SmartPhone Controlled Arduino Based Bluetooth Car",
            description: "Description Example",
            appsAndPlatforms: "Arduino IDE or PlatformIO",
            code: "Servo.h",
            githubFileURL: "",
            thumbnailImage:
              "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
            parentProjectId: 2,
          },
        ],
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Part",
        json: [
          { partName: "Arduino", projectId: 1 },
          { partName: "Breadboard", projectId: 1 },
        ],
      })
    })
    .then(() => {
      return cy.task("db:insert", {
        modelName: "Image",
        json: [
          {
            projectId: 1,
            imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg",
          },
          {
            projectId: 1,
            imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg",
          },
        ],
      })
    })
})
