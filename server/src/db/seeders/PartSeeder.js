import { Part } from "../../models/index.js"

class PartSeeder {
  static async seed(){
    await Part.query().insert([
      { partName: "Arduino", projectId: 1 },
      { partName: "Breadboard", projectId: 1 },
      { partName: "Arduino", projectId: 2 },
      { partName: "H-bridge", projectId: 2 },
      { partName: "ESP32", projectId: 3 },
      { partName: "H-bridge", projectId: 3 },
      { partName: "Arduino", projectId: 4 },
      { partName: "RBG LED", projectId: 4 },
      { partName: "Arduino Uno Rev3", projectId: 5 },
      { partName: "SSD1306 OLED Display", projectId: 5 },
      { partName: "Breadboard - 400 contacts", projectId: 5 },
      { partName: "USB 2.0 Cable Type A/B", projectId: 5 },
      { partName: "Ultrasonic Sensor Module", projectId: 6 },
      { partName: "IR Sensor Module - LM393", projectId: 6 },
      { partName: "Tower Pro SG90 Servo Motor", projectId: 6 },
      { partName: "Arduino Micro", projectId: 7 },
      { partName: "W5500 mini Ethernet module", projectId: 7 },
      { partName: "Arduino UNO SMD", projectId: 8 },
      { partName: "Arduino UNO R4 WIFI", projectId: 9 },
      { partName: "TIP120 Transistor", projectId: 9 },
      { partName: "LIS3DH Triple-Axis Accelerometer", projectId: 9 },


    ])
  }
}

export default PartSeeder