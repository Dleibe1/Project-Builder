const projectInstructionsSeedData = [
  `<div><h2>RGB LED Types and Structure </h2><p>RGB LEDs have three LEDs inside them \
and usually, these three internal LEDs share either a common anode or a common cathode \
especially in a through-hole package. So basically, we can categorize RGB LEDs as either \
common anode or common cathode type just like in seven segment displays. </p><img \
src="https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png"></img><h2>Common \
Anode</h2><p>In a common anode RGB LED, the anode of the internal LEDs are all connected \
to the external anode lead. To control each color, you need to apply a LOW signal or \
ground to the red, green, and blue leads and connect the anode lead to the positive \
terminal of the power supply. </p><img \
src="https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png"></img><h2>Common \
Cathode</h2><p>In a common cathode RGB LED, the cathode of the internal LEDs are all \
connected to the external cathode lead. To control each color, you need to apply a HIGH \
signal or VCC to the red, green, and blue leads and connect the anode lead to the negative \
terminal of the power supply. </p><img \
src="https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png"></img><h2>Basics \
of PWM (Pulse Width Modulation)</h2><p>Pulse Width Modulation, or PWM, is a technique for \
getting something that looks like an analog signal using what are really digital signals. 
The digital output is used to create a square \
wave, a signal switched between on and off at a high rate of speed. This on-off pattern can simulate voltages in \
between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0 \
Volts) by changing the portion of the time the signal spends on versus the time that the \
signal spends off. The duration of "on time" is called the pulse width. To get varying \
analog values, you change, or modulate, that pulse width. If you repeat this on-off \
pattern fast enough with an LED for example, the result is as if the signal is a steady \
voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below, \
the green lines represent a regular time period. This duration or period is the inverse of \
the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green \
lines would measure 2 milliseconds each.</p><img \
src="https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif"></img><p>Make \
your connections according to the diagram below:</p><img src="https://i.imgur.com/emoaBVs.png"></img><p>Now \
upload the code to the Arduino and enjoy!</p></div>`,

  `<div><p>Ever wanted to know the temperature and humidity around you? If yes, this project is for you. If \
not, it'll be cool anyway.</p> \
<h2>What is humidity?</h2><p>Humidity \
is the proportion of air that is water vapor. Generally, it's measured in percentages. \
A humidity range of 30% to 50% is considered comfortable for most people.</p><p>This \
sensor comes in two varieties, mine looks like this:</p><img \
src="https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg"></img><p>The \
sensor I'm using has 3 pins and is fitted on a board.  If your sensor has 4 pins, then you need to build \
the circuit below:</p><img \
src="https://i.imgur.com/mPlhTTK.png"></img><p>If \
it's the same as mine, follow this diagram.  You will no longer need the resistor.</p><img \
src="https://i.imgur.com/UW1R9mh.png"></img><h2>Details \
about the code:</h2><p>You need to follow these instructions to \
make it work: <br>1. You need to add the dht11 library to the Arduino IDE and include it in \
your sketch. <br>2. Upload the code. <br>3. When the code is uploaded, you will see the humidity \
and temperature displayed in the Arduino IDE's serial monitor. </p></div>`,

  `<div><h2>Water deposit</h2><p>For our watering system, we will need a water container. Any \
container suitable for water storage can be used as a water deposit. The larger the \
storage container, the less frequent the need for recharging. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_bottle.png"></img><p>We've selected \
the bottle shown on the image as our water reservoir. With a capacity of 1.5 liters, it \
should be sufficient for watering a medium-sized plant for several days.</p><br><p>For the \
water pump to effectively move water from the bottom of the bottle to the plant, it must \
be placed inside the bottle. To accomplish this, we place the pump inside the bottle, and then we \
pull out the wires. This involves creating a small opening at the base of the bottle \
solely for the wires, enabling us to thread them out and connect the pump to our plant \
care station. To conclude the process, we use waterproof silicone to seal the opening, \
ensuring there is no water loss. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_bottom.png"></img><p>On the \
opposite end, there will be a water pipe directly connecting to the plant to provide \
hydration.</p><h2>Water pump wiring</h2><p>To facilitate the connection of the pump wires \
with the main system, we've used a barrel plug. The junction between the pump wires and \
the connector wires is shielded by heat shrink wraps, providing effective insulation from \
external elements. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png"></img><p>This \
approach ensures a secure and well-insulated connection, contributing to the overall \
reliability of the system.</p><h2>Plant care station</h2><p>The plant care station takes on \
the responsibility of processing available information, making decisions, and controlling \
the activation and deactivation of the watering system. Designed for both indoor and \
outdoor use, it hides all wiring and functions as a discreet black box. This is achieved \
by enclosing all system components within the box illustrated below. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_box.png"></img><p>The box is easily \
accessible, facilitating the replacement of components or even reprogramming of the system \
when necessary. Within the plant care station, the central orchestrator is the Arduino \
Nano, functioning as the brain to coordinate all other components. Accompanying this, \
a DS1302 module is integrated to manage real-time control, influencing watering decisions. \
It considers optimal watering times, favoring mornings and evenings when sunlight is less \
intense, promoting better absorption and utilization of water by the plants. This \
thoughtful scheduling enhances the overall efficiency and well-being of the \
plants.</p><h2>Power supply</h2><p>For the entire system, a 9V battery serves as the power \
supply. It separately powers both the Arduino and the water pump. Considering that our \
water pump operates on 5V, we require a voltage transformer. For this purpose, we have \
used the AMS117 module.<br>In contrast, the DS1302 operates on a separate CR2032 battery, \
ensuring a dedicated power source to sustain the Real-Time Clock (RTC) functionality. This \
dual-power configuration enhances the efficiency and autonomy of each component, ensuring \
the overall reliability of the system.<br><Control elements</p><br><p>The plant care station \
comes equipped with some handy controls like LEDs, buttons, and a potentiometer to enhance \
its overall functionality. A straightforward on/off switch simplifies the activation of \
the station. When manual watering is needed, a dedicated push button is readily available. \
Additionally, the potentiometer allows for accurate adjustment of the water amount during \
automatic mode. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_station.png"></img><p>These \
user-friendly controls provide a precise and efficient means of managing your plant care \
routine.</p><h2>Wiring schema</h2><p>Creating a precise wiring schema is essential for the \
optimal performance of the automatic watering system. This schema serves as a practical \
guide, interconnecting main components. Methodically organizing and routing the wires \
prevents potential confusion during the assembly process. Clarity in both assembly and \
troubleshooting phases is achieved through the implementation of color-coded distinctions \
and strictly following specified pin configurations for facilitating the communication \
between modules. </p><img \
src="https://www.hibit.dev/images/posts/2024/schemas/watering_system.png"></img><p>The \
above wiring schema offers a comprehensive overview of the system wiring and \
connections.</p><h2>Calculating base resistor value</h2><p>In order to compute the base \
resistor (RB), we must first determine the collector current. Given that the circuit's \
sole load is the water pump, it can be deduced that the collector current is identical to \
that of the water pump. Based on the water pump specification, we know that IC = 200 mA, \
or for practical purposes, IC = 0.2 A. This forms the basis for our calculations.<br>It is \
important to note that if we exceed the parameters for which the transistor was designed, \
it will eventually burn out. With this in mind, we will proceed to identify the \
transistor's gain from the datasheet. We observe that when IC = 200 mA, its gain is 100. \
We have now discovered our second value: 𝛽 = 100.</p><br><p>Once we've established the gain, \
our next step is to calculate the base current. It's important to recognize that the \
collector current is directly proportional to the base current and the gain. This \
relationship can be expressed mathematically as:</p><br><p>hFe = 𝛽 (gain) = Ic / \
Ib<br>Replacing the values, we acquire our third parameter: Ib = 2mA = 0.002A. Now, we can \
compute Rb value using Ohm's formula:<br>Vb = VS - VBE = Ib * Rb<br>Rb = (VS - VBE) / \
Ib<br>Where VS is the source voltage, and VBE is the voltage drop across the base-emitter \
junction of the transistor. In our circuit, the transistor's base is connected to an \
output from an Arduino. An Arduino output provides a maximum of 5V and 40mA. Therefore, we \
have a source voltage of 5V, and the transistor's barrier potential is 0.6V.<br>Rb = (5V - \
0.6V) / 2mA = 2.2kΩ</p><br><p>For our circuit, the suitable value for the base resistor \
should be equal or below 2.2K ohms. We choose the lower standardized resistor and check by \
looking at the datasheet curves that the base voltage is sufficient to drive the \
transistor into saturation.</p><h2>Automated plant watering system</h2><p>After going \
through rounds of mounting and wiring adjustments, we're excited to introduce our initial \
prototype of the automatic watering system. Check out the results and get a general \
overview of the system in the attached image below. We're really looking forward to seeing \
how well it takes care of the plants and are ready to make it even better by identifying \
areas for improvement. </p><img \
src="https://www.hibit.dev/images/posts/2024/watering_system_result.png"></img><p>The \
internal components of the plant care station neatly fit into the box, presenting a clean \
and user-friendly appearance. The next step involves experimenting and testing the system \
over some time to identify any weaknesses and enhance its performance. Additionally, we \
aim to minimize its size and simplify the wiring, making maintenance more \
straightforward.</p><br><p>Having outlined the concept of automated watering and successfully \
assembled the physical components, our attention now turns to the real wizardry - the \
code. This article explores the intricate lines of Arduino code that transform theory into \
reality, breathing life into our DIY plant care project. As we step into the heart of our \
automated watering system, let's unravel the details that make our green vision a \
reality.</p><h2>Install library for DS1302</h2><p>To interact with the DS1302 sensor, we \
will use an existing library. This library, provides an interface that facilitates \
communication with the module, saving you significant time and providing a reliable and \
extensively tested code base. It can be downloaded from our official repository \
https://github.com/hibit-dev/ds1302/raw/master/lib/DS1302.zip</p><br><p>To import a library, \
open the Arduino IDE, go to Sketch > Include Library > Add .ZIP Library and select the \
library file downloaded from our GitHub repository .</p><img \
src="https://www.hibit.dev/images/posts/2023/arduino_import_library.png"></img><p>Then \
you can simply use include statement:<br>#include "virtuabotixRTC.h"<br>It will include \
the library with predefined functions to interact with the module.</p><h2>Arduino \
code</h2><p>This Arduino code forms the backbone of our automated watering system, \
translating the idea of plant watering into a functional reality. At its core, this code \
interfaces with a real-time clock, ensuring our system is attuned to the rhythm of the \
day. Constants define the timeframes for morning and evening watering sessions, while \
designated pins for LEDs, buttons, and a potentiometer facilitate the communication among \
physical components.<br>In the setup phase, the code initializes pins and stages a brief, \
illuminating sequence with LEDs, symbolizing the system's awakening. As the main loop \
takes the stage, it constantly monitors the real-time clock and user inputs. The code \
continuously checks the time and conditions to trigger morning and evening watering \
cycles, while also providing a manual watering option through the push button. The \
iteration transpires every 5 seconds, ensuring a vigilant and responsive approach to the \
needs of plant care.s. Note that the push button triggers manual watering when pressed, \
adding a layer of user interactivity. Due to the 5000ms delay in the loop function, there \
might be a delay between pressing the button and the corresponding action. Nevertheless, \
when the process initiates, the green LED will illuminate.</p><br><p>The potentiometer values \
manage the water supply to the plant. The code calculates the pump's operational time \
based on the potentiometer's position. To ensure control and efficiency, we've established \
limits, where the minimum potentiometer value corresponds to a pump duration of 0 seconds, \
and the maximum allows up to 10 seconds. These settings remain easily customizable through \
designated constants.</p><br><p>It's worth mentioning that we've opted to disable the morning \
watering for our plant, choosing to automate the process exclusively in the evenings. \
Additionally, while the switch button currently lacks a specific assignment, it stands \
ready for future functionalities.</p><br><p>The presented Arduino code serves as the \
operational heart of our automated watering system, consistently monitoring real-time data \
and user inputs. Its key role is to activate morning and evening watering cycles, \
currently programmed for 8 in the morning and 20 in the evening, with customizable \
constants. The iterative loop ensures the system remains alert and responsive to the \
unique needs of plant care. The entire code is highly customizable through constants, \
enabling effortless adjustments to the configuration of the plant care station's \
operation.</p><br><p>Please be aware that the provided code snippet includes only the main \
segment.</p><h2>Conclusion</h2><p>In the spirit of self-made solutions, this project \
encourages to approach the process of building, learning, and adapting. The DS1302 \
timekeeping module and Arduino-compatible pumps play crucial roles in this process, with \
each component contributing to the synergy between technology and the natural world. The \
true essence of this project lies not just in the finished product but in the \
transformative experience of crafting a technological solution for the well-being of your \
plants, wherever they may be.</p><br><p>In wrapping up our journey through the practical \
implementation of an Arduino-powered automatic watering system, you've navigated the \
intricacies of physical mounting, sensor integration, and module connections. What started \
as abstract concepts has materialized into a self-built, technology-infused plant care \
solution.</p></div>`,

  `<div><p>The spectrum analyzer displays the amplitude of signals as a function of frequency, \
allowing engineers and technicians to visualize and analyze signal characteristics. In \
particular, the audio analyzer performs a visual representation of an acoustic signal in the \
frequency domain, where the frequency of the signal is displayed on the x-axis, while the \
amplitude of a certain frequency is displayed on the y-axis. In several of my previous \
videos I have presented several different types of such devices, but this time the FHT \
Arduino library is used for the first time. This library is several times faster than the \
commonly used FFT library, but at the expense of speed certain loss of resolution and \
precision appear at the two ends of the audio range. </p><img \
src="https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg"></img><p>The \
device is really simple to build, and consists of only a few components:<br>- Arduino Nano \
MCU board,<br>- 8x64 color Led Matrix with WS2812B adressable leds<br>- Two (three) touch \
buttons<br>- three resistors<br>- and one capacitor<br><br>Now let's see how the device works in \
real conditions. Considering that it is very simple, the device works immediately \
without any previous settings. One button is used to adjust the LED light intensity in 7 \
steps. With the other button we move through 6 different mods with specific color sets, \
and we can also add more, with very small modifications to the code.</p><img \
src="https://projects.arduinocontent.cc/e5bffdf1-c174-47b2-aaeb-0edf30fec098.jpg"></img><p>Next, \
let's test the frequency range that this analyzer covers. For this purpose we will use a \
simple online tone generator. As you can see, the device covers the entire range of what humans can hear, \
from 20 Hertz to 20 kilohertz. Such a large-range device is excellent when is used for \
visual FFT analysis, but has one practical drawback when it comes to music \
visualization. </p><img \
src="https://projects.arduinocontent.cc/68e9de6f-5336-42bc-be80-c50441f2808b.jpg"></img><p>Namely, \
a large percentage (perhaps 90%) of this music signal is in the range up to 10Khz, and \
only a small part belongs to higher frequencies. This would practically mean that for the \
entire time that the music signal is being emitted, the far right part of the analyzer \
would be inactive. Let's see how it looks in practice (Here is an example with a speech \
signal, so we will try it with musical material as well). Since, as I mentioned at the \
beginning, this is a decorative addition, and not a precise measuring instrument, \
it is desirable to reduce the bandwidth by half.</p><br><p>For this \
case I made some modification in the code, but it is also desirable to set a simple \
Low-pass filter on the input. Let's test the range with an online tone generator at the \
input. The range is up to 10Khz. </p><img \
src="https://i.imgur.com/oCzY8GD.png"></img><p>Now, \
in this case the matrix is completely filled and visually it looks much better.</p><br><p>As \
for the external appearance of the device, I tried to make a simple, but still functional \
version made of PVC board and glass with a thickness of 4 mm.</p><h2>And finally a short \
conclusion.</h2><p>This is an extremely simple project intended for beginners, but still \
visually very effective and can serve as a gadget on your desktop, or as an addition to an \
audio device. It can also be used as a simple spectrum analyzer \
intended for educational purposes </p></div>`,

  `<div><p>In the vast realm of robotics, enthusiasts are venturing into the exciting world of OLED \
eye animations for Arduino robots. If you've found yourself lost in the maze of online \
searches, fear not! We've done the legwork and distilled the top five methods for creating \
captivating eye animations into a clear and fun comparison.</p><h2>Introducing our \
selections:</h2><p>Option 1: Eye Animation on OLED Display by Intellar </p><img \
src="https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg"></img><p>Intellar's \
approach brings cool eye animations to life with simple functions mimicking various moods \
(Normal, Sleep, Smile) and versatile eye movements. Pro: Easy to use with adjustable eye \
positions. Con: Limited to three moods.</p><br><p>Option 2: Simple Animated Eye Using Arduino \
by SpiderMaf </p><img \
src="https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg"></img><p>SpiderMaf's \
method features circular eyes with pupils for precise movements, adding a touch of \
humanity to your robot. Pro: Compact functions with customizable features. Con: Similar to \
Intellar's approach.</p><br><p>Option 3: Akno by AbdulsalamAbbod </p><img \
src="https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg"></img><p>Akno \
stands out with its expressive rectangular eyes and a wide range of emotions, suitable for \
various display types. Pro: Supports multiple expressions. Con: Less flexible in adjusting \
eye size.</p><br><p>Option 4:  Arduino OLED Moving Eyes by Vinny </p><img \
src="https://projects.arduinocontent.cc/2596309e-914d-4907-b5a0-b940e3bc6f7b.jpg"></img><p>Vinny's \
innovative technique involves rendering custom images on OLED displays, though it comes \
with memory constraints. Pro: External image rendering capability. Con: Memory-intensive \
process.</p><br><p>Option 5: Arduino UNO Robotic Eye Animations by Picaio </p><img \
src="https://projects.arduinocontent.cc/cff99131-f7ce-4295-b530-811e057734de.jpg"></img><p>Picaio \
offers a sophisticated yet realistic approach with diverse eye movements and expressions, \
enhancing animation realism. Pro: Optimized technique for efficient memory usage. Con: May \
be challenging for beginners due to its complexity.</p><br><p>Whether you're a seasoned \
hobbyist or just starting out, these methods provide a gateway to bringing your robot's \
personality to life! Get ready to dive in, experiment, and unleash your \
creativity.</p><br><p>Let's animate those robotic eyes and inject some fun into your Arduino \
projects! 🤖👀</p></div>`,

  `<div><p>Greetings everyone, and welcome to my Instructables tutorial. Today, I'll guide you \
through the process of creating an Object Tracking 4-DOF Robotics Arm.</p><h2>Project \
Overview:</h2><p>In this project, the robotic arm will execute actions corresponding to \
the commands received from the sensors. For example, if the object moves to the left, the \
robotic arm will respond by moving to the left, and similarly for movements to the right, \
up, and down.</p><br><p>Without further ado, let's dive into the project and get started!</p> \
<h2>Step 1: Assemble the Robotics Arm Kit</h2> \
<p>Watch the \
video for a complete step-by-step assembly of the Robotics Arm Kit.</p> \
<iframe width="560" height="315"
src="https://www.youtube.com/embed/TMv3JR06yuo">
</iframe><br><h2>Step 2: \
Servo Motors & PWM Servo Motor Driver Wiring</h2><img \
src="https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg"></img><p>Refer \
to the image above and connect all four servo motor wires to the PWM servo motor driver \
pins.<br><br>Figure Servo -> PWM servo pin 0<br>Right side Servo -> PWM servo pin 1<br>left \
side Servo -> PWM servo pin 2<br>Base Servo -> PWM servo pin 3</p><h2>Step 3: PWM Servo \
Motor Driver & Arduino Uno Wiring</h2><img \
src="https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png"></img><p>Follow \
the Circuit Diagram:<br>PWM Servo Motor Driver  -> Arduino Uno<br>GND   ->    GND<br>SCL   \
->    A4<br>SDA   ->    A5<br>VCC   ->    VIN</p><h2>Step 4: Mounting the Sensors Into the \
Robotics Arm</h2><img \
src="https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg"></img><p>Follow \
the Steps:<br>- Insert the Ultrasonic Sensor into the designated sensor case.<br>- \
Securely attach the sensor case to the robotics arm as illustrated in the provided \
image.<br>- Utilize hot glue to ensure proper mounting of the sensor case.<br>- Affix the \
IR sensors to the left and right sides of the sensor case using hot glue.</p><br><p>These are \
all the steps required for this process.</p><h2>Step 5: Ultrasonic Sensor, IR Sensor & \
Arduino Uno Wiring</h2><img \
src="https://projects.arduinocontent.cc/db48a4f0-129b-4770-8e19-9e81f5a8c29d.png"></img><p>Follow \
the Circuit Diagram:</p><br><p>Ultrasonic Sensor -> Arduino Uno<br>GND -> GND ECHO -> A3 TRIG \
-> A2 VCC -> VIN</p><br><p>IR Sensor -> Arduino Uno (Right)<br>GND -> GND OUT -> A1 VCC -> \
VIN</p><br><p>IR Sensor -> Arduino Uno (left)<br>GND -> GND OUT -> A0 VCC -> VIN</p><br><h2>Step \
6: Time to Upload the Sketch</h2><img \
src="https://projects.arduinocontent.cc/efbbe392-9df2-476e-8470-157bd5dd834d.jpg"></img><p>- \
Now connect the USB cable to the Arduino Uno.<br>Next, upload the following code:</p></div>`,

  `<div><h2>About the Project</h2><br><p>Welcome back, tech enthusiasts! Today, I'm excited to introduce \
ARPoLan, a project that started as an experiment to explore the potential of combining the \
Arduino Pro Micro and the W5500 Ethernet module. This powerful device can perform network \
scanning, ARP spoofing, and even act as a local Rubber Ducky. Let me take you through \
building and testing this network security tool. Features & Components</p><br><p>ARPoLan \
combines several powerful components to deliver its impressive capabilities:</p><br><p>1.  \
Network Scanning: Discover devices on the local network by sending ARP requests and \
collecting responses.<br>2.  ARP Spoofing: Perform ARP spoofing attacks to intercept and \
manipulate network traffic.<br>3.  HID Functionality: Utilize the Atmega32u4's USB HID \
capabilities for additional attack vectors.<br>4.  Real-time Monitoring: Visual and serial \
indicators for attack detection and network activity. Getting Started</p><br><p>I designed \
the PCB for ARPoLan using Altium Designer, creating a simple yet efficient two-layer \
layout. Here’s a breakdown of the components used: </p><img \
src="https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg"></img><p>Atmega32u4 \
Microcontroller: Handles USB communication and processing tasks.</p><br><p>W5500 Ethernet \
Module: Provides reliable network connectivity with an integrated hardware TCP/IP \
stack.</p><br><p>25 MHz Crystal Oscillator: Ensures precise timing for network \
operations.</p><br><p>RJ45 Ethernet Socket: Facilitates network connections with integrated \
status LEDs.</p><br><p>LM1117 Voltage Regulator: Supplies a stable 3.3V power to the \
W5500.</p><br><p>USB A Port: Allows for easy programming and data transfer.</p><h2>Passive \
Components:</h2><p>Capacitors and resistors for power stabilization and signal \
integrity.</p><br><p>The communication between the W5500 and the Atmega32u4 is handled via \
the SPI protocol, ensuring quick and reliable data transfer. Schematic</p><br><p>The PCB for \
ARPoLan was designed using Altium Designer, featuring a two-layer layout optimized for \
compactness and efficiency. The board integrates all necessary components, ensuring \
reliable connections between the Atmega32u4 and the W5500. </p><img \
src="https://projects.arduinocontent.cc/0b6d0eeb-6a94-4fd1-9568-654934207c4a.png"></img><h2>Connection \
Table</h2><p>Ensure the VCC pin of the W5500 is connected to a 3.3V power supply, as the \
module operates at 3.3V logic levels.</p><br><p>The SS (Slave Select) pin can be connected to \
any digital pin on the Arduino Pro Micro, but it must be defined correctly in the \
code.</p><br><p>Make sure the GND of the Arduino Pro Micro is connected to the GND of the \
W5500 module to ensure a common ground.</p><br><p>This setup will enable SPI communication \
between the Arduino Pro Micro and the W5500 Ethernet module. </p><img \
src="https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg"></img><h2>Conclusion</h2><p>Creating \
ARPoLan was a fascinating journey into network security and hardware integration. From \
designing the PCB to writing and testing the code, this project showcased the potential of \
combining simple yet powerful components to achieve sophisticated functionalities. Stay \
tuned for future updates and enhancements, and don’t forget to check out the project \
details on my GitHub. If you have any ideas or suggestions, I would love to hear them! \
Usage<br>First Code: Local Rubber Ducky The first piece of code transforms ARPoLan into a \
local Rubber Ducky. The Atmega32u4's USB HID capabilities allow it to act like a keyboard \
or mouse, injecting pre-programmed keystrokes into a connected computer. This was a fun \
experiment, though I refer to it as the "bad idea" code due to its potential \
risks.</p><h2>Second Code: ARP Spoofing</h2><p>Next, I tested the ARP spoofing code. This script \
injects malicious ARP packets into the network, leveraging the processing power of the \
Atmega32u4 and the network capabilities of the W5500. While not overly powerful, it \
demonstrated the device's potential for network security tasks.</p><h2>Third Code: Network \
Scanning</h2><p>The final code was for network scanning. By sending ARP requests to all IP \
addresses within a specified range, ARPoLan could identify active devices on the network. \
This functionality is crucial for network monitoring and penetration testing. Code & \
PCB</p><br><p>If you're interested in building this project, the code and schematic are \
available on GitHub. Simply visit the GitHub repository to download the necessary files. \
If the project gains attention, I’ll open-source the PCB files as well. Feel free to test \
the code and share your feedback or improvements.</p><br><p>GitHub repository:</p> \
<p><a href="https://www.github.com/cifertech/arpolan">github.com/cifertech/arpolan</a></p></div>`,

  `<div><p>Ultrasonic sonar are devices that use sound waves with frequencies higher than the upper \
audible limit of human hearing (typically above 20 kHz) to measure the distance to objects. \
They work on the principle of sending out a sound wave, and then measuring the time it \
takes for the sound wave to bounce back after hitting an object. By calculating the time \
difference between sending and receiving the sound wave, the distance to the object can be \
determined using the speed of sound.</p><br><p>This time I will describe \
how to make an independent Sonar, where the results are displayed on a TFT \
color display in the form of a radar image, which is why it is often mistakenly called \
radar instead of sonar.</p><p><a href="https://youtu.be/XOZAGRH_6hA">https://youtu.be/XOZAGRH_6hA</a></p>
<p>I got the idea quite by accident \
from a picture on the internet, and then after a little research I found that project on \
Github. The original project was made on a 1.8 inch display which is really a very small \
surface for this purpose. So I reworked the code for a larger 3.2 inch TFT display, where \
the image is much clearer. </p><img \
src="https://projects.arduinocontent.cc/77c2652f-24f9-4051-b804-ee01d27a19fb.jpg"></img><p>The \
device is really simple to make and consists of only a few components:<br>- Arduino Nano \
microcontroller board<br>- TFT display with a resolution of 240 x 320 pixels and an \
ILI9341 driver chip<br>- Ultrasonic sensor type HC-SR04<br>- small 9G Servo<br>- and \
several resistors that serve to shift the display signal from 5V to 3.3V level</p><br><p>The \
servo and ultrasonic sensor are housed in a separate box, which I used from a previous \
project, and connected to the main box with flat cables. </p><img \
src="https://projects.arduinocontent.cc/551833cf-1265-4704-b8ed-624bc04e00fc.jpg"></img><p>Now \
let's see how the device works in real conditions:</p><p>At the beginning, I separated \
the ultrasonic sensor from the servo in order to calibrate the graphic presentation with \
the real distance of the object. As you can see, the real distance fully corresponds to \
the distance shown on the display. </p><img \
src="https://projects.arduinocontent.cc/3332450b-d347-4c5c-871c-e1d3c5db8c73.jpg"></img><p>Now \
we mount the sensor on the servo and place the obstacles to be detected. At power on, the \
servo is tested first, then the Radar like screen is drawn on the display and scanning \
begins. </p><img \
src="https://projects.arduinocontent.cc/58696a6b-fc25-414b-bd8d-8fb2244937a5.jpg"></img><p>Obstacles \
are marked with red dots. In the lower left corner, the scanning area is displayed, and on \
the right, the distance between the sensor and the obstacle in centimeters. The three \
green arcs with marked distances serve us for easier visibility and an idea of the real \
distance. If the nearest obstacle is greater than 1 meter, yellow dots are drawn on the \
last arc, indicating an out of range condition. Scanning is performed first from 180 to 0 \
degrees, and then vice versa, from 0 to 180 degrees. </p><img \
src="https://projects.arduinocontent.cc/c08bc3f4-47b9-469f-a32a-07aa775c9549.jpg"></img><p>For \
the sake of stability during operation, the device is preferably powered by an external \
power source, but it also works via USB on the Arduino. All display colors can be easily \
changed in the code according to the user's preference.</p><h2>And finally, a short conclusion \
</h2><p>Most such devices show the scan result on a PC monitor which requires an additional \
application and code. This is a very simple, easy to make, visually effective, and \
self-contained device intended for both beginners and more advanced DIYers. I've used \
cases from previous projects, but it's desirable to have it all in one case with a slanted \
front display to visually simulate a real radar system.</p></div>`,

  `<div><h2>Introduction</h2>
<p>In this project I will show you how to Decode IR Remote Control Signals' of any Remote using Arduino.</p><p> \
The remotes which we use in our home are basically made of IR transmissions for example TV remote, \
DVD remote, Sound System remote etc. But these signals never interfere with each other because every \
key in the remote control has unique operation code in Hexadecimal format. By decoding these signals \
we can know what is the unique code of the key. By knowing the codes we can implement several \
applications where we can control with same remote.</p> 
<h2>Working on Basics</h2>
<p>IR remote has a button and a microcontroller with IR LED attached. When a button is pressed, a \
microcontroller identified the button and sends the corresponding modulated signals (codes) to \
the IR LED. Then, the IR LED sends it to the IR receiver in the appliance.</p>
<p>System in the appliance demodulate the signals(codes) and the checks the function corresponding \
to it and executes it. Each function has a different code.</p>
<p>Every IR operated appliance has different codes for different function.
<h2>Prototype Images:</h2>
<img src="https://projects.arduinocontent.cc/bd015441-332e-4094-a2ef-3c8a0efa3140.jpg" />
<img src="https://projects.arduinocontent.cc/22e31e0b-0fba-4739-a12e-8434fffd750b.jpg" />
<img src="https://projects.arduinocontent.cc/f0bee8b2-f2f7-4bc2-bba3-7dcab6722451.jpg" />
<h2>Hookup</h2>
<p>Follow these Steps:</p><p>
Connect the First pin from the left of TSOP1738 ( OUT pin) with pin 11 of Arduino. 
<br>Hook the Middle pin ( GND pin) with the GND pin of Arduino. 
<br>Connect the third and the last pin ( VCC pin) with 5V pin of Arduino.</p> 
<h2>Uploading and Testing</h2>
<p>Remember to install the IRremote.h library \
from<a href="https://github.com/z3t0/Arduino-IRremote/archive/master.zip">github.com/z3t0/Arduino-IRremote/archive/master.zip</a>
</p><p>Copy or download the code attached with the project. 
Hit upload and open the serial monitor. 
Take any remote you want to use or you want the codes off of and press any button on the remote. 
Now in the serial monitor you will see the code of the corresponding button you pressed. 
Note the codes on a paper or copy them in a document file on your PC. 
<h2>Circuit Diagram</h2>
<p>1. Connect the First pin from the left of TSOP1738 (OUT pin) with pin 11 of Arduino. </p><p>2. Hook the Middle \
pin (GND pin) with the GND pin of Arduino.</p> <p>3. Connect the third and the last pin (VCC pin) with 5V pin of Arduino.
</p><img src="https://projects.arduinocontent.cc/281bfbe8-1de3-442e-9d7e-b58dd8af0813.png"></img></div>`,

  `<div><h2>Follow the steps below</h2><img \
src="https://projects.arduinocontent.cc/f50108d1-ac6d-4d5f-acb5-90ca5a093cd4.jpg"></img>
<h2>I've labeled the inputs and outputs on the motor driver</h2><img \
src="https://projects.arduinocontent.cc/918a766f-aeb8-4f94-aeda-57f183d1cf86.jpg"></img> \
<h2>First, connect the motors to the outputs as seen below</h2><img \
src="https://projects.arduinocontent.cc/e0fd14ab-6166-4870-ad6e-b73c47009d86.png"></img>
<h2>Connect the L298n input Pins to the Arduino Uno</h2><img \
src="https://projects.arduinocontent.cc/7d20b0ad-496b-4a90-80ce-669ec9db1fd2.png"></img> \
<h2>Power connections</h2><p>Logic power connections:</p><p>L298n (+5V) =>Arduino (+5V)<br>L298n (Gnd) =>Arduino \
(Gnd)</p><p>Power for motors:</p><p>L298n (+12V) =>Battery (+ve)<br>L298n (Gnd) \
=>Battery (-ve)</p><p>Now that the board and motors have power, it's time to connect \
the outputs for motor control from the Arduino to the inputs of the motor driver.</p><img \
src="https://projects.arduinocontent.cc/a73bfc9c-7c69-44fa-9d0f-321e034d6f4e.png"></img><p>Now \
everything is set up to begin controlling the motors with our Arduino code.</p><p>
Below is a picture of what my project looked like when finally completed.  As you can see \
I later decided to use two lithium ion batteries, but I highly suggest sticking with \
9 volt batteries if you are a beginner.  Lithium ion batteries can be dangerous to work with!</p><img \
src="https://projects.arduinocontent.cc/601919da-0dc7-4158-9e4c-66e1192c1e0e.jpg"></img></div>`,

  `<div><p>Hello everyone,</p><br><p>Welcome back to another interesting and easy tutorial after \
a long time away. Sorry guys, I was busy writing a book about Arduino IoT \
Cloud and I will share the details at the end of this tutorial. Writing this book \
took approximately 1 year and 2 months.</p><br><p>Many years ago I \
created a tutorial on temperature and humidity monitoring using an Arduino Uno and a \
DHT22. I got approximately half a million hits on that article. This love from the community \
has pushed me to work beyond what I had initially intended.</p><br><p>In this tutorial, I am \
going to demonstrate how to monitor temperature and humidity using SeeedStudio tiny \
development MKRWiFi 1010 and the Arduino IoT Cloud.  After completing this project, you will \
hopefully understand how to incorporate the Arduino IoT Cloud into other projects.</p><br><p> \
  Buckle up, guys, and collect the MKR WiFi 1010 and DHT22 with male-to-male cables. \
Connect the DHT22 to the MKR WiFi 1010 as per the below diagram. </p><img \
src="https://projects.arduinocontent.cc/28e6dbad-bfb6-42fb-baad-7b7741ca689f.png"></img><p> \
Navigate to Arduino IoT Cloud.  If you don't have an account already, go ahead and create \
one.</p><a href="https://app.arduino.cc/">app.arduino.cc/</a><p> \
Now our first step is to create a "Thing."  It's basically \
a container in Arduino IoT Cloud which holds the device, cloud variables, code and meta \
data of an IoT node. Click on "Things" in the menu which is available in the left side bar as per \
the image below.</p><img src="https://i.imgur.com/7UPq84L.png"></img><p>Now click on the + \
CREATE THING button which is shown in the center of the page as per below image.</p><img \
src="https://projects.arduinocontent.cc/16c97c36-b414-4a56-8fd3-e23096496af0.png"></img><p>After \
that you will see a new page where you will find different tabs and sections. \
This is the main page where we need to setup all the things like variables, \
device, network configuration, code etc. </p><img \
src="https://projects.arduinocontent.cc/1fd770d1-3d82-40eb-8c59-947fbf6f7097.png"></img><p>The \
above picture is marked with red boxes.  I \
assigned numbers to them to make the instructions below easier to follow.  The number \
at the beginning of each instruction corresponds with one of my numbered labels in the \
picture.</p><br><p>1. Click on "Untitled" and select \
rename and assign the name to Thing.</p><br><p>2. In this section we will add the cloud \
variables. We require 2 cloud variables, one for temperature and \
another for humidity.</p><br><p>3. Attach the device to Thing</p><br><p>4. Configure the Network \
Settings</p><br><p>5. Navigate to the Sketch tab and add the code for MKR Wi-Fi 1010 and \
upload the code.</p><h2>Add variables to Thing</h2><p>In this subsection, we will add \
the cloud variables to our "Thing." Click on the ADD button, which is available in the Cloud \
Variables section. You will see the pop-up where you need to provide the name. Select \
the type of variable from the drop-down menu. Right now, I am not going to talk about \
other options due to time limitations. Finally, click on the "ADD VARIABLE" button and \
repeat the same procedure for the humidity variable, but select the relative humidity type \
from the drop-down menu as per below image.</p><img \
src="https://i.imgur.com/dicxo6D.png"></img><h2>Add Device to Thing</h2><p>Before \
adding a device you should have "Arduino Create Agent" Installed and running on your \
machine. Then click on the "Select Device" button under the "Associated Device" section. A \
pop-up will \
appear and list all of the devices associated with your Arduino IoT Cloud account. If \
you don't have any devices associated with the account yet, you will have the
"Add a new Device" option.</p><br><p>Click on "SET UP NEW DEVICE" and select the \
"Arduino" option. In the next step, Arduino will automatically detect the supported \
Arduino development board and display the name and port of the development board as shown \
in the picture below. Before this process, try to connect the MKR Wi-Fi 1010 to your machine. \
Click on the "CONFIGURE" button. It will take a few seconds to configure your development \
board with the necessary configuration.</p><img \
src="https://projects.arduinocontent.cc/05ec1b63-62b2-4291-865d-b2913f924809.png"></img><p>Congrats \
your Device has been added and attached successfully to Thing.</p><h2>Configure Network \
for Thing</h2><p>After adding the device it's time to configure the Wi-Fi Settings. Click \
on the "Configure" button under the "Network" section on the Thing's main page. Here you will see the \
pop-up just like in the image below and you need to provide Wi-Fi Name and it's Password. </p><img \
src="https://projects.arduinocontent.cc/0fc35297-5efc-435f-901f-c858d7452bf5.png"></img><p>After \
passing the first four steps, our Thing page looks like the image below. In these 4 steps, \
we assigned the name to the thing, created cloud variables, associated the device with the \
thing, and at the end added the Wi-Fi configuration. </p><img \
src="https://projects.arduinocontent.cc/5d5f5477-809e-42d9-84cd-701b533534b9.png"></img><h2>Playing \
with the Code</h2><p>Now it's time to play with the code. Just click on the Sketch tab and \
you will see the inline code editor. Copy the code from the end of this page under the code \
section and paste it into the editor. Click the upload button which is marked by a red \
rectangle as in the image below. it will take a few seconds for the code verification and uploading to \
development board. </p><img \
src="https://projects.arduinocontent.cc/f1db379f-444e-46a7-94bd-5319e03c68af.png"></img><p>Congrats \
now your device is up and running and successfully sending the values to Arduino IoT \
Cloud.</p><h2>Dashboard creation</h2><p>In the previous tutorial, we just created and set \
up the thing. Now it's time to visualize the sensor readings. For this, we need to setup \
the dashboard. Click on the Dashboard's menu as shown in the picture below.</p><img \
src="https://i.imgur.com/FFgR2Uv.png"></img><p>Now you will see the Dashboard page just \
like in the below image and click on "+ CREATE DASHBOARD." </p><img \
src="https://projects.arduinocontent.cc/4cd7e377-a7d3-451b-9ecd-1cbef4297c7c.png"></img><p>You \
will see the new tab where you can setup the control widgets to visualize your sensor \
values. But here I marked down some important icons and buttons with numbers. </p><img \
src="https://projects.arduinocontent.cc/ebe991fd-7885-43c2-9646-c80cd9a7e734.png"></img><p>1. \
Click Untitled to rename and assign a name to your Dashboard</p><br><p>2. Eye icon is view \
mode while edit icon allows you to add/update the widgets and their settings.</p><br><p>3. ADD \
button is a drop down where you will find plenty of control widgets such as gauge, \
charts, and buttons which will help you to visualize your sensor's data and \
control.</p><br><p>4. The resize icon will be used to resize the control and lock the alignment \
while the mobile icon is used to prepare your dashboard according to mobile device, as by \
default you are creating a dashboard for a desktop computer.</p><h2>Adding Widgets to \
Dashboard</h2><p>Now it's time to add some widgets to visualize our Temperature and \
Humidity values. for Temperature I will use the Gauge widget and for Humidity I'll use the \
Percentage widget. Click on the "ADD" button and search for  the Gauge widget. After that you will see the \
pop-up like the one below and Assign the Name to widget and Link the Temperature cloud \
variable. </p><img \
src="https://projects.arduinocontent.cc/c7be9925-ce5c-45a3-95cd-cf87f62500e8.png"></img><p>After \
giving the Name to widget control and linking the cloud variable, the setup will look like \
the below image. just click on "DONE" and you will be good to go. </p><img \
src="https://projects.arduinocontent.cc/280dde65-b44c-40d6-b004-eca0605b5706.png"></img><p>Repeat \
the same procedure for the Percentage Widget and also try to explore other display types. \
experiment with widget controls like Values, Charts, etc. Now the final Dashboard \
complete like the one in the image below, which is showing both Temperature and Humidity \
values. </p><img \
src="https://projects.arduinocontent.cc/b84f52b0-0581-4630-96d5-7e3c93579335.png"></img><h2>Arduino \
IoT Cloud for Developers Book</h2><p>Download the Arduino IoT Cloud app on your \
Android/Apple device via the Play/App store and login with your account and see the dashboard \
for the latest updates and alerts.</p><br><p>Now it's time to talk about my Arduino IoT \
Cloud for Developers book which is available at amazon as well as on PacktPub. \
Below are the URLS to purchase the books. \
</p><a href="https://www.amazon.com/Arduino-Cloud-Developers-simple-complex/dp/1837637172">
https://www.amazon.com/Arduino-Cloud-Developers-simple-complex/dp/1837637172</a> \
<a href="https://www.packtpub.com/product/arduino-iot-cloud-for-developers/9781837637171">
https://www.packtpub.com/product/arduino-iot-cloud-for-developers/9781837637171</a><br> \
<p>The book has 14 chapters where you will learn about the Internet of Things Architecture \
and the Arduino IoT Cloud hierarchy (as it's totally different from other cloud platforms) such as \
ThingSpeak, Cayenne, myDevices, etc. Next you will learn all the Cloud Platform options \
and dashboard widgets which is very mandatory before getting \
started with the Arduino IoT Cloud.</p><br><p>I have created 6 different projects in the book \
which use different types of development boards which include the MKR Wi-Fi 1010, \
ESP8266, XIAO, and the ESP32C3. You will learn Enviromental Monitoring, Smart Agriculture, \
Smart Health, IoT for assets tracking using GSM as well as with LoraWan, Smart Home where \
we integrated smart lamp with Amazon Alexa Dot Echo within a couple minutes without any \
code to Arduino IoT Cloud. I Hope you will will enjoy my book just like this \
tutorial.</p><br><p>For developers and IoT engineers, I have written two special chapters \
that focus on how to use the Arduino IoT Cloud API and Arduino Cloud CLI to integrate \
their solution with other 3rd party clouds and services, and Arduino Cloud CLI helps \
engineers and administrators to automate and manage bulk deployments using the \
command-line tool. </p></div>`,

  `<div><p>The goal of this tutorial is to show you a way to easily add AI to a project , without any \
knowledge in this field, using the software NanoEdge AI Studio and its Arduino compatible \
libraries!</p><br><p>This tutorial guides you through building a cardboard touchpad that \
relies on vibration analysis and an Embedded AI algorithm running on an Arduino UNO R4 . \
The UNO emulates a USB keyboard device.</p><br><p>Vibration data from the cardboard is \
captured using a basic accelerometer connected via the Qwiic connector. Within the UNO \
microcontroller, vibrations are classified using a NanoEdge AI library.</p><br><p>Based on \
the detected class, the touchpad triggers either a "PageUp" or "PageDown" keystroke. \
NanoEdge AI Studio:</p><br><p>NanoEdge is a free machine learning software tool developed by \
STMicroelectronics which allows you to easily create and integrate AI libraries to any cortex M \
microcontroller. Essentially, select a project type, import data locally, run a benchmark \
to find the best model automatically, then test the model if you want and get an AI \
library.</p><br><p>In Nanoedge AI Studio, four kinds of projects are available, each serving \
a different purpose:</p><p>Anomaly detection (AD):</p><p>To detect a nominal behavior and an \
abnormal one. Can be retrained directly on board.</p><p>1 class classification (1c):</p> \
<p>Create a model to detect both nominal and abnormal behavior but with only nominal data. \
(In case you cannot collect abnormal examples).</p><p>N class classification (Nc):</p><p>Create \
a model to classify data into multiple classes that you define.</p><p>Extrapolation (Ex):</p><p> \
Regression in short. To predict a value instead of a class from the input data (a speed or \
temperature for example).</p><h2>Open Arduino IDE and create a new project:</h2><p>Copy data \
logger source code available at the bottom of the page.</p><p>Click on Sketch > \
Include Library > Adafruit_LiS3DH to \
install the library.</p><br><p>Be careful: If your board is emulating a keyboard, you need \
to double press the reset button to be able to flash it.</p><br><p>Open \
the serial monitor in the Arduino \
IDE to check that the accelerometer data is being sent to your computer correctly (don't \
forget to close the serial monitor after checking).</p><img \
src="https://projects.arduinocontent.cc/aa31e081-1080-46bd-9b6e-084e16cdb658.png"></img><p>Now \
we will automatically create an AI model able to recognize classes of gestures using \
vibration patterns.</p><br><p>Open NanoEdge AI Studio and create a new " N-Class \
Classification " project.</p><br><p>In project settings:<br>Set target to "UNO R4 Wifi" \
and the sensor to "3-axes accelerometer" </p><img \
src="https://projects.arduinocontent.cc/036751c3-350c-47b5-be56-df2478d69917.png"></img><p>In \
the Signal step, collect one dataset per class ("Nothing", "Swipe", "Multitap," or any \
gesture that you want) using the serial port.  Collect one kind of gesture per \
dataset!</p><h2>Here is how to proceed:</h2><p>Make sure the board is connected to the pc \
with the data logger code flashed on it.</p><br><p>Click ADD SIGNAL > FROM SERIAL Make sure to \
select the correct COM port.</p><br><p>Click START/STOP to collect data (100 buffers per signal \
should be enough) Once finished click CONTINUE and then IMPOR.</p><br><p>If everything is \
correct, you should see a new dataset added with plots and information. </p><img \
src="https://projects.arduinocontent.cc/73727b45-b30a-4b8a-940c-5be372c72dbf.png"></img><h2>Create \
the AI model:</h2><p>Once you have all the classses that you want to recognize, go to the \
Benchmark step.</p><br><p>Click RUN NEW BENCHMARK. Select all your datasets and click \
START.</p><br><p>NanoEdge AI Studio will take your data and look for a model that is able to \
classify them (it also applies pretreatment on its own to your data).</p><br><p>You get the \
accuracy of the model and its RAM and Flash requirements.</p><br><p>You should reach around \
99% pretty fast if you collected good data. You can stop the benchmark when it happens. \
</p><img \
src="https://projects.arduinocontent.cc/ae3a036a-2afe-4aee-9708-dbc2d1ae5447.png"></img><p>In \
the validation step, you can compare the libraries (model + preprocessing) if you want, \
look here for more \
info:</p><a href="https://wiki.st.com/stm32mcu/wiki/AI:NanoEdge_AI_Studio#Validation">
https://wiki.st.com/stm32mcu/wiki/AI:NanoEdge_AI_Studio#Validation</a><h2>Test \
the model:</h2><p>The emulator step is more useful for us here, you can use the serial monitor to \
test the model directly in the tool:</p><br><p>1. Click INITIALIZE EMULATOR <br>2. Click FROM \
SERIAL<br>3. Test your model with new real time data.</p><img \
src="https://projects.arduinocontent.cc/934034b2-cf67-4208-9e4a-d68e9b15193e.png"></img><p>The \
last step in NanoEdge is to get the AI library that we will use in Arduino IDE:</p><br><p>1. Click \
COMPILE LIBRARY</p><p>2. Get and extract the .zip file</p><br><p>The library is the .zip file \
in the folder called "Arduino," we will use it below: </p><img \
src="https://projects.arduinocontent.cc/cb1cadc0-a02d-4521-8e0d-d0ff4042e45b.png"></img><h2>Create \
the demo:</h2><p>1. Open a new project in Arduino IDE</p><p>2. Get the main code below and paste it \
in your project</p><p>3. Click on Sketch > Include Library > Adafruit_LIS3DH</p><p>4. Add the \
Nanoedge AI Library (select the previously extracted zip): </p><img \
src="https://projects.arduinocontent.cc/a36090e3-13ae-4859-9646-2c6c1d15da6a.png"></img><p>5. Compile \
the code.</p><p>6. Flash the code.</p><br><p>It is finished, you can play with it. \
<img src="https://projects.arduinocontent.cc/3151cca5-efae-4be0-bc69-915ca466b9af.png" /></img></div>`,

  `<div><p></p><img \
src="https://projects.arduinocontent.cc/947a4793-1603-4d45-b9fa-e314f780e848.jpg"></img><p>VCC \
is the power pin of the module.</p><p>GND is the GND pin of the module.</p><p>Out is the \
data output pin of the module.</p><h2>Interfacing PIR Sensor with Arduino</h2><p>Now that \
we have a basic understanding of how a PIR sensor works, let's proceed to interface the PIR \
sensor with an Arduino. Here's a step-by-step guide: </p><img \
src="https://projects.arduinocontent.cc/f3b88737-328c-4ace-bd4c-76b95195d2a6.jpg"></img><p>1.  Connect \
the VCC pin of the PIR sensor to the 5V pin on the Arduino board.<br>2.  Connect the GND pin \
of the PIR sensor to the GND pin on the Arduino board.<br>3.  Connect the OUT pin of the PIR \
sensor to a digital pin e.g., pin 2 on the Arduino board.</p><h2>Arduino code for interfacing a PIR \
sensor with an Arduino</h2><p>Here is the complete line by line code explanation for Interfacing \
an Arduino with a PIR Sensor. The complete code can be found at the end of the \
project.<br>This line includes the LiquidCrystal library, which allows interfacing with \
LCD displays.</p><br><pre><code class="language-cpp" >// Include the LiquidCrystal library for \
LCD display
#include "LiquidCrystal.h"</code></pre> \
<br><p>This line initializes an instance of the LiquidCrystal class named \
lcd, specifying the pin numbers to which the LCD display is connected. The parameters \
represent (RS, EN, D4, D5, D6, D7) pins respectively. \
<pre><code class="language-cpp" >// Initialize the LCD object with pin numbers
LiquidCrystal lcd(12, 11, 6, 7, 8, 9);</code></pre><br><p>These lines declare two \
integer variables: sensorInput, which represents the pin number connected to the PIR \
sensor, and sensorReturn, which will store the output of the PIR sensor.</p><br>
<pre><code class="language-cpp" >int sensorInput = 2;// PIR sensor input pin
int sensorReturn = 0;  // Variable to store PIR sensor output</code></pre><br><p>The setup() \
function is called once when the Arduino board \
starts. Now we set the sensorInput pin as an input pin, indicating that it will be used to \
read data from the PIR sensor. Then initialize the LCD display with 16 columns and 2 rows, \
indicating the display's dimensions. Initial messages are printed on the LCD display, \
positioning the cursor at the beginning of the second row.
<pre><code class="language-cpp" >void setup()
{
// Set sensor pin as input
pinMode(sensorInput, INPUT);
// Set up the LCD's number of columns and rows
lcd.begin(16, 2);
// Print initial message on the LCD
lcd.setCursor(0, 0);
lcd.print("PIR Sensor Says:");      \
lcd.setCursor(0, 1);
}</code></pre>
<br><p>In the loop() function, the value of the \
PIR sensor output is read using digitalRead(sensorInput).  If motion is detected \
(sensor output is HIGH), a message indicating motion occurrence is displayed on the LCD. \
If no motion is detected (sensor output is LOW), a message indicating motion stops is \
displayed on the LCD.</p><br>
<pre><code class="language-cpp" >void loop() {
// Read input value from PIR sensor
sensorReturn = digitalRead(sensorInput);
// Check if motion is detected
if (sensorReturn == HIGH) { 
// Set cursor to the second row and print motion detection message
  lcd.setCursor(0, 1);
  lcd.print("Motion Occurs   ");
} else {
// Set cursor to the second row and print motion stopped message
  lcd.setCursor(0, 1);      <br>   \
  lcd.print("Motion Stops    ");
  }
}</code></pre></div>`,

  `<div><h2>History</h2><p>
My previous project was serious and complex: a programmable wireless thermostat. Thanks to you, \
it has been viewed more than 3000 times on the Project Hub, and I am very grateful to you. \
My goal now is to exceed 5000 views. So I had to imagine a project that would be funnier, \
more original, simpler and easier to replicate than the thermostat. And totally useless. \
So I decided to make this pair of eyes that follows the movements of an object that moves \
in front of it. It follows the lateral movements, and the eyes converge when the object \
comes closer. \
And if you're reading this, you clicked. This is great for my goal and I thank you for it.</p> \
<h2>The project</h2>
<img src="https://projects.arduinocontent.cc/7a0b9db1-2dbd-4727-bf5a-1b2deecd6bd8.jpg" ></img>
<img src="https://projects.arduinocontent.cc/4cdeee04-3d69-4b3e-896e-9fafd8ef2ccc.jpg" ></img>
<img src="https://projects.arduinocontent.cc/6e524ab0-5225-45a7-b646-5b04d4b9824a.jpg" ></img>
<p>The two eyes are painted on two ping-pong balls which are each attached to a servo motor. Two \
ultrasonic sensors measure the object's position.  An Arduino Nano Every board reads the \
measurements from the ultrasonic sensors and controls the sevo motors \
accordingly.</p><br><p>The servo motors are SG90 micro servos and the ultrasonic sensors are \
HC-SR04's. These are very common and very inexpensive devices. The Arduino board may be of \
another model than the nano Every, provided that 5V is available to power the servo motors \
and the ultrasonic sensors. </p><h2>Hardware</h2><img \
src="https://projects.arduinocontent.cc/781dcb46-650d-4a7d-9177-5f7e4ee1ee1b.jpg"></img><p>The \
servo motors and ultrasonic sensors are held in place on a flat surface according to the arrangement \
shown in the following plan: </p><img \
src="https://projects.arduinocontent.cc/e0fd7c1d-3a35-474b-b284-60a1b0a110d3.jpg"></img><p>The \
position of the X ultrasonic sensor can be different, for example to follow larger \
objects. In this case, the constants A and B must be adjusted in the software to reflect \
the actual position of the X ultrasonic sensor. These two values must be less than 200 \
cm.</p><h2>Connections to be made are as follows:</h2><p>The ground wires of the servo \
motors and ultrasonic sensors must be connected to the ground pin of the Arduino board \
and their power supplies to +5V.</p><br><p>The trigger input of the X ultrasonic sensor is \
connected to digital input/output 2 and its echo output to digital input/output \
3.</p><br><p>The trigger input of the Y ultrasonic sensor is connected to digital \
input/output 5 on the Arduino and its echo output to digital input/output 6.</p><br><p>The \
left and right \
servomotor controls are connected to digital inputs/outputs 8 and 10 respectively. Left \
and right refer to Big Brother's eyes, his left eye is on your right when you are facing \
it.</p><br><p>The following diagram shows the connections to be made:</p>
<img src="https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg"></img>
<h2>Software</h2><p>The \
software is extremely simple, less than 70 lines. No library is required.</p><br><p>Have fun. </p></div>`,

  `<div><h2>Gather your tools and troops (components, that is)</h2><p>The brains: An Arduino Uno, the \
mastermind behind the magic.<br>The translator: An HC05 Bluetooth module, your car's \
interpreter for smartphone commands.<br>The muscle: L298N motor driver, the beefy guy \
controlling those zippy wheels.<br>The bling: NeoPixel LEDs, because who doesn't love a \
car with dazzling lights?<br>The base: Perfboard and Sunboard, the sturdy foundation for \
your creation.<br>The connections: Jumper wires, the colorful threads that bring \
everything together.<br>The fuel: A battery, to keep your robot rolling (safely, of \
course!). </p><img \
src="https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png"></img><h2>Craft \
the chassis, the car's core:</h2><p>Imagine your robot's frame. Sunboard is your \
friend here! Cut precise pieces based on the guide (remember, measuring twice cuts once!). \
Assemble them like a mini puzzle, creating a strong and stable base for your future \
masterpiece.</p><h2>Motor magic, let the wheels spin:</h2><p>       Time to get those motors \
talking to the driver! Mount them securely on the chassis. Connect them to the L298N \
module using the jumper wires, following the wiring diagram like a treasure map. Remember, \
correct connections are key to smooth sailing (or should we say, driving?). <h2>Bling it up \
with dazzling LEDs:</h2><p>       Let your creativity shine! Place the NeoPixel LEDs on \
the front, back, and bottom of your car. Connect them to the Arduino, following the \
color-coded guide. Soon, your robot will be a beacon of programmable light!</p><h2>Code the \
commands, unlock the moves:</h2><p>       The Arduino code is the secret sauce that brings \
your car to life. It translates the Bluetooth commands from your phone into actions for \
the motors and LEDs. The provided code is a great starting point, but feel free to \
experiment and add your own personal touch!
<pre><code class="language-cpp">
//Arduino Code for Bluetooth controlled Robot 
//by Ali for circuitdigest.com 
#include <SoftwareSerial.h> 
SoftwareSerial mySerial(10, 11); // RX, TX 
void setup() { 
	 // Open serial communications and wait for port to open: 
	 Serial.begin(9600); 
	 mySerial.begin(38400); 
	 while (!Serial) { 
	   ; // wait for serial port to connect. Needed for native USB port only 
	 } 
	 Serial.println("Sending AT..."); 
	 mySerial.write("AT"); 
	 if (mySerial.available() > 0) { 
	   Serial.write(mySerial.read()); 
	 } 
	 // set the data rate for the SoftwareSerial port 
	 Serial.println("loop begins"); 
	 LED_setup(); 
} 
char rcd = ' '; 
int spd = 100; 
unsigned long time_now = 0; 
void loop() { // run over and over 
	 if (mySerial.available()) { 
	   rcd = mySerial.read(); 
	   Serial.write(rcd); 
	 } 
}
</code></pre><h2>Applause for the app builder:</h2><p>Now, for the smartphone control! \
Dive into the world of MIT App Inventor, a visual tool that lets you design a \
user-friendly app without needing to be a coding wizard. Drag and drop buttons, \
sliders, and other elements to create your remote control masterpiece.</p>
<h2>Testing and triumphant tinkering:</h2><p>With everything assembled and \
programmed, it's time for the moment of truth! Connect your phone via Bluetooth, \
open the app, and...voila! Your robot car should whiz forward, reverse, turn, \
and even light up on your command. If not, don't fret! Troubleshooting is part \
of the fun. Double-check connections, codes, and app settings. Remember, \
even the coolest robots need a little tinkering love sometimes.</p><br><p>Bonus \
tip: Don't stop there! This is just the beginning of your robotic adventure. \
Add features like obstacle avoidance sensors, line following capabilities, \
or even a robotic arm. The possibilities are endless, limited only by your \
imagination and ingenuity.</p><p>Source: The project was originally published in \
CircuitDigest, checkout <a href="https://circuitdigest.com/microcontroller-projects/diy-arduino-bluetooth-robot-car">
Arduino Bluetooth Robot Car project</a> for more detials. </p></div>`,

  `<div><p>The ultrasonic sensor is a device that can measure distances using sound waves. It works \
in a similar way to how bats and dolphins navigate and find food- by \
emitting sound waves and listening to them bounce back.</p><img \
src="https://projects.arduinocontent.cc/8ab8bfd4-b0b9-42e1-9309-4f2a734ad439.jpg"></img>
<img src="https://projects.arduinocontent.cc/cc7047f6-2bbf-43ed-87e9-76b07f4522e8.jpg"></img><p>The \
sensor consists of two primary components: a transmitter and a receiver . The transmitter \
is responsible for emitting a high-frequency sound. In essence, ultrasonic refers to \
frequencies beyond the range of human hearing - so something higher than 20kHz. \
</p><br><p>When the sound wave hits an object, it bounces back like echo. This returning wave \
is detected by the receiver. The sensor will use the micro-controller's (Arduino) internal \
clock to find out how much time it took for the sound to bounce back. This small clock turns on \
when a high-frequency wave is emitted and turns off when its echo is detected. \
</p><br><p>Using code, we can write a program that will store the timing between those two \
events into a variable. Then, we can use this information to calculate the distance \
between the sensor and the object. </p><br><p>You may be thinking: how can we find the \
distance if all we know is the timing? </p><br><p>Well, as you know, velocity is distance \
divided by time. Based on this equation, if we multiply the velocity by the time, we'll \
find the distance . I told you the sensor emits sound waves, so the velocity we need is \
the speed of sound in air (340 m/s). </p><br><p>Velocity = Distance / Time <br>Distance = \
Velocity * Time </p><br><p>But if we multiply this speed with the timing we found, we'll \
discover a value that's twice the real distance. That's happens because the sound hit the \
object and came back, in other words, it traveled the same path twice. To find the \
real distance, multiply the speed of sound with the timing and divide the result by two. \
</p><br><p>Distance = (Velocity * Time) / 2 </p><img \
src="https://projects.arduinocontent.cc/f577fb8b-bed1-48fc-8781-3ac874a075e6.png"></img><img \
src="https://projects.arduinocontent.cc/328c3323-cf29-434e-baf4-4c5b60eb5216.png"></img> \
<img src="https://projects.arduinocontent.cc/28299ea1-dd87-4b9c-bf5e-20fae843c87a.png"></img> \
<img src="https://projects.arduinocontent.cc/50ba2ab9-a2a5-4649-b4d1-553464059068.png"></img> \
<p>In this article, I will show you how to build an alarm system using an Arduino and \
ultrasonic sensor. If you don't have all the components or would like to do a test before \
assembling anything, I created a simulation of this alarm system on Tinkercad. \
You can run it directly on your browser by clicking \
<a href="https://www.tinkercad.com/things/eO64BUKZK2q-alarm-system-schematics">here</a> \
</p><br><p>Moving on, for this project, you'll need:</p><p>An Arduino board, a breadboard, a bunch \
of jumper wires, a buzzer, and an ultrasonic sensor. </p><h2>Assembly</h2><p>Firstly, \
attach the ultrasonic sensor and the buzzer to the breadboard. Then connect the VCC and \
GND pins on the Arduino's 5V and ground ports. </p><img \
src="https://projects.arduinocontent.cc/5d9e9e7a-35dc-47be-91c5-7f2503be7949.jpg"></img><p>After \
that, connect the trigger pin to port 9, the echo pin to port 10, and the buzzer to port 8. \
Also attach the buzzer GND to Arduino GND. </p><img \
src="https://projects.arduinocontent.cc/5d823b9b-7ca8-453f-846a-65d58515efce.jpg"></img><p>Once \
assembled, upload the alarm-system-arduino.ino file that I provided in this article, and now \
our alarm system is finished. </p><h2>Code explanation</h2><p>First, we define the \
constants and variables we'll need. Then in the setup function we configure some \
important aspects of the code - like defining the echo pin as INPUT and the trigger and \
buzzer pins as OUTPUT. We also started the serial communication.  This will be important \
fo visualizing the distances being measured. </p><img \
src="https://projects.arduinocontent.cc/6f4851df-6d75-42ff-af3b-b7772714c75b.png"></img><p>
<img src="https://projects.arduinocontent.cc/96e0a1f3-94ba-4045-a270-a0fb390afa0d.png"></img>At \
the end, there's the loop function. It starts by turning off the emitter and then \
activating it for 10 milliseconds before turning it off again. This piece of code will \
generate the sound wave that will be bounced back by nearby objects.</p><br><p>At line 28 \
we find out how much time the sensor took to detect the echo. This information is crucial for \
calculating the distance at line 29. In this case, we found the distance in centimeters. \
After that, from lines 30 to 35 we print the distance. </p><br><p>The last part of the code \
is an if-statement that turns on the buzzer when the object is at 50 centimeters or closer \
from the sensor. In case this statement is false, the buzzer turns off.</p>
<img src="https://projects.arduinocontent.cc/79f1c071-156c-444c-a06c-aa956170007e.png"></img><p>
And now it's time to discover whether it'll work. So upload the code to your Arduino board and have \
fun.</p></div>`,

  `<div><p>This project is for a school code quest. I have seen many projects with soil moisture \
sensors, but all of them included expensive and complicated materials such as LCD screens \
or automatic watering systems. I took it as a challenge to create an incredibly cheap and \
simple Soil Moisture Sensor. The project is designed for people that might not know when \
to water their plants or water them too much or too little. The Soil Moisture Sensor \
distinguishes how wet the soil is, and identifies when the soil should be watered for you. \
This design only includes a soil moisture sensor, a couple of LEDs and a buzzer. The LEDs \
constantly show the moisture level (Red - 0-30%, Yellow - 30-60% and green - 60%+ \
depending on moister level).  When the moisture level falls below 10%, the buzzer \
starts beeping. I designed this for a Port Jackson Ficus Bonsai and have tested this \
extensively. The percentages I'm using work perfectly for me but might change depending \
on your plant. If you feel like the red light switches on way too late, when the soil is \
already too dry, you can change the Red percentage to 0-50% and Yellow to 50-80%, because \
that seems to also work.</p><h2>How it works: </h2><p>Electrical currents are \
sent through the legs of the moisture sensor. The sensor then \
calculates the resistance it's getting. Because water conducts electricity, the wetter the \
soil, the lower the resistance should be. It's then connected to an Analog Pin and the \
Arduino can use that for the program.</p><br><p>The Soil Moisture Sensor needs to know the \
maximum moisture that the soil can reach, so we can calculate the percentages. This is \
called calibration. The sensor calibrates right when the circuit is switched on, in the \
Setup() function. Therefore, it should already be in freshly watered soil when it is \
switched on. </p><br><p>Here are some photos of the circuit without the casing: </p><img \
src="https://projects.arduinocontent.cc/bb269a1e-9020-4253-8e6d-a38f7fd4298d.JPG"></img><img \
src="https://projects.arduinocontent.cc/353ed111-13e9-476c-9417-12ed55022db5.JPG"></img><img \
src="https://projects.arduinocontent.cc/82d28236-fed8-454e-af83-fc25fc94a1c5.JPG"></img><p>The \
The most popular sensor for this use case is the SparkFun moisture sensor \
and it requires soldering.  The sensor I went with has screwable pin terminals \
so no soldering is required.  \
</p><br><p>My <a href="https://drive.google.com/file/d/1KUU9vXYtXuJltKUlt6KiuYl8LIAzmpBG/view?usp=sharing">
Pseudocode.</a></p><br><p>My <a href="https://drive.google.com/file/d/1KVoYaHDi72zqlaPeXSSslZct1LBrO-bR/view?usp=sharing">
Flowchart</a></p>
<h2>Casing:</h2><p>The casing is a simple box with the LEDs coming out of the top and the \
buzzer on the side. The Soil Moisture Sensor comes out of the side with wires and is stuck \
into the soil, so it's relatively far from all the water-sensitive components.</p></div>`,

  `<div><p>I needed to turn on and off some AC units located in a remote house, so that I can \
pre-cool (or pre-heat) the rooms in advance before I go. </p><br><p>Such units already \
exist, made by companies like Daikin, which provides WiFi capability on newer models. \
My air conditioner did not come with this feature, but it did come with a remote control... \
The solution was easy: I just had to simulate an infrared \
remote controller with Arduino, place it close to the AC unit, and control it remotely over the internet. \
For this, I chose the ATOM Lite by M5Stack. It's very compact, comes with a little \
enclosure, and includes an IR emitter as well as a physical button. The only drawback is \
that the emitter is not very powerful and the hole in the enclosure is very small, so it \
must be placed near the unit. In the end, I just used some bi-adhesive tape \
and a USB cable: </p><img \
src="https://projects.arduinocontent.cc/87de5418-a5e8-43f6-9b42-0e000329fd22.jpg"></img><p>As \
an alternative to using this M5Stack board, you can use any Arduino board (such as a Nano \
or a MKR) and connect an infrared LED to its pins. You'll find hundreds of tutorials out \
there for generating IR signals with an Arduino. </p><h2>Software</h2><p>On the software side, \
I used the fantastic arduino-heatpumpir library \
to generate the infrared signals. There are many libraries for that purpose, but this one \
worked great and it supports a large number of commercial AC devices. \
</p><br><p>So, if you have a Daikin AC like mine you can use my code below \
without changes. If you have another brand, follow these steps: </p><br><p>1. Find the name \
of the .h file related to your AC model. In my case, that's DaikinHeatpumpIR.h . \
</p><br><p>2. Replace DaikinHeatpumpIR.h and DaikinHeatpumpIR in my code with the name you \
found. </p><br><p>That's it! If you're lucky enough, you won't need to change anything else. \
</p><br><p>The code I wrote supports heat/cool/dry modes as well as temperature \
configuration. It doesn't let you configure fan speed or other parameters, but it's very \
simple to tweak to expose more parameters. In addition, you can use the \
physical button on the board for testing purposes if the IR signals are not \
read by the AC unit.</p><h2>Remote control</h2><p>Last but not least, I used the Arduino IoT \
Cloud to build a simple graphic interface to send commands remotely. To do this, follow \
these steps: </p><br><p>1. Open <a href="https://cloud.arduino.cc/">Arduino IoT Cloud</a> \
and create a free account if you don't have \
one. </p><br><p>2. Create a device and select "M5Stack-ATOM" as the model. Make sure you save \
the secret key given at the end of the device creation procedure. The interface is \
pretty straightforward, but you might want to follow the more detailed steps explained in \
the <a href="https://docs.arduino.cc/arduino-cloud/getting-started/esp-32-cloud">official \
documentation.</a> \
</p><br><p>3. Create a thing \
and configure WiFi credentials for it.</p><br><p>4. Configure two variables in the thing: \
<br>- a string variable called mode <br>-an integer variable called temperature </p><br><p>5. Copy \
the sketch code in the "Sketch" tab and upload it to the board. </p><br><p>6. Create a \
dashboard like this: </p><img \
src="https://projects.arduinocontent.cc/5d147029-cc54-4c89-8060-d6c4b3964cb4.png"></img><p>That's \
it. Enjoy! ❄️</p><h2>Over-the-air updates</h2><p>In case you want to modify the code after \
the board is installed, don't worry about physically removing it. Thanks to Arduino IoT \
Cloud you can just edit the code from your browser.  With one click you'll be able to \
upload it to the board over WiFi from anywhere in the world!</p><h2>Optional: closing the \
loop</h2><p>When controlling remote things, it is always a good idea to put some sensors \
to get feedback to make sure that your commands are correctly executed. In our case, I can \
imagine a very simple failure: the bi-adhesive tape falls apart, and you can't turn on (or \
worse, you can't turn off) your AC unit anymore.  So I recommend adding a simple \
temperature/humidity sensor in the room to see if your AC unit is doing what's expected. \
There are many solutions; a very simple one is described in \
<a href="https://docs.arduino.cc/arduino-cloud/tutorials/cloud-environmental-data">this tutorial</a> \
and can be done with either a MKR WiFi 1010 board or MKR ENV Shield in conjunction with Arduino IoT Cloud.</p></div>`,

  `<div><h2>RGB LED Types and Structure </h2><p>RGB LEDs have \
three LEDs inside them and usually, these three internal LEDs share either a common anode \
or a common cathode especially in a through-hole package. So basically, we can categorize \
RGB LEDs as either common anode or common cathode type just like in seven segment \
displays. </p><img \
src="https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png"></img><h2>Common \
Anode </h2><p>In a common anode RGB LED, the anode of the internal LEDs are all connected \
to the external anode lead. To control each color, you need to apply a LOW signal or \
ground to the red, green, and blue leads and connect the anode lead to the positive \
terminal of the power supply. </p><img \
src="https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png"></img><h2>Common \
Cathode </h2><p>In a common cathode RGB LED, the cathode of the internal LEDs are all \
connected to the external cathode lead. To control each color, you need to apply a HIGH \
signal or VCC to the red, green, and blue leads and connect the anode lead to the negative \
terminal of the power supply. </p><img \
src="https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png"></img><h2>Basics \
of PWM (Pulse Width Modulation)</h2><p>Pulse Width Modulation, or PWM, is a technique for \
getting something that looks like an analog signal using what are really digital signals. 
The digital output is used to create a square \
wave, a signal switched between on and off at a high rate of speed. This on-off pattern can simulate voltages in \
between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0 \
Volts) by changing the portion of the time the signal spends on versus the time that the \
signal spends off. The duration of "on time" is called the pulse width. To get varying \
analog values, you change, or modulate, that pulse width. If you repeat this on-off \
pattern fast enough with an LED for example, the result is as if the signal is a steady \
voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below, \
the green lines represent a regular time period. This duration or period is the inverse of \
the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green \
lines would measure 2 milliseconds each.</p><img \
src="https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif"></img><h2>Button \
Input</h2><p>A button is connected to pin 2 of the Arduino.  We configured this pin \
in the code to use an internal pull-up resistor. This means when the button is not \
pressed, the pin reads HIGH and when it is pressed, the pin reads LOW.</p><h2>Color Change \
Logic</h2><p>Each time the button is pressed, the colorIndex variable is incremented, \
cycling through six different colors. After the last color, the index resets to \
zero.</p><h2>Debouncing</h2><p>A small delay (300 ms) is added after each button press to \
debounce the button, preventing multiple triggers from a single press.</p><h2>Summing Up</h2><p>This \
modification allows the RGB LED to change colors each time the button is pressed, \
providing interactive control over the LED.</p><br><p>Make your connections according to the diagram: \
below:</p><img \
src="https://hackster.imgix.net/uploads/attachments/340746/button_push_color_change_UM2JWnHSDv.JPG"></img><p>Now \
upload the code to the Arduino and enjoy!</p></div>`,

  `<div><p>Ever wanted to know the temperature and humidity around you? If yes, this project is for you. If \
not, it'll be cool anyway.</p> \
<h2>What is humidity?</h2><p>Humidity \
is the proportion of air that is water vapor. Generally, it's measured in percentages. \
A humidity range of 30% to 50% is considered comfortable for most people.</p><p>This \
sensor comes in two varieties, mine looks like this:</p><img \
src="https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg"></img><p>The \
sensor I'm using has 3 pins and is fitted on a board.  If your sensor has 4 pins, then you need to build \
the circuit below:</p><img \
src="https://i.imgur.com/6sNtuUL.png"></img><p>If \
it's the same as mine, follow this diagram.  You will no longer need the resistor. \
In either case, the wiring for the OLED display will be the same.</p><img \
src="https://i.imgur.com/f0ZQYqi.png"></img><h2>Details about the code:</h2><p>You need to follow these instructions to \
make it work: <br>1. You need to add the dht11, Adafruit_GFX, and Adafruit_SSD1306 libraries \
to the Arduino IDE and include them in your sketch. <br>2. Upload the \
code. <br>3. When the code is uploaded, you will see the humidity \
and temperature on the OLED.</p></div>`,
]

export default projectInstructionsSeedData
