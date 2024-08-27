import { Part } from "../../models/index.js"

class PartSeeder {
  static async seed() {
    await Part.query().insert([
      { partName: "RGB Diffused Common Anode", projectId: 1 },
      { partName: "RGB Diffused Common Cathode", projectId: 1 },
      { partName: "Arduino UNO", projectId: 1 },
      { partName: "Breadboard (generic)", projectId: 1 },
      { partName: "Jumper wires (generic)", projectId: 1 },
      { partName: "Resistor 220 ohm", projectId: 1 },


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

      { partName: "Arduino UNO", projectId: 10 },
      { partName: "DC Motor, 12 V", projectId: 10 },
      { partName: "SparkFun Full-Bridge Motor Driver Breakout - L298N", projectId: 10 },
      { partName: "Jumper wires (generic)", projectId: 10 },
      { partName: "9V battery (generic)", projectId: 10 },
      { partName: "Maker Essentials - Micro-motors & Grippy Wheels", projectId: 10 },

      { partName: "DHT22 Digital Temperature & Humidity Sensor", projectId: 11 },
      { partName: "Breadboard 100x160", projectId: 11 },
      { partName: "Arduino MKR WiFi 1010", projectId: 11 },
      { partName: "Pack of 50 female-female jumper wires in various colors", projectId: 11 },

      { partName: "Arduino® UNO R4 WiFi", projectId: 12 },
      { partName: "LIS3DH Triple-Axis Accelerometer", projectId: 12 },

      { partName: "16x2 LCD display with I²C interface", projectId: 13 },
      { partName: "HC-SR501", projectId: 13 },
      { partName: "Arduino Uno Rev3", projectId: 13 },
      { partName: "Breadboard Jumper Wire Pack (200mm&100mm)", projectId: 13 },
      { partName: "Breadboard - 830 contacts", projectId: 13 },
      { partName: "Resistor 220 Ohm", projectId: 13 },
      { partName: "Breadboard 170 pins", projectId: 14 },
      { partName: "Arduino Nano Every", projectId: 14 },
      { partName: "Ultrasonic Sensor - HC-SR04", projectId: 14 },
      { partName: "double sided tape", projectId: 14 },
      { partName: "SG90 Micro Servo", projectId: 14 },

      { partName: "DHT22 Temperature Sensor", projectId: 15 },
      { partName: "Jumper wires (generic)", projectId: 15 },
      { partName: "Arduino UNO", projectId: 15 },
      { partName: "Breadboard (generic)", projectId: 15 },

      { partName: "Arduino uno Board", projectId: 16 },
      { partName: "Ultrasonic Sensor - HC-SR04", projectId: 16 },
      { partName: "Active Buzzer 5V (HXD)", projectId: 16 },
      { partName: "Breadboard 100x160", projectId: 16 },
      { partName: "jumper wires for arduino", projectId: 16 },

      { partName: "SparkFun Soil Moisture Sensor (with Screw Terminals)", projectId: 17 },
      { partName: "Male/Female Jumper Wires", projectId: 17 },
      { partName: "Buzzer", projectId: 17 },
      { partName: "9V battery (generic)", projectId: 17 },
      { partName: "Jumper wires (generic)", projectId: 17 },
      { partName: "Resistor 220 ohm", projectId: 17 },
      { partName: "Mini Breadboard", projectId: 17 },
      { partName: "10 mm Heat Shrink", projectId: 17 },
      { partName: "9V Battery Clip", projectId: 17 },
      { partName: "M5Stack ATOM Lite", projectId: 18 },
    ])
    const forks = [
      { partName: "Push Button", projectId: 19 },
      { partName: "RGB Diffused Common Cathode", projectId: 19 },
      { partName: "Arduino UNO", projectId: 19 },
      { partName: "Breadboard (generic)", projectId: 19 },
      { partName: "Jumper wires (generic)", projectId: 19 },
      { partName: "Resistor 220 ohm", projectId: 19 },
    ]
  }
}

export default PartSeeder
