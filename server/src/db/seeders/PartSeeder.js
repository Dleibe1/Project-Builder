import { Part } from "../../models/index.js"

class PartSeeder {
  static async seed(){
    await Part.query().insert([
      { partName: "Breadboard 170 pins", projectId: 1 },
      { partName: "Arduino Nano Every", projectId: 1 },
      { partName: "Ultrasonic Sensor - HC-SR04", projectId: 1 },
      { partName: "double sided tape", projectId: 1 },
      { partName: "SG90 Micro Servo", projectId: 1 },

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
      { partName: "MAX4466 microphone", projectId: 19 },
      { partName: "Arduino® UNO R4 WiFi", projectId: 19 },
    ])

    //Project Fork Parts
     await Part.query().insert([
      { partName: "Arduino", projectId: 10 },
      { partName: "Breadboard", projectId: 10 },
      { partName: "Arduino", projectId: 11 },
      { partName: "H-bridge", projectId: 11 },
      { partName: "ESP32", projectId: 12 },
      { partName: "H-bridge", projectId: 12 },
      { partName: "Arduino", projectId: 13 },
      { partName: "RBG LED", projectId: 13 },
      { partName: "Arduino Uno Rev3", projectId: 14 },
      { partName: "SSD1306 OLED Display", projectId: 14 },
      { partName: "Breadboard - 400 contacts", projectId: 14 },
      { partName: "USB 2.0 Cable Type A/B", projectId: 14 },
      { partName: "Ultrasonic Sensor Module", projectId: 15 },
      { partName: "IR Sensor Module - LM393", projectId: 15 },
      { partName: "Tower Pro SG90 Servo Motor", projectId: 15 },
      { partName: "Arduino Micro", projectId: 16 },
      { partName: "W5500 mini Ethernet module", projectId: 16 },
      { partName: "Arduino UNO SMD", projectId: 17 },
      { partName: "Arduino UNO R4 WIFI", projectId: 18 },
      { partName: "TIP120 Transistor", projectId: 18 },
      { partName: "LIS3DH Triple-Axis Accelerometer", projectId: 18 },
      { partName: "MAX4466 microphone", projectId: 19 },
      { partName: "Arduino® UNO R4 WiFi", projectId: 19 },
      { partName: "Graphic LCD 128x64 STN LED Backlight", projectId: 20 },
      { partName: "Arduino Nano R3", projectId: 20 },

    ])
  }
}

export default PartSeeder