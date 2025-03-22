import fs from "fs"

const projectInstructionsSeedData = [
  `<div><p>This project is made for Arduino beginners who are looking to learn how to interface  \\\n
an RGB led with the Arduino Uno. Also, we will understand the Common Anode (CA) and  \\\n
Common Cathode (CC) concept as well as the pulse width modulation (PWM)  \\\n
signals.</p><br><p>RGB LED Types and Structure</p><br><p>RGB LEDs have three LEDs inside them  \\\n
and usually, these three internal LEDs share either a common anode or a common cathode  \\\n
especially in a through-hole package. So basically, we can categorize RGB LEDs as either  \\\n
common anode or common cathode type just like in seven segment displays. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png"></img><br><p>Common  \\\n
Anode</p><br><p>In a common anode RGB LED, the anode of the internal LEDs are all connected  \\\n
to the external anode lead. To control each color, you need to apply a LOW signal or  \\\n
ground to the red, green, and blue leads and connect the anode lead to the positive  \\\n
terminal of the power supply. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png"></img><br><p>Common  \\\n
Cathode</p><br><p>In a common cathode RGB LED, the cathode of the internal LEDs are all  \\\n
connected to the external cathode lead. To control each color, you need to apply a HIGH  \\\n
signal or VCC to the red, green, and blue leads and connect the anode lead to the negative  \\\n
terminal of the power supply. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png"></img><br><p>Basics  \\\n
of PWM (Pulse Width Modulation)</p><br><p>Pulse Width Modulation, or PWM, is a technique for  \\\n
getting analog results with digital means. Digital control is used to create a square  \\\n
wave, a signal switched between on and off. This on-off pattern can simulate voltages in  \\\n
between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0  \\\n
Volts) by changing the portion of the time the signal spends on versus the time that the  \\\n
signal spends off. The duration of "on time" is called the pulse width. To get varying  \\\n
analog values, you change, or modulate, that pulse width. If you repeat this on-off  \\\n
pattern fast enough with an LED for example, the result is as if the signal is a steady  \\\n
voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below,  \\\n
the green lines represent a regular time period. This duration or period is the inverse of  \\\n
the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green  \\\n
lines would measure 2 milliseconds each. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif"></img><br><p>The  \\\n
code below will cycle the LED through different colors, enjoy!</p></div>`,

  `<div><p>Ever wanted to know the temperature and humidity around you? If yes, this project will  \\\n
be very helpful for you. If no, it'll be cool anyway. What I mean is, you can use this in  \\\n
anything from home automations to smart watches.</p><br><p>What is humidity?</p><br><p>Humidity  \\\n
is the water vapor around you mixed with air. It is measured in per cents. So, if the  \\\n
humidity is 60 per cent(which is the average humidity), then 60 per cent of the air around  \\\n
you is water vapor. If it is 100%, then it means either the sensor is not correct, the  \\\n
sensor is broken/damaged, the Arduino crashed, the Arduino can't receive any signal,  \\\n
there's an error in the code or you're underwater *. If it's 0%, it means all the reasons  \\\n
above except the last one, you're in space or you're in the middle of a desert**.</p><br><p>*  \\\n
Correction: it means the air cannot hold any more water.</p><br><p>**  The air in a desert  \\\n
does contain some water but it is a very little amount compared to a normal place. The  \\\n
Sahara Desert has a mean humidity of 25%.</p><br><p>The world's lowest recorded relative  \\\n
humidity value occurred at Coober Pedy in the South Australia desert when the temperature  \\\n
was 93 degrees and the dew point was minus 21 degrees producing a relative humidity of 1  \\\n
percent. (source:  'www.chicagotribune.com')</p><br><p>Is your sensor different?</p><br><p>My  \\\n
sensor is like this: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg"></img><br><p>My  \\\n
sensor has 3 pins and it's fitted on a board. If yours has 4 pins, then you need to build  \\\n
this circuit: </p><br><img  \\\n
src="https://i.imgur.com/mPlhTTK.png"></img><br><p>If  \\\n
it is same as mine, then follow this diagram instead, you will no longer need the resistor:</p><br><img  \\\n
src="https://i.imgur.com/UW1R9mh.png"></img><br><p></p><br><p>Details about the code</p><br><p>You need to follow these instructions to  \\\n
make it work: <br>1. You need to add the dht11 library to the Arduino IDE and include it in  \\\n
your sketch. <br>2. Upload the code. <br>3. When the code is uploaded, open the Serial Monitor  \\\n
and set the baud rate to 9600. <br>4. You will see the humidity and temperature. </p></div>`,

  `<div><p>Water deposit</p><br><p>For our watering system, we will need a water container. Any common  \\\n
and standard items suitable for water storage can be used as a deposit. The larger the  \\\n
storage container, the less frequent the need for recharging. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_bottle.png"></img><br><p>We've selected  \\\n
the bottle shown on the image as our water reservoir. With a capacity of 1.5 liters, it  \\\n
should be sufficient for watering a medium-sized plant for several days.</p><br><p>For the  \\\n
water pump to effectively move water from the bottom of the bottle to the plant, it must  \\\n
be placed inside. To accomplish this, we place the pump inside the bottle, and then we  \\\n
pull out the wires. This involves creating a small opening at the base of the bottle  \\\n
solely for the wires, enabling us to thread them out and connect the pump to our plant  \\\n
care station. To conclude the process, we use waterproof silicone to seal the opening,  \\\n
ensuring there is no water loss. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_bottom.png"></img><br><p>On the  \\\n
opposite end, there will be a water pipe directly connecting to the plant to provide  \\\n
hydration.</p><br><p>Water pump wiring</p><br><p>To facilitate the connection of the pump wires  \\\n
with the main system, we've used a barrel plug. The junction between the pump wires and  \\\n
the connector wires is shielded by heat shrink wraps, providing effective insulation from  \\\n
external elements. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png"></img><br><p>This  \\\n
approach ensures a secure and well-insulated connection, contributing to the overall  \\\n
reliability of the system.<br>Plants care station</p><br><p>The plants care station takes on  \\\n
the responsibility of processing available information, making decisions, and controlling  \\\n
the activation and deactivation of the watering system. Designed for both indoor and  \\\n
outdoor use, it hides all wiring and functions as a discreet black box. This is achieved  \\\n
by enclosing all system components within the box illustrated below. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_box.png"></img><br><p>The box is easily  \\\n
accessible, facilitating the replacement of components or even reprogramming of the system  \\\n
when necessary. Within the plants care station, the central orchestrator is the Arduino  \\\n
Nano, functioning as the main brain to coordinate all other components. Accompanying this,  \\\n
a DS1302 module is integrated to manage real-time control, influencing watering decisions.  \\\n
It considers optimal watering times, favoring mornings and evenings when sunlight is less  \\\n
intense, promoting better absorption and utilization of water by the plants. This  \\\n
thoughtful scheduling enhances the overall efficiency and well-being of the  \\\n
plants.</p><br><p>Power supply</p><br><p>For the entire system, a 9V battery serves as the power  \\\n
supply. It separately powers both the Arduino and the water pump. Considering that our  \\\n
water pump operates on 5V, we require a voltage transformer. For this purpose, we have  \\\n
used the AMS117 module.<br>In contrast, the DS1302 operates on a separate CR2032 battery,  \\\n
ensuring a dedicated power source to sustain the Real-Time Clock (RTC) functionality. This  \\\n
dual-power configuration enhances the efficiency and autonomy of each component, ensuring  \\\n
the overall reliability of the system.<br><Control elements</p><br><p>The plants care station  \\\n
comes equipped with some handy controls like LEDs, buttons, and a potentiometer to enhance  \\\n
its overall functionality. A straightforward on/off switch simplifies the activation of  \\\n
the station. When manual watering is needed, a dedicated push button is readily available.  \\\n
Additionally, the potentiometer allows for accurate adjustment of the water amount during  \\\n
automatic mode. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_station.png"></img><br><p>These  \\\n
user-friendly controls provide a precise and efficient means of managing your plant care  \\\n
routine.</p><br><p>Wiring schema</p><br><p>Creating a precise wiring schema is essential for the  \\\n
optimal performance of the automatic watering system. This schema serves as a practical  \\\n
guide, interconnecting main components. Methodically organizing and routing the wires  \\\n
prevents potential confusion during the assembly process. Clarity in both assembly and  \\\n
troubleshooting phases is achieved through the implementation of color-coded distinctions  \\\n
and strictly following specified pin configurations for facilitating the communication  \\\n
between modules. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/schemas/watering_system.png"></img><br><p>The  \\\n
above wiring schema offers a comprehensive overview of the system wiring and  \\\n
connections.</p><br><p>Calculating base resistor value</p><br><p>In order to compute the base  \\\n
resistor (RB), we must first determine the collector current. Given that the circuit's  \\\n
sole load is the water pump, it can be deduced that the collector current is identical to  \\\n
that of the water pump. Based on the water pump specification, we know that IC = 200 mA,  \\\n
or for practical purposes, IC = 0.2 A. This forms the basis for our calculations.<br>It is  \\\n
important to note that if we exceed the parameters for which the transistor was designed,  \\\n
it will eventually burn out. With this in mind, we will proceed to identify the  \\\n
transistor's gain from the datasheet. We observe that when IC = 200 mA, its gain is 100.  \\\n
We have now discovered our second value: 𝛽 = 100.</p><br><p>Once we've established the gain,  \\\n
our next step is to calculate the base current. It's important to recognize that the  \\\n
collector current is directly proportional to the base current and the gain. This  \\\n
relationship can be expressed mathematically as:</p><br><p>hFe = 𝛽 (gain) = Ic /  \\\n
Ib<br>Replacing the values, we acquire our third parameter: Ib = 2mA = 0.002A. Now, we can  \\\n
compute Rb value using Ohm's formula:<br>Vb = VS - VBE = Ib * Rb<br>Rb = (VS - VBE) /  \\\n
Ib<br>Where VS is the source voltage, and VBE is the voltage drop across the base-emitter  \\\n
junction of the transistor. In our circuit, the transistor's base is connected to an  \\\n
output from an Arduino. An Arduino output provides a maximum of 5V and 40mA. Therefore, we  \\\n
have a source voltage of 5V, and the transistor's barrier potential is 0.6V.<br>Rb = (5V -  \\\n
0.6V) / 2mA = 2.2kΩ</p><br><p>For our circuit, the suitable value for the base resistor  \\\n
should be equal or below 2.2K ohms. We choose the lower standardized resistor and check by  \\\n
looking at the datasheet curves that the base voltage is sufficient to drive the  \\\n
transistor into saturation.</p><br><p>Automated plants watering system</p><br><p>After going  \\\n
through rounds of mounting and wiring adjustments, we're excited to introduce our initial  \\\n
prototype of the automatic watering system. Check out the results and get a general  \\\n
overview of the system in the attached image below. We're really looking forward to seeing  \\\n
how well it takes care of the plants and are ready to make it even better by identifying  \\\n
areas for improvement. </p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2024/watering_system_result.png"></img><br><p>The  \\\n
internal components of the plant care station neatly fit into the box, presenting a clean  \\\n
and user-friendly appearance. The next step involves experimenting and testing the system  \\\n
over some time to identify any weaknesses and enhance its performance. Additionally, we  \\\n
aim to minimize its size and simplify the wiring, making maintenance more  \\\n
straightforward.</p><br><p>Having outlined the concept of automated watering and successfully  \\\n
assembled the physical components, our attention now turns to the real wizardry - the  \\\n
code. This article explores the intricate lines of Arduino code that transform theory into  \\\n
reality, breathing life into our DIY plant care project. As we step into the heart of our  \\\n
automated watering system, let's unravel the details that make our green vision a  \\\n
reality.</p><br><p>Install library for DS1302</p><br><p>To interact with the DS1302 sensor, we  \\\n
will use an existing library. This library, provides an interface that facilitates  \\\n
communication with the module, saving you significant time and providing a reliable and  \\\n
extensively tested code base. It can be downloaded from our official repository  \\\n
https://github.com/hibit-dev/ds1302/raw/master/lib/DS1302.zip</p><br><p>To import a library,  \\\n
open the Arduino IDE, go to Sketch > Include Library > Add .ZIP Library and select the  \\\n
library file downloaded from our GitHub repository .</p><br><img  \\\n
src="https://www.hibit.dev/images/posts/2023/arduino_import_library.png"></img><br><p>Then  \\\n
you can simply use include statement:<br>#include "virtuabotixRTC.h"<br>It will include  \\\n
the library with predefined functions to interact with the module.</p><br><p>Arduino  \\\n
code</p><br><p>This Arduino code forms the backbone of our automated watering system,  \\\n
translating the idea of plant watering into a functional reality. At its core, this code  \\\n
interfaces with a real-time clock, ensuring our system is attuned to the rhythm of the  \\\n
day. Constants define the timeframes for morning and evening watering sessions, while  \\\n
designated pins for LEDs, buttons, and a potentiometer facilitate the communication among  \\\n
physical components.<br>In the setup phase, the code initializes pins and stages a brief,  \\\n
illuminating sequence with LEDs, symbolizing the system's awakening. As the main loop  \\\n
takes the stage, it constantly monitors the real-time clock and user inputs. The code  \\\n
continuously checks the time and conditions to trigger morning and evening watering  \\\n
cycles, while also providing a manual watering option through the push button. The  \\\n
iteration transpires every 5 seconds, ensuring a vigilant and responsive approach to the  \\\n
needs of plant care.s. Note that the push button triggers manual watering when pressed,  \\\n
adding a layer of user interactivity. Due to the 5000ms delay in the loop function, there  \\\n
might be a delay between pressing the button and the corresponding action. Nevertheless,  \\\n
when the process initiates, the green LED will illuminate.</p><br><p>The potentiometer values  \\\n
manage the water supply to the plant. The code calculates the pump's operational time  \\\n
based on the potentiometer's position. To ensure control and efficiency, we've established  \\\n
limits, where the minimum potentiometer value corresponds to a pump duration of 0 seconds,  \\\n
and the maximum allows up to 10 seconds. These settings remain easily customizable through  \\\n
designated constants.</p><br><p>It's worth mentioning that we've opted to disable the morning  \\\n
watering for our plant, choosing to automate the process exclusively in the evenings.  \\\n
Additionally, while the switch button currently lacks a specific assignment, it stands  \\\n
ready for future functionalities.</p><br><p>The presented Arduino code serves as the  \\\n
operational heart of our automated watering system, consistently monitoring real-time data  \\\n
and user inputs. Its key role is to activate morning and evening watering cycles,  \\\n
currently programmed for 8 in the morning and 20 in the evening, with customizable  \\\n
constants. The iterative loop ensures the system remains alert and responsive to the  \\\n
unique needs of plant care. The entire code is highly customizable through constants,  \\\n
enabling effortless adjustments to the configuration of the plant care station's  \\\n
operation.</p><br><p>Please be aware that the provided code snippet includes only the main  \\\n
segment.</p><br><p>Conclusion</p><br><p>In the spirit of self-made solutions, this project  \\\n
encourages to approach the process of building, learning, and adapting. The DS1302  \\\n
timekeeping module and Arduino-compatible pumps play crucial roles in this process, with  \\\n
each component contributing to the synergy between technology and the natural world. The  \\\n
true essence of this project lies not just in the finished product but in the  \\\n
transformative experience of crafting a technological solution for the well-being of your  \\\n
plants, wherever they may be.</p><br><p>In wrapping up our journey through the practical  \\\n
implementation of an Arduino-powered automatic watering system, you've navigated the  \\\n
intricacies of physical mounting, sensor integration, and module connections. What started  \\\n
as abstract concepts has materialized into a self-built, technology-infused plant care  \\\n
solution.</p></div>`,

  `<div><p>The spectrum analyzer displays the amplitude of signals as a function of frequency,  \\\n
allowing engineers and technicians to visualize and analyze signal characteristics. In  \\\n
particular, the audio analyzer performs a visual presentation of an acoustic signal in the  \\\n
frequency domain, where the frequency of the signal is displayed on the x-axis, while the  \\\n
amplitude of a certain frequency is displayed on the y-axis. In several of my previous  \\\n
videos I have presented several different types of such devices, but this time the FHT  \\\n
Arduino library is used for the first time. This library is several times faster than the  \\\n
commonly used FFT library, but at the expense of speed certain loss of resolution and  \\\n
precision appear at the two ends of the audio range. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg"></img><br><p>The  \\\n
device is really simple to build, and consists of only a few components:<br>- Arduino Nano  \\\n
MCU board,<br>- 8x64 color Led Matrix with WS2812B adressable leds<br>- Two (three) touch  \\\n
buttons<br>- three resistors<br>- and one capacitorNow let's see how the device works in  \\\n
real conditions<br>Considering that it is very simple, the device works immediately  \\\n
without any previous settings. One button is used to adjust the LED light intensity in 7  \\\n
steps. With the other button we move through 6 different mods with specific color sets,  \\\n
and we can also add more, with very small modifications to the code.</p><br><img  \\\n
src="https://projects.arduinocontent.cc/e5bffdf1-c174-47b2-aaeb-0edf30fec098.jpg"></img><br><p>Next,  \\\n
let's test the frequency range that this analyzer covers. For this purpose we will use a  \\\n
simple online tone generator. As you can see, the device covers the entire hearing range,  \\\n
from 20 Hertz to 20 kilohertz. Such a large-range device is excellent when is used for  \\\n
visual FFT analysis, but has one practical drawback when it comes to presenting musical  \\\n
materials. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/68e9de6f-5336-42bc-be80-c50441f2808b.jpg"></img><br><p>Namely,  \\\n
a large percentage (perhaps 90%) of this music signal is in the range up to 10Khz, and  \\\n
only a small part belongs to higher frequencies. This would practically mean that for the  \\\n
entire time that the music signal is being emitted, the far right part of the analyzer  \\\n
would be inactive. Let's see how it looks in practice (Here is an example with a speech  \\\n
signal, so we will try it with musical material as well). Since, as I mentioned at the  \\\n
beginning, this is a visual decorative addition, and not a precise measuring instrument,  \\\n
it is desirable to reduce the bandwidth by half, actually to 10 Kilohertz.</p><br><p>For this  \\\n
case I made some modification in the code, but it is also desirable to set a simple  \\\n
Low-pass filter on the input. Let's test the range with an online tone generator at the  \\\n
input. The range is up to 10Khz. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/c3d1c115-d49f-4b94-9b96-13111be626e6.jpg"></img><br><p>Now,  \\\n
in this case the matrix is completely filled and visually it looks much better.</p><br><p>As  \\\n
for the external appearance of the device, I tried to make a simple, but still functional  \\\n
version made of PVC board and glass with a thickness of 4 mm.</p><br><p>And finally a short  \\\n
conclusion.</p><br><p>This is an extremely simple project intended for beginners, but still  \\\n
visually very effective and can serve as a gadget on your desktop, or as an addition to an  \\\n
audio device. It can also be used as a simple school FFT spectrum analyzer instrument  \\\n
intended for educational purposes </p></div>`,

  `<div><p>In the vast realm of robotics, enthusiasts are venturing into the exciting world of OLED  \\\n
eye animations for Arduino robots. If you've found yourself lost in the maze of online  \\\n
searches, fear not! We've done the legwork and distilled the top five methods for creating  \\\n
captivating eye animations into a clear and fun comparison.</p><br><p>Introducing our  \\\n
selections:</p><br><p>Option 1: Eye Animation on OLED Display by Intellar </p><br><img  \\\n
src="https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg"></img><br><p>Intellar's  \\\n
approach brings cool eye animations to life with simple functions mimicking various moods  \\\n
(Normal, Sleep, Smile) and versatile eye movements. Pro: Easy to use with adjustable eye  \\\n
positions. Con: Limited to three moods.</p><br><p>Option 2: Simple Animated Eye Using Arduino  \\\n
by SpiderMaf </p><br><img  \\\n
src="https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg"></img><br><p>SpiderMaf's  \\\n
method features circular eyes with pupils for precise movements, adding a touch of  \\\n
humanity to your robot. Pro: Compact functions with customizable features. Con: Similar to  \\\n
Intellar's approach.</p><br><p>Option 3: Akno by AbdulsalamAbbod </p><br><img  \\\n
src="https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg"></img><br><p>Akno  \\\n
stands out with its expressive rectangular eyes and a wide range of emotions, suitable for  \\\n
various display types. Pro: Supports multiple expressions. Con: Less flexible in adjusting  \\\n
eye size.</p><br><p>Option 4:  Arduino OLED Moving Eyes by Vinny </p><br><img  \\\n
src="https://projects.arduinocontent.cc/2596309e-914d-4907-b5a0-b940e3bc6f7b.jpg"></img><br><p>Vinny's  \\\n
innovative technique involves rendering custom images on OLED displays, though it comes  \\\n
with memory constraints. Pro: External image rendering capability. Con: Memory-intensive  \\\n
process.</p><br><p>Option 5: Arduino UNO Robotic Eye Animations by Picaio </p><br><img  \\\n
src="https://projects.arduinocontent.cc/cff99131-f7ce-4295-b530-811e057734de.jpg"></img><br><p>Picaio  \\\n
offers a sophisticated yet realistic approach with diverse eye movements and expressions,  \\\n
enhancing animation realism. Pro: Optimized technique for efficient memory usage. Con: May  \\\n
be challenging for beginners due to its complexity.</p><br><p>Whether you're a seasoned  \\\n
hobbyist or just starting out, these methods provide a gateway to bringing your robot's  \\\n
personality to life! Get ready to dive in, experiment, and unleash your  \\\n
creativity.</p><br><p>Let's animate those robotic eyes and inject some fun into your Arduino  \\\n
projects! 🤖👀</p></div>`,

  `<div><p>Greetings everyone, and welcome to my Instructables tutorial. Today, I'll guide you  \\\n
through the process of creating an Object Tracking 4-DOF Robotics Arm.<br>Project  \\\n
Overview:</p><br><p>In this project, the robotic arm will execute actions corresponding to  \\\n
the commands received from the sensors. For example, if the object moves to the left, the  \\\n
robotic arm will respond by moving to the left, and similarly for movements to the right,  \\\n
up, and down.</p><br><p>Without further ado, let's dive into the project and get started!  \\\n
Step 1: Assemble the Robotics Arm Kit<br>https://youtu.be/TMv3JR06yuo<br>Watch the  \\\n
attached video for a complete step-by-step assembly of the Robotics Arm Kit.<br>Step 2:  \\\n
Servo Motors & PWM Servo Motor Driver Wiring </p><br><img  \\\n
src="https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg"></img><br><p>Refer  \\\n
to the attached image and connect all four servo motor wires to the PWM servo motor driver  \\\n
pins.<br>Figure Servo -> PWM servo pin 0<br>Right side Servo -> PWM servo pin 1<br>left  \\\n
side Servo -> PWM servo pin 2<br>Base Servo -> PWM servo pin 3</p><br><p>Step 3: PWM Servo  \\\n
Motor Driver & Arduino Uno Wiring</p><br><img  \\\n
src="https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png"></img><br><p>Follow  \\\n
the Circuit Diagram:<br>PWM Servo Motor Driver  -> Arduino Uno<br>GND   ->    GND<br>SCL    \\\n
->    A4<br>SDA   ->    A5<br>VCC   ->    VIN</p><br><p>Step 4: Mounting the Sensors Into the  \\\n
Robotics Arm</p><br><img  \\\n
src="https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg"></img><br><p>Follow  \\\n
the Steps:<br>- Insert the Ultrasonic Sensor into the designated sensor case.<br>-  \\\n
Securely attach the sensor case to the robotics arm as illustrated in the provided  \\\n
image.<br>- Utilize hot glue to ensure proper mounting of the sensor case.<br>- Affix the  \\\n
IR sensors to the left and right sides of the sensor case using hot glue.</p><br><p>These are  \\\n
all the steps required for this process.</p><br><p>Step 5: Ultrasonic Sensor, IR Sensor &  \\\n
Arduino Uno Wiring</p><br><img  \\\n
src="https://projects.arduinocontent.cc/db48a4f0-129b-4770-8e19-9e81f5a8c29d.png"></img><br><p>Follow  \\\n
the Circuit Diagram:</p><br><p>Ultrasonic Sensor -> Arduino Uno<br>GND -> GND ECHO -> A3 TRIG  \\\n
-> A2 VCC -> VIN</p><br><p>IR Sensor -> Arduino Uno (Right)<br>GND -> GND OUT -> A1 VCC ->  \\\n
VIN</p><br><p>IR Sensor -> Arduino Uno (left)<br>GND -> GND OUT -> A0 VCC -> VIN</p><br><p>Step  \\\n
6: Time to Upload the Sketch</p><br><img  \\\n
src="https://projects.arduinocontent.cc/efbbe392-9df2-476e-8470-157bd5dd834d.jpg"></img><br><p>-  \\\n
Now connect the USB cable to the Arduino Uno.<br>Next, upload the following code:</p></div>`,

  `<div><p>About the Project</p><br><p>Welcome back, tech enthusiasts! Today, I'm excited to introduce  \\\n
ARPoLan, a project that started as an experiment to explore the potential of combining the  \\\n
Arduino Pro Micro and the W5500 Ethernet module. This powerful device can perform network  \\\n
scanning, ARP spoofing, and even act as a local Rubber Ducky. Let me take you through  \\\n
building and testing this network security tool. Features & Components</p><br><p>ARPoLan  \\\n
combines several powerful components to deliver its impressive capabilities:</p><br><p>1.   \\\n
Network Scanning: Discover devices on the local network by sending ARP requests and  \\\n
collecting responses.<br>2.  ARP Spoofing: Perform ARP spoofing attacks to intercept and  \\\n
manipulate network traffic.<br>3.  HID Functionality: Utilize the Atmega32u4's USB HID  \\\n
capabilities for additional attack vectors.<br>4.  Real-time Monitoring: Visual and serial  \\\n
indicators for attack detection and network activity. Getting Started</p><br><p>I designed  \\\n
the PCB for ARPoLan using Altium Designer, creating a simple yet efficient two-layer  \\\n
layout. Here’s a breakdown of the components used: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg"></img><br><p>Atmega32u4  \\\n
Microcontroller: Handles USB communication and processing tasks.</p><br><p>W5500 Ethernet  \\\n
Module: Provides reliable network connectivity with an integrated hardware TCP/IP  \\\n
stack.</p><br><p>25 MHz Crystal Oscillator: Ensures precise timing for network  \\\n
operations.</p><br><p>RJ45 Ethernet Socket: Facilitates network connections with integrated  \\\n
status LEDs.</p><br><p>LM1117 Voltage Regulator: Supplies a stable 3.3V power to the  \\\n
W5500.</p><br><p>USB A Port: Allows for easy programming and data transfer.</p><br><p>Passive  \\\n
Components:</p><br><p>Capacitors and resistors for power stabilization and signal  \\\n
integrity.</p><br><p>The communication between the W5500 and the Atmega32u4 is handled via  \\\n
the SPI protocol, ensuring quick and reliable data transfer. Schematic</p><br><p>The PCB for  \\\n
ARPoLan was designed using Altium Designer, featuring a two-layer layout optimized for  \\\n
compactness and efficiency. The board integrates all necessary components, ensuring  \\\n
reliable connections between the Atmega32u4 and the W5500. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/0b6d0eeb-6a94-4fd1-9568-654934207c4a.png"></img><br><p>Connection  \\\n
Table<br>Ensure the VCC pin of the W5500 is connected to a 3.3V power supply, as the  \\\n
module operates at 3.3V logic levels.</p><br><p>The SS (Slave Select) pin can be connected to  \\\n
any digital pin on the Arduino Pro Micro, but it must be defined correctly in the  \\\n
code.</p><br><p>Make sure the GND of the Arduino Pro Micro is connected to the GND of the  \\\n
W5500 module to ensure a common ground.</p><br><p>This setup will enable SPI communication  \\\n
between the Arduino Pro Micro and the W5500 Ethernet module. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg"></img><br><p>Conclusion<br>Creating  \\\n
ARPoLan was a fascinating journey into network security and hardware integration. From  \\\n
designing the PCB to writing and testing the code, this project showcased the potential of  \\\n
combining simple yet powerful components to achieve sophisticated functionalities. Stay  \\\n
tuned for future updates and enhancements, and don’t forget to check out the project  \\\n
details on my GitHub. If you have any ideas or suggestions, I would love to hear them!  \\\n
Usage<br>First Code: Local Rubber Ducky The first piece of code transforms ARPoLan into a  \\\n
local Rubber Ducky. The Atmega32u4's USB HID capabilities allow it to act like a keyboard  \\\n
or mouse, injecting pre-programmed keystrokes into a connected computer. This was a fun  \\\n
experiment, though I refer to it as the "bad idea" code due to its potential  \\\n
risks.</p><br><p>Second Code: ARP Spoofing Next, I tested the ARP spoofing code. This script  \\\n
injects malicious ARP packets into the network, leveraging the processing power of the  \\\n
Atmega32u4 and the network capabilities of the W5500. While not overly powerful, it  \\\n
demonstrated the device's potential for network security tasks.</p><br><p>Third Code: Network  \\\n
Scanning The final code was for network scanning. By sending ARP requests to all IP  \\\n
addresses within a specified range, ARPoLan could identify active devices on the network.  \\\n
This functionality is crucial for network monitoring and penetration testing. Code &  \\\n
PCB</p><br><p>If you're interested in building this project, the code and schematic are  \\\n
available on GitHub. Simply visit the GitHub repository to download the necessary files.  \\\n
If the project gains attention, I’ll open-source the PCB files as well. Feel free to test  \\\n
the code and share your feedback or improvements.</p><br><p>GitHub repository:  \\\n
github.com/cifertech/arpolan </p></div>`,

  `<div><p>Ultrasonic sonar is devices that use sound waves with frequencies higher than the upper  \\\n
audible limit of human hearing (typically above 20 kHz) to measure distances to objects.  \\\n
They work on the principle of sending out a sound wave, and then measuring the time it  \\\n
takes for the sound wave to bounce back after hitting an object. By calculating the time  \\\n
difference between sending and receiving the sound wave, the distance to the object can be  \\\n
determined using the speed of sound in air.</p><br><p>This time I will describe to you a  \\\n
simple way how to make an independent Sonar, where the results are displayed on a TFT  \\\n
color display in the form of a radar image, which is why it is often mistakenly called  \\\n
radar instead of sonar.<br>https://youtu.be/XOZAGRH_6hAI got the idea quite by accident  \\\n
from a picture on the internet, and then after a little research I found that project on  \\\n
Github. The original project was made on a 1.8 inch display which is really a very small  \\\n
surface for this purpose. So I reworked the code for a larger 3.2 inch TFT display, where  \\\n
the image is much clearer. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/77c2652f-24f9-4051-b804-ee01d27a19fb.jpg"></img><br><p>The  \\\n
device is really simple to make and consists of only a few components<br>- Arduino Nano  \\\n
microcontroller board<br>- TFT display with a resolution of 240 x 320 pixels and an  \\\n
ILI9341 driver chip<br>- Ultrasonic sensor type HC-SR04<br>- small 9G Servo<br>- and  \\\n
several resistors that serve to shift the display signal from 5V to 3.3V level</p><br><p>The  \\\n
servo and ultrasonic sensor are housed in a separate box, which I used from a previous  \\\n
project, and connected to the main box with flat cables. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/551833cf-1265-4704-b8ed-624bc04e00fc.jpg"></img><br><p>Now  \\\n
let's see how the device works in real conditions:</p><br><p>At the beginning, I separated  \\\n
the ultrasonic sensor from the servo in order to calibrate the graphic presentation with  \\\n
the real distance of the object. As you can see, the real distance fully corresponds to  \\\n
the distance shown on the display. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/3332450b-d347-4c5c-871c-e1d3c5db8c73.jpg"></img><br><p>Now  \\\n
we mount the sensor on the servo and place the obstacles to be detected. At power on, the  \\\n
servo is tested first, then the Radar like screen is drawn on the display and scanning  \\\n
begins. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/58696a6b-fc25-414b-bd8d-8fb2244937a5.jpg"></img><br><p>Obstacles  \\\n
are marked with red dots. In the lower left corner, the scanning area is displayed, and on  \\\n
the right, the distance between the sensor and the obstacle in centimeters. The three  \\\n
green arcs with marked distances serve us for easier visibility and an idea of the real  \\\n
distance. If the nearest obstacle is greater than 1 meter, yellow dots are drawn on the  \\\n
last arc, indicating an out of range condition. Scanning is performed first from 180 to 0  \\\n
degrees, and then vice versa, from 0 to 180 degrees. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/c08bc3f4-47b9-469f-a32a-07aa775c9549.jpg"></img><br><p>For  \\\n
the sake of stability during operation, the device is preferably powered by an external  \\\n
power source, but it also works via USB on the Arduino. All display colors can be easily  \\\n
changed in the code according to the user's preference.<br>And finally a short conclusion.  \\\n
Most such devices show the scan result on a PC monitor which requires an additional  \\\n
application and code. This is a very simple, easy to make, visually effective, and  \\\n
self-contained device intended for both beginners and more advanced DIYers. I've used  \\\n
cases from previous projects, but it's desirable to have it all in one case with a slanted  \\\n
front display to visually simulate a real radar system. </p></div>`,

  `<div><p>In this exciting tutorial, we will show you how to build your own security camera using an  \\\n
ESP32-CAM and an AM312 PIR sensor to detect motion. Best of all, photos will be saved  \\\n
directly to an SD card!</p><br><p>       Throughout this video, we will guide you through the  \\\n
following steps:</p><br><p>Link projects and update in  \\\n
https://rogerbit.com/wprb/2023/10/captura-con-esp32/</p><br><p>Hardware Connection: We will  \\\n
show you how to connect the ESP32-CAM and the AM312 PIR sensor to your breadboard,  \\\n
guaranteeing correct power.</p><br><p>Arduino IDE Configuration: You will learn how to  \\\n
configure the development environment in Arduino IDE to work with the ESP32-CAM and select  \\\n
the appropriate board.</p><br><p>Programming: We will provide you with the code necessary to  \\\n
configure the ESP32-CAM and program it to capture images when motion is detected.  \\\n
Additionally, we will show how to store images on an SD card.</p><br><p>Try it in Real Life:  \\\n
You will see our motion detection system in action. We will test it in a real environment  \\\n
so you can see how it works.</p><br><p>Tips and Customization: We will share some useful tips  \\\n
and show you how to customize and extend this project according to your needs.</p><br><p>This  \\\n
project is perfect for creating an affordable and functional security camera for your  \\\n
home, office, or anywhere you want to monitor.</p><br><p>Electronic components</p><br><p>usb  \\\n
serial adapter </p><br><img  \\\n
src="https://rogerbit.com/wprb/wp-content/uploads/2021/07/51Lp3uhptQL.jpg"></img><br><p>Description<br>FTDI  \\\n
Basic Program Downloader USB to TTL FT232RL 3.3V 5V DTR</p><br><p>This is a basic breakout  \\\n
board for the FTDI FT232RL USB to serial IC. The pinout of this board matches the FTDI  \\\n
cable to work with official Arduino boards and cloned 5V Arduino boards. It can also be  \\\n
used for general serial applications. The main difference with this board is that it  \\\n
highlights the DTR pin instead of the RTS pin of the FTDI cable. The DTR pin allows an  \\\n
Arduino target to automatically reset when a new Sketch is downloaded. This is a really  \\\n
nice feature and allows you to download a sketch without having to hit the reset button.  \\\n
This board will automatically reset any Arduino board that has the reset pin on a 6-pin  \\\n
connector.</p><br><p>This board has TX and RX LEDs which make it a little better to use over  \\\n
the FTDI cable. In fact, you can see the serial traffic on the LEDs to check if the board  \\\n
is working.</p><br><p>This board was designed to decrease the cost of Arduino development and  \\\n
increase ease of use (the auto-reset feature is great!). Our Arduino Pro and LilyPads  \\\n
boards use this type of connector.<br>One of the nice features of this board is a jumper  \\\n
on the back of the board that allows the board to be set to 3.3V or 5V (both power output  \\\n
and I/O level). This board ships by default at 5V, but you can cut the default trace and  \\\n
add a solder jumper if you need to switch to 3.3V.</p><br><p>CHARACTERISTICS</p><br><p>Standard  \\\n
interface design, compatible with a variety of Arduinos such as the Pro  \\\n
Mini</p><br><p>Original FTDI FT232 chip, stable performance</p><br><p>With power indicator,  \\\n
send, receive, working status LED indicators</p><br><p>With 3.3V and 5V TTL level supply  \\\n
options</p><br><p>USB to Serial TTL Module, Download STC SCM</p><br><p>Mini USB port  \\\n
connection</p><br><p>Standard interface, compliant with Arduino official controller; With  \\\n
power, sending, reveiving indicator, With 3.3V / 5V power supply; Can be used as ordinary  \\\n
USB to serial TTL module, download STC singlechip</p><br><p>Hardware  \\\n
introduction</p><br><p>Adopt FTDI company’s FT232RL chip</p><br><p>Lead out FT232RL chip all  \\\n
signal port, TTL / CMOS level</p><br><p>RXD/TXD send-receive communication  \\\n
indicator</p><br><p>USB power supply, can choose 5V or 3.3V interface level (if you need  \\\n
other level, can provide target voltage in VCC and GND pin)</p><br><p>Cables Dupont  \\\n
Introduction<br>In this project I will show you how to Decode IR Remote Control Signals'  \\\n
of any Remote using Arduino.</p><br><p>The remotes which we use in our home are basically  \\\n
made of IR transmissions for example TV remote, DVD remote, Sound System remote etc. But  \\\n
these signals never interfere with each other because every key in the remote control has  \\\n
unique operation code in Hexadecimal format. By decoding these signals we can know what is  \\\n
the unique code of the key. By knowing the codes we can implement several applications  \\\n
where we can control with same remote.</p><br><p>Working on Basic</p><br><p>IR remote has a  \\\n
button and a microcontroller with IR LED attached. When a button is pressed, a  \\\n
microcontroller identified the button and sends the corresponding modulated signals  \\\n
(codes) to the IR LED. Then, the IR LED sends it to the IR receiver in the  \\\n
appliance.</p><br><p>System in the appliance demodulate the signals(codes) and the checks the  \\\n
function corresponding to it and executes it. Each function has a different  \\\n
code.</p><br><p>Every IR operated appliance has different codes for different  \\\n
function.</p><br><p>Prototype Image's</p><br><img  \\\n
src="https://projects.arduinocontent.cc/bd015441-332e-4094-a2ef-3c8a0efa3140.jpg"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/ac0170b4-8181-4118-b8f2-1dc78673e266.jpg"></img><br><p>Hookup<br>Follow  \\\n
the Steps:-</p><br><p>Connect the First pin from the left of TSOP1738 ( OUT pin) with pin 11  \\\n
of Arduino.</p><br><p>Hook the Middle pin ( GND pin) with the GND pin of  \\\n
Arduino.</p><br><p>Connect the third and the last pin ( VCC pin) with 5V pin of  \\\n
Arduino.</p><br><p>Uploading and Testing</p><br><p>Remember to install the IRremote.h  \\\n
library.</p><br><p>Copy or download the code attached with the project.</p><br><p>Hit upload and  \\\n
open serial monitor.</p><br><p>Take any remote you want to use or you want the codes off it  \\\n
and press any button.</p><br><p>Now, see in the serial monitor. You will see a code of the  \\\n
corresponding button you pressed.</p><br><p>Note the codes on a paper or copy them in a  \\\n
document file on PC. </p></div>`,

  `<div><p>Here, You can learn "How to Control Motors using L298n Motor Driver & Arduino Uno".<br>You  \\\n
can even control Speed & Direction of Motors using this tutorial.</p><br>You can see Step by Step Process  \\\n
physically- </p><br><img  \\\n
src="https://projects.arduinocontent.cc/f50108d1-ac6d-4d5f-acb5-90ca5a093cd4.jpg"></img><br><p>Here,  \\\n
I am attached a L298n Motor Driver Pinout Diagram- </p><br><img  \\\n
src="https://projects.arduinocontent.cc/918a766f-aeb8-4f94-aeda-57f183d1cf86.jpg"></img><br><p>Firstly,  \\\n
Connect your Motors with L298n Motor Driver </p><br><img  \\\n
src="https://projects.arduinocontent.cc/e0fd14ab-6166-4870-ad6e-b73c47009d86.png"></img><br><p>Now,  \\\n
Connect your L298n Pins with Arduino Uno Pins </p><br><img  \\\n
src="https://projects.arduinocontent.cc/7d20b0ad-496b-4a90-80ce-669ec9db1fd2.png"></img><br><p>Now,  \\\n
Connect following Pins-</p><br><p>L298n (+5V) =>Arduino (+5V)<br>L298n (Gnd) =>Arduino  \\\n
(Gnd)</p><br><p>Now Connect Battery-</p><br><p>L298n (+12V) =>Battery (+ve)<br>L298n (Gnd)  \\\n
=>Battery (-ve)</p><br><p>Above Pin System can Run your L298n Motor Driver module as well as  \\\n
Arduino.</p><br><p>But, If you want to Control Speed you have to do some simple extra work.  \\\n
</p><br><img  \\\n
src="https://projects.arduinocontent.cc/a73bfc9c-7c69-44fa-9d0f-321e034d6f4e.png"></img><br><p>Now  \\\n
You can Control your Motor Speed.<br>I am attached my Final Look of our Project. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/601919da-0dc7-4158-9e4c-66e1192c1e0e.jpg"></img><br><p></p></div>`,

  `<div><p>Hello everyone,</p><br><p>       Welcome back to another interesting and easy tutorial after  \\\n
a long time. Sorry guys I was busy in writing very fantastic book regarding Arduino IoT  \\\n
Cloud and I will share the details at the end of this tutorial. so this book writing  \\\n
approx took 1 year and 2 months.</p><br><p>       Well back to the point, many years ago I  \\\n
have created a tutorial on temperature and humidity monitoring using Arduino Uno and  \\\n
DHT22. I got approx half million hits on my that article. this is the love from community  \\\n
which is pushing me to work beyond my commitment.</p><br><p>       So in this tutorial I am  \\\n
going to demonstrate how to monitor temperature and humidity using SeeedStudio tiny  \\\n
development MKRWiFi 1010 and how to integrate it with Arduino IoT Cloud so you guys can  \\\n
take the benefit of IoT Platforms and keep yourself updated with your room/outdoor  \\\n
temperature and humidity anywhere in the world with the help of Arduino IoT Cloud.</p><br><p>  \\\n
  Buckle up, guys, and collect the MKR WiFi 1010 and DHT22 with male-to-male cables.  \\\n
Connect the DHT22 to the MKR WiFi 1010 as per the below diagram. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/28e6dbad-bfb6-42fb-baad-7b7741ca689f.png"></img><br><p>It's  \\\n
time to navigate towards Arduino IoT Cloud https://app.arduino.cc/ if you didn't have  \\\n
account then just create the account. Now our first step is to create Thing it's basically  \\\n
a container in Arduino IoT Cloud which holds the Device, Cloud variables, Code and Meta  \\\n
data of of IoT node. Click on Thing menu which is available in the left side bar as per  \\\n
below image. </p><br><img src="https://i.imgur.com/7UPq84L.png"></img><br><p>Now click on +  \\\n
CREATE THING button which is shown in the center of the page as per below image. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/16c97c36-b414-4a56-8fd3-e23096496af0.png"></img><br><p>After  \\\n
that you will see a new page where you will fin different tabs and sections as just like  \\\n
below diagram. this is the main page where we need to setup all the things like variables,  \\\n
device, network configuration, code and etc. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/1fd770d1-3d82-40eb-8c59-947fbf6f7097.png"></img><br><p>Above  \\\n
picture is marked with red boxes and I assigned the numbers to them and below is full  \\\n
explanation of each step which is marked by number.<br>1- Click on "Untitled" and select  \\\n
rename and assign the name to Thing.</p><br><p>2-In this section we will add the cloud  \\\n
variables and in this tutorial we required 2 cloud variables one for temperature and  \\\n
second for humidity.</p><br><p>3-Attach the device to Thing</p><br><p>4-Configure the Network  \\\n
Settings</p><br><p>5-Navigate to the Sketch tab and add the code for MKR Wi-Fi 1010 and  \\\n
upload the code.</p><br><p>Adding Variables to Thing</p><br><p>In this subsection, we will add  \\\n
the cloud variables to Thing. Click on the ADD button, which is available in the Cloud  \\\n
Variables section. and you will see the pop-up where you need to provide the name. Select  \\\n
the type of variable from the drop-down menu. Right now, I am not going to talk about  \\\n
other options due to time limitations. Finally, click on the "ADD VARIABLE" button and  \\\n
repeat the same procedure for the humidity variable, but select the relative humidity type  \\\n
from the drop-down menu as per below image. </p><br><img  \\\n
src="https://i.imgur.com/dicxo6D.png"></img><br><p>Adding Device to Thing</p><br><p>Before  \\\n
adding a device you should have "Arduino Create Agent" Installed and running on your  \\\n
machine. Then click on Select Device button under Associated Device section. Popup will  \\\n
appear and list all of the devices if any device is associated in Arduino IoT Cloud else  \\\n
you have option to Add a new Device.</p><br><p>Click on "SET UP NEW DEVICE" and select the  \\\n
"Arduino" option. In the next step, Arduino will automatically detect the supported  \\\n
Arduino development board and display the name and port of the development board as shown  \\\n
in the below picture. Before this process, try to connect MKR Wi-Fi 1010 to your machine.  \\\n
Click on the "CONFIGURE" button. It will take a few seconds to configure your development  \\\n
board with the necessary configuration.. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/05ec1b63-62b2-4291-865d-b2913f924809.png"></img><br><p>Congrats  \\\n
your Device has been added and attached successfully to Thing.</p><br><p>Configure Network  \\\n
for Thing</p><br><p>After adding the device it's time to configure the Wi-Fi Settings. Click  \\\n
on Configure button under Network section on the Thing main page. Here you will see the  \\\n
popup just like below image and you need to provide Wi-Fi Name and it's Password. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/0fc35297-5efc-435f-901f-c858d7452bf5.png"></img><br><p>After  \\\n
passing the first four steps, our Thing page looks like the below image. In these 4 steps,  \\\n
we assigned the name to the thing, created cloud variables, associated the device with the  \\\n
thing, and, at the end, added the Wi-Fi configuration. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/5d5f5477-809e-42d9-84cd-701b533534b9.png"></img><br><p>Playing  \\\n
with the Code</p><br><p>Now it's time to play with the code. Just click on the Sketch tab and  \\\n
you will see the inline code editor. copy the code from the end of this page under code  \\\n
section and paste into the editor. and click on upload button which is marked by red  \\\n
rectangle in below image. it will take few seconds for code verification and uploading to  \\\n
development board. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/f1db379f-444e-46a7-94bd-5319e03c68af.png"></img><br><p>Congrats  \\\n
now your devices is up and running and successfully sending the values to Arduino IoT  \\\n
Cloud.</p><br><p>Dashboard creation</p><br><p>In the previous tutorial, we just created and set  \\\n
up the thing. Now it's time to visualize the sensor readings. For this, we need to setup  \\\n
the dashboard. Click on the Dashboards menu, as shown in the below picture. </p><br><img  \\\n
src="https://i.imgur.com/FFgR2Uv.png"></img><br><p>Now you will see the Dashboard page just  \\\n
like below image and click on + CREATE DASHBOARD. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/4cd7e377-a7d3-451b-9ecd-1cbef4297c7c.png"></img><br><p>You  \\\n
will see the new tab where you can setup the control widgets to visualize your sensor  \\\n
values. But here I marked down some important icons and buttons with numbers. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/ebe991fd-7885-43c2-9646-c80cd9a7e734.png"></img><br><p>1-  \\\n
Click Untitled to rename and assign a name to your Dashboard</p><br><p>2-Eye icon is view  \\\n
mode while edit icon allows you to add/update the widgets and their settings.</p><br><p>3-ADD  \\\n
button is control drop down where you will find plenty of control widgets such as gauge,  \\\n
charts, buttons which will help you to visualize your sensors data and  \\\n
control.</p><br><p>4-Reize icon will be used to resize the control and lock the alignment  \\\n
while mobile icon is used to prepare your dashboard according to mobile device, as by  \\\n
default you are creating dashboard for desktop.</p><br><p>Adding Widgets to  \\\n
Dashboard</p><br><p>Now it's time to add some widgets to visualize our Temperature and  \\\n
Humidity values. for Temperature I will use Gauge widget and for Humidity Percentage  \\\n
widget. Click on the ADD button and search for Gauge widget. After that you will see the  \\\n
popup just like below image and Assign the Name to widget and Link the Temperature cloud  \\\n
variable. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/c7be9925-ce5c-45a3-95cd-cf87f62500e8.png"></img><br><p>After  \\\n
giving the Name to widget control and linking the cloud variable setup will look like  \\\n
below image. just click on "DONE" and you will be good to go. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/280dde65-b44c-40d6-b004-eca0605b5706.png"></img><br><p>Repeat  \\\n
the same procedure for Percentage Widget and also try to explore other display values  \\\n
widget controls like Values, Charts and etc widgets. Now the final Dashboard has been  \\\n
ready for your view just like below image which is showing both Temperature and Humidity  \\\n
values. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/b84f52b0-0581-4630-96d5-7e3c93579335.png"></img><br><p>Arduino  \\\n
IoT Cloud for Developers Book</p><br><p>Download the Arduino IoT Cloud app on your  \\\n
Android/Apple via Play/App store and login with your account and see the dashboard on  \\\n
fingertips for latest update and alerts.</p><br><p>Now it's time to talk about my Arduino IoT  \\\n
Cloud for Developers book which is by the available at amazon as well as on PacktPub.  \\\n
Below are the URLS for your purchase.  \\\n
https://www.amazon.com/Arduino-Cloud-Developers-simple-complex/dp/1837637172</p><br><p>https://www.packtpub.com/product/arduino-iot-cloud-for-developers/9781837637171The  \\\n
book has 14 chapters where you will learn about Internet of Things Architecture, Arduino  \\\n
IoT Cloud hierarchy as it's totally different from other cloud platforms such as  \\\n
ThingSpeak, Cayenne myDevices and etc. Next you will learn all the Cloud Platform options  \\\n
and dashboard widgets which is very mandatory to learn all the stuff before getting  \\\n
started with the Arduino IoT Cloud.</p><br><p>I have created 6 different projects in the book  \\\n
which are using different types of development boards which includes MKR Wi-Fi 1010,  \\\n
ESP8266, XIAO ESP32C3 and etc. You will learn Enviromental Monitoring, Smart Agriculture,  \\\n
Smart Health, IoT for assets tracking using GSM as well as with LoraWan, Smart Home where  \\\n
we integrated smart lamp with Amazon Alexa Dot Echo with in couple of minutes without any  \\\n
code to Arduino IoT Cloud. I Hope you will will enjoy my book just like this  \\\n
tutorial.</p><br><p>For developers and IoT engineers, I have written two special chapters  \\\n
that focus on how to use the Arduino IoT Cloud API and Arduino Cloud CLI to integrate  \\\n
their solution with other 3rd party clouds and services, and Arduino Cloud CLI helps  \\\n
engineers and administrators to automate and manage bulk deployments using the  \\\n
command-line tool. </p></div>`,

  `<div><p>The goal of this tutorial is to show you a way to easily add AI to a project , without any  \\\n
knowledge in this field, using the software NanoEdge AI Studio and its Arduino compatible  \\\n
libraries!</p><br><p>This tutorial guides you through building a cardboard touchpad that  \\\n
relies on vibration analysis and an Embedded AI algorithm running on an Arduino UNO R4 .  \\\n
The UNO emulates a USB keyboard device.</p><br><p>Vibration data from the cardboard is  \\\n
captured using a basic accelerometer connected via the Qwiic connector. Within the UNO  \\\n
microcontroller, vibrations are classified using a NanoEdge AI library.</p><br><p>Based on  \\\n
the detected class, the touchpad triggers either a "PageUp" or "PageDown" keystroke.  \\\n
NanoEdge AI Studio:</p><br><p>NanoEdge is a free machine learning software developed by  \\\n
STMicroelectronics which allow to easily create and integrate AI libraries to any cortex M  \\\n
microcontroller. Essentially, select a project type, import data locally, run a benchmark  \\\n
to find the best model automatically, test the model if you want and get an AI  \\\n
library.</p><br><p>In Nanoedge AI Studio, four kinds of projects are available, each serving  \\\n
a different purpose:</p><br><p>Anomaly detection (AD): to detect a nominal behavior and an  \\\n
abnormal one. Can be retrained directly on board.</p><br><p>1 class classification (1c):  \\\n
Create a model to detect both nominal and abnormal behavior but with only nominal data.  \\\n
(In case you cannot collect abnormal examples)</p><br><p>N class classification (Nc): Create  \\\n
a model to classify data into multiple classes that you define</p><br><p>Extrapolation (Ex):  \\\n
Regression in short. To predict a value instead of a class from the input data (a speed or  \\\n
temperature for example).Open Arduino IDE and create a new project:</p><br><p>Copy data  \\\n
logger source code available below. Click on Sketch > Include Library > Adafruit_LiS3DH to  \\\n
install the library.</p><br><p>Be careful : If your board is emulating a keyboard, you need  \\\n
to double press the reset button to be able to flash it.</p><br><p>Open the serial in Arduino  \\\n
IDE to check that the accelerometer data is correctly coming to your computer. (don't  \\\n
forget to close the serial after that) </p><br><img  \\\n
src="https://projects.arduinocontent.cc/aa31e081-1080-46bd-9b6e-084e16cdb658.png"></img><br><p>Now  \\\n
we will automatically create an AI model able to recognize classes of gestures using  \\\n
vibration patterns.</p><br><p>Open NanoEdge AI Studio and create a new " N-Class  \\\n
Classification " project.</p><br><p>In project settings:<br>Set target to "UNO R4 Wifi"  \\\n
Sensor to 3-axes accelerometer </p><br><img  \\\n
src="https://projects.arduinocontent.cc/036751c3-350c-47b5-be56-df2478d69917.png"></img><br><p>In  \\\n
the Signal step , collect one dataset per class ("Nothing","Swipe","Multitap" or any  \\\n
gesture that you want) using serial port.<br>Collect one kind of gesture per  \\\n
dataset!</p><br><p>Here is how to proceed:</p><br><p>Make sure the board is connected to the pc  \\\n
with the data logger code flashed on it</p><br><p>Click ADD SIGNAL > FROM SERIAL Make sure to  \\\n
select the right come port</p><br><p>Click START/STOP to collect data (100 buffers per signal  \\\n
should be enough) Once finished click CONTINUE and then IMPORT</p><br><p>If everything is  \\\n
correct, you should see a new dataset added with plots and information. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/73727b45-b30a-4b8a-940c-5be372c72dbf.png"></img><br><p>Create  \\\n
the AI model:</p><br><p>Once you have all the classses that you want to recognize, go to the  \\\n
Benchmark step.</p><br><p>Click RUN NEW BENCHMARK. Select all your datasets and click  \\\n
START.</p><br><p>NanoEdge AI Studio will take your data and look for a model that is able to  \\\n
classify them. (it also applies pretreatment on its own to your data)</p><br><p>You get the  \\\n
accuracy of the model and its RAM and Flash requirements.</p><br><p>You should reach around  \\\n
99% pretty fast if you collected good data. You can stop the benchmark when it happens.  \\\n
</p><br><img  \\\n
src="https://projects.arduinocontent.cc/ae3a036a-2afe-4aee-9708-dbc2d1ae5447.png"></img><br><p>In  \\\n
the validation step, you can compare the libraries (model + preprocessing) if you want,  \\\n
look here for more  \\\n
info:<br>https://wiki.st.com/stm32mcu/wiki/AI:NanoEdge_AI_Studio#Validation</p><br><p>Test  \\\n
the model:</p><br><p>The emulator step is more useful for us here, you can use the serial to  \\\n
test the model directly in the tool:</p><br><p>Click INITIALIZE EMULATOR <br>Click FROM  \\\n
SERIAL<br>Test your model with new real time data </p><br><img  \\\n
src="https://projects.arduinocontent.cc/934034b2-cf67-4208-9e4a-d68e9b15193e.png"></img><br><p>The  \\\n
last step in NanoEdge is to get the AI library that we will use in Arduino IDE:<br>Click  \\\n
COMPILE LIBRARY</p><br><p>Get and extract the .zip file</p><br><p>The library is the .zip file  \\\n
in the folder Arduin , we will use it below: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/cb1cadc0-a02d-4521-8e0d-d0ff4042e45b.png"></img><br><p>Create  \\\n
the demo:<br>Open a new project in Arduino IDE</p><br><p>Get the main code below and paste it  \\\n
in your project</p><br><p>Click on Sketch > Include Library > Adafruit_LIS3DH</p><br><p>Add the  \\\n
Nanoedge AI Library (select the previously extracted zip): </p><br><img  \\\n
src="https://projects.arduinocontent.cc/a36090e3-13ae-4859-9646-2c6c1d15da6a.png"></img><br><p>Compile  \\\n
the code. Flash the code.</p><br><p>It is finished, you can play with it.</p><br><p>Through this  \\\n
example, this tutorial shows how to add AI to an Arduino project using NanoEdge AI Studio.  \\\n
It is now up to you to think about other use case and do them on your own! PIR sensors are  \\\n
widely used for motion detection in various applications, from security systems to  \\\n
automatic lighting. In this guide, we will explore PIR sensor, its working principles, and  \\\n
interfacing it with Arduino.</p><br><p>In this project we will create a motion detection  \\\n
system using a PIR sensor and an Arduino board. The PIR sensor will detect motion within  \\\n
its detection range and trigger an action, such as turning on an LED or activating an  \\\n
alarm.</p><br><p>Understanding PIR Sensor</p><br><p>Before we dive into the project  \\\n
implementation, let's first understand how a PIR sensor works. PIR sensor detects changes  \\\n
in infrared radiation emitted by objects within its field of view. This radiation is  \\\n
emitted by all objects with a temperature above absolute zero, including humans and  \\\n
animals. The sensor consists of a pyroelectric sensor, which generates an electrical  \\\n
signal in response to changes in infrared radiation, and a circuit that processes and  \\\n
amplifies this signal to detect motion.</p><br><p>HCSR04 Ultrasonic Sensor Pinout<br>The  \\\n
Pinout is given as below: </p></div>`,

  `<div><p></p><br><img  \\\n
src="https://projects.arduinocontent.cc/947a4793-1603-4d45-b9fa-e314f780e848.jpg"></img><br><p>VCC  \\\n
is the power pin of the module.</p><br><p>GND is the GND pin of the module.</p><br><p>Out is the  \\\n
data output pin of the module.</p><br><p>Interfacing PIR Sensor with Arduino</p><br><p>Now that  \\\n
we have a basic understanding of how PIR sensors work, let's proceed to interface the PIR  \\\n
sensor with Arduino. Here's a step-by-step guide: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/f3b88737-328c-4ace-bd4c-76b95195d2a6.jpg"></img><br><p>Connect  \\\n
the VCC pin of the PIR sensor to the 5V pin on the Arduino board.<br>Connect the GND pin  \\\n
of the PIR sensor to the GND pin on the Arduino board.<br>Connect the OUT pin of the PIR  \\\n
sensor to a digital pin e.g., pin 2 on the Arduino board. Arduino code for interfacing PIR  \\\n
sensor with Arduino<br>Here is the complete line by line code explanation for Interfacing  \\\n
Arduino with PIR Sensor. The complete code can be found at the absolute bottom of the  \\\n
project.<br>This line includes the LiquidCrystal library, which allows interfacing with  \\\n
LCD displays.</p><br><p>#include <LiquidCrystal.h> // Include the LiquidCrystal library for  \\\n
LCD display<br>This line initializes an instance of the LiquidCrystal class named  \\\n
lcd, specifying the pin numbers to which the LCD display is connected. The parameters  \\\n
represent (RS, EN, D4, D5, D6, D7) pins respectively.</p><br><p>LiquidCrystal lcd(12, 11, 6,  \\\n
7, 8, 9); // Initialize the LCD object with pin numbers<br>These lines declare two  \\\n
integer variables: sensorInput, which represents the pin number connected to the PIR  \\\n
sensor, and sensorReturn, which will store the output of the PIR sensor.</p><br><p>int  \\\n
sensorInput = 2;   // PIR sensor input pin<br>int sensorReturn = 0;  // Variable to store  \\\n
PIR sensor output</p><br><p>The setup() function is called once when the Arduino board  \\\n
starts. Now we set the sensorInput pin as an input pin, indicating that it will be used to  \\\n
read data from the PIR sensor. Then initialize the LCD display with 16 columns and 2 rows,  \\\n
indicating the display's dimensions. Initial messages are printed on the LCD display,  \\\n
positioning the cursor at the beginning of the second row.<br>void setup()  \\\n
{<br>pinMode(sensorInput, INPUT); // Set sensor pin as input      <br>// Set up the LCD's  \\\n
number of columns and rows      <br>lcd.begin(16, 2);      <br>// Print initial message  \\\n
on the LCD      <br> lcd.setCursor(0, 0);      <br> lcd.print("PIR Sensor Says:");       \\\n
<br> lcd.setCursor(0, 1);      <br>}      <br>In the loop() function, the value of the  \\\n
PIR sensor output is read using digitalRead(sensorInput). <br>If motion is detected  \\\n
(sensor output is HIGH), a message indicating motion occurrence is displayed on the LCD.  \\\n
If no motion is detected (sensor output is LOW), a message indicating motion stops is  \\\n
displayed on the LCD. </p><br><p>void loop() {      <br> sensorReturn =  \\\n
digitalRead(sensorInput); // Read input value from PIR sensor      <br> // Check if  \\\n
motion is detected      <br> if (sensorReturn == HIGH) {      <br>   // Set cursor to  \\\n
the second row and print motion detection message      <br>   lcd.setCursor(0, 1);       \\\n
<br>   lcd.print("Motion Occurs   ");       } else {      <br>   // Set cursor to the  \\\n
second row and print motion stopped message      <br>   lcd.setCursor(0, 1);      <br>    \\\n
lcd.print("Motion Stops    ");      <br> }      <br>}      </p></div>`,

  `<div><p>The two eyes are painted on two ping-pong balls which are sticked on two servo motors. Two  \\\n
ultrasonic sensors measure the object's position. An Arduino Nano Every board reads the  \\\n
measurements from the ultrasonic sensors and controls the sevo motors  \\\n
accordingly.</p><br><p>The servo motors are SG90 micro servos and the ultrasonic sensors are  \\\n
HC-SR04. These are very common and very inexpensive devices. The Arduino board may be of  \\\n
another model than the nano Every, provided that 5V is available to power the servo motors  \\\n
and the ultrasonic sensors. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/781dcb46-650d-4a7d-9177-5f7e4ee1ee1b.jpg"></img><br><p>The  \\\n
servo motors and ultrasonic sensors are sticked on a plate according to the arrangement  \\\n
shown on the following plan: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/e0fd7c1d-3a35-474b-b284-60a1b0a110d3.jpg"></img><br><p>The  \\\n
position of the X ultrasonic sensor can be different, for example to follow larger  \\\n
objects. In this case, the constants A and B must be adjusted in the software to reflect  \\\n
the actual position of the X ultrasonic sensor. These two values must be less than 200  \\\n
cm.</p><br><p>The connections to be made are as follows:</p><br><p>The grounds of the servo  \\\n
motors and of the ultrasonic sensors must be connected to the ground of the Arduino board  \\\n
and their power supplies to +5V.</p><br><p>The trigger input of the X ultrasonic sensor is  \\\n
connected to digital input/output 2 and its echo output to digital input/output  \\\n
3.</p><br><p>The trigger input of the Y ultrasonic sensor is connected to digital  \\\n
input/output 5 and its echo output to digital input/output 6.</p><br><p>The left and right  \\\n
servomotors controls are connected to digital inputs/outputs 8 and 10 respectively. Left  \\\n
and right refer to Big Brother's eyes, his left eye is on your own right.</p><br><p>The  \\\n
following diagram shows the connections to be made:Software</p><br><p>The software is  \\\n
extremely simple, less than 70 lines. No library is required.</p><br><p>Have fun. </p></div>`,

  `<div><p>Gather your tools and troops (components, that is)</p><br><p>The brains: An Arduino Uno, the  \\\n
mastermind behind the magic.<br>The translator: An HC05 Bluetooth module, your car's  \\\n
interpreter for smartphone commands.<br>The muscle: L298N motor driver, the beefy guy  \\\n
controlling those zippy wheels.<br>The bling: NeoPixel LEDs, because who doesn't love a  \\\n
car with dazzling lights?<br>The base: Perfboard and Sunboard, the sturdy foundation for  \\\n
your creation.<br>The connections: Jumper wires, the colorful threads that bring  \\\n
everything together.<br>The fuel: A battery, to keep your robot rolling (safely, of  \\\n
course!). </p><br><img  \\\n
src="https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png"></img><br><p>Craft  \\\n
the chassis, the car's core:</p><br><p>       Imagine your robot's frame. Sunboard is your  \\\n
friend here! Cut precise pieces based on the guide (remember, measuring twice cuts once!).  \\\n
Assemble them like a mini puzzle, creating a strong and stable base for your future  \\\n
masterpiece. Motor magic, let the wheels spin:</p><br><p>       Time to get those motors  \\\n
talking to the driver! Mount them securely on the chassis. Connect them to the L298N  \\\n
module using the jumper wires, following the wiring diagram like a treasure map. Remember,  \\\n
correct connections are key to smooth sailing (or should we say, driving?). Bling it up  \\\n
with dazzling LEDs:</p><br><p>       Let your creativity shine! Place the NeoPixel LEDs on  \\\n
the front, back, and bottom of your car. Connect them to the Arduino, following the  \\\n
color-coded guide. Soon, your robot will be a beacon of programmable light! Code the  \\\n
commands, unlock the moves:</p><br><p>       The Arduino code is the secret sauce that brings  \\\n
your car to life. It translates the Bluetooth commands from your phone into actions for  \\\n
the motors and LEDs. The provided code is a great starting point, but feel free to  \\\n
experiment and add your own personal touch!  \\\n
</p></div>`,

  `<div><p>The ultrasonic sensor is a device that can measure distances using sound waves . It works  \\\n
in a similar way than bats and dolphins - by emitting sound waves and listening them bound  \\\n
back </p><br><img  \\\n
src="https://projects.arduinocontent.cc/cc7047f6-2bbf-43ed-87e9-76b07f4522e8.jpg"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/8ab8bfd4-b0b9-42e1-9309-4f2a734ad439.jpg"></img><br><p>The  \\\n
sensor consists of two primary components: a transmitter and a receiver . The transmitter  \\\n
is responsible for emitting a high-frequency sound. In essence, ultrasonic refers to  \\\n
frequencies beyond the range of the human hearing - so something higher than 20kHz.  \\\n
</p><br><p>When the sound wave hits an object, it bounces back like echo. This returning wave  \\\n
is detected by the receiver. The sensor will use the micro-controller (Arduino) internal  \\\n
clock to find out how much it took for the sound to bounce back. This small clock turns on  \\\n
when a high-frequency wave is emitted and turns off when its echo is detected.  \\\n
</p><br><p>Using code, we can write a program that will store the timing between those two  \\\n
events into a variable. Then, we can use this information to calculate the distance  \\\n
between the sensor and the object. </p><br><p>You may be thinking: how can we find the  \\\n
distance if all we know is the timing? </p><br><p>Well, as you know, velocity is distance  \\\n
divided by time. Based on this equation, if we multiply the velocity by the time, we'll  \\\n
find the distance . I told you the sensor emits sound waves, so the velocity we need is  \\\n
the speed of sound in air (340 m/s). </p><br><p>Velocity = Distance / Time <br>Distance =  \\\n
Velocity * Time </p><br><p>But if we multiply this speed with the timing we found, we'll  \\\n
discover a value that's twice the real distance. That's happens because the sound hit the  \\\n
object and came back, in other words, it traveled the same path twice. Then to find the  \\\n
real distance, multiply the speed of sound with the timing and divide the result by two.  \\\n
</p><br><p>Distance = (Velocity * Time) / 2 </p><br><img  \\\n
src="https://projects.arduinocontent.cc/328c3323-cf29-434e-baf4-4c5b60eb5216.png"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/328c3323-cf29-434e-baf4-4c5b60eb5216.png"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/50ba2ab9-a2a5-4649-b4d1-553464059068.png"></img><br><p>In  \\\n
this article, I will show you how to build an alarm system using Arduino and the  \\\n
ultrasonic sensor. If you don't have all components or would like to test before  \\\n
assembling anything, I created a simulation of this alarm system on Tinkercad.  \\\n
</p><br><p>Moving on, for this project, you'll need: an Arduino board, a breadboard, a bunch  \\\n
of jumper wires, a buzzer,and an ultrasonic sensor. </p><br><p>Assembly</p><br><p>Firstly,  \\\n
attach the ultrasonic sensor and the buzzer on the breadboard. Then connect the VCC and  \\\n
GND pins on Arduino 5V and ground ports. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/5d9e9e7a-35dc-47be-91c5-7f2503be7949.jpg"></img><br><p>After  \\\n
that connect the trigger pin to port 9, the echo pin to port 10, and the buzzer to port 8.  \\\n
Also attach the buzzer GND to Arduino GND. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/5d823b9b-7ca8-453f-846a-65d58515efce.jpg"></img><br><p>At  \\\n
the end, upload the alarm-system-arduino.ino file that I provided on this article, and now  \\\n
our alarm system is finished. </p><br><p>Code explanation</p><br><p>At first, we defined the  \\\n
constants and variables we'll need. Then, at the setup function, we configured some  \\\n
important aspects of the code - like defining the echo pin as INPUT and the trigger and  \\\n
buzzer pins as OUTPUT. We also started the serial communication - and it'll be important  \\\n
to visualize the distances being measured. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/96e0a1f3-94ba-4045-a270-a0fb390afa0d.png"></img><br><p>At  \\\n
the end, there's the loop function. It starts by turning off the emitter and then  \\\n
activating it for 10 milliseconds before turning it off again. This piece of code will  \\\n
generate the wave sound that will be bounced back by the near objects.</p><br><p>At line 28  \\\n
we find how much time the sensor took to detect the echo. This information is crucial for  \\\n
calculating the distance at line 29. In this case, we found the distance in centimeters.  \\\n
After that, from lines 30 to 35 we print the distance. </p><br><p>The last part of the code  \\\n
is an if-statement that turns on the buzzer when the object is at 50 centimeters or closer  \\\n
from the sensor. In case this statement is false, the buzzer turns down. </p></div>`,

  `<div><p>This project is for a school code quest. I have seen many projects with soil moisture  \\\n
sensors, but all of them included expensive and complicated materials such as LCD screens  \\\n
or automatic watering systems. I took it as a challenge to create an incredibly cheap and  \\\n
simple Soil Moisture Sensor. The project is designed for people that might not know when  \\\n
to water their plants or water them too much or too little. The Soil Moisture Sensor  \\\n
distinguishes how wet the soil is, and identifies when the soil should be watered for you.  \\\n
This design only includes a soil moisture sensor, a couple of LEDs and a buzzer. The LEDs  \\\n
constantly show the moisture level (Red - 0-30%, Yellow - 30-60% and green 60%+ switch on  \\\n
at those levels of moisture), and when the moisture level falls below 10%, the buzzer  \\\n
starts beeping. I designed this for a Port Jackson Ficus Bonsai, and have tested this  \\\n
extensively. The percentages I'm using works perfectly for me but might change depending  \\\n
on your plant. If you feel like the red light switches on way too late, when the soil is  \\\n
already too dry, you can change the Red percentage to 0-50% and Yellow to 50-80%, because  \\\n
that seems to also be working well. </p><br><p>How it works: </p><br><p>It works, when  \\\n
electrical currents are sent through the legs of the moisture sensor. The sensor then  \\\n
calculates the resistance it's getting. Since water conducts electricity - the wetter the  \\\n
soil is, the less resistance there should be. It's then connected to an Analog Pin and the  \\\n
Arduino can use that for the program. </p><br><p>The Soil Moisture Sensor needs to know the  \\\n
maximum moisture that the soil can reach, so we can calculate the percentages. This is  \\\n
called calibration. The sensor calibrates right when the circuit is switched on, in the  \\\n
Setup() function. Therefore, it should already be in freshly watered soil, when it is  \\\n
switched on. </p><br><p>Here are some photos of the circuit without the casing: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/bb269a1e-9020-4253-8e6d-a38f7fd4298d.JPG"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/353ed111-13e9-476c-9417-12ed55022db5.JPG"></img></p><br><p><img  \\\n
src="https://projects.arduinocontent.cc/82d28236-fed8-454e-af83-fc25fc94a1c5.JPG"></img><br><p>The  \\\n
soil moisture sensor I used has a screwable pin terminal, so no soldering is required. The  \\\n
most popular one sensor is the SparkFun moisture sensor and requires soldering. So I got  \\\n
one, that doesn't need soldering and can just have Male to Male wires screwed in, here .  \\\n
Casing: </p><br><p>The casing is a simple box, with the LEDs coming out of the top, and the  \\\n
buzzer on the side. The Soil Moisture Sensor comes out of the side with wires and is stuck  \\\n
into the soil, so it's relatively far from all the water-sensitive components. </p></div>`,

  `<div><p>I needed to turn on and off some AC units located in a remote house, so that I can  \\\n
pre-cool (or pre-heat) the rooms in advance before I go. </p><br><p>Such units are very  \\\n
common appliances by Daikin, which provides WiFi capability on newer models but that's not  \\\n
something available on mine. The solution was easy: I just had to simulate an infrared  \\\n
remote controller with Arduino, place it close to the AC unit and control it remotely. For  \\\n
this, I chose the ATOM Lite by M5Stack . It is very compact, comes with its little  \\\n
enclosure, and includes an IR emitter as well as a physical button  . The only drawback is  \\\n
that the emitter is not very powerful and the hole in the enclosure is very little, so it  \\\n
can't be placed much far away from the unit. In the end, I just used some bi-adhesive tape  \\\n
and a USB cable: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/87de5418-a5e8-43f6-9b42-0e000329fd22.jpg"></img><br><p>As  \\\n
an alternative to using this M5Stack board, you can use any Arduino board (such as a Nano  \\\n
or a MKR) and connect an infrared LED to its pins. You'll find hundreds of tutorials out  \\\n
there. Software<br>On the software side, I used the fantastic arduino-heatpumpir library  \\\n
to generate the infrared signals. There are many libraries for that purpose, but this one  \\\n
worked great and it supports a large number of AC manufacturers with the same code  \\\n
instructions. </p><br><p>So, if you have a Daikin AC like mine you can use my code below  \\\n
without changes. If you have another brand, follow these steps: </p><br><p>1. Find the name  \\\n
of the .h file related to your AC model. In my case, that's DaikinHeatpumpIR.h .  \\\n
</p><br><p>2. Replace DaikinHeatpumpIR.h and DaikinHeatpumpIR in my code with the name you  \\\n
found. </p><br><p>That's it! If you're lucky enough, you won't need to change other things.  \\\n
</p><br><p>The code I wrote supports heat/cool/dry modes as well as temperature  \\\n
configuration. It doesn't let you configure fan speed or other parameters, but it's very  \\\n
simple to tweak to expose more parameters. In addition, it detects the pressure of the  \\\n
physical button on the board so that you can use it to test easily if the IR signals are  \\\n
read by the AC unit. Remote control</p><br><p>Last but not least, I used the Arduino IoT  \\\n
Cloud to build a simple graphic interface to send commands remotely. To do this, follow  \\\n
these steps: </p><br><p>1. Open Arduino IoT Cloud and create a free account if you don't have  \\\n
one. </p><br><p>2. Create a device and select "M5Stack-ATOM" as the model. Make sure you save  \\\n
the secret key returned at the end of the device creation procedure. The interface is  \\\n
pretty straightforward, but you might want to follow the more detailed steps explained in  \\\n
the official documentation.  \\\n
<br>https://docs.arduino.cc/arduino-cloud/getting-started/esp-32-cloud3. Create a thing  \\\n
and configure WiFi credentials for it. </p><br><p>4. Configure two variables in the thing:  \\\n
<br>a string variable called mode an integer variable called temperature </p><br><p>5. Copy  \\\n
the sketch code in the "Sketch" tab and upload it to the board. </p><br><p>6. Create a  \\\n
dashboard like this: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/5d147029-cc54-4c89-8060-d6c4b3964cb4.png"></img><br><p>That's  \\\n
it. Enjoy! ❄️ <br>Over-the-air updates</p><br><p>In case you want to modify the code after  \\\n
the board is installed, don't worry about physically removing it. Thanks to Arduino IoT  \\\n
Cloud you can just edit the code from your browser, and with one click you'll be able to  \\\n
upload it to the board over WiFi (and even remotely). </p><br><p>Optional: closing the  \\\n
loop</p><br><p>When controlling remote things, it is always a good idea to put some sensors  \\\n
to get feedback to make sure that your commands are correctly executed. In our case, I can  \\\n
imagine a very simple failure: the bi-adhesive tape falls apart, and you can't turn on (or  \\\n
worse, you can't turn off) your AC unit anymore. <br>So I recommend adding a simple  \\\n
temperature/humidity sensor in the room to see if your AC unit is doing what expected.  \\\n
There are many solutions; a very simple one is described in this  \\\n
tutorial<br>https://docs.arduino.cc/arduino-cloud/tutorials/cloud-environmental-data  \\\n
<br>and can be done with a MKR WiFi 1010 board, a MKR ENV Shield, and IoT Cloud. </p></div>`,

  `<div><p>This project is made for Arduino beginners who are looking to learn how to interface  \\\n
an RGB led with the Arduino Uno and use a push button to control the LED. Also, we will  \\\n
understand the Common Anode (CA) and Common Cathode (CC) concept as well as the pulse  \\\n
width modulation (PWM) signals. </p><br><p>RGB LED Types and Structure </p><br><p>RGB LEDs have  \\\n
three LEDs inside them and usually, these three internal LEDs share either a common anode  \\\n
or a common cathode especially in a through-hole package. So basically, we can categorize  \\\n
RGB LEDs as either common anode or common cathode type just like in seven segment  \\\n
displays. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png"></img><br><p>Common  \\\n
Anode </p><br><p>In a common anode RGB LED, the anode of the internal LEDs are all connected  \\\n
to the external anode lead. To control each color, you need to apply a LOW signal or  \\\n
ground to the red, green, and blue leads and connect the anode lead to the positive  \\\n
terminal of the power supply. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png"></img><br><p>Common  \\\n
Cathode </p><br><p>In a common cathode RGB LED, the cathode of the internal LEDs are all  \\\n
connected to the external cathode lead. To control each color, you need to apply a HIGH  \\\n
signal or VCC to the red, green, and blue leads and connect the anode lead to the negative  \\\n
terminal of the power supply. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png"></img><br><p>Basics  \\\n
of PWM (Pulse Width Modulation) </p><br><p>Pulse Width Modulation, or PWM, is a technique for  \\\n
getting analog results with digital means. Digital control is used to create a square  \\\n
wave, a signal switched between on and off. This on-off pattern can simulate voltages in  \\\n
between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0  \\\n
Volts) by changing the portion of the time the signal spends on versus the time that the  \\\n
signal spends off. The duration of "on time" is called the pulse width. To get varying  \\\n
analog values, you change, or modulate, that pulse width. If you repeat this on-off  \\\n
pattern fast enough with an LED for example, the result is as if the signal is a steady  \\\n
voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below,  \\\n
the green lines represent a regular time period. This duration or period is the inverse of  \\\n
the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green  \\\n
lines would measure 2 milliseconds each. </p><br><img  \\\n
src="https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif"></img><br><p>  \\\n
Explanation of the Changes from the Original Version of this Project:</p><br><p>Button  \\\n
Input:</p><br><p>A button is connected to pin 2 of the Arduino, and it is configured with an  \\\n
internal pull-up resistor (INPUT_PULLUP mode). This means that when the button is not  \\\n
pressed, the pin reads HIGH, and when pressed, it reads LOW.<br>Color Change  \\\n
Logic:</p><br><p>Each time the button is pressed, the colorIndex variable is incremented,  \\\n
cycling through six different colors. After the last color, the index resets to  \\\n
zero.<br>Debouncing:</p><br><p>A small delay (delay(300)) is added after each button press to  \\\n
debounce the button, preventing multiple triggers from a single press.</p><br><p>This  \\\n
modification allows the RGB LED to change colors each time the button is pressed,  \\\n
providing interactive control over the LED.</p><br><p>Below is the schematic for my version  \\\n
of the project</p><br><img  \\\n
src="https://hackster.imgix.net/uploads/attachments/340746/button_push_color_change_UM2JWnHSDv.JPG"></img><br><p>The  \\\n
code below will allow you to cycle the LED through different colors by pushing a button,  \\\n
enjoy!</p></div>`,

  `<div><p>To modify the origional project created by dleibe1 and include an OLED display that shows  \\\n
the temperature and humidity, you can follow the steps below.  Ever wanted to know the  \\\n
temperature and humidity around you? If yes, this project will be very helpful for you. If  \\\n
no, it'll be cool anyway. What I mean is, you can use this in anything from home  \\\n
automations to smart watches. </p><br><p>What is humidity?</p><br><p>Humidity is the water vapor  \\\n
around you mixed with air. It is measured in per cents. So, if the humidity is 60 per  \\\n
cent(which is the average humidity), then 60 per cent of the air around you is water  \\\n
vapor. If it is 100%, then it means either the sensor is not correct, the sensor is  \\\n
broken/damaged, the Arduino crashed, the Arduino can't receive any signal, there's an  \\\n
error in the code or you're underwater *. If it's 0%, it means all the reasons above  \\\n
except the last one, you're in space or you're in the middle of a desert**. </p><br><p>*  \\\n
Correction: it means the air cannot hold any more water. </p><br><p>**  The air in a desert  \\\n
does contain some water but it is a very little amount compared to a normal place. The  \\\n
Sahara Desert has a mean humidity of 25%. </p><br><p>The world's lowest recorded relative  \\\n
humidity value occurred at Coober Pedy in the South Australia desert when the temperature  \\\n
was 93 degrees and the dew point was minus 21 degrees producing a relative humidity of 1  \\\n
percent. (source:  'www.chicagotribune.com') </p><br><p>Is your sensor different?</p><br><p>My  \\\n
sensor is like this: </p><br><img  \\\n
src="https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg"></img><br><p>My  \\\n
sensor has 3 pins and it's fitted on a board. If yours has 4 pins, then you need to build  \\\n
this circuit: </p><br><img  \\\n
src="https://i.imgur.com/6sNtuUL.png"></img><br><p>If  \\\n
it is same as mine, then follow this diagram instead, you will no longer need the resistor:</p><br><img  \\\n
src="https://i.imgur.com/xdSSgkL.png"></img><br><p></p><br><p>Details about the code</p><br><p>You need to follow these instructions to  \\\n
make it work: <br>1. You need to add the dht11, Adafruit_GFX, and Adafruit_SSD1306 libraries  \\\n
to the Arduino IDE and include them in your sketch. <br>2. Upload the  \\\n
code. <br>3. When the code is uploaded, you will see the humidity and temperature on the OLED display.</p></div>`,
]

export default projectInstructionsSeedData

const newInstructions = []

projectInstructionsSeedData.forEach((projectInstructionsString, i) => {
  const projectInstructionsArray = projectInstructionsString.split("</img><br>")

  projectInstructionsArray.forEach((projectInstruction, j) => {
    if (j === projectInstructionsArray.length - 1) {
      newInstructions.push({ projectId: i + 1, instructionHTML: `\`<div>${projectInstruction}\`` })
    } else if (j == 0) {
      newInstructions.push({ projectId: i + 1, instructionHTML: `\`${projectInstruction}</div>\`` })
    } else {
      newInstructions.push({
        projectId: i + 1,
        instructionHTML: `\`<div>${projectInstruction}</div>\``
      })
    }
  })
})

let outputString = ""
newInstructions.forEach((instruction, index) => {
  outputString += `{
projectId: ${instruction.projectId},
instructionHTML: ${instruction.instructionHTML}
},
`
})

const cleaned = outputString.split("\n").filter(line => line.trim() !== "").join("\n")


fs.writeFileSync("output.txt", cleaned)
