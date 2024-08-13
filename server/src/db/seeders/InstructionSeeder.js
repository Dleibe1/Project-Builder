import { Instruction } from "../../models/index.js"

class InstructionSeeder {
  static async seed() {
    await Instruction.query().insert([
      {
        projectId: 1,
        instructionText: `The two eyes are painted on two ping-pong balls which are sticked on two servo motors. Two ultrasonic sensors measure the object's position. An Arduino Nano Every board reads the measurements from the ultrasonic sensors and controls the sevo motors accordingly. 

The servo motors are SG90 micro servos and the ultrasonic sensors are HC-SR04. These are very common and very inexpensive devices. The Arduino board may be of another model than the nano Every, provided that 5V is available to power the servo motors and the ultrasonic sensors. 
`,
      },
      {
        projectId: 1,
        imageURL: `https://projects.arduinocontent.cc/781dcb46-650d-4a7d-9177-5f7e4ee1ee1b.jpg`,
      },
      {
        projectId: 1,
        instructionText: `The servo motors and ultrasonic sensors are sticked on a plate according to the arrangement shown on the following plan: `,
      },
      {
        projectId: 1,
        imageURL: "https://projects.arduinocontent.cc/e0fd7c1d-3a35-474b-b284-60a1b0a110d3.jpg",
      },
      {
        projectId: 1,
        instructionText: `The position of the X ultrasonic sensor can be different, for example to follow larger objects. In this case, the constants A and B must be adjusted in the software to reflect the actual position of the X ultrasonic sensor. These two values must be less than 200 cm.

The connections to be made are as follows: 

The grounds of the servo motors and of the ultrasonic sensors must be connected to the ground of the Arduino board and their power supplies to +5V. 

The trigger input of the X ultrasonic sensor is connected to digital input/output 2 and its echo output to digital input/output 3. 

The trigger input of the Y ultrasonic sensor is connected to digital input/output 5 and its echo output to digital input/output 6. 

The left and right servomotors controls are connected to digital inputs/outputs 8 and 10 respectively. Left and right refer to Big Brother's eyes, his left eye is on your own right. 

The following diagram shows the connections to be made: 
`,
      },
      {
        projectId: 1,
        instructionText: `Software

The software is extremely simple, less than 70 lines. No library is required. 
Have fun. `,
      },
      {
        projectId: 2,
        instructionText: `Gather your tools and troops (components, that is):
The brains: An Arduino Uno, the mastermind behind the magic. 
The translator: An HC05 Bluetooth module, your car's interpreter for smartphone commands. 
The muscle: L298N motor driver, the beefy guy controlling those zippy wheels. 
The bling: NeoPixel LEDs, because who doesn't love a car with dazzling lights? 
The base: Perfboard and Sunboard, the sturdy foundation for your creation. 
The connections: Jumper wires, the colorful threads that bring everything together. 
The fuel: A battery, to keep your robot rolling (safely, of course!). 
`,
      },
      {
        projectId: 2,
        imageURL:
          "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
      },
      {
        projectId: 2,
        instructionText: `Craft the chassis, the car's core:
          Imagine your robot's frame. Sunboard is your friend here! Cut precise pieces based on the guide (remember, measuring twice cuts once!). Assemble them like a mini puzzle, creating a strong and stable base for your future masterpiece. `,
      },
      {
        projectId: 2,
        instructionText: `Motor magic, let the wheels spin:
          Time to get those motors talking to the driver! Mount them securely on the chassis. Connect them to the L298N module using the jumper wires, following the wiring diagram like a treasure map. Remember, correct connections are key to smooth sailing (or should we say, driving?). `,
      },
      {
        projectId: 2,
        instructionText: `Bling it up with dazzling LEDs:
          Let your creativity shine! Place the NeoPixel LEDs on the front, back, and bottom of your car. Connect them to the Arduino, following the color-coded guide. Soon, your robot will be a beacon of programmable light! `,
      },
      {
        projectId: 2,
        instructionText: `Code the commands, unlock the moves:
          The Arduino code is the secret sauce that brings your car to life. It translates the Bluetooth commands from your phone into actions for the motors and LEDs. The provided code is a great starting point, but feel free to experiment and add your own personal touch! `,
      },
      {
        projectId: 2,
        instructionText:
          "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
      },
      {
        projectId: 3,
        instructionText: `Water deposit
For our watering system, we will need a water container. Any common and standard items suitable for water storage can be used as a deposit. The larger the storage container, the less frequent the need for recharging. 
`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle.png",
      },
      {
        projectId: 3,
        instructionText: `We've selected the bottle shown on the image as our water reservoir. With a capacity of 1.5 liters, it should be sufficient for watering a medium-sized plant for several days. 
For the water pump to effectively move water from the bottom of the bottle to the plant, it must be placed inside. To accomplish this, we place the pump inside the bottle, and then we pull out the wires. This involves creating a small opening at the base of the bottle solely for the wires, enabling us to thread them out and connect the pump to our plant care station. To conclude the process, we use waterproof silicone to seal the opening, ensuring there is no water loss. 
`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottom.png",
      },
      {
        projectId: 3,
        instructionText: `On the opposite end, there will be a water pipe directly connecting to the plant to provide hydration. 

Water pump wiring

To facilitate the connection of the pump wires with the main system, we've used a barrel plug. The junction between the pump wires and the connector wires is shielded by heat shrink wraps, providing effective insulation from external elements. 
`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png",
      },
      {
        projectId: 3,
        instructionText: `This approach ensures a secure and well-insulated connection, contributing to the overall reliability of the system. 
Plants care station

The plants care station takes on the responsibility of processing available information, making decisions, and controlling the activation and deactivation of the watering system. Designed for both indoor and outdoor use, it hides all wiring and functions as a discreet black box. This is achieved by enclosing all system components within the box illustrated below. 
`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_box.png",
      },
      {
        projectId: 3,
        instructionText: `The box is easily accessible, facilitating the replacement of components or even reprogramming of the system when necessary. Within the plants care station, the central orchestrator is the Arduino Nano, functioning as the main brain to coordinate all other components. Accompanying this, a DS1302 module is integrated to manage real-time control, influencing watering decisions. It considers optimal watering times, favoring mornings and evenings when sunlight is less intense, promoting better absorption and utilization of water by the plants. This thoughtful scheduling enhances the overall efficiency and well-being of the plants. 

Power supply

For the entire system, a 9V battery serves as the power supply. It separately powers both the Arduino and the water pump. Considering that our water pump operates on 5V, we require a voltage transformer. For this purpose, we have used the AMS117 module. 
In contrast, the DS1302 operates on a separate CR2032 battery, ensuring a dedicated power source to sustain the Real-Time Clock (RTC) functionality. This dual-power configuration enhances the efficiency and autonomy of each component, ensuring the overall reliability of the system. 
Control elements

The plants care station comes equipped with some handy controls like LEDs, buttons, and a potentiometer to enhance its overall functionality. A straightforward on/off switch simplifies the activation of the station. When manual watering is needed, a dedicated push button is readily available. Additionally, the potentiometer allows for accurate adjustment of the water amount during automatic mode. 
`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2024/watering_station.png",
      },
      {
        projectId: 3,
        instructionText: `These user-friendly controls provide a precise and efficient means of managing your plant care routine. 

Wiring schema

Creating a precise wiring schema is essential for the optimal performance of the automatic watering system. This schema serves as a practical guide, interconnecting main components. Methodically organizing and routing the wires prevents potential confusion during the assembly process. Clarity in both assembly and troubleshooting phases is achieved through the implementation of color-coded distinctions and strictly following specified pin configurations for facilitating the communication between modules. 
`,
      },
      {
        projectId: 3,
        imageURL: `https://www.hibit.dev/images/posts/2024/schemas/watering_system.png`,
      },
      {
        projectId: 3,
        instructionText: `The above wiring schema offers a comprehensive overview of the system wiring and connections. 

Calculating base resistor value

In order to compute the base resistor (RB), we must first determine the collector current. Given that the circuit's sole load is the water pump, it can be deduced that the collector current is identical to that of the water pump. Based on the water pump specification, we know that IC = 200 mA, or for practical purposes, IC = 0.2 A. This forms the basis for our calculations.

It is important to note that if we exceed the parameters for which the transistor was designed, it will eventually burn out. With this in mind, we will proceed to identify the transistor's gain from the datasheet. We observe that when IC = 200 mA, its gain is 100. We have now discovered our second value: 𝛽 = 100. 

Once we've established the gain, our next step is to calculate the base current. It's important to recognize that the collector current is directly proportional to the base current and the gain. This relationship can be expressed mathematically as: 
hFe = 𝛽 (gain) = Ic / Ib 
Replacing the values, we acquire our third parameter: Ib = 2mA = 0.002A. Now, we can compute Rb value using Ohm's formula: 
Vb = VS - VBE = Ib * Rb 
Rb = (VS - VBE) / Ib 
Where VS is the source voltage, and VBE is the voltage drop across the base-emitter junction of the transistor. In our circuit, the transistor's base is connected to an output from an Arduino. An Arduino output provides a maximum of 5V and 40mA. Therefore, we have a source voltage of 5V, and the transistor's barrier potential is 0.6V. 
Rb = (5V - 0.6V) / 2mA = 2.2kΩ 
For our circuit, the suitable value for the base resistor should be equal or below 2.2K ohms. We choose the lower standardized resistor and check by looking at the datasheet curves that the base voltage is sufficient to drive the transistor into saturation. 

Automated plants watering system

After going through rounds of mounting and wiring adjustments, we're excited to introduce our initial prototype of the automatic watering system. Check out the results and get a general overview of the system in the attached image below. We're really looking forward to seeing how well it takes care of the plants and are ready to make it even better by identifying areas for improvement. 
`,
      },

      {
        projectId: 3,
        imageURL: `https://www.hibit.dev/images/posts/2024/watering_system_result.png`,
      },
      {
        projectId: 3,
        instructionText: `The internal components of the plant care station neatly fit into the box, presenting a clean and user-friendly appearance. The next step involves experimenting and testing the system over some time to identify any weaknesses and enhance its performance. Additionally, we aim to minimize its size and simplify the wiring, making maintenance more straightforward. 
 
Having outlined the concept of automated watering and successfully assembled the physical components, our attention now turns to the real wizardry - the code. This article explores the intricate lines of Arduino code that transform theory into reality, breathing life into our DIY plant care project. As we step into the heart of our automated watering system, let's unravel the details that make our green vision a reality. 

Install library for DS1302

To interact with the DS1302 sensor, we will use an existing library. This library, provides an interface that facilitates communication with the module, saving you significant time and providing a reliable and extensively tested code base. It can be downloaded from our official repository https://github.com/hibit-dev/ds1302/raw/master/lib/DS1302.zip

To import a library, open the Arduino IDE, go to Sketch > Include Library > Add .ZIP Library and select the library file downloaded from our GitHub repository .

`,
      },
      {
        projectId: 3,
        imageURL: "https://www.hibit.dev/images/posts/2023/arduino_import_library.png",
      },
      {
        projectId: 3,
        instructionText: `Then you can simply use include statement: 
#include "virtuabotixRTC.h" 
It will include the library with predefined functions to interact with the module. 

Arduino code

This Arduino code forms the backbone of our automated watering system, translating the idea of plant watering into a functional reality. At its core, this code interfaces with a real-time clock, ensuring our system is attuned to the rhythm of the day. Constants define the timeframes for morning and evening watering sessions, while designated pins for LEDs, buttons, and a potentiometer facilitate the communication among physical components. 
In the setup phase, the code initializes pins and stages a brief, illuminating sequence with LEDs, symbolizing the system's awakening. As the main loop takes the stage, it constantly monitors the real-time clock and user inputs. The code continuously checks the time and conditions to trigger morning and evening watering cycles, while also providing a manual watering option through the push button. The iteration transpires every 5 seconds, ensuring a vigilant and responsive approach to the needs of plant care.s. Note that the push button triggers manual watering when pressed, adding a layer of user interactivity. Due to the 5000ms delay in the loop function, there might be a delay between pressing the button and the corresponding action. Nevertheless, when the process initiates, the green LED will illuminate.

The potentiometer values manage the water supply to the plant. The code calculates the pump's operational time based on the potentiometer's position. To ensure control and efficiency, we've established limits, where the minimum potentiometer value corresponds to a pump duration of 0 seconds, and the maximum allows up to 10 seconds. These settings remain easily customizable through designated constants. 

It's worth mentioning that we've opted to disable the morning watering for our plant, choosing to automate the process exclusively in the evenings. Additionally, while the switch button currently lacks a specific assignment, it stands ready for future functionalities. 

The presented Arduino code serves as the operational heart of our automated watering system, consistently monitoring real-time data and user inputs. Its key role is to activate morning and evening watering cycles, currently programmed for 8 in the morning and 20 in the evening, with customizable constants. The iterative loop ensures the system remains alert and responsive to the unique needs of plant care. The entire code is highly customizable through constants, enabling effortless adjustments to the configuration of the plant care station's operation. 

Please be aware that the provided code snippet includes only the main segment.

Conclusion

In the spirit of self-made solutions, this project encourages to approach the process of building, learning, and adapting. The DS1302 timekeeping module and Arduino-compatible pumps play crucial roles in this process, with each component contributing to the synergy between technology and the natural world. The true essence of this project lies not just in the finished product but in the transformative experience of crafting a technological solution for the well-being of your plants, wherever they may be. 
In wrapping up our journey through the practical implementation of an Arduino-powered automatic watering system, you've navigated the intricacies of physical mounting, sensor integration, and module connections. What started as abstract concepts has materialized into a self-built, technology-infused plant care solution. `,
      },
      {
        projectId: 4,
        instructionText:
          "The spectrum analyzer displays the amplitude of signals as a function of frequency, allowing engineers and technicians to visualize and analyze signal characteristics. In particular, the audio analyzer performs a visual presentation of an acoustic signal in the frequency domain, where the frequency of the signal is displayed on the x-axis, while the amplitude of a certain frequency is displayed on the y-axis. In several of my previous $ videos $ I have presented several different types of such devices, but this time the FHT Arduino library is used for the first time. This library is several times faster than the commonly used FFT library, but at the expense of speed certain loss of resolution and precision appear at the two ends of the audio range. ",
      },
      {
        projectId: 4,
        imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg",
      },
      {
        projectId: 4,
        instructionText: `The device is really simple to build, and consists of only a few components: 
- Arduino Nano MCU board, 
- 8x64 color Led Matrix with WS2812B adressable leds 
- Two (three) touch buttons 
- three resistors 
- and one capacitor 
`,
      },
      {
        projectId: 4,
        instructionText: `Now let's see how the device works in real conditions 
Considering that it is very simple, the device works immediately without any previous settings. One button is used to adjust the LED light intensity in 7 steps. With the other button we move through 6 different mods with specific color sets, and we can also add more, with very small modifications to the code. 
`,
      },
      {
        projectId: 4,
        imageURL: `https://projects.arduinocontent.cc/e5bffdf1-c174-47b2-aaeb-0edf30fec098.jpg`,
      },
      {
        projectId: 4,
        instructionText: `Next, let's test the frequency range that this analyzer covers. For this purpose we will use a simple online tone generator. As you can see, the device covers the entire hearing range, from 20 Hertz to 20 kilohertz. Such a large-range device is excellent when is used for visual FFT analysis, but has one practical drawback when it comes to presenting musical materials. 
`,
      },
      {
        projectId: 4,
        imageURL: `https://projects.arduinocontent.cc/68e9de6f-5336-42bc-be80-c50441f2808b.jpg`,
      },
      {
        projectId: 4,
        instructionText: `Namely, a large percentage (perhaps 90%) of this music signal is in the range up to 10Khz, and only a small part belongs to higher frequencies. This would practically mean that for the entire time that the music signal is being emitted, the far right part of the analyzer would be inactive. Let's see how it looks in practice (Here is an example with a speech signal, so we will try it with musical material as well). Since, as I mentioned at the beginning, this is a visual decorative addition, and not a precise measuring instrument, it is desirable to reduce the bandwidth by half, actually to 10 Kilohertz. 

For this case I made some modification in the code, but it is also desirable to set a simple Low-pass filter on the input. Let's test the range with an online tone generator at the input. The range is up to 10Khz. 
`,
      },
      {
        projectId: 4,
        imageURL: `https://projects.arduinocontent.cc/c3d1c115-d49f-4b94-9b96-13111be626e6.jpg`,
      },
      {
        projectId: 4,
        instructionText: `Now, in this case the matrix is completely filled and visually it looks much better. 

As for the external appearance of the device, I tried to make a simple, but still functional version made of PVC board and glass with a thickness of 4 mm. 

And finally a short conclusion. 

This is an extremely simple project intended for beginners, but still visually very effective and can serve as a gadget on your desktop, or as an addition to an audio device. It can also be used as a simple school FFT spectrum analyzer instrument intended for educational purposes 
`,
      },
      {
        projectId: 5,
        instructionText: `In the vast realm of robotics, enthusiasts are venturing into the exciting world of OLED eye animations for Arduino robots. If you've found yourself lost in the maze of online searches, fear not! We've done the legwork and distilled the top five methods for creating captivating eye animations into a clear and fun comparison. 
 
Introducing our selections: 

Option 1: Eye Animation on OLED Display by Intellar 
`,
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg",
      },
      {
        projectId: 5,
        instructionText: `Intellar's approach brings cool eye animations to life with simple functions mimicking various moods (Normal, Sleep, Smile) and versatile eye movements. Pro: Easy to use with adjustable eye positions. Con: Limited to three moods. 
 
Option 2: Simple Animated Eye Using Arduino by SpiderMaf 
`,
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg",
      },
      {
        projectId: 5,
        instructionText: `SpiderMaf's method features circular eyes with pupils for precise movements, adding a touch of humanity to your robot. Pro: Compact functions with customizable features. Con: Similar to Intellar's approach. 
 
Option 3: Akno by AbdulsalamAbbod `,
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg",
      },
      {
        projectId: 5,
        instructionText: `Akno stands out with its expressive rectangular eyes and a wide range of emotions, suitable for various display types. Pro: Supports multiple expressions. Con: Less flexible in adjusting eye size. 
 
Option 4:  Arduino OLED Moving Eyes by Vinny 
`,
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/2596309e-914d-4907-b5a0-b940e3bc6f7b.jpg",
      },
      {
        projectId: 5,
        instructionText: `Vinny's innovative technique involves rendering custom images on OLED displays, though it comes with memory constraints. Pro: External image rendering capability. Con: Memory-intensive process. 
 
Option 5: Arduino UNO Robotic Eye Animations by Picaio `,
      },
      {
        projectId: 5,
        imageURL: "https://projects.arduinocontent.cc/cff99131-f7ce-4295-b530-811e057734de.jpg",
      },
      {
        projectId: 5,
        instructionText: `Picaio offers a sophisticated yet realistic approach with diverse eye movements and expressions, enhancing animation realism. Pro: Optimized technique for efficient memory usage. Con: May be challenging for beginners due to its complexity. 
 
Whether you're a seasoned hobbyist or just starting out, these methods provide a gateway to bringing your robot's personality to life! Get ready to dive in, experiment, and unleash your creativity with our official webpage Explaining this project $ Arduino OLED Animations $ as your guide! 
 
Let's animate those robotic eyes and inject some fun into your Arduino projects! 🤖👀 
`,
      },
      {
        projectId: 6,
        instructionText:
          `Greetings everyone, and welcome to my Instructables tutorial. Today, I'll guide you through the process of creating an Object Tracking 4-DOF Robotics Arm. 
Project Overview: 

In this project, the robotic arm will execute actions corresponding to the commands received from the sensors. For example, if the object moves to the left, the robotic arm will respond by moving to the left, and similarly for movements to the right, up, and down. 

Without further ado, let's dive into the project and get started! 
`,
      },
      {
        projectId: 6,
        instructionText:
          `Step 1: Assemble the Robotics Arm Kit
https://youtu.be/TMv3JR06yuo
Watch the attached video for a complete step-by-step assembly of the Robotics Arm Kit. 
Step 2: Servo Motors & PWM Servo Motor Driver Wiring `,
      },{
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg",
      },
      {
        projectId: 6,
        instructionText:
          `Refer to the attached image and connect all four servo motor wires to the PWM servo motor driver pins. 

Figure Servo -> PWM servo pin 0
Right side Servo -> PWM servo pin 1 
left side Servo -> PWM servo pin 2 
Base Servo -> PWM servo pin 3 

Step 3: PWM Servo Motor Driver & Arduino Uno Wiring
`,
      },{
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png",
      },
      {
        projectId: 6,
        instructionText:
          `Follow the Circuit Diagram: 
PWM Servo Motor Driver  -> Arduino Uno 
GND   ->    GND 
SCL   ->    A4 
SDA   ->    A5 
VCC   ->    VIN 

Step 4: Mounting the Sensors Into the Robotics Arm
`,
      },{
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg",
      },
      {
        projectId: 6,
        instructionText:
          `Follow the Steps: 
- Insert the Ultrasonic Sensor into the designated sensor case. 
- Securely attach the sensor case to the robotics arm as illustrated in the provided image. 
- Utilize hot glue to ensure proper mounting of the sensor case. 
- Affix the IR sensors to the left and right sides of the sensor case using hot glue. 

These are all the steps required for this process. 

Step 5: Ultrasonic Sensor, IR Sensor & Arduino Uno Wiring
`,
      },
      {
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/db48a4f0-129b-4770-8e19-9e81f5a8c29d.png",
      },
      {
        projectId: 6,
        instructionText:
          `Follow the Circuit Diagram: 

Ultrasonic Sensor -> Arduino Uno 
GND -> GND ECHO -> A3 TRIG -> A2 VCC -> VIN 


IR Sensor -> Arduino Uno (Right) 
GND -> GND OUT -> A1 VCC -> VIN 
 
IR Sensor -> Arduino Uno (left) 
GND -> GND OUT -> A0 VCC -> VIN 

Step 6: Time to Upload the Sketch
`,
      },
      {
        projectId: 6,
        imageURL: "https://projects.arduinocontent.cc/efbbe392-9df2-476e-8470-157bd5dd834d.jpg",
      },
      {
        projectId: 6,
        instructionText:
          `- Now connect the USB cable to the Arduino Uno. 
Next, upload the following code: 
`,
      },
      {
        projectId: 7,
        instructionText:
          `About the Project

Welcome back, tech enthusiasts! Today, I'm excited to introduce ARPoLan, a project that started as an experiment to explore the potential of combining the Arduino Pro Micro and the W5500 Ethernet module. This powerful device can perform network scanning, ARP spoofing, and even act as a local Rubber Ducky. Let me take you through building and testing this network security tool. 
`,
      }, 
      {
        projectId: 7,
        instructionText:
          `Features & Components

ARPoLan combines several powerful components to deliver its impressive capabilities: 
 
1.  Network Scanning: Discover devices on the local network by sending ARP requests and collecting responses. 
2.  ARP Spoofing: Perform ARP spoofing attacks to intercept and manipulate network traffic. 
3.  HID Functionality: Utilize the Atmega32u4's USB HID capabilities for additional attack vectors. 
4.  Real-time Monitoring: Visual and serial indicators for attack detection and network activity. 
`,
      },
      {
        projectId: 7,
        instructionText:
          `Getting Started

I designed the PCB for ARPoLan using Altium Designer, creating a simple yet efficient two-layer layout. Here’s a breakdown of the components used: 
`,
      }, {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg",
      },
      {
        projectId: 7,
        instructionText:
          `Atmega32u4 Microcontroller: Handles USB communication and processing tasks. 

W5500 Ethernet Module: Provides reliable network connectivity with an integrated hardware TCP/IP stack. 

25 MHz Crystal Oscillator: Ensures precise timing for network operations. 

RJ45 Ethernet Socket: Facilitates network connections with integrated status LEDs. 

LM1117 Voltage Regulator: Supplies a stable 3.3V power to the W5500. 

USB A Port: Allows for easy programming and data transfer. 

Passive Components: 

Capacitors and resistors for power stabilization and signal integrity. 

The communication between the W5500 and the Atmega32u4 is handled via the SPI protocol, ensuring quick and reliable data transfer. 
`,
      },
      {
        projectId: 7,
        instructionText:
          `Schematic

The PCB for ARPoLan was designed using Altium Designer, featuring a two-layer layout optimized for compactness and efficiency. The board integrates all necessary components, ensuring reliable connections between the Atmega32u4 and the W5500. 
`,
      },
      {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/0b6d0eeb-6a94-4fd1-9568-654934207c4a.png",
      },
      {
        projectId: 7,
        instructionText:
          `Connection Table
Ensure the VCC pin of the W5500 is connected to a 3.3V power supply, as the module operates at 3.3V logic levels. 

The SS (Slave Select) pin can be connected to any digital pin on the Arduino Pro Micro, but it must be defined correctly in the code. 

Make sure the GND of the Arduino Pro Micro is connected to the GND of the W5500 module to ensure a common ground. 

This setup will enable SPI communication between the Arduino Pro Micro and the W5500 Ethernet module. 
`,
      },
      {
        projectId: 7,
        imageURL: "https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg",
      },
      {
        projectId: 7,
        instructionText:`Conclusion
Creating ARPoLan was a fascinating journey into network security and hardware integration. From designing the PCB to writing and testing the code, this project showcased the potential of combining simple yet powerful components to achieve sophisticated functionalities. Stay tuned for future updates and enhancements, and don’t forget to check out the project details on my GitHub. If you have any ideas or suggestions, I would love to hear them! 
`,
      },
      {
        projectId: 7,
        instructionText:
          `Usage
First Code: Local Rubber Ducky The first piece of code transforms ARPoLan into a local Rubber Ducky. The Atmega32u4's USB HID capabilities allow it to act like a keyboard or mouse, injecting pre-programmed keystrokes into a connected computer. This was a fun experiment, though I refer to it as the "bad idea" code due to its potential risks. 
 
Second Code: ARP Spoofing Next, I tested the ARP spoofing code. This script injects malicious ARP packets into the network, leveraging the processing power of the Atmega32u4 and the network capabilities of the W5500. While not overly powerful, it demonstrated the device's potential for network security tasks. 
 
Third Code: Network Scanning The final code was for network scanning. By sending ARP requests to all IP addresses within a specified range, ARPoLan could identify active devices on the network. This functionality is crucial for network monitoring and penetration testing. 
 

`,
      },
      {
        projectId: 7,
        instructionText:
          `Code & PCB

If you're interested in building this project, the code and schematic are available on GitHub. Simply visit the GitHub repository to download the necessary files. If the project gains attention, I’ll open-source the PCB files as well. Feel free to test the code and share your feedback or improvements. 
 
GitHub repository: github.com/cifertech/arpolan 
`,
      },

      {
        projectId: 8,
        instructionText:
          `Ultrasonic sonar is devices that use sound waves with frequencies higher than the upper audible limit of human hearing (typically above 20 kHz) to measure distances to objects. They work on the principle of sending out a sound wave, and then measuring the time it takes for the sound wave to bounce back after hitting an object. By calculating the time difference between sending and receiving the sound wave, the distance to the object can be determined using the speed of sound in air. In some of my previous $ videos $ , you can see several different builds of such a device with special functionalities. All of them display the result on a PC monitor using an additional program written in the Processing application. 

This time I will describe to you a simple way how to make an independent Sonar, where the results are displayed on a TFT color display in the form of a radar image, which is why it is often mistakenly called radar instead of sonar. 
https://youtu.be/XOZAGRH_6hA`,
      },
      {
        projectId: 8,
        instructionText:
          `I got the idea quite by accident from a picture on the internet, and then after a little research I found that project on Github. The original project was made on a 1.8 inch display which is really a very small surface for this purpose. So I reworked the code for a larger 3.2 inch TFT display, where the image is much clearer. `,
      },{
        projectId: 8,
        imageURL:
          "https://projects.arduinocontent.cc/77c2652f-24f9-4051-b804-ee01d27a19fb.jpg",
      },
      {
        projectId: 8,
        instructionText:
          `The device is really simple to make and consists of only a few components 
- Arduino Nano microcontroller board 
- TFT display with a resolution of 240 x 320 pixels and an ILI9341 driver chip 
- Ultrasonic sensor type HC-SR04 
- small 9G Servo 
- and several resistors that serve to shift the display signal from 5V to 3.3V level 

The servo and ultrasonic sensor are housed in a separate box, which I used from a previous project, and connected to the main box with flat cables. 
`,
      },{
        projectId: 8,
        imageURL:
          "https://projects.arduinocontent.cc/551833cf-1265-4704-b8ed-624bc04e00fc.jpg",
      },
      {
        projectId: 8,
        instructionText:
          `Now let's see how the device works in real conditions: 

At the beginning, I separated the ultrasonic sensor from the servo in order to calibrate the graphic presentation with the real distance of the object. As you can see, the real distance fully corresponds to the distance shown on the display. 
`,
      },
      {
        projectId: 8,
        imageURL:
          "https://projects.arduinocontent.cc/3332450b-d347-4c5c-871c-e1d3c5db8c73.jpg",
      },
      {
        projectId: 8,
        instructionText:
          `Now we mount the sensor on the servo and place the obstacles to be detected. At power on, the servo is tested first, then the Radar like screen is drawn on the display and scanning begins. `,
      },
      {
        projectId: 8,
        imageURL:
          "https://projects.arduinocontent.cc/58696a6b-fc25-414b-bd8d-8fb2244937a5.jpg",
      },
      {
        projectId: 8,
        instructionText:
          `Obstacles are marked with red dots. In the lower left corner, the scanning area is displayed, and on the right, the distance between the sensor and the obstacle in centimeters. The three green arcs with marked distances serve us for easier visibility and an idea of the real distance. If the nearest obstacle is greater than 1 meter, yellow dots are drawn on the last arc, indicating an out of range condition. Scanning is performed first from 180 to 0 degrees, and then vice versa, from 0 to 180 degrees. `,
      },{
        projectId: 8,
        imageURL:
          "https://projects.arduinocontent.cc/c08bc3f4-47b9-469f-a32a-07aa775c9549.jpg",
      },
      {
        projectId: 8,
        instructionText:
          `For the sake of stability during operation, the device is preferably powered by an external power source, but it also works via USB on the Arduino. All display colors can be easily changed in the code according to the user's preference. 
And finally a short conclusion. Most such devices show the scan result on a PC monitor which requires an additional application and code. This is a very simple, easy to make, visually effective, and self-contained device intended for both beginners and more advanced DIYers. I've used cases from previous projects, but it's desirable to have it all in one case with a slanted front display to visually simulate a real radar system. 
`,
      },


      {
        projectId: 9,
        instructionText:
          `In this exciting tutorial, we will show you how to build your own security camera using an ESP32-CAM and an AM312 PIR sensor to detect motion. Best of all, photos will be saved directly to an SD card! 

          Throughout this video, we will guide you through the following steps: 
Link projects and update in https://rogerbit.com/wprb/2023/10/captura-con-esp32/

Hardware Connection: We will show you how to connect the ESP32-CAM and the AM312 PIR sensor to your breadboard, guaranteeing correct power. 

Arduino IDE Configuration: You will learn how to configure the development environment in Arduino IDE to work with the ESP32-CAM and select the appropriate board. 

Programming: We will provide you with the code necessary to configure the ESP32-CAM and program it to capture images when motion is detected. Additionally, we will show how to store images on an SD card. 

Try it in Real Life: You will see our motion detection system in action. We will test it in a real environment so you can see how it works. 

Tips and Customization: We will share some useful tips and show you how to customize and extend this project according to your needs. 

This project is perfect for creating an affordable and functional security camera for your home, office, or anywhere you want to monitor. 

Electronic components 

usb serial adapter 
`,
      },
      {
        projectId: 9,
        imageURL: "https://rogerbit.com/wprb/wp-content/uploads/2021/07/51Lp3uhptQL.jpg",
      },
      {
        projectId: 9,
        instructionText:
          `Description 
FTDI Basic Program Downloader USB to TTL FT232RL 3.3V 5V DTR 

This is a basic breakout board for the FTDI FT232RL USB to serial IC. The pinout of this board matches the FTDI cable to work with official Arduino boards and cloned 5V Arduino boards. It can also be used for general serial applications. The main difference with this board is that it highlights the DTR pin instead of the RTS pin of the FTDI cable. The DTR pin allows an Arduino target to automatically reset when a new Sketch is downloaded. This is a really nice feature and allows you to download a sketch without having to hit the reset button. This board will automatically reset any Arduino board that has the reset pin on a 6-pin connector. 

This board has TX and RX LEDs which make it a little better to use over the FTDI cable. In fact, you can see the serial traffic on the LEDs to check if the board is working. 

This board was designed to decrease the cost of Arduino development and increase ease of use (the auto-reset feature is great!). Our Arduino Pro and LilyPads boards use this type of connector. 
One of the nice features of this board is a jumper on the back of the board that allows the board to be set to 3.3V or 5V (both power output and I/O level). This board ships by default at 5V, but you can cut the default trace and add a solder jumper if you need to switch to 3.3V. 
 
CHARACTERISTICS 
 
Standard interface design, compatible with a variety of Arduinos such as the Pro Mini 

Original FTDI FT232 chip, stable performance 

With power indicator, send, receive, working status LED indicators 

With 3.3V and 5V TTL level supply options 

USB to Serial TTL Module, Download STC SCM 

Mini USB port connection 

Standard interface, compliant with Arduino official controller; With power, sending, reveiving indicator, With 3.3V / 5V power supply; Can be used as ordinary USB to serial TTL module, download STC singlechip 

Hardware introduction 
 
Adopt FTDI company’s FT232RL chip 

Lead out FT232RL chip all signal port, TTL / CMOS level 

RXD/TXD send-receive communication indicator 

USB power supply, can choose 5V or 3.3V interface level (if you need other level, can provide target voltage in VCC and GND pin) 

Cables Dupont 
`,
      },
      {
        projectId: 9,
        instructionText:
          `Introduction
In this project I will show you how to Decode IR Remote Control Signals' of any Remote using Arduino. 

The remotes which we use in our home are basically made of IR transmissions for example TV remote, DVD remote, Sound System remote etc. But these signals never interfere with each other because every key in the remote control has unique operation code in Hexadecimal format. By decoding these signals we can know what is the unique code of the key. By knowing the codes we can implement several applications where we can control with same remote. 

Working on Basics

IR remote has a button and a microcontroller with IR LED attached. When a button is pressed, a microcontroller identified the button and sends the corresponding modulated signals (codes) to the IR LED. Then, the IR LED sends it to the IR receiver in the appliance. 

System in the appliance demodulate the signals(codes) and the checks the function corresponding to it and executes it. Each function has a different code. 

Every IR operated appliance has different codes for different function. 

Prototype Image's
`,
      },
      {
        projectId: 9,
        imageURL: "https://projects.arduinocontent.cc/bd015441-332e-4094-a2ef-3c8a0efa3140.jpg",
      },
      {
        projectId: 9,
        imageURL: "https://projects.arduinocontent.cc/ac0170b4-8181-4118-b8f2-1dc78673e266.jpg",
      },
      {
        projectId: 9,
        instructionText:
          `Hookup
Follow the Steps:- 

Connect the First pin from the left of TSOP1738 ( OUT pin) with pin 11 of Arduino. 

Hook the Middle pin ( GND pin) with the GND pin of Arduino. 

Connect the third and the last pin ( VCC pin) with 5V pin of Arduino. 

Uploading and Testing

Remember to install the IRremote.h library from $ here $ 

Copy or download the code attached with the project. 

Hit upload and open serial monitor. 

Take any remote you want to use or you want the codes off it and press any button. 

Now, see in the serial monitor. You will see a code of the corresponding button you pressed. 

Note the codes on a paper or copy them in a document file on PC. 
`,
      },


    ])

    //Forked Project
    await Instruction.query().insert([
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
        imageURL:
          "https://camo.githubusercontent.com/1184ca196713be3739b0cf2af4ba3306d623754614c137cf6b8f80abe5583bf7/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f45596d614d367945664c382f302e6a7067",
      },
      {
        projectId: 17,
        imageURL:
          "https://camo.githubusercontent.com/e3a79514aa8c1742f853c12d8bb9f8052d36b64919cf6b861e6e0962bf3d4c23/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f62535368362d4c796d66672f302e6a7067",
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
        instructionText: `Here, You can learn "How to Control Motors using L298n Motor Driver & Arduino Uno". 
You can even control Speed & Direction of Motors using this tutorial. 
 
Additionally, I am Attaching a Video for your proper guidance. 
You can see Step by Step Process physically- 
`,
      },   {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/f50108d1-ac6d-4d5f-acb5-90ca5a093cd4.jpg",
      },
      {
        projectId: 19,
        instructionText: `Here, I am attached a L298n Motor Driver Pinout Diagram- `,
      },   {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/918a766f-aeb8-4f94-aeda-57f183d1cf86.jpg",
      },
      {
        projectId: 19,
        instructionText: `Firstly, Connect your Motors with L298n Motor Driver `,
      },   
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/e0fd14ab-6166-4870-ad6e-b73c47009d86.png",
      },
      {
        projectId: 19,
        instructionText: `Now, Connect your L298n Pins with Arduino Uno Pins `,
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/7d20b0ad-496b-4a90-80ce-669ec9db1fd2.png",
      },
      {
        projectId: 19,
        instructionText: `Now, Connect following Pins- 
L298n (+5V) =>Arduino (+5V) 
L298n (Gnd) =>Arduino (Gnd) 
 
Now Connect Battery- 
L298n (+12V) =>Battery (+ve) 
L298n (Gnd) =>Battery (-ve) 
 
Above Pin System can Run your L298n Motor Driver module as well as Arduino. 
 
But, If you want to Control Speed you have to do some simple extra work. 
`,
      },
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/a73bfc9c-7c69-44fa-9d0f-321e034d6f4e.png",
      },
      {
        projectId: 19,
        instructionText: `Now You can Control your Motor Speed. 

I am attached my Final Look of our Project. 
`,
      }, 
      {
        projectId: 19,
        imageURL: "https://projects.arduinocontent.cc/a5dae994-fc70-4093-91ce-37b2ed3f44af.jpg",
      },
      {
        projectId: 20,
        instructionText: `Hello everyone, 

        Welcome back to another interesting and easy tutorial after a long time. Sorry guys I was busy in writing very fantastic book regarding Arduino IoT Cloud and I will share the details at the end of this tutorial. so this book writing approx took 1 year and 2 months. 

        Well back to the point, many years ago I have created a tutorial on temperature and humidity monitoring using Arduino Uno and DHT22. I got approx half million hits on my that article. this is the love from community which is pushing me to work beyond my commitment. 

        So in this tutorial I am going to demonstrate how to monitor temperature and humidity using SeeedStudio tiny development MKRWiFi 1010 and how to integrate it with Arduino IoT Cloud so you guys can take the benefit of IoT Platforms and keep yourself updated with your room/outdoor temperature and humidity anywhere in the world with the help of Arduino IoT Cloud. 

        Buckle up, guys, and collect the MKR WiFi 1010 and DHT22 with male-to-male cables. Connect the DHT22 to the MKR WiFi 1010 as per the below diagram. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/28e6dbad-bfb6-42fb-baad-7b7741ca689f.png",
      },
      {
        projectId: 20,
        instructionText: `It's time to navigate towards Arduino IoT Cloud https://app.arduino.cc/ if you didn't have account then just create the account. Now our first step is to create Thing it's basically a container in Arduino IoT Cloud which holds the Device, Cloud variables, Code and Meta data of of IoT node. Click on Thing menu which is available in the left side bar as per below image. `,
      }, 
      {
        projectId: 20,
        imageURL: "https://i.imgur.com/7UPq84L.png",
      },
      {
        projectId: 20,
        instructionText: `Now click on + CREATE THING button which is shown in the center of the page as per below image. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/16c97c36-b414-4a56-8fd3-e23096496af0.png",
      },
      {
        projectId: 20,
        instructionText: `After that you will see a new page where you will fin different tabs and sections as just like below diagram. this is the main page where we need to setup all the things like variables, device, network configuration, code and etc. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/1fd770d1-3d82-40eb-8c59-947fbf6f7097.png",
      },
      {
        projectId: 20,
        instructionText: `Above picture is marked with red boxes and I assigned the numbers to them and below is full explanation of each step which is marked by number. 
1- Click on "Untitled" and select rename and assign the name to Thing. 

2-In this section we will add the cloud variables and in this tutorial we required 2 cloud variables one for temperature and second for humidity. 

3-Attach the device to Thing 

4-Configure the Network Settings 

5-Navigate to the Sketch tab and add the code for MKR Wi-Fi 1010 and upload the code. 

Adding Variables to Thing

In this subsection, we will add the cloud variables to Thing. Click on the ADD button, which is available in the Cloud Variables section. and you will see the pop-up where you need to provide the name. Select the type of variable from the drop-down menu. Right now, I am not going to talk about other options due to time limitations. Finally, click on the "ADD VARIABLE" button and repeat the same procedure for the humidity variable, but select the relative humidity type from the drop-down menu as per below image. 
`,
      }, 
      {
        projectId: 20,
        imageURL: "https://i.imgur.com/dicxo6D.png",
      },
      {
        projectId: 20,
        instructionText: `Adding Device to Thing

Before adding a device you should have "Arduino Create Agent" Installed and running on your machine. Then click on Select Device button under Associated Device section. Popup will appear and list all of the devices if any device is associated in Arduino IoT Cloud else you have option to Add a new Device. 

Click on "SET UP NEW DEVICE" and select the "Arduino" option. In the next step, Arduino will automatically detect the supported Arduino development board and display the name and port of the development board as shown in the below picture. Before this process, try to connect MKR Wi-Fi 1010 to your machine. Click on the "CONFIGURE" button. It will take a few seconds to configure your development board with the necessary configuration.. 
`,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/05ec1b63-62b2-4291-865d-b2913f924809.png",
      },
      {
        projectId: 20,
        instructionText: `Congrats your Device has been added and attached successfully to Thing. 

Configure Network for Thing

After adding the device it's time to configure the Wi-Fi Settings. Click on Configure button under Network section on the Thing main page. Here you will see the popup just like below image and you need to provide Wi-Fi Name and it's Password. 
`,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/0fc35297-5efc-435f-901f-c858d7452bf5.png",
      },
      {
        projectId: 20,
        instructionText: `After passing the first four steps, our Thing page looks like the below image. In these 4 steps, we assigned the name to the thing, created cloud variables, associated the device with the thing, and, at the end, added the Wi-Fi configuration. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/5d5f5477-809e-42d9-84cd-701b533534b9.png",
      },
      {
        projectId: 20,
        instructionText: `Playing with the Code

Now it's time to play with the code. Just click on the Sketch tab and you will see the inline code editor. copy the code from the end of this page under code section and paste into the editor. and click on upload button which is marked by red rectangle in below image. it will take few seconds for code verification and uploading to development board. 
`,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/f1db379f-444e-46a7-94bd-5319e03c68af.png",
      },
      {
        projectId: 20,
        instructionText: `Congrats now your devices is up and running and successfully sending the values to Arduino IoT Cloud. 

Dashboard creation

In the previous tutorial, we just created and set up the thing. Now it's time to visualize the sensor readings. For this, we need to setup the dashboard. Click on the Dashboards menu, as shown in the below picture. 
`,
      },
      {
        projectId: 20,
        imageURL: "https://i.imgur.com/FFgR2Uv.png",
      },
      {
        projectId: 20,
        instructionText: `Now you will see the Dashboard page just like below image and click on + CREATE DASHBOARD. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/4cd7e377-a7d3-451b-9ecd-1cbef4297c7c.png",
      },
      {
        projectId: 20,
        instructionText: `You will see the new tab where you can setup the control widgets to visualize your sensor values. But here I marked down some important icons and buttons with numbers. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/ebe991fd-7885-43c2-9646-c80cd9a7e734.png",
      },
      {
        projectId: 20,
        instructionText: `1- Click Untitled to rename and assign a name to your Dashboard 

2-Eye icon is view mode while edit icon allows you to add/update the widgets and their settings. 

3-ADD button is control drop down where you will find plenty of control widgets such as gauge, charts, buttons which will help you to visualize your sensors data and control. 

4-Reize icon will be used to resize the control and lock the alignment while mobile icon is used to prepare your dashboard according to mobile device, as by default you are creating dashboard for desktop. 

Adding Widgets to Dashboard

Now it's time to add some widgets to visualize our Temperature and Humidity values. for Temperature I will use Gauge widget and for Humidity Percentage widget. Click on the ADD button and search for Gauge widget. After that you will see the popup just like below image and Assign the Name to widget and Link the Temperature cloud variable. 
`,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/c7be9925-ce5c-45a3-95cd-cf87f62500e8.png",
      },
      {
        projectId: 20,
        instructionText: `After giving the Name to widget control and linking the cloud variable setup will look like below image. just click on "DONE" and you will be good to go. `,
      },  
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/280dde65-b44c-40d6-b004-eca0605b5706.png",
      },
      {
        projectId: 20,
        instructionText: `Repeat the same procedure for Percentage Widget and also try to explore other display values widget controls like Values, Charts and etc widgets. Now the final Dashboard has been ready for your view just like below image which is showing both Temperature and Humidity values. `,
      },
      {
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/b84f52b0-0581-4630-96d5-7e3c93579335.png",
      },
      {
        projectId: 20,
        instructionText: `Arduino IoT Cloud for Developers Book

Download the Arduino IoT Cloud app on your Android/Apple via Play/App store and login with your account and see the dashboard on fingertips for latest update and alerts. 

Now it's time to talk about my Arduino IoT Cloud for Developers book which is by the available at amazon as well as on PacktPub. Below are the URLS for your purchase. 
`,
      },
      {
        projectId: 20,
        instructionText: `https://www.amazon.com/Arduino-Cloud-Developers-simple-complex/dp/1837637172
https://www.packtpub.com/product/arduino-iot-cloud-for-developers/9781837637171`,
      },
      {
        projectId: 20,
        instructionText: `The book has 14 chapters where you will learn about Internet of Things Architecture, Arduino IoT Cloud hierarchy as it's totally different from other cloud platforms such as ThingSpeak, Cayenne myDevices and etc. Next you will learn all the Cloud Platform options and dashboard widgets which is very mandatory to learn all the stuff before getting started with the Arduino IoT Cloud. 

I have created 6 different projects in the book which are using different types of development boards which includes MKR Wi-Fi 1010, ESP8266, XIAO ESP32C3 and etc. You will learn Enviromental Monitoring, Smart Agriculture, Smart Health, IoT for assets tracking using GSM as well as with LoraWan, Smart Home where we integrated smart lamp with Amazon Alexa Dot Echo with in couple of minutes without any code to Arduino IoT Cloud. I Hope you will will enjoy my book just like this tutorial. 

For developers and IoT engineers, I have written two special chapters that focus on how to use the Arduino IoT Cloud API and Arduino Cloud CLI to integrate their solution with other 3rd party clouds and services, and Arduino Cloud CLI helps engineers and administrators to automate and manage bulk deployments using the command-line tool. 
`,
      },{
        projectId: 20,
        imageURL: "https://projects.arduinocontent.cc/ebe991fd-7885-43c2-9646-c80cd9a7e734.png",
      },
      {
        projectId: 20,
        instructionText: ``,
      },
    ])
  }
}

export default InstructionSeeder
