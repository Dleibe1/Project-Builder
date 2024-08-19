import { Part } from "../../models/index.js"

class PartSeeder {
  static async seed(){
    await Part.query().insert([
      { partName: "Breadboard 170 pins", projectId: 1 },
      { partName: "Arduino Nano Every", projectId: 1 },
      { partName: "Ultrasonic Sensor - HC-SR04", projectId: 1 },
      { partName: "double sided tape", projectId: 1 },
      { partName: "SG90 Micro Servo", projectId: 1 },

      { partName: "Arduio UNO (SMT)", projectId: 2 },
      { partName: "NeoPixel strip", projectId: 2 },
      { partName: "Rubber/Plastic wheel", projectId: 2 },
      { partName: "9V Battery Clip", projectId: 2 },
      { partName: "Modulo Bluetooth HC05", projectId: 2 },
      { partName: "9V Battery Supply", projectId: 2 },
      { partName: "2100 RPM Dual Shaft BO Motor - Straight", projectId: 2 },
      { partName: "laser sheet cutting machine", projectId: 2 },

      { partName: "Resistors kit", projectId: 3 },
      { partName: "PN2222A Transistor", projectId: 3 },
      { partName: "AMS1117 5V DC-DC Step Down Power Supply Module", projectId: 3 },
      { partName: "Potentiometers", projectId: 3 },
      { partName: "Water pump", projectId: 3 },
      { partName: "Push button", projectId: 3 },
      { partName: "9V Battery Case Box With Wire Leads", projectId: 3 },
      { partName: "LED Bezel", projectId: 3 },
      { partName: "Barrel plug", projectId: 3 },

      { partName: "Capacitive Touch Sensor", projectId: 4 },
      { partName: "capacitor 100nF 100V", projectId: 4 },
      { partName: "Arduino Nano", projectId: 4 },
      { partName: "Resistor 100k _1206", projectId: 4 },
      { partName: "Resistor 4,7 kOhm 5% 1/16W 50V", projectId: 4 },
      { partName: "Led matrix 8x32", projectId: 4 },
      { partName: "Soldering kit", projectId: 4 },


      { partName: "Arduino Uno Rev3", projectId: 5 },
      { partName: "SSD1306 OLED Display", projectId: 5 },
      { partName: "Breadboard - 400 contacts", projectId: 5 },
      { partName: "USB 2.0 Cable Type A/B", projectId: 5 },
      
      { partName: "Ultrasonic Sensor Module", projectId: 6 },
      { partName: "IR Sensor Module - LM393", projectId: 6 },
      { partName: "Arduino Uno Rev3", projectId: 6 },
      { partName: "4 DOF Acrylic Robotic DIY Arm Kit", projectId: 6 },
      { partName: "16-Channel 12-bit PWM/Servo Driver I2C interface PCA9685", projectId: 6 },
      { partName: "Tower Pro SG90 Servo Motor", projectId: 6 },

      { partName: "Arduino Micro", projectId: 7 },
      { partName: "W5500 mini Ethernet module", projectId: 7 },

      { partName: "Ultrasonic Sensor - HC-SR04", projectId: 8 },
      { partName: `HiLetgo ILI9341 2.8" SPI TFT LCD Display`, projectId: 8 },
      { partName: "Resistor 2.2 kohms", projectId: 8 },
      { partName: "Arduino Nano", projectId: 8 },

      { partName: "IR receiver (generic)", projectId: 9 },
      { partName: "Arduino UNO", projectId: 9 },
      { partName: "JustBoom IR Remote", projectId: 9 },

      { partName: "Arduino UNO", projectId: 19 },
      { partName: "DC Motor, 12 V", projectId: 19 },
      { partName: "SparkFun Full-Bridge Motor Driver Breakout - L298N", projectId: 19 },
      { partName: "Jumper wires (generic)", projectId: 19 },
      { partName: "9V battery (generic)", projectId: 19 },
      { partName: "Maker Essentials - Micro-motors & Grippy Wheels", projectId: 19 },

      {partName: "DHT22 Digital Temperature & Humidity Sensor", projectId: 20},
      {partName: "Breadboard 100x160", projectId: 20},
      {partName: "Arduino MKR WiFi 1010", projectId: 20},
      {partName: "Pack of 50 female-female jumper wires in various colors", projectId: 20},

      {partName: "Arduino® UNO R4 WiFi", projectId: 21},
      {partName: "LIS3DH Triple-Axis Accelerometer", projectId: 21},

      {partName: "16x2 LCD display with I²C interface", projectId: 22},
      {partName: "HC-SR501", projectId: 22},
      {partName: "Arduino Uno Rev3", projectId: 22},
      {partName: "Breadboard Jumper Wire Pack (200mm&100mm)", projectId: 22},
      {partName: "Breadboard - 830 contacts", projectId: 22},
      {partName: "Resistor 220 Ohm", projectId: 22},

      {partName: "RGB Diffused Common Anode", projectId: 23},
      {partName: "RGB Diffused Common Cathode", projectId: 23},
      {partName: "Arduino UNO", projectId: 23},
      {partName: "Breadboard (generic)", projectId: 23},
      {partName: "Jumper wires (generic)", projectId: 23},
      {partName: "Resistor 220 ohm", projectId: 23},

      {partName: "DHT22 Temperature Sensor", projectId: 24},
      {partName: "Jumper wires (generic)", projectId: 24},
      {partName: "Arduino UNO", projectId: 24},
      {partName: "Breadboard (generic)", projectId: 24},

      {partName: "Arduino uno Board", projectId: 25},
      {partName: "Ultrasonic Sensor - HC-SR04", projectId: 25},
      {partName: "Active Buzzer 5V (HXD)", projectId: 25},
      {partName: "Breadboard 100x160", projectId: 25},
      {partName: "jumper wires for arduino", projectId: 25},
      
      {partName: "SparkFun Soil Moisture Sensor (with Screw Terminals)", projectId: 26},
      {partName: "Male/Female Jumper Wires", projectId: 26},
      {partName: "Buzzer", projectId: 26},
      {partName: "9V battery (generic)", projectId: 26},
      {partName: "Jumper wires (generic)", projectId: 26},
      {partName: "Resistor 220 ohm", projectId: 26},
      {partName: "Mini Breadboard", projectId: 26},
      {partName: "10 mm Heat Shrink", projectId: 26},
      {partName: "9V Battery Clip", projectId: 26},

      {partName: "M5Stack ATOM Lite", projectId: 27},


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

    ])
  }
}

export default PartSeeder