import { Image } from "../../models/index.js";

class ImageSeeder {
  static async seed(){
    await Image.query().insert([
      {
        projectId: 1,
        imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg",
      },
      {
        projectId: 1,
        imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg",
      },
      {
        projectId: 2,
        imageURL:
          "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png",
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/schemas/watering_system.png",
      },
      {
        projectId: 4,
        imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg",
      },
      {
        projectId: 4,
        imageURL: "https://projects.arduinocontent.cc/baa52ff1-ba12-4836-8e73-c7d2ea01f084.jpg",
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg",
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg",
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg",
      },
      {
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg",
      },
      {
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png",
      },
      {
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg",
      },
      {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg",
      },
      {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg",
      },
      {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/8547968a-7461-406c-9ee1-b6951c0422b1.jpg",
      },
      {
        projectId: 8,
        imageURL: "https://camo.githubusercontent.com/1184ca196713be3739b0cf2af4ba3306d623754614c137cf6b8f80abe5583bf7/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f45596d614d367945664c382f302e6a7067",
      },
      {
        projectId: 8,
        imageURL: "https://camo.githubusercontent.com/e3a79514aa8c1742f853c12d8bb9f8052d36b64919cf6b861e6e0962bf3d4c23/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f62535368362d4c796d66672f302e6a7067",
      },
      {
        projectId: 9,
        imageURL: "https://projects.arduinocontent.cc/6821f45e-31ee-4176-b790-1b305872bbfb.jpg",
      },
      {
        projectId: 9,
        imageURL: "https://projects.arduinocontent.cc/688b4430-cf27-4157-ab6e-cd0841517e64.png",
      },
     
    ])

    //Forked Project
    await Image.query().insert([
      {
        projectId: 10,
        imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg",
      },
      {
        projectId: 10,
        imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg",
      },
      {
        projectId: 11,
        imageURL:
          "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
      },
      {
        projectId: 12,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png",
      },
      {
        projectId: 12,
        imageURL: "https://www.hibit.dev/images/posts/2024/schemas/watering_system.png",
      },
      {
        projectId: 13,
        imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg",
      },
      {
        projectId: 13,
        imageURL: "https://projects.arduinocontent.cc/baa52ff1-ba12-4836-8e73-c7d2ea01f084.jpg",
      },
      {
        projectId: 14,
        imageURL: "https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg",
      },
      {
        projectId: 14,
        imageURL: "https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg",
      },
      {
        projectId: 14,
        imageURL: "https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg",
      },
      {
        projectId: 15,
        imageURL: "https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg",
      },
      {
        projectId: 15,
        imageURL: "https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png",
      },
      {
        projectId: 15,
        imageURL: "https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg",
      },
      {
        projectId: 16,
        imageURL: "https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg",
      },
      {
        projectId: 16,
        imageURL: "https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg",
      },
      {
        projectId: 16,
        imageURL: "https://projects.arduinocontent.cc/8547968a-7461-406c-9ee1-b6951c0422b1.jpg",
      },
      {
        projectId: 17,
        imageURL: "https://camo.githubusercontent.com/1184ca196713be3739b0cf2af4ba3306d623754614c137cf6b8f80abe5583bf7/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f45596d614d367945664c382f302e6a7067",
      },
      {
        projectId: 17,
        imageURL: "https://camo.githubusercontent.com/e3a79514aa8c1742f853c12d8bb9f8052d36b64919cf6b861e6e0962bf3d4c23/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f62535368362d4c796d66672f302e6a7067",
      },
      {
        projectId: 18,
        imageURL: "https://projects.arduinocontent.cc/6821f45e-31ee-4176-b790-1b305872bbfb.jpg",
      },
      {
        projectId: 18,
        imageURL: "https://projects.arduinocontent.cc/688b4430-cf27-4157-ab6e-cd0841517e64.png",
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/62b67aa4-b14c-41c9-aab6-20971c5c4f96.jpg",
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/2fdee64a-c300-40aa-95b4-3dd0fe622e0e.png",
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/622ce4fe-cd0d-420f-9f7c-2e9dbbf654fb.png",
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/222f15b6-f4c6-4acb-b01d-6e54ac36e159.png",
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/9d4480b4-2e34-4ff4-baa0-6bd7969c3942.jpg",
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/86d20694-784b-4ada-b57e-efaf9acd5a32.jpg",
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/fbe1505a-421c-462e-9d30-7820d26376c3.jpg",
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/f90b69ab-a079-477d-b32a-e4e4bdc10cc3.jpg",
      },
     
    ])
  }

  
}

export default ImageSeeder