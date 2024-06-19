import { connection } from "../boot.js"
import { User, Project, Part, Image } from "../models/index.js"

class Seeder {
  static async seed() {
    await User.query().insert([
      { email: "dleibe1@google.com", cryptedPassword: "111", userName: "dleibe1", loginMethod: "standard" },
      { email: "lukeM2@hotmail.com", cryptedPassword: "111", userName: "lukeTheMan", loginMethod: "standard" },
      { email: "chrisC@google.com", cryptedPassword: "111", userName: "BigChris", loginMethod: "standard" },
      { email: "example@example.com", cryptedPassword: "example", userName: "Bob", loginMethod: "standard" },
    ])

    const description1 = ""

    await Project.query().insert([
      {
        userId: 1,
        title: "Big Brother is watching you",
        description: "The two eyes are painted on two ping-pong balls which are sticked on two servo motors.\
         Two ultrasonic sensors measure the object's position. An Arduino Nano Every board reads the measurements\
         from the ultrasonic sensors and controls the sevo motors accordingly.\
         The servo motors are SG90 micro servos and the ultrasonic sensors are HC-SR04. These are very common and very inexpensive devices. \
         The Arduino board may be of another model than the nano Every, provided that 5V is available to power the servo motors and the ultrasonic sensors. ",
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: "Should be showing github code",
        githubFileURL:
          "https://github.com/dmdhrumilmistry/ArduinoPrograms/blob/main/ArduinoUno/Projects/ControlServoMotorUsingIRremote/ControlServoMotorUsingIRremote.cpp",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/70dad73c-8d46-4172-8ad9-def5688e6b19.jpg",
          parentProjectId: 1
      },
      {
        userId: 1,
        title: "SmartPhone Controlled Arduino Based Bluetooth Car",
        description: `Gather your tools and troops (components, that is):
        The brains: An Arduino Uno, the mastermind behind the magic. 
        The translator: An HC05 Bluetooth module, your car's interpreter for smartphone commands. 
        The muscle: L298N motor driver, the beefy guy controlling those zippy wheels. 
        The bling: NeoPixel LEDs, because who doesn't love a car with dazzling lights? 
        The base: Perfboard and Sunboard, the sturdy foundation for your creation. 
        The connections: Jumper wires, the colorful threads that bring everything together. 
        The fuel: A battery, to keep your robot rolling (safely, of course!). `,
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: `//Arduino Code for Bluetooth controlled Robot 
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
        }`,
        githubFileURL:
          "",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/1f887c02-812e-411d-ad69-7be71e3715f5.jpg",
          parentProjectId: 2
      },
      {
        userId: 2,
        title: "Automated plants watering system",
        description: `In the world of do-it-yourself (DIY) projects, few activities match the practicality of constructing your own Arduino-powered automatic watering system. Imagine a setup where technology integrates effortlessly with nature, allowing you to take control of your plant care routine. We'll break down the fundamental components of this project, highlighting the vital role of the DS1302 timekeeping module and Arduino-compatible pumps. Get ready for a hands-on approach that not only enhances your technical skills but also transforms the way you care for your plants, whether they are in the corners of your home or under the open sky. `,
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: `#include "virtuabotixRTC.h" 
        #define MORNING_WATERING false 
        #define EVENING_WATERING true 
        #define MORNING_WATERING_HOUR 8 
        #define EVENING_WATERING_HOUR 20 
        #define LED_RED_PIN 7 
        #define LED_GREEN_PIN 8 
        #define BUTTON_PUSH_PIN 10 
        #define BUTTON_TOGGLE_PIN 2 
        #define POTENTIOMETER_PIN A0 
        #define POTENTIOMETER_MIN_SECONDS 0 
        #define POTENTIOMETER_MAX_SECONDS 10 
        #define PUMP_BASE_PIN 11 
        #define DS1302_CLK_PIN A5 
        #define DS1302_DAT_PIN A4 
        #define DS1302_RST_PIN 13 
        bool morningWatered = false; 
        bool eveningWatered = false; 
        struct button { 
           byte pressed = 0; 
        }; 
        struct toggle { 
           byte on = 0; 
        }; 
        struct potentiometer { 
           byte level = 0; 
        }; 
        button button; 
        toggle toggle; 
        potentiometer potentiometer; 
        virtuabotixRTC RTC(DS1302_CLK_PIN, DS1302_DAT_PIN, DS1302_RST_PIN); 
        void setup() 
        { 
           // Set pin mode for LEDs 
           pinMode(LED_RED_PIN, OUTPUT); 
           pinMode(LED_GREEN_PIN, OUTPUT); 
           // Turn red LED ON (setup in progress...) 
           digitalWrite(LED_RED_PIN, HIGH); 
           delay(3000); 
           // Set pin mode for buttons 
           pinMode(BUTTON_TOGGLE_PIN, INPUT_PULLUP); 
           pinMode(BUTTON_PUSH_PIN, INPUT_PULLUP); 
           // Set pin mode for potentiometer 
           pinMode(POTENTIOMETER_PIN, INPUT); 
           // Set pin mode for water pump 
           pinMode(PUMP_BASE_PIN, OUTPUT); 
           // Set sketch compiling time 
           setDateTime(RTC, __DATE__, __TIME__); 
           // Turn red LED OFF and green LED ON 
           digitalWrite(LED_RED_PIN, LOW); 
           digitalWrite(LED_GREEN_PIN, HIGH); 
           delay(1500); 
           // Turn green LED OFF 
           digitalWrite(LED_GREEN_PIN, LOW); 
        } 
        void loop() 
        { 
           // Allow updates of variables 
           RTC.updateTime(); 
           // Read input values 
           button.pressed = isButtonPressed(BUTTON_PUSH_PIN); 
           potentiometer.level = readPotentiometerLevelMapped(POTENTIOMETER_PIN); 
           toggle.on = isToggleOn(BUTTON_TOGGLE_PIN); 
           // Turn ON morning watering 
           if (MORNING_WATERING && RTC.hours == MORNING_WATERING_HOUR) { 
             if (morningWatered == false) { 
               morningWatered = true; 
               int wateringMilliseconds = getMillisecondsByPotentiometerLevel(potentiometer.level); 
               turnPumpTemporaryOn(wateringMilliseconds); 
             } 
           } else { 
             morningWatered = false; 
           } 
           // Turn ON evening watering 
           if (EVENING_WATERING && RTC.hours == EVENING_WATERING_HOUR) { 
             if (eveningWatered == false) { 
               eveningWatered = true; 
               int wateringMilliseconds = getMillisecondsByPotentiometerLevel(potentiometer.level); 
               turnPumpTemporaryOn(wateringMilliseconds); 
             } 
           } else { 
             eveningWatered = false; 
           } 
           // Turn ON manual watering 
           if (button.pressed) { 
             turnPumpOn(); 
             // Wait while the button is ON 
             do { 
               button.pressed = isButtonPressed(BUTTON_PUSH_PIN); 
               delay(100); 
             } while (button.pressed); 
             turnPumpOff(); 
           } 
           delay(5000); // Iterate every 5 seconds 
        } 
        `,
        githubFileURL:
          "",
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/916c664e-bd6f-403a-a3f8-234147fc8501.jpg",
          parentProjectId: 3
      },
      {
        userId: 2,
        title: "Arduino FFT Audio Spectrum analyzer on 8x32 color matrix WS2812B",
        description: `The spectrum analyzer displays the amplitude of signals as a function of frequency, allowing engineers and technicians to visualize and analyze signal characteristics. In particular, the audio analyzer performs a visual presentation of an acoustic signal in the frequency domain, where the frequency of the signal is displayed on the x-axis, while the amplitude of a certain frequency is displayed on the y-axis. In several of my previous $ videos $ I have presented several different types of such devices, but this time the FHT Arduino library is used for the first time. This library is several times faster than the commonly used FFT library, but at the expense of speed certain loss of resolution and precision appear at the two ends of the audio range. `,
        appsAndPlatforms: "Arduino IDE or PlatformIO",
        code: `/*
        Copyright (c) 2020 Janux
      
        Permission is hereby granted,   free of charge, to any person obtaining a copy
        of this software and associated   documentation files (the "Software"), to deal
        in the Software without restriction,   including without limitation the rights
        to use, copy, modify, merge, publish,   distribute, sublicense, and/or sell
        copies of the Software, and to permit persons   to whom the Software is
        furnished to do so, subject to the following conditions:
         The above copyright notice and this permission notice shall be included in all
         copies or substantial portions of the Software.
        THE SOFTWARE IS PROVIDED   "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT   NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR   PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS   BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF   CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE   SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      
        Based on an   original project for the MAX72xx LED matrix and FFT lib made from Shajeeb.
        Configuration   settings section based on work of Ragnar Ranøyen Homb from Norvegian Creation.
      */
      
      #define   LIN_OUT 1                //FHT linear output magnitude
      #define FHT_N 128                //set   SAMPLES for FHT, Must be a power of 2
      #include <FHT.h>
      
      #define xres 32                  //Total number of columns in the display, must be <= SAMPLES/2
      #define   yres 8                  //Total number of rows in the display
      #define ledPIN   6                //out pint to control Leds
      #define NUM_LEDS (xres * yres)  //total   leds in Matrix
      #include <Adafruit_NeoPixel.h>
      #include <Adafruit_NeoMatrix.h>
      
      #define colorPIN 5        //pin   to change ledcolor
      #define brightnessPIN 10  //pin to change brightness
      
      byte   displaycolor = 0;    //default color value
      byte brightness = 1;      //default   brightness level
      
      #include <EEPROM.h>
      #define CONFIG_START 32         //Memory   start location
      #define CONFIG_VERSION "VER01"  //Config version configuration
      
      typedef   struct {
        char version[6];
        byte displaycolor;
        byte brightness;
      }   configuration_type;
      
      configuration_type CONFIGURATION = {
        CONFIG_VERSION,
         displaycolor,
        brightness
      };
      
      byte yvalue;
      int peaks[xres];
      byte   state = HIGH;                    // the current reading from the input pin
      byte   previousState = LOW;             // the previous reading from the input pin
      unsigned   long lastDebounceTime = 0;   // the last time the output pin was toggled
      unsigned   long debounceDelay = 100;    // the debounce time; increase if the output flickers
      
      byte   data_avgs[xres]; //Array for samplig
      
      // Parameter 1 = number of leds in matrix
      //   Parameter 2 = pin number
      // Parameter 3 = pixel type flags, add together as needed:
      //    NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
      //   NEO_KHZ400   400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
      //   NEO_GRB     Pixels   are wired for GRB bitstream (most NeoPixel products)
      //   NEO_RGB     Pixels   are wired for RGB bitstream (v1 FLORA pixels, not v2)
      Adafruit_NeoPixel pixel   = Adafruit_NeoPixel(NUM_LEDS, ledPIN, NEO_GRB + NEO_KHZ800);
      
      // EQ filter
      byte   eq[32] = {
        60, 65, 70, 75, 80, 85, 90, 95,
        100, 100, 100, 100, 100, 100,   100, 100,
        100, 100, 100, 100, 100, 100, 100, 100,
        115, 125, 140, 160,   185, 200, 200, 200
      };
      
      bool EQ_ON = true; // set to false to disable eq
      
      //Define   5 set of colors for leds, 0 for single custom color
      byte colors[][8] = {
         {170, 160, 150, 140, 130, 120, 1, 1},
        {1, 5, 10, 15, 20, 25, 90, 90},
         {90, 85, 80, 75, 70, 65, 1, 1},
        {90, 90, 90, 30, 30, 30, 1, 1},
        {170,   160, 150, 140, 130, 120, 110, 0}
      };
      
      //Define chars for display settings
      byte   charBitmap[] = {
        0x1C, 0x10, 0x10, 0x10, 0x10, 0x1C, 0x08, 0x18, 0x08, 0x08,   0x08, 0x1C,
        0x0C, 0x12, 0x04, 0x08, 0x10, 0x1E, 0x0C, 0x12, 0x02, 0x06, 0x12,   0x0C,
        0x10, 0x10, 0x10, 0x14, 0x1E, 0x04, 0x1E, 0x10, 0x1E, 0x02, 0x12, 0x0C,
         0x1E, 0x10, 0x10, 0x1E, 0x12, 0x1E, 0x1E, 0x02, 0x04, 0x08, 0x08, 0x08,
        0x0C,   0x12, 0x0C, 0x12, 0x12, 0x0C, 0x1C, 0x12, 0x1C, 0x12, 0x12, 0x1C
      };
      
      void   setup() {
      
        pixel.begin();           //initialize Led Matrix
      
        //Begin   FFT operations
        ADCSRA = 0b11100101;    // set ADC to free running mode and   set pre-scaler to 32 (0xe5)
        ADMUX =  0b00000000;    // use pin A0 and external   voltage reference
      
        // Read config data from EEPROM
        if (loadConfig())   {
          displaycolor = CONFIGURATION.displaycolor;
          brightness = CONFIGURATION.brightness;
         }
      
        //Set brightness loaded from EEPROM
        pixel.setBrightness(brightness   * 24 + 8);
      
        //Show current config on start
        //change true to false if   you don't want this
        showSettings(3, true);
      }
      
      void loop() {
        while   (1) {            // reduces jitter
          Sampling();          // FHT Library use   only one data array
          RearrangeFHT();      // re-arrange FHT result to match   with no. of display columns
          SendToDisplay();     // send to display according   measured value
          colorChange();       // check if button pressed to change   color
          brightnessChange();  // check if button pressed to change brightness
           delay(10);           // delay to reduce flickering (FHT is too fast :D)
         }
      }
      
      void Sampling() {
        for (int i = 0; i < FHT_N; i++) {
          while   (!(ADCSRA & 0x10));   // wait for ADC to complete current conversion ie ADIF bit   set
          ADCSRA = 0b11110101 ;       // clear ADIF bit so that ADC can do next   operation (0xf5)
          //ADLAR bit is 0, so the 10 bits of ADC Data registers are   right aligned
          byte m = ADCL;              // fetch adc data
          byte j   = ADCH;
          int value = (j << 8) | m;   // form into an int
          value -= 0x0200;             // form into a signed int
          value <<= 6;                // form   into a 16b signed int
          fht_input[i] = value / 8;   // copy to fht input array   after compressing
        }
        // ++ begin FHT data process -+-+--+-+--+-+--+-+--+-+--+-+--+-+-
         fht_window();    // window the data for better frequency response
        fht_reorder();    // reorder the data before doing the fht
        fht_run();       // process the   data in the fht
        fht_mag_lin();   // take the output of the fht
      }
      
      void   RearrangeFHT() {
        // FHT return real value unsing only one array
        // after   fht_mag_lin() calling the samples value are in
        // the first FHT_N/2 position   of the array fht_lin_out[]
        int step = (FHT_N / 2) / xres;
        int c = 0;
         for (int i = 0; i < (FHT_N / 2); i += step) {
          data_avgs[c] = 0;
          for   (int k = 0 ; k < step ; k++) {
            data_avgs[c] = data_avgs[c] + fht_lin_out[i   + k];  // linear output magnitude
          }
          data_avgs[c] = data_avgs[c] /   step ; // save avgs value
          c++;
        }
      }
      
      void SendToDisplay() {
         for (int i = 0; i < xres; i++) {
          if (EQ_ON)
            data_avgs[i] = data_avgs[i]   * (float)(eq[i]) / 100; // apply eq filter
          data_avgs[i] = constrain(data_avgs[i],   0, 80);        // set max & min values for buckets to 0-80
          data_avgs[i] =   map(data_avgs[i], 0, 80, 0, yres);     // remap averaged values to yres 0-8
           yvalue = data_avgs[i];
          peaks[i] = peaks[i] - 1;                              //   decay by one light
          if (yvalue > peaks[i]) peaks[i] = yvalue;             //   save peak if > previuos peak
          yvalue = peaks[i];                                    //   pick peak to display
          setColumn(i, yvalue);                                 //   draw columns
        }
        pixel.show();                                           //   show column
      }
      
      // Light up leds of x column according to y value
      void   setColumn(byte x, byte y) {
        int led, i;
      
        for (i = 0; i < yres; i++)   {
          led = GetLedFromMatrix(x, i); //retrieve current led by x,y coordinates
           if (peaks[x] > i) {
      
            switch (displaycolor) {
              case 4:
                 if (colors[displaycolor][i] == 0) {
                  // show custom color   with zero value in array
                  pixel.setPixelColor(led, 255, 255, 255);   //withe
                }
                else {
                  // standard color defined   in colors array
                  pixel.setPixelColor(led, Wheel(colors[displaycolor][i]));
                 }
                break;
      
              case 5:
                //change color   by column
                pixel.setPixelColor(led, Wheel(x * 16));
                break;
      
               case 6:
                //change color by row
                pixel.setPixelColor(led,   Wheel(i * y * 3));
                break;
      
              case 7:
                //change   color by... country :D
      
                //Italy flagh
                //if (x < 11)   pixel.setPixelColor(led, 0, 255, 0);
                //if (x > 10 && x < 21) pixel.setPixelColor(led,   255, 255, 255);
                //if (x > 20) pixel.setPixelColor(led, 255, 0, 0);
      
                 //stars and stripes
                if (i < yres - 2) {
                  if   (x & 0x01) {
                    pixel.setPixelColor(led, 0, 0, 255);
                  }
                   else {
                    pixel.setPixelColor(led, 255, 0, 0);
                  }
                 }
                else {
                  pixel.setPixelColor(led, 255, 255,   255);
                }
      
                break;
      
              default:
                //display   colors defined in color array
                pixel.setPixelColor(led, Wheel(colors[displaycolor][i]));
             }   //END SWITCH
          }
          else {
            //Light off leds
            pixel.setPixelColor(led,   pixel.Color(0, 0, 0));
          }
        }
      }
      
      //================================================================
      //   Calculate a led number by x,y coordinates
      // valid for WS2812B with serpentine   layout placed in horizzontal
      // and zero led at bottom right (DIN connector on   the right side)
      // input value: x= 0 to xres-1 , y= 0 to yres-1
      // return   a led number from 0 to NUM_LED
      //================================================================
      int   GetLedFromMatrix(byte x, byte y) {
        int led;
        x = xres - x - 1;
        if   (x & 0x01) {
          //Odd columns increase backwards
          led = ((x + 1) * yres   - y - 1);
        }
        else {
          //Even columns increase normally
          led   = ((x + 1) * yres - yres + y);
        }
        return constrain(led, 0, NUM_LEDS);
      }
      //================================================================
      
      void   colorChange() {
        int reading = digitalRead(colorPIN);
        if (reading == HIGH   && previousState == LOW && millis() - lastDebounceTime > debounceDelay) {
          displaycolor++;
           if (displaycolor > 7) displaycolor = 0;
          showSettings(1, true); //set   to false if you don't want this
          saveConfig();
          lastDebounceTime = millis();
         }
        previousState = reading;
      }
      
      void brightnessChange() {
        int   reading = digitalRead(brightnessPIN);
        if (reading == HIGH && previousState   == LOW && millis() - lastDebounceTime > debounceDelay) {
          brightness++;
           if (brightness > 7) brightness = 0;
          pixel.setBrightness(brightness *   24 + 8);
          showSettings(2, true); //set to false if you don't want this
           saveConfig();
          lastDebounceTime = millis();
        }
        previousState   = reading;
      }
      
      // Utility from Adafruit Neopixel demo sketch
      // Input   a value 0 to 255 to get a color value.
      // The colours are a transition R - G   - B - back to R.
      unsigned long Wheel(byte WheelPos) {
        WheelPos = 255 - WheelPos;
         if (WheelPos < 85) {
          return pixel.Color(255 - WheelPos * 3, 0, WheelPos   * 3);
        }
        if (WheelPos < 170) {
          WheelPos -= 85;
          return pixel.Color(0,   WheelPos * 3, 255 - WheelPos * 3);
        }
        WheelPos -= 170;
        return pixel.Color(WheelPos   * 3, 255 - WheelPos * 3, 0);
      }
      
      // load whats in EEPROM in to the local   CONFIGURATION if it is a valid setting
      int loadConfig() {
        if (EEPROM.read(CONFIG_START   + 0) == CONFIG_VERSION[0] &&
            EEPROM.read(CONFIG_START + 1) == CONFIG_VERSION[1]   &&
            EEPROM.read(CONFIG_START + 2) == CONFIG_VERSION[2] &&
            EEPROM.read(CONFIG_START   + 3) == CONFIG_VERSION[3] &&
            EEPROM.read(CONFIG_START + 4) == CONFIG_VERSION[4])   {
      
          // load (overwrite) the local configuration struct
          for (unsigned   int i = 0; i < sizeof(CONFIGURATION); i++) {
            *((char*)&CONFIGURATION +   i) = EEPROM.read(CONFIG_START + i);
          }
          return 1; // return 1 if config   loaded
        }
        return 0; // return 0 if config NOT loaded
      }
      
      // save   the CONFIGURATION in to EEPROM
      void saveConfig() {
        CONFIGURATION.displaycolor   = displaycolor;
        CONFIGURATION.brightness = brightness;
        for (unsigned int   i = 0; i < sizeof(CONFIGURATION); i++)
          EEPROM.write(CONFIG_START + i, *((char*)&CONFIGURATION   + i));
      }
      
      // 1 display color level, 2 display brightness level, 3 both
      void   showSettings(byte num, bool show) {
        if (show) {
          pixel.clear();
          if   (num == 1 || num == 3) {
            drawChar(0, 0);
            drawChar(displaycolor   + 1, 5);
          }
          if (num == 2 || num == 3) {
            drawChar(9, xres -   9);
            drawChar(brightness + 1, xres - 4);
          }
          delay(1000);
           pixel.clear();
        }
      }
      
      // Draw custom chars
      void drawChar(byte   val, byte pos) {
        for (int x = 4; x >= 0; x--) {
          for (int y = 5; y >=   0; y--) {
            if ((charBitmap[val * 6 + 5 - y] >> x) & 0x01) {
              pixel.setPixelColor(GetLedFromMatrix(4   - x + pos, y + 1), Wheel((pos > 10) * 170));
              pixel.show();
            }
           }
        }
      }
      //by Janux®, Last version on 28/06/2020.`,
        thumbnailImageURL:
          "https://projects.arduinocontent.cc/cover-images/f27de0e3-aa87-4c5f-966a-37b14891dadd.jpg",
          parentProjectId: 4
      },
    ])

    await Part.query().insert([
      { partName: "Arduino", projectId: 1 },
      { partName: "Breadboard", projectId: 1 },
      { partName: "Arduino", projectId: 2 },
      { partName: "H-bridge", projectId: 2 },
      { partName: "ESP32", projectId: 3 },
      { partName: "H-bridge", projectId: 3 },
      { partName: "Arduino", projectId: 4 },
      { partName: "RBG LED", projectId: 4 },
    ])

    await Image.query().insert([
      { projectId: 1, imageURL: "https://projects.arduinocontent.cc/5dcac3f5-28bf-4a60-91c0-b71b5d034810.jpg" },
      { projectId: 1, imageURL: "https://projects.arduinocontent.cc/22cb4e0d-ce36-4b55-a743-42a64ca1b9d0.jpg" },
      { projectId: 2, imageURL: "https://circuitdigest.com/sites/default/files/circuitdiagram_mic/Arduino-Robot-Circuit-Diagram.png" },
      { projectId: 3, imageURL: "https://www.hibit.dev/images/posts/2024/watering_bottle_pump_connector.png" },
      { projectId: 3, imageURL: "https://www.hibit.dev/images/posts/2024/schemas/watering_system.png" },
      { projectId: 4, imageURL: "https://projects.arduinocontent.cc/4e0bc386-4bd4-467a-8b59-084830978a17.jpg" },
      { projectId: 4, imageURL: "https://projects.arduinocontent.cc/baa52ff1-ba12-4836-8e73-c7d2ea01f084.jpg" },
    ])

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
