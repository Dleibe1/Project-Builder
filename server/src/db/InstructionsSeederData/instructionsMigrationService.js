const oldInstructionsTableData = [
	{
		projectId: 1,
		instructionText: `This project is made for Arduino beginners who are looking for learning how to interface the RGB led with the Arduino Uno. Also, we will understand the Common Anode (CA) and Common Cathode (CC) concept as well as the pulse width modulation (PWM) signals.<br><br>RGB LED Types and Structure<br><br>RGB LEDs have three LEDs inside them and usually, these three internal LEDs share either a common anode or a common cathode especially in a through-hole package. So basically, we can categorize RGB LEDs as either common anode or common cathode type just like in seven segment displays. `,
	},
	{
		projectId: 1,
		imageURL: `https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png`,
	},
	{
		projectId: 1,
		instructionText: `Common Anode<br><br>In a common anode RGB LED, the anode of the internal LEDs are all connected to the external anode lead. To control each color, you need to apply a LOW signal or ground to the red, green, and blue leads and connect the anode lead to the positive terminal of the power supply. `,
	},
	{
		projectId: 1,
		imageURL: `https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png`,
	},
	{
		projectId: 1,
		instructionText: `Common Cathode<br><br>In a common cathode RGB LED, the cathode of the internal LEDs are all connected to the external cathode lead. To control each color, you need to apply a HIGH signal or VCC to the red, green, and blue leads and connect the anode lead to the negative terminal of the power supply. `,
	},
	{
		projectId: 1,
		imageURL: `https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png`,
	},
	{
		projectId: 1,
		instructionText: `Basics of PWM (Pulse Width Modulation)<br><br>Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means. Digital control is used to create a square wave, a signal switched between on and off. This on-off pattern can simulate voltages in between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0 Volts) by changing the portion of the time the signal spends on versus the time that the signal spends off. The duration of "on time" is called the pulse width. To get varying analog values, you change, or modulate, that pulse width. If you repeat this on-off pattern fast enough with an LED for example, the result is as if the signal is a steady voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below, the green lines represent a regular time period. This duration or period is the inverse of the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green lines would measure 2 milliseconds each. `,
	},
	{
		projectId: 1,
		imageURL: `https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif`,
	},
	{
		projectId: 14,
		instructionText: `The two eyes are painted on two ping-pong balls which are sticked on two servo motors. Two ultrasonic sensors measure the object's position. An Arduino Nano Every board reads the measurements from the ultrasonic sensors and controls the sevo motors accordingly.<br><br>The servo motors are SG90 micro servos and the ultrasonic sensors are HC-SR04. These are very common and very inexpensive devices. The Arduino board may be of another model than the nano Every, provided that 5V is available to power the servo motors and the ultrasonic sensors. `,
	},
	{
		projectId: 14,
		imageURL: `https://projects.arduinocontent.cc/781dcb46-650d-4a7d-9177-5f7e4ee1ee1b.jpg`,
	},
	{
		projectId: 14,
		instructionText: `The servo motors and ultrasonic sensors are sticked on a plate according to the arrangement shown on the following plan: `,
	},
	{
		projectId: 14,
		imageURL:
			"https://projects.arduinocontent.cc/e0fd7c1d-3a35-474b-b284-60a1b0a110d3.jpg",
	},
	{
		projectId: 14,
		instructionText: `The position of the X ultrasonic sensor can be different, for example to follow larger objects. In this case, the constants A and B must be adjusted in the software to reflect the actual position of the X ultrasonic sensor. These two values must be less than 200 cm.<br><br>The connections to be made are as follows:<br><br>The grounds of the servo motors and of the ultrasonic sensors must be connected to the ground of the Arduino board and their power supplies to +5V.<br><br>The trigger input of the X ultrasonic sensor is connected to digital input/output 2 and its echo output to digital input/output 3.<br><br>The trigger input of the Y ultrasonic sensor is connected to digital input/output 5 and its echo output to digital input/output 6.<br><br>The left and right servomotors controls are connected to digital inputs/outputs 8 and 10 respectively. Left and right refer to Big Brother's eyes, his left eye is on your own right.<br><br>The following diagram shows the connections to be made:`,
	},
	{
		projectId: 14,
		instructionText: `Software<br><br>The software is extremely simple, less than 70 lines. No library is required.<br><br>Have fun. `,
	},
	{
		projectId: 15,
		instructionText: `Gather your tools and troops (components, that is)<br><br>The brains: An Arduino Uno, the mastermind behind the magic.<br>The translator: An HC05 Bluetooth module, your car's interpreter for smartphone commands.<br>The muscle: L298N motor driver, the beefy guy controlling those zippy wheels.<br>The bling: NeoPixel LEDs, because who doesn't love a car with dazzling lights?<br>The base: Perfboard and Sunboard, the sturdy foundation for your creation.<br>The connections: Jumper wires, the colorful threads that bring everything together.<br>The fuel: A battery, to keep your robot rolling (safely, of course!). `,
	},
	{
		projectId: 15,
		imageURL:
			"https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
	},
	{
		projectId: 15,
		instructionText: `Craft the chassis, the car's core:<br><br>       Imagine your robot's frame. Sunboard is your friend here! Cut precise pieces based on the guide (remember, measuring twice cuts once!). Assemble them like a mini puzzle, creating a strong and stable base for your future masterpiece. `,
	},
	{
		projectId: 15,
		instructionText: `Motor magic, let the wheels spin:<br><br>       Time to get those motors talking to the driver! Mount them securely on the chassis. Connect them to the L298N module using the jumper wires, following the wiring diagram like a treasure map. Remember, correct connections are key to smooth sailing (or should we say, driving?). `,
	},
	{
		projectId: 15,
		instructionText: `Bling it up with dazzling LEDs:<br><br>       Let your creativity shine! Place the NeoPixel LEDs on the front, back, and bottom of your car. Connect them to the Arduino, following the color-coded guide. Soon, your robot will be a beacon of programmable light! `,
	},
	{
		projectId: 15,
		instructionText: `Code the commands, unlock the moves:<br><br>       The Arduino code is the secret sauce that brings your car to life. It translates the Bluetooth commands from your phone into actions for the motors and LEDs. The provided code is a great starting point, but feel free to experiment and add your own personal touch! `,
	},
	{
		projectId: 15,
		instructionText:
			"https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png",
	},
	{
		projectId: 3,
		instructionText: `Water deposit<br><br>For our watering system, we will need a water container. Any common and standard items suitable for water storage can be used as a deposit. The larger the storage container, the less frequent the need for recharging. `,
	},
	{
		projectId: 3,
		imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle.png",
	},
	{
		projectId: 3,
		instructionText: `We've selected the bottle shown on the image as our water reservoir. With a capacity of 1.5 liters, it should be sufficient for watering a medium-sized plant for several days.<br><br>For the water pump to effectively move water from the bottom of the bottle to the plant, it must be placed inside. To accomplish this, we place the pump inside the bottle, and then we pull out the wires. This involves creating a small opening at the base of the bottle solely for the wires, enabling us to thread them out and connect the pump to our plant care station. To conclude the process, we use waterproof silicone to seal the opening, ensuring there is no water loss. `,
	},
	{
		projectId: 3,
		imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottom.png",
	},
	{
		projectId: 3,
		instructionText: `On the opposite end, there will be a water pipe directly connecting to the plant to provide hydration.<br><br>Water pump wiring<br><br>To facilitate the connection of the pump wires with the main system, we've used a barrel plug. The junction between the pump wires and the connector wires is shielded by heat shrink wraps, providing effective insulation from external elements. `,
	},
	{
		projectId: 3,
		imageURL:
			"https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png",
	},
	{
		projectId: 3,
		instructionText: `This approach ensures a secure and well-insulated connection, contributing to the overall reliability of the system.<br>Plants care station<br><br>The plants care station takes on the responsibility of processing available information, making decisions, and controlling the activation and deactivation of the watering system. Designed for both indoor and outdoor use, it hides all wiring and functions as a discreet black box. This is achieved by enclosing all system components within the box illustrated below. `,
	},
	{
		projectId: 3,
		imageURL: "https://www.hibit.dev/images/posts/2024/watering_box.png",
	},
	{
		projectId: 3,
		instructionText: `The box is easily accessible, facilitating the replacement of components or even reprogramming of the system when necessary. Within the plants care station, the central orchestrator is the Arduino Nano, functioning as the main brain to coordinate all other components. Accompanying this, a DS1302 module is integrated to manage real-time control, influencing watering decisions. It considers optimal watering times, favoring mornings and evenings when sunlight is less intense, promoting better absorption and utilization of water by the plants. This thoughtful scheduling enhances the overall efficiency and well-being of the plants.<br><br>Power supply<br><br>For the entire system, a 9V battery serves as the power supply. It separately powers both the Arduino and the water pump. Considering that our water pump operates on 5V, we require a voltage transformer. For this purpose, we have used the AMS117 module.<br>In contrast, the DS1302 operates on a separate CR2032 battery, ensuring a dedicated power source to sustain the Real-Time Clock (RTC) functionality. This dual-power configuration enhances the efficiency and autonomy of each component, ensuring the overall reliability of the system.<br><Control elements<br><br>The plants care station comes equipped with some handy controls like LEDs, buttons, and a potentiometer to enhance its overall functionality. A straightforward on/off switch simplifies the activation of the station. When manual watering is needed, a dedicated push button is readily available. Additionally, the potentiometer allows for accurate adjustment of the water amount during automatic mode. `,
	},
	{
		projectId: 3,
		imageURL: "https://www.hibit.dev/images/posts/2024/watering_station.png",
	},
	{
		projectId: 3,
		instructionText: `These user-friendly controls provide a precise and efficient means of managing your plant care routine.<br><br>Wiring schema<br><br>Creating a precise wiring schema is essential for the optimal performance of the automatic watering system. This schema serves as a practical guide, interconnecting main components. Methodically organizing and routing the wires prevents potential confusion during the assembly process. Clarity in both assembly and troubleshooting phases is achieved through the implementation of color-coded distinctions and strictly following specified pin configurations for facilitating the communication between modules. `,
	},
	{
		projectId: 3,
		imageURL: `https://www.hibit.dev/images/posts/2024/schemas/watering_system.png`,
	},
	{
		projectId: 3,
		instructionText: `The above wiring schema offers a comprehensive overview of the system wiring and connections.<br><br>Calculating base resistor value<br><br>In order to compute the base resistor (RB), we must first determine the collector current. Given that the circuit's sole load is the water pump, it can be deduced that the collector current is identical to that of the water pump. Based on the water pump specification, we know that IC = 200 mA, or for practical purposes, IC = 0.2 A. This forms the basis for our calculations.<br>It is important to note that if we exceed the parameters for which the transistor was designed, it will eventually burn out. With this in mind, we will proceed to identify the transistor's gain from the datasheet. We observe that when IC = 200 mA, its gain is 100. We have now discovered our second value: 𝛽 = 100.<br><br>Once we've established the gain, our next step is to calculate the base current. It's important to recognize that the collector current is directly proportional to the base current and the gain. This relationship can be expressed mathematically as:<br><br>hFe = 𝛽 (gain) = Ic / Ib<br>Replacing the values, we acquire our third parameter: Ib = 2mA = 0.002A. Now, we can compute Rb value using Ohm's formula:<br>Vb = VS - VBE = Ib * Rb<br>Rb = (VS - VBE) / Ib<br>Where VS is the source voltage, and VBE is the voltage drop across the base-emitter junction of the transistor. In our circuit, the transistor's base is connected to an output from an Arduino. An Arduino output provides a maximum of 5V and 40mA. Therefore, we have a source voltage of 5V, and the transistor's barrier potential is 0.6V.<br>Rb = (5V - 0.6V) / 2mA = 2.2kΩ<br><br>For our circuit, the suitable value for the base resistor should be equal or below 2.2K ohms. We choose the lower standardized resistor and check by looking at the datasheet curves that the base voltage is sufficient to drive the transistor into saturation.<br><br>Automated plants watering system<br><br>After going through rounds of mounting and wiring adjustments, we're excited to introduce our initial prototype of the automatic watering system. Check out the results and get a general overview of the system in the attached image below. We're really looking forward to seeing how well it takes care of the plants and are ready to make it even better by identifying areas for improvement. `,
	},

	{
		projectId: 3,
		imageURL: `https://www.hibit.dev/images/posts/2024/watering_system_result.png`,
	},
	{
		projectId: 3,
		instructionText: `The internal components of the plant care station neatly fit into the box, presenting a clean and user-friendly appearance. The next step involves experimenting and testing the system over some time to identify any weaknesses and enhance its performance. Additionally, we aim to minimize its size and simplify the wiring, making maintenance more straightforward.<br><br>Having outlined the concept of automated watering and successfully assembled the physical components, our attention now turns to the real wizardry - the code. This article explores the intricate lines of Arduino code that transform theory into reality, breathing life into our DIY plant care project. As we step into the heart of our automated watering system, let's unravel the details that make our green vision a reality.<br><br>Install library for DS1302<br><br>To interact with the DS1302 sensor, we will use an existing library. This library, provides an interface that facilitates communication with the module, saving you significant time and providing a reliable and extensively tested code base. It can be downloaded from our official repository https://github.com/hibit-dev/ds1302/raw/master/lib/DS1302.zip<br><br>To import a library, open the Arduino IDE, go to Sketch > Include Library > Add .ZIP Library and select the library file downloaded from our GitHub repository .`,
	},
	{
		projectId: 3,
		imageURL:
			"https://www.hibit.dev/images/posts/2023/arduino_import_library.png",
	},
	{
		projectId: 3,
		instructionText: `Then you can simply use include statement:<br>#include "virtuabotixRTC.h"<br>It will include the library with predefined functions to interact with the module.<br><br>Arduino code<br><br>This Arduino code forms the backbone of our automated watering system, translating the idea of plant watering into a functional reality. At its core, this code interfaces with a real-time clock, ensuring our system is attuned to the rhythm of the day. Constants define the timeframes for morning and evening watering sessions, while designated pins for LEDs, buttons, and a potentiometer facilitate the communication among physical components.<br>In the setup phase, the code initializes pins and stages a brief, illuminating sequence with LEDs, symbolizing the system's awakening. As the main loop takes the stage, it constantly monitors the real-time clock and user inputs. The code continuously checks the time and conditions to trigger morning and evening watering cycles, while also providing a manual watering option through the push button. The iteration transpires every 5 seconds, ensuring a vigilant and responsive approach to the needs of plant care.s. Note that the push button triggers manual watering when pressed, adding a layer of user interactivity. Due to the 5000ms delay in the loop function, there might be a delay between pressing the button and the corresponding action. Nevertheless, when the process initiates, the green LED will illuminate.<br><br>The potentiometer values manage the water supply to the plant. The code calculates the pump's operational time based on the potentiometer's position. To ensure control and efficiency, we've established limits, where the minimum potentiometer value corresponds to a pump duration of 0 seconds, and the maximum allows up to 10 seconds. These settings remain easily customizable through designated constants.<br><br>It's worth mentioning that we've opted to disable the morning watering for our plant, choosing to automate the process exclusively in the evenings. Additionally, while the switch button currently lacks a specific assignment, it stands ready for future functionalities.<br><br>The presented Arduino code serves as the operational heart of our automated watering system, consistently monitoring real-time data and user inputs. Its key role is to activate morning and evening watering cycles, currently programmed for 8 in the morning and 20 in the evening, with customizable constants. The iterative loop ensures the system remains alert and responsive to the unique needs of plant care. The entire code is highly customizable through constants, enabling effortless adjustments to the configuration of the plant care station's operation.<br><br>Please be aware that the provided code snippet includes only the main segment.<br><br>Conclusion<br><br>In the spirit of self-made solutions, this project encourages to approach the process of building, learning, and adapting. The DS1302 timekeeping module and Arduino-compatible pumps play crucial roles in this process, with each component contributing to the synergy between technology and the natural world. The true essence of this project lies not just in the finished product but in the transformative experience of crafting a technological solution for the well-being of your plants, wherever they may be.<br><br>In wrapping up our journey through the practical implementation of an Arduino-powered automatic watering system, you've navigated the intricacies of physical mounting, sensor integration, and module connections. What started as abstract concepts has materialized into a self-built, technology-infused plant care solution.`,
	},
	{
		projectId: 4,
		instructionText:
			"The spectrum analyzer displays the amplitude of signals as a function of frequency, allowing engineers and technicians to visualize and analyze signal characteristics. In particular, the audio analyzer performs a visual presentation of an acoustic signal in the frequency domain, where the frequency of the signal is displayed on the x-axis, while the amplitude of a certain frequency is displayed on the y-axis. In several of my previous videos I have presented several different types of such devices, but this time the FHT Arduino library is used for the first time. This library is several times faster than the commonly used FFT library, but at the expense of speed certain loss of resolution and precision appear at the two ends of the audio range. ",
	},
	{
		projectId: 4,
		imageURL:
			"https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg",
	},
	{
		projectId: 4,
		instructionText: `The device is really simple to build, and consists of only a few components:<br>- Arduino Nano MCU board,<br>- 8x64 color Led Matrix with WS2812B adressable leds<br>- Two (three) touch buttons<br>- three resistors<br>- and one capacitor`,
	},
	{
		projectId: 4,
		instructionText: `Now let's see how the device works in real conditions<br>Considering that it is very simple, the device works immediately without any previous settings. One button is used to adjust the LED light intensity in 7 steps. With the other button we move through 6 different mods with specific color sets, and we can also add more, with very small modifications to the code.`,
	},
	{
		projectId: 4,
		imageURL: `https://projects.arduinocontent.cc/e5bffdf1-c174-47b2-aaeb-0edf30fec098.jpg`,
	},
	{
		projectId: 4,
		instructionText: `Next, let's test the frequency range that this analyzer covers. For this purpose we will use a simple online tone generator. As you can see, the device covers the entire hearing range, from 20 Hertz to 20 kilohertz. Such a large-range device is excellent when is used for visual FFT analysis, but has one practical drawback when it comes to presenting musical materials. `,
	},
	{
		projectId: 4,
		imageURL: `https://projects.arduinocontent.cc/68e9de6f-5336-42bc-be80-c50441f2808b.jpg`,
	},
	{
		projectId: 4,
		instructionText: `Namely, a large percentage (perhaps 90%) of this music signal is in the range up to 10Khz, and only a small part belongs to higher frequencies. This would practically mean that for the entire time that the music signal is being emitted, the far right part of the analyzer would be inactive. Let's see how it looks in practice (Here is an example with a speech signal, so we will try it with musical material as well). Since, as I mentioned at the beginning, this is a visual decorative addition, and not a precise measuring instrument, it is desirable to reduce the bandwidth by half, actually to 10 Kilohertz.<br><br>For this case I made some modification in the code, but it is also desirable to set a simple Low-pass filter on the input. Let's test the range with an online tone generator at the input. The range is up to 10Khz. `,
	},
	{
		projectId: 4,
		imageURL: `https://projects.arduinocontent.cc/c3d1c115-d49f-4b94-9b96-13111be626e6.jpg`,
	},
	{
		projectId: 4,
		instructionText: `Now, in this case the matrix is completely filled and visually it looks much better.<br><br>As for the external appearance of the device, I tried to make a simple, but still functional version made of PVC board and glass with a thickness of 4 mm.<br><br>And finally a short conclusion.<br><br>This is an extremely simple project intended for beginners, but still visually very effective and can serve as a gadget on your desktop, or as an addition to an audio device. It can also be used as a simple school FFT spectrum analyzer instrument intended for educational purposes `,
	},
	{
		projectId: 5,
		instructionText: `In the vast realm of robotics, enthusiasts are venturing into the exciting world of OLED eye animations for Arduino robots. If you've found yourself lost in the maze of online searches, fear not! We've done the legwork and distilled the top five methods for creating captivating eye animations into a clear and fun comparison.<br><br>Introducing our selections:<br><br>Option 1: Eye Animation on OLED Display by Intellar `,
	},
	{
		projectId: 5,
		imageURL:
			"https://projects.arduinocontent.cc/414272c9-2c90-4576-9430-7599672fbcda.jpg",
	},
	{
		projectId: 5,
		instructionText: `Intellar's approach brings cool eye animations to life with simple functions mimicking various moods (Normal, Sleep, Smile) and versatile eye movements. Pro: Easy to use with adjustable eye positions. Con: Limited to three moods.<br><br>Option 2: Simple Animated Eye Using Arduino by SpiderMaf `,
	},
	{
		projectId: 5,
		imageURL:
			"https://projects.arduinocontent.cc/dc1bda48-7902-4555-9369-708247c04e14.jpg",
	},
	{
		projectId: 5,
		instructionText: `SpiderMaf's method features circular eyes with pupils for precise movements, adding a touch of humanity to your robot. Pro: Compact functions with customizable features. Con: Similar to Intellar's approach.<br><br>Option 3: Akno by AbdulsalamAbbod `,
	},
	{
		projectId: 5,
		imageURL:
			"https://projects.arduinocontent.cc/3f6ae98e-f7e9-40d2-8573-c242dc66d89c.jpg",
	},
	{
		projectId: 5,
		instructionText: `Akno stands out with its expressive rectangular eyes and a wide range of emotions, suitable for various display types. Pro: Supports multiple expressions. Con: Less flexible in adjusting eye size.<br><br>Option 4:  Arduino OLED Moving Eyes by Vinny `,
	},
	{
		projectId: 5,
		imageURL:
			"https://projects.arduinocontent.cc/2596309e-914d-4907-b5a0-b940e3bc6f7b.jpg",
	},
	{
		projectId: 5,
		instructionText: `Vinny's innovative technique involves rendering custom images on OLED displays, though it comes with memory constraints. Pro: External image rendering capability. Con: Memory-intensive process.<br><br>Option 5: Arduino UNO Robotic Eye Animations by Picaio `,
	},
	{
		projectId: 5,
		imageURL:
			"https://projects.arduinocontent.cc/cff99131-f7ce-4295-b530-811e057734de.jpg",
	},
	{
		projectId: 5,
		instructionText: `Picaio offers a sophisticated yet realistic approach with diverse eye movements and expressions, enhancing animation realism. Pro: Optimized technique for efficient memory usage. Con: May be challenging for beginners due to its complexity.<br><br>Whether you're a seasoned hobbyist or just starting out, these methods provide a gateway to bringing your robot's personality to life! Get ready to dive in, experiment, and unleash your creativity.<br><br>Let's animate those robotic eyes and inject some fun into your Arduino projects! 🤖👀`,
	},
	{
		projectId: 6,
		instructionText: `Greetings everyone, and welcome to my Instructables tutorial. Today, I'll guide you through the process of creating an Object Tracking 4-DOF Robotics Arm.<br>Project Overview:<br><br>In this project, the robotic arm will execute actions corresponding to the commands received from the sensors. For example, if the object moves to the left, the robotic arm will respond by moving to the left, and similarly for movements to the right, up, and down.<br><br>Without further ado, let's dive into the project and get started! `,
	},
	{
		projectId: 6,
		instructionText: `Step 1: Assemble the Robotics Arm Kit<br>https://youtu.be/TMv3JR06yuo<br>Watch the attached video for a complete step-by-step assembly of the Robotics Arm Kit.<br>Step 2: Servo Motors & PWM Servo Motor Driver Wiring `,
	},
	{
		projectId: 6,
		imageURL:
			"https://projects.arduinocontent.cc/16e51e8c-81e8-4931-be46-69505c3bacd1.jpg",
	},
	{
		projectId: 6,
		instructionText: `Refer to the attached image and connect all four servo motor wires to the PWM servo motor driver pins.<br>Figure Servo -> PWM servo pin 0<br>Right side Servo -> PWM servo pin 1<br>left side Servo -> PWM servo pin 2<br>Base Servo -> PWM servo pin 3<br><br>Step 3: PWM Servo Motor Driver & Arduino Uno Wiring`,
	},
	{
		projectId: 6,
		imageURL:
			"https://projects.arduinocontent.cc/00e1a573-4371-49bf-ba42-6884f62999ad.png",
	},
	{
		projectId: 6,
		instructionText: `Follow the Circuit Diagram:<br>PWM Servo Motor Driver  -> Arduino Uno<br>GND   ->    GND<br>SCL   ->    A4<br>SDA   ->    A5<br>VCC   ->    VIN<br><br>Step 4: Mounting the Sensors Into the Robotics Arm`,
	},
	{
		projectId: 6,
		imageURL:
			"https://projects.arduinocontent.cc/fdab1aff-be31-4855-9328-99ec1bb9e356.jpg",
	},
	{
		projectId: 6,
		instructionText: `Follow the Steps:<br>- Insert the Ultrasonic Sensor into the designated sensor case.<br>- Securely attach the sensor case to the robotics arm as illustrated in the provided image.<br>- Utilize hot glue to ensure proper mounting of the sensor case.<br>- Affix the IR sensors to the left and right sides of the sensor case using hot glue.<br><br>These are all the steps required for this process.<br><br>Step 5: Ultrasonic Sensor, IR Sensor & Arduino Uno Wiring`,
	},
	{
		projectId: 6,
		imageURL:
			"https://projects.arduinocontent.cc/db48a4f0-129b-4770-8e19-9e81f5a8c29d.png",
	},
	{
		projectId: 6,
		instructionText: `Follow the Circuit Diagram:<br><br>Ultrasonic Sensor -> Arduino Uno<br>GND -> GND ECHO -> A3 TRIG -> A2 VCC -> VIN<br><br>IR Sensor -> Arduino Uno (Right)<br>GND -> GND OUT -> A1 VCC -> VIN<br><br>IR Sensor -> Arduino Uno (left)<br>GND -> GND OUT -> A0 VCC -> VIN<br><br>Step 6: Time to Upload the Sketch`,
	},
	{
		projectId: 6,
		imageURL:
			"https://projects.arduinocontent.cc/efbbe392-9df2-476e-8470-157bd5dd834d.jpg",
	},
	{
		projectId: 6,
		instructionText: `- Now connect the USB cable to the Arduino Uno.<br>Next, upload the following code:`,
	},
	{
		projectId: 7,
		instructionText: `About the Project<br><br>Welcome back, tech enthusiasts! Today, I'm excited to introduce ARPoLan, a project that started as an experiment to explore the potential of combining the Arduino Pro Micro and the W5500 Ethernet module. This powerful device can perform network scanning, ARP spoofing, and even act as a local Rubber Ducky. Let me take you through building and testing this network security tool. `,
	},
	{
		projectId: 7,
		instructionText: `Features & Components<br><br>ARPoLan combines several powerful components to deliver its impressive capabilities:<br><br>1.  Network Scanning: Discover devices on the local network by sending ARP requests and collecting responses.<br>2.  ARP Spoofing: Perform ARP spoofing attacks to intercept and manipulate network traffic.<br>3.  HID Functionality: Utilize the Atmega32u4's USB HID capabilities for additional attack vectors.<br>4.  Real-time Monitoring: Visual and serial indicators for attack detection and network activity. `,
	},
	{
		projectId: 7,
		instructionText: `Getting Started<br><br>I designed the PCB for ARPoLan using Altium Designer, creating a simple yet efficient two-layer layout. Here’s a breakdown of the components used: `,
	},
	{
		projectId: 7,
		imageURL:
			"https://projects.arduinocontent.cc/88d1456c-cb9c-4a24-8b67-44c7d5ea7dc9.jpg",
	},
	{
		projectId: 7,
		instructionText: `Atmega32u4 Microcontroller: Handles USB communication and processing tasks.<br><br>W5500 Ethernet Module: Provides reliable network connectivity with an integrated hardware TCP/IP stack.<br><br>25 MHz Crystal Oscillator: Ensures precise timing for network operations.<br><br>RJ45 Ethernet Socket: Facilitates network connections with integrated status LEDs.<br><br>LM1117 Voltage Regulator: Supplies a stable 3.3V power to the W5500.<br><br>USB A Port: Allows for easy programming and data transfer.<br><br>Passive Components:<br><br>Capacitors and resistors for power stabilization and signal integrity.<br><br>The communication between the W5500 and the Atmega32u4 is handled via the SPI protocol, ensuring quick and reliable data transfer. `,
	},
	{
		projectId: 7,
		instructionText: `Schematic<br><br>The PCB for ARPoLan was designed using Altium Designer, featuring a two-layer layout optimized for compactness and efficiency. The board integrates all necessary components, ensuring reliable connections between the Atmega32u4 and the W5500. `,
	},
	{
		projectId: 7,
		imageURL:
			"https://projects.arduinocontent.cc/0b6d0eeb-6a94-4fd1-9568-654934207c4a.png",
	},
	{
		projectId: 7,
		instructionText: `Connection Table<br>Ensure the VCC pin of the W5500 is connected to a 3.3V power supply, as the module operates at 3.3V logic levels.<br><br>The SS (Slave Select) pin can be connected to any digital pin on the Arduino Pro Micro, but it must be defined correctly in the code.<br><br>Make sure the GND of the Arduino Pro Micro is connected to the GND of the W5500 module to ensure a common ground.<br><br>This setup will enable SPI communication between the Arduino Pro Micro and the W5500 Ethernet module. `,
	},
	{
		projectId: 7,
		imageURL:
			"https://projects.arduinocontent.cc/519e6eda-d64e-4e1a-a08e-b4eff9fc6ea5.jpg",
	},
	{
		projectId: 7,
		instructionText: `Conclusion<br>Creating ARPoLan was a fascinating journey into network security and hardware integration. From designing the PCB to writing and testing the code, this project showcased the potential of combining simple yet powerful components to achieve sophisticated functionalities. Stay tuned for future updates and enhancements, and don’t forget to check out the project details on my GitHub. If you have any ideas or suggestions, I would love to hear them! `,
	},
	{
		projectId: 7,
		instructionText: `Usage<br>First Code: Local Rubber Ducky The first piece of code transforms ARPoLan into a local Rubber Ducky. The Atmega32u4's USB HID capabilities allow it to act like a keyboard or mouse, injecting pre-programmed keystrokes into a connected computer. This was a fun experiment, though I refer to it as the "bad idea" code due to its potential risks.<br><br>Second Code: ARP Spoofing Next, I tested the ARP spoofing code. This script injects malicious ARP packets into the network, leveraging the processing power of the Atmega32u4 and the network capabilities of the W5500. While not overly powerful, it demonstrated the device's potential for network security tasks.<br><br>Third Code: Network Scanning The final code was for network scanning. By sending ARP requests to all IP addresses within a specified range, ARPoLan could identify active devices on the network. This functionality is crucial for network monitoring and penetration testing. `,
	},
	{
		projectId: 7,
		instructionText: `Code & PCB<br><br>If you're interested in building this project, the code and schematic are available on GitHub. Simply visit the GitHub repository to download the necessary files. If the project gains attention, I’ll open-source the PCB files as well. Feel free to test the code and share your feedback or improvements.<br><br>GitHub repository: github.com/cifertech/arpolan `,
	},

	{
		projectId: 8,
		instructionText: `Ultrasonic sonar is devices that use sound waves with frequencies higher than the upper audible limit of human hearing (typically above 20 kHz) to measure distances to objects. They work on the principle of sending out a sound wave, and then measuring the time it takes for the sound wave to bounce back after hitting an object. By calculating the time difference between sending and receiving the sound wave, the distance to the object can be determined using the speed of sound in air.<br><br>This time I will describe to you a simple way how to make an independent Sonar, where the results are displayed on a TFT color display in the form of a radar image, which is why it is often mistakenly called radar instead of sonar.<br>https://youtu.be/XOZAGRH_6hA`,
	},
	{
		projectId: 8,
		instructionText: `I got the idea quite by accident from a picture on the internet, and then after a little research I found that project on Github. The original project was made on a 1.8 inch display which is really a very small surface for this purpose. So I reworked the code for a larger 3.2 inch TFT display, where the image is much clearer. `,
	},
	{
		projectId: 8,
		imageURL:
			"https://projects.arduinocontent.cc/77c2652f-24f9-4051-b804-ee01d27a19fb.jpg",
	},
	{
		projectId: 8,
		instructionText: `The device is really simple to make and consists of only a few components<br>- Arduino Nano microcontroller board<br>- TFT display with a resolution of 240 x 320 pixels and an ILI9341 driver chip<br>- Ultrasonic sensor type HC-SR04<br>- small 9G Servo<br>- and several resistors that serve to shift the display signal from 5V to 3.3V level<br><br>The servo and ultrasonic sensor are housed in a separate box, which I used from a previous project, and connected to the main box with flat cables. `,
	},
	{
		projectId: 8,
		imageURL:
			"https://projects.arduinocontent.cc/551833cf-1265-4704-b8ed-624bc04e00fc.jpg",
	},
	{
		projectId: 8,
		instructionText: `Now let's see how the device works in real conditions:<br><br>At the beginning, I separated the ultrasonic sensor from the servo in order to calibrate the graphic presentation with the real distance of the object. As you can see, the real distance fully corresponds to the distance shown on the display. `,
	},
	{
		projectId: 8,
		imageURL:
			"https://projects.arduinocontent.cc/3332450b-d347-4c5c-871c-e1d3c5db8c73.jpg",
	},
	{
		projectId: 8,
		instructionText: `Now we mount the sensor on the servo and place the obstacles to be detected. At power on, the servo is tested first, then the Radar like screen is drawn on the display and scanning begins. `,
	},
	{
		projectId: 8,
		imageURL:
			"https://projects.arduinocontent.cc/58696a6b-fc25-414b-bd8d-8fb2244937a5.jpg",
	},
	{
		projectId: 8,
		instructionText: `Obstacles are marked with red dots. In the lower left corner, the scanning area is displayed, and on the right, the distance between the sensor and the obstacle in centimeters. The three green arcs with marked distances serve us for easier visibility and an idea of the real distance. If the nearest obstacle is greater than 1 meter, yellow dots are drawn on the last arc, indicating an out of range condition. Scanning is performed first from 180 to 0 degrees, and then vice versa, from 0 to 180 degrees. `,
	},
	{
		projectId: 8,
		imageURL:
			"https://projects.arduinocontent.cc/c08bc3f4-47b9-469f-a32a-07aa775c9549.jpg",
	},
	{
		projectId: 8,
		instructionText: `For the sake of stability during operation, the device is preferably powered by an external power source, but it also works via USB on the Arduino. All display colors can be easily changed in the code according to the user's preference.<br>And finally a short conclusion. Most such devices show the scan result on a PC monitor which requires an additional application and code. This is a very simple, easy to make, visually effective, and self-contained device intended for both beginners and more advanced DIYers. I've used cases from previous projects, but it's desirable to have it all in one case with a slanted front display to visually simulate a real radar system. `,
	},
	{
		projectId: 9,
		instructionText: `In this exciting tutorial, we will show you how to build your own security camera using an ESP32-CAM and an AM312 PIR sensor to detect motion. Best of all, photos will be saved directly to an SD card!<br><br>       Throughout this video, we will guide you through the following steps:<br><br>Link projects and update in https://rogerbit.com/wprb/2023/10/captura-con-esp32/<br><br>Hardware Connection: We will show you how to connect the ESP32-CAM and the AM312 PIR sensor to your breadboard, guaranteeing correct power.<br><br>Arduino IDE Configuration: You will learn how to configure the development environment in Arduino IDE to work with the ESP32-CAM and select the appropriate board.<br><br>Programming: We will provide you with the code necessary to configure the ESP32-CAM and program it to capture images when motion is detected. Additionally, we will show how to store images on an SD card.<br><br>Try it in Real Life: You will see our motion detection system in action. We will test it in a real environment so you can see how it works.<br><br>Tips and Customization: We will share some useful tips and show you how to customize and extend this project according to your needs.<br><br>This project is perfect for creating an affordable and functional security camera for your home, office, or anywhere you want to monitor.<br><br>Electronic components<br><br>usb serial adapter `,
	},
	{
		projectId: 9,
		imageURL:
			"https://rogerbit.com/wprb/wp-content/uploads/2021/07/51Lp3uhptQL.jpg",
	},
	{
		projectId: 9,
		instructionText: `Description<br>FTDI Basic Program Downloader USB to TTL FT232RL 3.3V 5V DTR<br><br>This is a basic breakout board for the FTDI FT232RL USB to serial IC. The pinout of this board matches the FTDI cable to work with official Arduino boards and cloned 5V Arduino boards. It can also be used for general serial applications. The main difference with this board is that it highlights the DTR pin instead of the RTS pin of the FTDI cable. The DTR pin allows an Arduino target to automatically reset when a new Sketch is downloaded. This is a really nice feature and allows you to download a sketch without having to hit the reset button. This board will automatically reset any Arduino board that has the reset pin on a 6-pin connector.<br><br>This board has TX and RX LEDs which make it a little better to use over the FTDI cable. In fact, you can see the serial traffic on the LEDs to check if the board is working.<br><br>This board was designed to decrease the cost of Arduino development and increase ease of use (the auto-reset feature is great!). Our Arduino Pro and LilyPads boards use this type of connector.<br>One of the nice features of this board is a jumper on the back of the board that allows the board to be set to 3.3V or 5V (both power output and I/O level). This board ships by default at 5V, but you can cut the default trace and add a solder jumper if you need to switch to 3.3V.<br><br>CHARACTERISTICS<br><br>Standard interface design, compatible with a variety of Arduinos such as the Pro Mini<br><br>Original FTDI FT232 chip, stable performance<br><br>With power indicator, send, receive, working status LED indicators<br><br>With 3.3V and 5V TTL level supply options<br><br>USB to Serial TTL Module, Download STC SCM<br><br>Mini USB port connection<br><br>Standard interface, compliant with Arduino official controller; With power, sending, reveiving indicator, With 3.3V / 5V power supply; Can be used as ordinary USB to serial TTL module, download STC singlechip<br><br>Hardware introduction<br><br>Adopt FTDI company’s FT232RL chip<br><br>Lead out FT232RL chip all signal port, TTL / CMOS level<br><br>RXD/TXD send-receive communication indicator<br><br>USB power supply, can choose 5V or 3.3V interface level (if you need other level, can provide target voltage in VCC and GND pin)<br><br>Cables Dupont `,
	},
	{
		projectId: 9,
		instructionText: `Introduction<br>In this project I will show you how to Decode IR Remote Control Signals' of any Remote using Arduino.<br><br>The remotes which we use in our home are basically made of IR transmissions for example TV remote, DVD remote, Sound System remote etc. But these signals never interfere with each other because every key in the remote control has unique operation code in Hexadecimal format. By decoding these signals we can know what is the unique code of the key. By knowing the codes we can implement several applications where we can control with same remote.<br><br>Working on Basic<br><br>IR remote has a button and a microcontroller with IR LED attached. When a button is pressed, a microcontroller identified the button and sends the corresponding modulated signals (codes) to the IR LED. Then, the IR LED sends it to the IR receiver in the appliance.<br><br>System in the appliance demodulate the signals(codes) and the checks the function corresponding to it and executes it. Each function has a different code.<br><br>Every IR operated appliance has different codes for different function.<br><br>Prototype Image's`,
	},
	{
		projectId: 9,
		imageURL:
			"https://projects.arduinocontent.cc/bd015441-332e-4094-a2ef-3c8a0efa3140.jpg",
	},
	{
		projectId: 9,
		imageURL:
			"https://projects.arduinocontent.cc/ac0170b4-8181-4118-b8f2-1dc78673e266.jpg",
	},
	{
		projectId: 9,
		instructionText: `Hookup<br>Follow the Steps:-<br><br>Connect the First pin from the left of TSOP1738 ( OUT pin) with pin 11 of Arduino.<br><br>Hook the Middle pin ( GND pin) with the GND pin of Arduino.<br><br>Connect the third and the last pin ( VCC pin) with 5V pin of Arduino.<br><br>Uploading and Testing<br><br>Remember to install the IRremote.h library.<br><br>Copy or download the code attached with the project.<br><br>Hit upload and open serial monitor.<br><br>Take any remote you want to use or you want the codes off it and press any button.<br><br>Now, see in the serial monitor. You will see a code of the corresponding button you pressed.<br><br>Note the codes on a paper or copy them in a document file on PC. `,
	},
	{
		projectId: 10,
		instructionText: `Here, You can learn "How to Control Motors using L298n Motor Driver & Arduino Uno".<br>You can even control Speed & Direction of Motors using this tutorial.<br><br>Additionally, I am Attaching a Video for your proper guidance.<br>You can see Step by Step Process physically- `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/f50108d1-ac6d-4d5f-acb5-90ca5a093cd4.jpg",
	},
	{
		projectId: 10,
		instructionText: `Here, I am attached a L298n Motor Driver Pinout Diagram- `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/918a766f-aeb8-4f94-aeda-57f183d1cf86.jpg",
	},
	{
		projectId: 10,
		instructionText: `Firstly, Connect your Motors with L298n Motor Driver `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/e0fd14ab-6166-4870-ad6e-b73c47009d86.png",
	},
	{
		projectId: 10,
		instructionText: `Now, Connect your L298n Pins with Arduino Uno Pins `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/7d20b0ad-496b-4a90-80ce-669ec9db1fd2.png",
	},
	{
		projectId: 10,
		instructionText: `Now, Connect following Pins-<br><br>L298n (+5V) =>Arduino (+5V)<br>L298n (Gnd) =>Arduino (Gnd)<br><br>Now Connect Battery-<br><br>L298n (+12V) =>Battery (+ve)<br>L298n (Gnd) =>Battery (-ve)<br><br>Above Pin System can Run your L298n Motor Driver module as well as Arduino.<br><br>But, If you want to Control Speed you have to do some simple extra work. `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/a73bfc9c-7c69-44fa-9d0f-321e034d6f4e.png",
	},
	{
		projectId: 10,
		instructionText: `Now You can Control your Motor Speed.<br>I am attached my Final Look of our Project. `,
	},
	{
		projectId: 10,
		imageURL:
			"https://projects.arduinocontent.cc/601919da-0dc7-4158-9e4c-66e1192c1e0e.jpg",
	},
	{
		projectId: 11,
		instructionText: `Hello everyone,<br><br>       Welcome back to another interesting and easy tutorial after a long time. Sorry guys I was busy in writing very fantastic book regarding Arduino IoT Cloud and I will share the details at the end of this tutorial. so this book writing approx took 1 year and 2 months.<br><br>       Well back to the point, many years ago I have created a tutorial on temperature and humidity monitoring using Arduino Uno and DHT22. I got approx half million hits on my that article. this is the love from community which is pushing me to work beyond my commitment.<br><br>       So in this tutorial I am going to demonstrate how to monitor temperature and humidity using SeeedStudio tiny development MKRWiFi 1010 and how to integrate it with Arduino IoT Cloud so you guys can take the benefit of IoT Platforms and keep yourself updated with your room/outdoor temperature and humidity anywhere in the world with the help of Arduino IoT Cloud.<br><br>       Buckle up, guys, and collect the MKR WiFi 1010 and DHT22 with male-to-male cables. Connect the DHT22 to the MKR WiFi 1010 as per the below diagram. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/28e6dbad-bfb6-42fb-baad-7b7741ca689f.png",
	},
	{
		projectId: 11,
		instructionText: `It's time to navigate towards Arduino IoT Cloud https://app.arduino.cc/ if you didn't have account then just create the account. Now our first step is to create Thing it's basically a container in Arduino IoT Cloud which holds the Device, Cloud variables, Code and Meta data of of IoT node. Click on Thing menu which is available in the left side bar as per below image. `,
	},
	{
		projectId: 11,
		imageURL: "https://i.imgur.com/7UPq84L.png",
	},
	{
		projectId: 11,
		instructionText: `Now click on + CREATE THING button which is shown in the center of the page as per below image. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/16c97c36-b414-4a56-8fd3-e23096496af0.png",
	},
	{
		projectId: 11,
		instructionText: `After that you will see a new page where you will fin different tabs and sections as just like below diagram. this is the main page where we need to setup all the things like variables, device, network configuration, code and etc. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/1fd770d1-3d82-40eb-8c59-947fbf6f7097.png",
	},
	{
		projectId: 11,
		instructionText: `Above picture is marked with red boxes and I assigned the numbers to them and below is full explanation of each step which is marked by number.<br>1- Click on "Untitled" and select rename and assign the name to Thing.<br><br>2-In this section we will add the cloud variables and in this tutorial we required 2 cloud variables one for temperature and second for humidity.<br><br>3-Attach the device to Thing<br><br>4-Configure the Network Settings<br><br>5-Navigate to the Sketch tab and add the code for MKR Wi-Fi 1010 and upload the code.<br><br>Adding Variables to Thing<br><br>In this subsection, we will add the cloud variables to Thing. Click on the ADD button, which is available in the Cloud Variables section. and you will see the pop-up where you need to provide the name. Select the type of variable from the drop-down menu. Right now, I am not going to talk about other options due to time limitations. Finally, click on the "ADD VARIABLE" button and repeat the same procedure for the humidity variable, but select the relative humidity type from the drop-down menu as per below image. `,
	},
	{
		projectId: 11,
		imageURL: "https://i.imgur.com/dicxo6D.png",
	},
	{
		projectId: 11,
		instructionText: `Adding Device to Thing<br><br>Before adding a device you should have "Arduino Create Agent" Installed and running on your machine. Then click on Select Device button under Associated Device section. Popup will appear and list all of the devices if any device is associated in Arduino IoT Cloud else you have option to Add a new Device.<br><br>Click on "SET UP NEW DEVICE" and select the "Arduino" option. In the next step, Arduino will automatically detect the supported Arduino development board and display the name and port of the development board as shown in the below picture. Before this process, try to connect MKR Wi-Fi 1010 to your machine. Click on the "CONFIGURE" button. It will take a few seconds to configure your development board with the necessary configuration.. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/05ec1b63-62b2-4291-865d-b2913f924809.png",
	},
	{
		projectId: 11,
		instructionText: `Congrats your Device has been added and attached successfully to Thing.<br><br>Configure Network for Thing<br><br>After adding the device it's time to configure the Wi-Fi Settings. Click on Configure button under Network section on the Thing main page. Here you will see the popup just like below image and you need to provide Wi-Fi Name and it's Password. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/0fc35297-5efc-435f-901f-c858d7452bf5.png",
	},
	{
		projectId: 11,
		instructionText: `After passing the first four steps, our Thing page looks like the below image. In these 4 steps, we assigned the name to the thing, created cloud variables, associated the device with the thing, and, at the end, added the Wi-Fi configuration. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/5d5f5477-809e-42d9-84cd-701b533534b9.png",
	},
	{
		projectId: 11,
		instructionText: `Playing with the Code<br><br>Now it's time to play with the code. Just click on the Sketch tab and you will see the inline code editor. copy the code from the end of this page under code section and paste into the editor. and click on upload button which is marked by red rectangle in below image. it will take few seconds for code verification and uploading to development board. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/f1db379f-444e-46a7-94bd-5319e03c68af.png",
	},
	{
		projectId: 11,
		instructionText: `Congrats now your devices is up and running and successfully sending the values to Arduino IoT Cloud.<br><br>Dashboard creation<br><br>In the previous tutorial, we just created and set up the thing. Now it's time to visualize the sensor readings. For this, we need to setup the dashboard. Click on the Dashboards menu, as shown in the below picture. `,
	},
	{
		projectId: 11,
		imageURL: "https://i.imgur.com/FFgR2Uv.png",
	},
	{
		projectId: 11,
		instructionText: `Now you will see the Dashboard page just like below image and click on + CREATE DASHBOARD. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/4cd7e377-a7d3-451b-9ecd-1cbef4297c7c.png",
	},
	{
		projectId: 11,
		instructionText: `You will see the new tab where you can setup the control widgets to visualize your sensor values. But here I marked down some important icons and buttons with numbers. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/ebe991fd-7885-43c2-9646-c80cd9a7e734.png",
	},
	{
		projectId: 11,
		instructionText: `1- Click Untitled to rename and assign a name to your Dashboard<br><br>2-Eye icon is view mode while edit icon allows you to add/update the widgets and their settings.<br><br>3-ADD button is control drop down where you will find plenty of control widgets such as gauge, charts, buttons which will help you to visualize your sensors data and control.<br><br>4-Reize icon will be used to resize the control and lock the alignment while mobile icon is used to prepare your dashboard according to mobile device, as by default you are creating dashboard for desktop.<br><br>Adding Widgets to Dashboard<br><br>Now it's time to add some widgets to visualize our Temperature and Humidity values. for Temperature I will use Gauge widget and for Humidity Percentage widget. Click on the ADD button and search for Gauge widget. After that you will see the popup just like below image and Assign the Name to widget and Link the Temperature cloud variable. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/c7be9925-ce5c-45a3-95cd-cf87f62500e8.png",
	},
	{
		projectId: 11,
		instructionText: `After giving the Name to widget control and linking the cloud variable setup will look like below image. just click on "DONE" and you will be good to go. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/280dde65-b44c-40d6-b004-eca0605b5706.png",
	},
	{
		projectId: 11,
		instructionText: `Repeat the same procedure for Percentage Widget and also try to explore other display values widget controls like Values, Charts and etc widgets. Now the final Dashboard has been ready for your view just like below image which is showing both Temperature and Humidity values. `,
	},
	{
		projectId: 11,
		imageURL:
			"https://projects.arduinocontent.cc/b84f52b0-0581-4630-96d5-7e3c93579335.png",
	},
	{
		projectId: 11,
		instructionText: `Arduino IoT Cloud for Developers Book<br><br>Download the Arduino IoT Cloud app on your Android/Apple via Play/App store and login with your account and see the dashboard on fingertips for latest update and alerts.<br><br>Now it's time to talk about my Arduino IoT Cloud for Developers book which is by the available at amazon as well as on PacktPub. Below are the URLS for your purchase. `,
	},
	{
		projectId: 11,
		instructionText: `https://www.amazon.com/Arduino-Cloud-Developers-simple-complex/dp/1837637172<br><br>https://www.packtpub.com/product/arduino-iot-cloud-for-developers/9781837637171`,
	},
	{
		projectId: 11,
		instructionText: `The book has 14 chapters where you will learn about Internet of Things Architecture, Arduino IoT Cloud hierarchy as it's totally different from other cloud platforms such as ThingSpeak, Cayenne myDevices and etc. Next you will learn all the Cloud Platform options and dashboard widgets which is very mandatory to learn all the stuff before getting started with the Arduino IoT Cloud.<br><br>I have created 6 different projects in the book which are using different types of development boards which includes MKR Wi-Fi 1010, ESP8266, XIAO ESP32C3 and etc. You will learn Enviromental Monitoring, Smart Agriculture, Smart Health, IoT for assets tracking using GSM as well as with LoraWan, Smart Home where we integrated smart lamp with Amazon Alexa Dot Echo with in couple of minutes without any code to Arduino IoT Cloud. I Hope you will will enjoy my book just like this tutorial.<br><br>For developers and IoT engineers, I have written two special chapters that focus on how to use the Arduino IoT Cloud API and Arduino Cloud CLI to integrate their solution with other 3rd party clouds and services, and Arduino Cloud CLI helps engineers and administrators to automate and manage bulk deployments using the command-line tool. `,
	},
	{
		projectId: 12,
		instructionText: `The goal of this tutorial is to show you a way to easily add AI to a project , without any knowledge in this field, using the software NanoEdge AI Studio and its Arduino compatible libraries!<br><br>This tutorial guides you through building a cardboard touchpad that relies on vibration analysis and an Embedded AI algorithm running on an Arduino UNO R4 . The UNO emulates a USB keyboard device.<br><br>Vibration data from the cardboard is captured using a basic accelerometer connected via the Qwiic connector. Within the UNO microcontroller, vibrations are classified using a NanoEdge AI library.<br><br>Based on the detected class, the touchpad triggers either a "PageUp" or "PageDown" keystroke. `,
	},
	{
		projectId: 12,
		instructionText: `NanoEdge AI Studio:<br><br>NanoEdge is a free machine learning software developed by STMicroelectronics which allow to easily create and integrate AI libraries to any cortex M microcontroller. Essentially, select a project type, import data locally, run a benchmark to find the best model automatically, test the model if you want and get an AI library.<br><br>In Nanoedge AI Studio, four kinds of projects are available, each serving a different purpose:<br><br>Anomaly detection (AD): to detect a nominal behavior and an abnormal one. Can be retrained directly on board.<br><br>1 class classification (1c): Create a model to detect both nominal and abnormal behavior but with only nominal data. (In case you cannot collect abnormal examples)<br><br>N class classification (Nc): Create a model to classify data into multiple classes that you define<br><br>Extrapolation (Ex): Regression in short. To predict a value instead of a class from the input data (a speed or temperature for example).`,
	},
	{
		projectId: 12,
		instructionText: `Open Arduino IDE and create a new project:<br><br>Copy data logger source code available below. Click on Sketch > Include Library > Adafruit_LiS3DH to install the library.<br><br>Be careful : If your board is emulating a keyboard, you need to double press the reset button to be able to flash it.<br><br>Open the serial in Arduino IDE to check that the accelerometer data is correctly coming to your computer. (don't forget to close the serial after that) `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/aa31e081-1080-46bd-9b6e-084e16cdb658.png`,
	},
	{
		projectId: 12,
		instructionText: `Now we will automatically create an AI model able to recognize classes of gestures using vibration patterns.<br><br>Open NanoEdge AI Studio and create a new " N-Class Classification " project.<br><br>In project settings:<br>Set target to "UNO R4 Wifi" Sensor to 3-axes accelerometer `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/036751c3-350c-47b5-be56-df2478d69917.png`,
	},
	{
		projectId: 12,
		instructionText: `In the Signal step , collect one dataset per class ("Nothing","Swipe","Multitap" or any gesture that you want) using serial port.<br>Collect one kind of gesture per dataset!<br><br>Here is how to proceed:<br><br>Make sure the board is connected to the pc with the data logger code flashed on it<br><br>Click ADD SIGNAL > FROM SERIAL Make sure to select the right come port<br><br>Click START/STOP to collect data (100 buffers per signal should be enough) Once finished click CONTINUE and then IMPORT<br><br>If everything is correct, you should see a new dataset added with plots and information. `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/73727b45-b30a-4b8a-940c-5be372c72dbf.png`,
	},
	{
		projectId: 12,
		instructionText: `Create the AI model:<br><br>Once you have all the classses that you want to recognize, go to the Benchmark step.<br><br>Click RUN NEW BENCHMARK. Select all your datasets and click START.<br><br>NanoEdge AI Studio will take your data and look for a model that is able to classify them. (it also applies pretreatment on its own to your data)<br><br>You get the accuracy of the model and its RAM and Flash requirements.<br><br>You should reach around 99% pretty fast if you collected good data. You can stop the benchmark when it happens. `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/ae3a036a-2afe-4aee-9708-dbc2d1ae5447.png`,
	},
	{
		projectId: 12,
		instructionText: `In the validation step, you can compare the libraries (model + preprocessing) if you want, look here for more info:<br>https://wiki.st.com/stm32mcu/wiki/AI:NanoEdge_AI_Studio#Validation<br><br>Test the model:<br><br>The emulator step is more useful for us here, you can use the serial to test the model directly in the tool:<br><br>Click INITIALIZE EMULATOR <br>Click FROM SERIAL<br>Test your model with new real time data `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/934034b2-cf67-4208-9e4a-d68e9b15193e.png`,
	},
	{
		projectId: 12,
		instructionText: `The last step in NanoEdge is to get the AI library that we will use in Arduino IDE:<br>Click COMPILE LIBRARY<br><br>Get and extract the .zip file<br><br>The library is the .zip file in the folder Arduin , we will use it below: `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/cb1cadc0-a02d-4521-8e0d-d0ff4042e45b.png`,
	},
	{
		projectId: 12,
		instructionText: `Create the demo:<br>Open a new project in Arduino IDE<br><br>Get the main code below and paste it in your project<br><br>Click on Sketch > Include Library > Adafruit_LIS3DH<br><br>Add the Nanoedge AI Library (select the previously extracted zip): `,
	},
	{
		projectId: 12,
		imageURL: `https://projects.arduinocontent.cc/a36090e3-13ae-4859-9646-2c6c1d15da6a.png`,
	},
	{
		projectId: 12,
		instructionText: `Compile the code. Flash the code.<br><br>It is finished, you can play with it.<br><br>Through this example, this tutorial shows how to add AI to an Arduino project using NanoEdge AI Studio. It is now up to you to think about other use case and do them on your own! `,
	},
	{
		projectId: 12,
		instructionText: `PIR sensors are widely used for motion detection in various applications, from security systems to automatic lighting. In this guide, we will explore PIR sensor, its working principles, and interfacing it with Arduino.<br><br>In this project we will create a motion detection system using a PIR sensor and an Arduino board. The PIR sensor will detect motion within its detection range and trigger an action, such as turning on an LED or activating an alarm.<br><br>Understanding PIR Sensor<br><br>Before we dive into the project implementation, let's first understand how a PIR sensor works. PIR sensor detects changes in infrared radiation emitted by objects within its field of view. This radiation is emitted by all objects with a temperature above absolute zero, including humans and animals. The sensor consists of a pyroelectric sensor, which generates an electrical signal in response to changes in infrared radiation, and a circuit that processes and amplifies this signal to detect motion.<br><br>HCSR04 Ultrasonic Sensor Pinout<br>The Pinout is given as below: `,
	},
	{
		projectId: 13,
		imageURL: `https://projects.arduinocontent.cc/947a4793-1603-4d45-b9fa-e314f780e848.jpg`,
	},
	{
		projectId: 13,
		instructionText: `VCC is the power pin of the module.<br><br>GND is the GND pin of the module.<br><br>Out is the data output pin of the module.<br><br>Interfacing PIR Sensor with Arduino<br><br>Now that we have a basic understanding of how PIR sensors work, let's proceed to interface the PIR sensor with Arduino. Here's a step-by-step guide: `,
	},
	{
		projectId: 13,
		imageURL: `https://projects.arduinocontent.cc/f3b88737-328c-4ace-bd4c-76b95195d2a6.jpg`,
	},
	{
		projectId: 13,
		instructionText: `Connect the VCC pin of the PIR sensor to the 5V pin on the Arduino board.<br>Connect the GND pin of the PIR sensor to the GND pin on the Arduino board.<br>Connect the OUT pin of the PIR sensor to a digital pin e.g., pin 2 on the Arduino board. `,
	},
	{
		projectId: 13,
		instructionText: `Arduino code for interfacing PIR sensor with Arduino<br>Here is the complete line by line code explanation for Interfacing Arduino with PIR Sensor. The complete code can be found at the absolute bottom of the project.<br>This line includes the LiquidCrystal library, which allows interfacing with LCD displays.<br><br>#include <LiquidCrystal.h> // Include the LiquidCrystal library for LCD display<br>      This line initializes an instance of the LiquidCrystal class named lcd, specifying the pin numbers to which the LCD display is connected. The parameters represent (RS, EN, D4, D5, D6, D7) pins respectively.<br><br>LiquidCrystal lcd(12, 11, 6, 7, 8, 9); // Initialize the LCD object with pin numbers<br>      These lines declare two integer variables: sensorInput, which represents the pin number connected to the PIR sensor, and sensorReturn, which will store the output of the PIR sensor.<br><br>int sensorInput = 2;   // PIR sensor input pin<br>int sensorReturn = 0;  // Variable to store PIR sensor output<br><br>The setup() function is called once when the Arduino board starts. Now we set the sensorInput pin as an input pin, indicating that it will be used to read data from the PIR sensor. Then initialize the LCD display with 16 columns and 2 rows, indicating the display's dimensions. Initial messages are printed on the LCD display, positioning the cursor at the beginning of the second row.<br>void setup() {<br>pinMode(sensorInput, INPUT); // Set sensor pin as input      <br>// Set up the LCD's number of columns and rows      <br>lcd.begin(16, 2);      <br>	// Print initial message on the LCD      <br>	 lcd.setCursor(0, 0);      <br>	 lcd.print("PIR Sensor Says:");      <br>	 lcd.setCursor(0, 1);      <br>}      <br>In the loop() function, the value of the PIR sensor output is read using digitalRead(sensorInput). <br>If motion is detected (sensor output is HIGH), a message indicating motion occurrence is displayed on the LCD. If no motion is detected (sensor output is LOW), a message indicating motion stops is displayed on the LCD. <br><br>void loop() {      <br>	 sensorReturn = digitalRead(sensorInput); // Read input value from PIR sensor      <br>	 // Check if motion is detected      <br>	 if (sensorReturn == HIGH) {      <br>	   // Set cursor to the second row and print motion detection message      <br>	   lcd.setCursor(0, 1);      <br>	   lcd.print("Motion Occurs   ");      	 } else {      <br>	   // Set cursor to the second row and print motion stopped message      <br>	   lcd.setCursor(0, 1);      <br>	   lcd.print("Motion Stops    ");      <br>	 }      <br>}      `,
	},
	{
		projectId: 2,
		instructionText: `Ever wanted to know the temperature and humidity around you? If yes, this project will be very helpful for you. If no, it'll be cool anyway. What I mean is, you can use this in anything from home automations to smart watches.<br><br>What is humidity?<br><br>Humidity is the water vapor around you mixed with air. It is measured in per cents. So, if the humidity is 60 per cent(which is the average humidity), then 60 per cent of the air around you is water vapor. If it is 100%, then it means either the sensor is not correct, the sensor is broken/damaged, the Arduino crashed, the Arduino can't receive any signal, there's an error in the code or you're underwater *. If it's 0%, it means all the reasons above except the last one, you're in space or you're in the middle of a desert**.<br><br>* Correction: it means the air cannot hold any more water.<br><br>**  The air in a desert does contain some water but it is a very little amount compared to a normal place. The Sahara Desert has a mean humidity of 25%.<br><br>The world's lowest recorded relative humidity value occurred at Coober Pedy in the South Australia desert when the temperature was 93 degrees and the dew point was minus 21 degrees producing a relative humidity of 1 percent. (source:  'www.chicagotribune.com')<br><br>Is your sensor different?<br><br>My sensor is like this: `,
	},
	{
		projectId: 2,
		imageURL: `https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg`,
	},
	{
		projectId: 2,
		instructionText: `My sensor has 3 pins and it's fitted on a board. If yours has 4 pins, then you need to build this circuit after the sensor: `,
	},
	{
		projectId: 2,
		imageURL: `https://projects.arduinocontent.cc/8187f1a6-b715-4b52-8c11-1507c3e80da4.png`,
	},
	{
		projectId: 2,
		instructionText: `If it is same as mine, then just ignore the resistor.<br><br>Then, build the circuit!<br><br>Details about the code<br><br>You need to follow these instructions to make it work: <br>1. You need to add the library to the Arduino IDE. <br>2. Upload the code. <br>3. When the code is uploaded, open the Serial Monitor and set the baud rate to 9600. <br>4. You will see the humidity and temperature. `,
	},
	{
		projectId: 16,
		instructionText: `The ultrasonic sensor is a device that can measure distances using sound waves . It works in a similar way than bats and dolphins - by emitting sound waves and listening them bound back `,
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/cc7047f6-2bbf-43ed-87e9-76b07f4522e8.jpg",
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/8ab8bfd4-b0b9-42e1-9309-4f2a734ad439.jpg",
	},
	{
		projectId: 16,
		instructionText: `The sensor consists of two primary components: a transmitter and a receiver . The transmitter is responsible for emitting a high-frequency sound. In essence, ultrasonic refers to frequencies beyond the range of the human hearing - so something higher than 20kHz. <br><br>When the sound wave hits an object, it bounces back like echo. This returning wave is detected by the receiver. The sensor will use the micro-controller (Arduino) internal clock to find out how much it took for the sound to bounce back. This small clock turns on when a high-frequency wave is emitted and turns off when its echo is detected. <br><br>Using code, we can write a program that will store the timing between those two events into a variable. Then, we can use this information to calculate the distance between the sensor and the object. <br><br>You may be thinking: how can we find the distance if all we know is the timing? <br><br>Well, as you know, velocity is distance divided by time. Based on this equation, if we multiply the velocity by the time, we'll find the distance . I told you the sensor emits sound waves, so the velocity we need is the speed of sound in air (340 m/s). <br><br>Velocity = Distance / Time <br>Distance = Velocity * Time <br><br>But if we multiply this speed with the timing we found, we'll discover a value that's twice the real distance. That's happens because the sound hit the object and came back, in other words, it traveled the same path twice. Then to find the real distance, multiply the speed of sound with the timing and divide the result by two. <br><br>Distance = (Velocity * Time) / 2 `,
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/328c3323-cf29-434e-baf4-4c5b60eb5216.png",
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/328c3323-cf29-434e-baf4-4c5b60eb5216.png",
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/50ba2ab9-a2a5-4649-b4d1-553464059068.png",
	},
	{
		projectId: 16,
		instructionText: `In this article, I will show you how to build an alarm system using Arduino and the ultrasonic sensor. If you don't have all components or would like to test before assembling anything, I created a simulation of this alarm system on Tinkercad. <br><br>Moving on, for this project, you'll need: an Arduino board, a breadboard, a bunch of jumper wires, a buzzer,and an ultrasonic sensor. <br><br>Assembly<br><br>Firstly, attach the ultrasonic sensor and the buzzer on the breadboard. Then connect the VCC and GND pins on Arduino 5V and ground ports. `,
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/5d9e9e7a-35dc-47be-91c5-7f2503be7949.jpg",
	},
	{
		projectId: 16,
		instructionText: `After that connect the trigger pin to port 9, the echo pin to port 10, and the buzzer to port 8. Also attach the buzzer GND to Arduino GND. `,
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/5d823b9b-7ca8-453f-846a-65d58515efce.jpg",
	},
	{
		projectId: 16,
		instructionText: `At the end, upload the alarm-system-arduino.ino file that I provided on this article, and now our alarm system is finished. <br><br>Code explanation<br><br>At first, we defined the constants and variables we'll need. Then, at the setup function, we configured some important aspects of the code - like defining the echo pin as INPUT and the trigger and buzzer pins as OUTPUT. We also started the serial communication - and it'll be important to visualize the distances being measured. `,
	},
	{
		projectId: 16,
		imageURL:
			"https://projects.arduinocontent.cc/96e0a1f3-94ba-4045-a270-a0fb390afa0d.png",
	},
	{
		projectId: 16,
		instructionText: `At the end, there's the loop function. It starts by turning off the emitter and then activating it for 10 milliseconds before turning it off again. This piece of code will generate the wave sound that will be bounced back by the near objects.<br><br>At line 28 we find how much time the sensor took to detect the echo. This information is crucial for calculating the distance at line 29. In this case, we found the distance in centimeters. After that, from lines 30 to 35 we print the distance. <br><br>The last part of the code is an if-statement that turns on the buzzer when the object is at 50 centimeters or closer from the sensor. In case this statement is false, the buzzer turns down. `,
	},
	{
		projectId: 17,
		instructionText: `This project is for a school code quest. I have seen many projects with soil moisture sensors, but all of them included expensive and complicated materials such as LCD screens or automatic watering systems. I took it as a challenge to create an incredibly cheap and simple Soil Moisture Sensor. The project is designed for people that might not know when to water their plants or water them too much or too little. The Soil Moisture Sensor distinguishes how wet the soil is, and identifies when the soil should be watered for you. `,
	},
	{
		projectId: 17,
		instructionText: `This design only includes a soil moisture sensor, a couple of LEDs and a buzzer. The LEDs constantly show the moisture level (Red - 0-30%, Yellow - 30-60% and green 60%+ switch on at those levels of moisture), and when the moisture level falls below 10%, the buzzer starts beeping. I designed this for a Port Jackson Ficus Bonsai, and have tested this extensively. The percentages I'm using works perfectly for me but might change depending on your plant. If you feel like the red light switches on way too late, when the soil is already too dry, you can change the Red percentage to 0-50% and Yellow to 50-80%, because that seems to also be working well. <br><br>How it works: <br><br>It works, when electrical currents are sent through the legs of the moisture sensor. The sensor then calculates the resistance it's getting. Since water conducts electricity - the wetter the soil is, the less resistance there should be. It's then connected to an Analog Pin and the Arduino can use that for the program. <br><br>The Soil Moisture Sensor needs to know the maximum moisture that the soil can reach, so we can calculate the percentages. This is called calibration. The sensor calibrates right when the circuit is switched on, in the Setup() function. Therefore, it should already be in freshly watered soil, when it is switched on. <br><br>Here are some photos of the circuit without the casing: `,
	},
	{
		projectId: 17,
		imageURL:
			"https://projects.arduinocontent.cc/bb269a1e-9020-4253-8e6d-a38f7fd4298d.JPG",
	},
	{
		projectId: 17,
		imageURL:
			"https://projects.arduinocontent.cc/353ed111-13e9-476c-9417-12ed55022db5.JPG",
	},
	{
		projectId: 17,
		imageURL:
			"https://projects.arduinocontent.cc/82d28236-fed8-454e-af83-fc25fc94a1c5.JPG",
	},
	{
		projectId: 17,
		instructionText: `The soil moisture sensor I used has a screwable pin terminal, so no soldering is required. The most popular one sensor is the SparkFun moisture sensor and requires soldering. So I got one, that doesn't need soldering and can just have Male to Male wires screwed in, here . `,
	},
	{
		projectId: 17,
		instructionText: `Casing: <br><br>The casing is a simple box, with the LEDs coming out of the top, and the buzzer on the side. The Soil Moisture Sensor comes out of the side with wires and is stuck into the soil, so it's relatively far from all the water-sensitive components. `,
	},
	{
		projectId: 18,
		instructionText: `I needed to turn on and off some AC units located in a remote house, so that I can pre-cool (or pre-heat) the rooms in advance before I go. <br><br>Such units are very common appliances by Daikin, which provides WiFi capability on newer models but that's not something available on mine. The solution was easy: I just had to simulate an infrared remote controller with Arduino, place it close to the AC unit and control it remotely. `,
	},
	{
		projectId: 18,
		instructionText: `For this, I chose the ATOM Lite by M5Stack . It is very compact, comes with its little enclosure, and includes an IR emitter as well as a physical button  . The only drawback is that the emitter is not very powerful and the hole in the enclosure is very little, so it can't be placed much far away from the unit. In the end, I just used some bi-adhesive tape and a USB cable: `,
	},
	{
		projectId: 18,
		imageURL:
			"https://projects.arduinocontent.cc/87de5418-a5e8-43f6-9b42-0e000329fd22.jpg",
	},
	{
		projectId: 18,
		instructionText: `As an alternative to using this M5Stack board, you can use any Arduino board (such as a Nano or a MKR) and connect an infrared LED to its pins. You'll find hundreds of tutorials out there. `,
	},
	{
		projectId: 18,
		instructionText: `Software<br>On the software side, I used the fantastic arduino-heatpumpir library to generate the infrared signals. There are many libraries for that purpose, but this one worked great and it supports a large number of AC manufacturers with the same code instructions. <br><br>So, if you have a Daikin AC like mine you can use my code below without changes. If you have another brand, follow these steps: <br><br>1. Find the name of the .h file related to your AC model. In my case, that's DaikinHeatpumpIR.h . <br><br>2. Replace DaikinHeatpumpIR.h and DaikinHeatpumpIR in my code with the name you found. <br><br>That's it! If you're lucky enough, you won't need to change other things. <br><br>The code I wrote supports heat/cool/dry modes as well as temperature configuration. It doesn't let you configure fan speed or other parameters, but it's very simple to tweak to expose more parameters. In addition, it detects the pressure of the physical button on the board so that you can use it to test easily if the IR signals are read by the AC unit. `,
	},
	{
		projectId: 18,
		instructionText: `Remote control<br><br>Last but not least, I used the Arduino IoT Cloud to build a simple graphic interface to send commands remotely. To do this, follow these steps: <br><br>1. Open Arduino IoT Cloud and create a free account if you don't have one. <br><br>2. Create a device and select "M5Stack-ATOM" as the model. Make sure you save the secret key returned at the end of the device creation procedure. The interface is pretty straightforward, but you might want to follow the more detailed steps explained in the official documentation. <br>https://docs.arduino.cc/arduino-cloud/getting-started/esp-32-cloud`,
	},
	{
		projectId: 18,
		instructionText: `3. Create a thing and configure WiFi credentials for it. <br><br>4. Configure two variables in the thing: <br>a string variable called mode an integer variable called temperature <br><br>5. Copy the sketch code in the "Sketch" tab and upload it to the board. <br><br>6. Create a dashboard like this: `,
	},
	{
		projectId: 18,
		imageURL:
			"https://projects.arduinocontent.cc/5d147029-cc54-4c89-8060-d6c4b3964cb4.png",
	},
	{
		projectId: 18,
		instructionText: `That's it. Enjoy! ❄️ <br>Over-the-air updates<br><br>In case you want to modify the code after the board is installed, don't worry about physically removing it. Thanks to Arduino IoT Cloud you can just edit the code from your browser, and with one click you'll be able to upload it to the board over WiFi (and even remotely). <br><br>Optional: closing the loop<br><br>When controlling remote things, it is always a good idea to put some sensors to get feedback to make sure that your commands are correctly executed. In our case, I can imagine a very simple failure: the bi-adhesive tape falls apart, and you can't turn on (or worse, you can't turn off) your AC unit anymore. <br>So I recommend adding a simple temperature/humidity sensor in the room to see if your AC unit is doing what expected. There are many solutions; a very simple one is described in this tutorial<br>https://docs.arduino.cc/arduino-cloud/tutorials/cloud-environmental-data <br>and can be done with a MKR WiFi 1010 board, a MKR ENV Shield, and IoT Cloud. `,
	},
	{
		projectId: 19,
		instructionText: `This project is made for Arduino beginners who are looking for learning how to interface the RGB led with the Arduino Uno. Also, we will understand the Common Anode (CA) and Common Cathode (CC) concept as well as the pulse width modulation (PWM) signals. <br><br>RGB LED Types and Structure <br><br>RGB LEDs have three LEDs inside them and usually, these three internal LEDs share either a common anode or a common cathode especially in a through-hole package. So basically, we can categorize RGB LEDs as either common anode or common cathode type just like in seven segment displays. `,
	},
	{
		projectId: 19,
		imageURL: `https://projects.arduinocontent.cc/6ce54a92-5d7b-4a79-9bb9-14646cee8d8d.png`,
	},
	{
		projectId: 19,
		instructionText: `Common Anode <br><br>In a common anode RGB LED, the anode of the internal LEDs are all connected to the external anode lead. To control each color, you need to apply a LOW signal or ground to the red, green, and blue leads and connect the anode lead to the positive terminal of the power supply. `,
	},
	{
		projectId: 19,
		imageURL: `https://projects.arduinocontent.cc/50bfbc76-b401-44e6-8806-4c07057a4c63.png`,
	},
	{
		projectId: 19,
		instructionText: `Common Cathode <br><br>In a common cathode RGB LED, the cathode of the internal LEDs are all connected to the external cathode lead. To control each color, you need to apply a HIGH signal or VCC to the red, green, and blue leads and connect the anode lead to the negative terminal of the power supply. `,
	},
	{
		projectId: 19,
		imageURL: `https://projects.arduinocontent.cc/a402677b-ba8b-4441-a052-cda5b140852b.png`,
	},
	{
		projectId: 19,
		instructionText: `Basics of PWM (Pulse Width Modulation) <br><br>Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means. Digital control is used to create a square wave, a signal switched between on and off. This on-off pattern can simulate voltages in between the full Vcc of the board (e.g., 5 V on UNO, 3.3 V on a MKR board) and off (0 Volts) by changing the portion of the time the signal spends on versus the time that the signal spends off. The duration of "on time" is called the pulse width. To get varying analog values, you change, or modulate, that pulse width. If you repeat this on-off pattern fast enough with an LED for example, the result is as if the signal is a steady voltage between 0 and Vcc controlling the brightness of the LED.  In the graphic below, the green lines represent a regular time period. This duration or period is the inverse of the PWM frequency. In other words, with Arduino's PWM frequency at about 500Hz, the green lines would measure 2 milliseconds each. `,
	},
	{
		projectId: 19,
		imageURL: `https://projects.arduinocontent.cc/79c61371-7a80-4395-9e08-a4305376229c.gif`,
	},
	{
		projectId: 19,
		instructionText: `Explanation of the Changes from the Original Version of this Project:<br><br>Button Input:<br><br>A button is connected to pin 2 of the Arduino, and it is configured with an internal pull-up resistor (INPUT_PULLUP mode). This means that when the button is not pressed, the pin reads HIGH, and when pressed, it reads LOW.<br>Color Change Logic:<br><br>Each time the button is pressed, the colorIndex variable is incremented, cycling through six different colors. After the last color, the index resets to zero.<br>Debouncing:<br><br>A small delay (delay(300)) is added after each button press to debounce the button, preventing multiple triggers from a single press.<br><br>This modification allows the RGB LED to change colors each time the button is pressed, providing interactive control over the LED.<br><br>Below is the schematic for my version of the project`,
	},
	{
		projectId: 19,
		imageURL: `https://hackster.imgix.net/uploads/attachments/340746/button_push_color_change_UM2JWnHSDv.JPG`,
	},
	{
		projectId: 20,
		instructionText: `To modify the origional project created by dleibe1 and include an OLED display that shows the temperature and humidity, you can follow the steps below.`,
	},
	{
		projectId: 20,
		instructionText: `Ever wanted to know the temperature and humidity around you? If yes, this project will be very helpful for you. If no, it'll be cool anyway. What I mean is, you can use this in anything from home automations to smart watches. <br><br>What is humidity?<br><br>Humidity is the water vapor around you mixed with air. It is measured in per cents. So, if the humidity is 60 per cent(which is the average humidity), then 60 per cent of the air around you is water vapor. If it is 100%, then it means either the sensor is not correct, the sensor is broken/damaged, the Arduino crashed, the Arduino can't receive any signal, there's an error in the code or you're underwater *. If it's 0%, it means all the reasons above except the last one, you're in space or you're in the middle of a desert**. <br><br>* Correction: it means the air cannot hold any more water. <br><br>**  The air in a desert does contain some water but it is a very little amount compared to a normal place. The Sahara Desert has a mean humidity of 25%. <br><br>The world's lowest recorded relative humidity value occurred at Coober Pedy in the South Australia desert when the temperature was 93 degrees and the dew point was minus 21 degrees producing a relative humidity of 1 percent. (source:  'www.chicagotribune.com') <br><br>Is your sensor different?<br><br>My sensor is like this: `,
	},
	{
		projectId: 20,
		imageURL: `https://projects.arduinocontent.cc/d49cf318-9287-4873-aca7-726c0c942e3f.jpg`,
	},

	{
		projectId: 20,
		instructionText: `You need to follow these instructions to make it work: <br><br>Connect the DHT22 Sensor:<br><br>VCC to 5V on Arduino.<br>GND to GND on Arduino.<br>Data to pin 7 on Arduino.<br><br>Connect the OLED Display:<br><br>VCC to 5V on Arduino.<br>GND to GND on Arduino.<br>SCL to A5 (or SCL) on Arduino.<br>SDA to A4 (or SDA) on Arduino.<br><br>1. You need to add the librarys to the Arduino IDE. <br>2. Upload the code. <br>3. When the code is uploaded, you will see the temperature and humidity displayed on the OLED display. <br><br>Below is the schematic of the modified version of the project.`,
	},
	{
		projectId: 20,
		imageURL: `https://hackster.imgix.net/uploads/attachments/1135529/weatherstation_schematic_6p6OZNIxEf.PNG?auto=compress%2Cformat&w=1280&h=960&fit=max`,
	},
]

let newInstructionsTableData = []

oldInstructionsTableData.sort((a, b) => a.projectId - b.projectId)

let currentProjectId = oldInstructionsTableData[0].projectId
let currentInstruction = ""

oldInstructionsTableData.forEach((instruction) => {
	if (instruction.projectId !== currentProjectId) {
		newInstructionsTableData.push({
			projectId: currentProjectId,
			instructionText: currentInstruction,
		})
		currentProjectId = instruction.projectId
		currentInstruction = "" 
	}
	if (instruction.instructionText) {
		currentInstruction += `${instruction.instructionText}`
	} else if (instruction.imageURL) {
		currentInstruction += `<br><img src="${instruction.imageURL}"></img><br>`
	}
})

newInstructionsTableData.push({
	projectId: currentProjectId,
	instructionText: currentInstruction,
})

export default newInstructionsTableData