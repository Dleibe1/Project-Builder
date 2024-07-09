const descriptions = [
  `The two eyes are painted on two ping-pong balls which are sticked on two servo motors.  Two ultrasonic sensors measure the object's position. An Arduino Nano Every board reads the measurements from the ultrasonic sensors and controls the sevo motors accordingly.  The servo motors are SG90 micro servos and the ultrasonic sensors are HC-SR04. These are very common and very inexpensive devices. The Arduino board may be of another model than the nano Every, provided that 5V is available to power the servo motors and the ultrasonic sensors. `,

  `Gather your tools and troops (components, that is):
  The brains: An Arduino Uno, the mastermind behind the magic. 
  The translator: An HC05 Bluetooth module, your car's interpreter for smartphone commands. 
  The muscle: L298N motor driver, the beefy guy controlling those zippy wheels. 
  The bling: NeoPixel LEDs, because who doesn't love a car with dazzling lights? 
  The base: Perfboard and Sunboard, the sturdy foundation for your creation. 
  The connections: Jumper wires, the colorful threads that bring everything together. 
  The fuel: A battery, to keep your robot rolling (safely, of course!). `,

  `In the world of do-it-yourself (DIY) projects, few activities match the practicality of constructing your own Arduino-powered automatic watering system. Imagine a setup where technology integrates effortlessly with nature, allowing you to take control of your plant care routine. We'll break down the fundamental components of this project, highlighting the vital role of the DS1302 timekeeping module and Arduino-compatible pumps. Get ready for a hands-on approach that not only enhances your technical skills but also transforms the way you care for your plants, whether they are in the corners of your home or under the open sky. `,

  `The spectrum analyzer displays the amplitude of signals as a function of frequency, allowing engineers and technicians to visualize and analyze signal characteristics. In particular, the audio analyzer performs a visual presentation of an acoustic signal in the frequency domain, where the frequency of the signal is displayed on the x-axis, while the amplitude of a certain frequency is displayed on the y-axis. In several of my previous $ videos $ I have presented several different types of such devices, but this time the FHT Arduino library is used for the first time. This library is several times faster than the commonly used FFT library, but at the expense of speed certain loss of resolution and precision appear at the two ends of the audio range. `,

  `The "Arduino OLED Eyes Animation for Robotics Projects" is a curated guide showcasing five different methods for creating lively and expressive eye animations on Arduino-based robots using OLED displays. Each method offers unique features and functionalities, from simple eye movements and mood expressions to more sophisticated techniques involving bitmap images and optimized memory usage. Whether you're a beginner or seasoned hobbyist, this project provides a comprehensive overview of how to implement captivating eye animations that add personality and realism to your robotic creations. Explore the diverse options and unleash your creativity in the exciting realm of Arduino robotics!`,

  `In this project, the robotic arm will execute actions corresponding to the commands received from the sensors. For example, if the object moves to the left, the robotic arm will respond by moving to the left, and similarly for movements to the right, up, and down.`,

  `Welcome back, tech enthusiasts! Today, I'm excited to introduce ARPoLan, a project that started as an experiment to explore the potential of combining the Arduino Pro Micro and the W5500 Ethernet module. This powerful device can perform network scanning, ARP spoofing, and even act as a local Rubber Ducky. Let me take you through building and testing this network security tool.  The PCB for ARPoLan was designed using Altium Designer, featuring a two-layer layout optimized for compactness and efficiency. The board integrates all necessary components, ensuring reliable connections between the Atmega32u4 and the W5500. `,

`This is my game engine for the Arduino UNO. It allows the 8-bit micro to output composite video at 256x256 resolution, with scrolling tilemap graphics and 16x16 sprites. I have ported Manic Miner and Space Invaders across to run on it as demonstrations. 
The engine can display a maximum (currently) of 9 16x16 sprites, over a 32x32 grid of 8x8 pixel tiles. It allows for 4 way scrolling, and pixel based collision detection on one sprite. There is a lot of CPU time left over for game logic. Easily enough to update all the sprites and even all the tiles on the screen many times over every frame. 
I have also designed a shield for the UNO to make it easy to connect to a composite monitor or TV. The shield also has a footprint for an NES controller port, which can be used with the 2 demo games. The shield also has a simple amplifier circuit for the 2 channel PWM audio output to speaker. You can also just connect the audio output to your TV along with the video signal. The UNO is doing all the hard work though - it generates the image by "racing the beam" as there is not enough memory for a display buffer, but that means that everything runs at 50fps. It has to! 
Porting Manic Miner was a challenge, as the original game was for the 48K ZX spectrum, so I had to write tools to compress the data, levels and graphics. I had enough left over to add a title screen, and special ending screen lacking from the original. It includes all of the original levels and "special" features like the Solar Power Generator beams, spinning sun in the final cavern, Kong Beast, Eugene etc! It was fun to make, and just squeezes into the memory with a few bytes to spare! 
Porting Space Invaders was much faster, but I took time to recreate the original Arcade machine as closely as possible from the invader movement, to the game logic for when and how bombs are dropped, points from saucers, how the difficulty scales etc. So it should pretty much match the original! This was easy to fit, taking up only 13KB, including the game engine!`,

`When preparing the lunch, everyone has probably encountered the moment when you let the pan on the fire and the water or milk start boiling and coming out of the pan. 
To prevent it you could set the fire lower but that is no fun, let me introduce you the overengineered way: 
Take an Arduino board and an accelerometer Use Embedded AI to detect when the water is boiling thanks to the vibration Start a fan to blow on the pan to prevent the water from coming out of the pan 
Pretty simple right :) 

You need a USB-A pan, a fan and electric hob or induction hob. 
 
Then, we need to connect the accelerometer to the Arduino board. 
Use jumper wires to connect: 
VIN (mic) to 3.3V (board) GND to one of the GND on the board SDA to SDA SCL to SCL 
 
Then we replicate this mintage: https://adam-meyer.com/arduino/images/2011/03/tip120-lightbulb1.png 
(link to the tutorial: https://adam-meyer.com/arduino/TIP120) 
The goal of the TIP120 transistor is to be controlled as a switch. Logical 1 outputted by Arduino pin should power on the Fan and logical 0 should stop it. Here we use the A0 pin with the resistor (look at the orange wire in the pictures). 
 
Then you can fix the setup on the pan with hot glue and you need to find a way to fix the fan. I used plastic clamps (serflex). 
 
In Arduino IDE: 
Make sure you selected the right COM port: Tools > Port and select the right one. 
Select the right board: 
Tools > Boards > Arduino Renesas UNO R4 boards > Arduino UNO R4 WIFI If you don't find it, click on Tools > Boards > Boards Manager..., look for the UNO R4 and install the package 
 
Step 2: Collect Accelerometer data
To train an AI to be able to detect when water is boiling, we need first to collect data of both situation: boiling and not boiling. 
We can create some code to collect data from the accelerometer, but NanoEdge give access a tool to generate it automatically so we can use it to gain some time: 
Open NanoEdge Go the Data Logger Select Arduino boards Select the LIS3DH 
`,




]

export default descriptions
