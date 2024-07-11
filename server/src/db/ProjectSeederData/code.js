const code = [
  "Should be showing github code",
  `//Arduino Code for Bluetooth controlled Robot 
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
  `#include "virtuabotixRTC.h" 
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
  `/*
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

  `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>


#define SCREEN_WIDTH 128  // OLED display width, in pixels
#define SCREEN_HEIGHT 64  // OLED display height, in pixels

#define OLED_RESET -1        // Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3C  ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


// Adjustable
int ref_eye_height = 40;
int ref_eye_width = 40;
int ref_space_between_eye = 10;
int ref_corner_radius = 10;

//current state of the eyes
int left_eye_height = ref_eye_height;
int left_eye_width = ref_eye_width;
int left_eye_x = 32;
int left_eye_y = 32;
int right_eye_x = 32 + ref_eye_width + ref_space_between_eye;
int right_eye_y = 32;
int right_eye_height = ref_eye_height;
int right_eye_width = ref_eye_width;

int dir_x = 0;
int dir_y = 0;
int count = 0;

void draw_eyes(bool update = true);
void center_eyes(bool update = true);
void blink(int speed = 12);
void sleep();
void wakeup();
void happy_eye();
void saccade(int direction_x, int direction_y);
void move_right_big_eye();
void move_left_big_eye();
void move_big_eye(int direction);

int timeD = 1000;


void draw_eyes(bool update = true) {
  display.clearDisplay();
  //draw from center
  int x = int(left_eye_x - left_eye_width / 2);
  int y = int(left_eye_y - left_eye_height / 2);
  display.fillRoundRect(x, y, left_eye_width, left_eye_height, ref_corner_radius, SSD1306_WHITE);
  x = int(right_eye_x - right_eye_width / 2);
  y = int(right_eye_y - right_eye_height / 2);
  display.fillRoundRect(x, y, right_eye_width, right_eye_height, ref_corner_radius, SSD1306_WHITE);
  if (update) {
    display.display();
  }
}

void center_eyes(bool update = true) {
  //move eyes to the center of the display, defined by SCREEN_WIDTH, SCREEN_HEIGHT
  left_eye_height = ref_eye_height;
  left_eye_width = ref_eye_width;
  right_eye_height = ref_eye_height;
  right_eye_width = ref_eye_width;

  left_eye_x = SCREEN_WIDTH / 2 - ref_eye_width / 2 - ref_space_between_eye / 2;
  left_eye_y = SCREEN_HEIGHT / 2;
  right_eye_x = SCREEN_WIDTH / 2 + ref_eye_width / 2 + ref_space_between_eye / 2;
  right_eye_y = SCREEN_HEIGHT / 2;

  draw_eyes(update);
}

void blink(int speed = 12) {
  draw_eyes();


  for (int i = 0; i < 3; i++) {
    left_eye_height = left_eye_height - speed;
    right_eye_height = right_eye_height - speed;
    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_height = left_eye_height + speed;
    right_eye_height = right_eye_height + speed;

    draw_eyes();
    delay(1);
  }
}

void sleep() {  // DRAWS A LINE TO LOOK LIKE SLEEPING
  left_eye_height = 2;
  right_eye_height = 2;
  draw_eyes(true);
}

void wakeup() {  // WAKE UP THE EYES FROM AN LINE TO ROUND CORNERED SQUARE

  sleep();

  for (int h = 0; h <= ref_eye_height; h += 2) {
    left_eye_height = h;
    right_eye_height = h;
    draw_eyes(true);
  }
}

void happy_eye() {
  center_eyes(false);
  //draw inverted triangle over eye lower part
  int offset = ref_eye_height / 2;
  for (int i = 0; i < 10; i++) {
    display.fillTriangle(left_eye_x - left_eye_width / 2 - 1, left_eye_y + offset, left_eye_x + left_eye_width / 2 + 1, left_eye_y + 5 + offset, left_eye_x - left_eye_width / 2 - 1, left_eye_y + left_eye_height + offset, SSD1306_BLACK);
    // display.fillRect(left_eye_x-left_eye_width/2-1, left_eye_y+5, left_eye_width+1, 20,SSD1306_BLACK);

    display.fillTriangle(right_eye_x + right_eye_width / 2 + 1, right_eye_y + offset, right_eye_x - left_eye_width / 2 - 1, right_eye_y + 5 + offset, right_eye_x + right_eye_width / 2 + 1, right_eye_y + right_eye_height + offset, SSD1306_BLACK);
    // display.fillRect(right_eye_x-right_eye_width/2-1, right_eye_y+5, right_eye_width+1, 20,SSD1306_BLACK);
    offset -= 2;
    display.display();
    delay(1);
  }


  display.display();
  delay(1000);
}

void saccade(int direction_x, int direction_y) {
  //quick movement of the eye, no size change. stay at position after movement, will not move back,  call again with opposite direction
  //direction == -1 :  move left
  //direction == 1 :  move right

  int direction_x_movement_amplitude = 8;
  int direction_y_movement_amplitude = 6;
  int blink_amplitude = 8;

  for (int i = 0; i < 1; i++) {
    left_eye_x += direction_x_movement_amplitude * direction_x;
    right_eye_x += direction_x_movement_amplitude * direction_x;
    left_eye_y += direction_y_movement_amplitude * direction_y;
    right_eye_y += direction_y_movement_amplitude * direction_y;

    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    draw_eyes();
    delay(1);
  }

  for (int i = 0; i < 1; i++) {
    left_eye_x += direction_x_movement_amplitude * direction_x;
    right_eye_x += direction_x_movement_amplitude * direction_x;
    left_eye_y += direction_y_movement_amplitude * direction_y;
    right_eye_y += direction_y_movement_amplitude * direction_y;

    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;

    draw_eyes();
    delay(1);
  }
}

void move_right_big_eye() {
  move_big_eye(1);
}

void move_left_big_eye() {
  move_big_eye(-1);
}

void move_big_eye(int direction) {  // MOVES TO RIGHT OR LEFT DEPENDING ON 1 OR -1 INPUT.
  //direction == -1 :  move left
  //direction == 1 :  move right

  int direction_oversize = 1;
  int direction_movement_amplitude = 2;
  int blink_amplitude = 5;

  for (int i = 0; i < 3; i++) {
    left_eye_x += direction_movement_amplitude * direction;
    right_eye_x += direction_movement_amplitude * direction;
    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    if (direction > 0) {
      right_eye_height += direction_oversize;
      right_eye_width += direction_oversize;
    } else {
      left_eye_height += direction_oversize;
      left_eye_width += direction_oversize;
    }

    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_x += direction_movement_amplitude * direction;
    right_eye_x += direction_movement_amplitude * direction;
    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;
    if (direction > 0) {
      right_eye_height += direction_oversize;
      right_eye_width += direction_oversize;
    } else {
      left_eye_height += direction_oversize;
      left_eye_width += direction_oversize;
    }
    draw_eyes();
    delay(1);
  }

  delay(1000);

  for (int i = 0; i < 3; i++) {
    left_eye_x -= direction_movement_amplitude * direction;
    right_eye_x -= direction_movement_amplitude * direction;
    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    if (direction > 0) {
      right_eye_height -= direction_oversize;
      right_eye_width -= direction_oversize;
    } else {
      left_eye_height -= direction_oversize;
      left_eye_width -= direction_oversize;
    }
    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_x -= direction_movement_amplitude * direction;
    right_eye_x -= direction_movement_amplitude * direction;
    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;
    if (direction > 0) {
      right_eye_height -= direction_oversize;
      right_eye_width -= direction_oversize;
    } else {
      left_eye_height -= direction_oversize;
      left_eye_width -= direction_oversize;
    }
    draw_eyes();
    delay(1);
  }


  center_eyes();
}


void setup() {

  Serial.begin(115200);

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {  // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for (;;)
      ;  // Don't proceed, loop forever
  }


  // Clear the buffer
  display.clearDisplay();

  display.setTextSize(1);               // Normal 1:1 pixel scale
  display.setTextColor(SSD1306_WHITE);  // Draw white text
  display.setCursor(0, 0);              // Start at top-left corner

  display.println(F("GITHUB Link:"));
  display.println(F("  "));
  display.println(F("intellar/oled_eye_display"));
  display.println(F("  "));
  display.println(F("Press \"N\" for          Next Animation"));

  display.display();
  delay(5000);
}


void loop() {
  // delay(timeD);
  // wakeup();
  // Serial.println("Wake UP!");
  // delay(timeD);
  // center_eyes(true);
  // Serial.println("Center Eyes!");
  // delay(timeD);
  // move_right_big_eye();
  // Serial.println("Moving Right!");
  // delay(timeD);
  // move_left_big_eye();
  // Serial.println("Moving Left!");
  // delay(timeD);
  // blink(10);
  // Serial.println("Short Blink!");
  // delay(timeD);
  // happy_eye();
  // Serial.println("Happy Eye!");
  // delay(timeD);
  // blink(20);
  // Serial.println("Long Blink!");
  // delay(timeD);
  // Serial.println("All Motion!");
  // // BOTTOM LEFT
  // dir_x = -1;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // BOTTOM
  // dir_x = 0;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // BOTTOM RIGHT
  // dir_x = 1;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // RIGHT
  // dir_x = 1;
  // dir_y = 0;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP RIGHT
  // dir_x = 1;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP
  // dir_x = 0;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP LEFT
  // dir_x = -1;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // LEFT
  // dir_x = -1;
  // dir_y = 0;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);
  // delay(timeD);
  // sleep();

  //send A for one by one animation
  if (Serial.available()) {
    String data = Serial.readString();
    data.trim();
    char cmd = data[0];

    if (cmd == 'N') {

      switch (count) {
        case 0:
          wakeup();
          Serial.println("Wake UP!");
          break;
        case 1:
          center_eyes(true);
          Serial.println("Center Eyes!");
          break;
        case 2:
          move_right_big_eye();
          Serial.println("Moving Right!");
          break;
        case 3:
          move_left_big_eye();
          Serial.println("Moving Left!");
          break;
        case 4:
          blink(10);
          Serial.println("Short Blink!");
          break;
        case 5:
          happy_eye();
          Serial.println("Happy Eye!");
          break;
        case 6:
          blink(20);
          Serial.println("Long Blink!");
          break;
        case 7:
          Serial.println("All Motion!");
          // BOTTOM LEFT
          dir_x = -1;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // BOTTOM
          dir_x = 0;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // BOTTOM RIGHT
          dir_x = 1;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // RIGHT
          dir_x = 1;
          dir_y = 0;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP RIGHT
          dir_x = 1;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP
          dir_x = 0;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP LEFT
          dir_x = -1;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // LEFT
          dir_x = -1;
          dir_y = 0;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          break;
        case 8:
          sleep();
          break;
        default:
          Serial.println("Default!");
          break;
      }

      count += 1;
      if (count == 9) { count = 0; }
    }
  }
}`,

  `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>


#define SCREEN_WIDTH 128  // OLED display width, in pixels
#define SCREEN_HEIGHT 64  // OLED display height, in pixels

#define OLED_RESET -1        // Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3C  ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);


// Adjustable
int ref_eye_height = 40;
int ref_eye_width = 40;
int ref_space_between_eye = 10;
int ref_corner_radius = 10;

//current state of the eyes
int left_eye_height = ref_eye_height;
int left_eye_width = ref_eye_width;
int left_eye_x = 32;
int left_eye_y = 32;
int right_eye_x = 32 + ref_eye_width + ref_space_between_eye;
int right_eye_y = 32;
int right_eye_height = ref_eye_height;
int right_eye_width = ref_eye_width;

int dir_x = 0;
int dir_y = 0;
int count = 0;

void draw_eyes(bool update = true);
void center_eyes(bool update = true);
void blink(int speed = 12);
void sleep();
void wakeup();
void happy_eye();
void saccade(int direction_x, int direction_y);
void move_right_big_eye();
void move_left_big_eye();
void move_big_eye(int direction);

int timeD = 1000;


void draw_eyes(bool update = true) {
  display.clearDisplay();
  //draw from center
  int x = int(left_eye_x - left_eye_width / 2);
  int y = int(left_eye_y - left_eye_height / 2);
  display.fillRoundRect(x, y, left_eye_width, left_eye_height, ref_corner_radius, SSD1306_WHITE);
  x = int(right_eye_x - right_eye_width / 2);
  y = int(right_eye_y - right_eye_height / 2);
  display.fillRoundRect(x, y, right_eye_width, right_eye_height, ref_corner_radius, SSD1306_WHITE);
  if (update) {
    display.display();
  }
}

void center_eyes(bool update = true) {
  //move eyes to the center of the display, defined by SCREEN_WIDTH, SCREEN_HEIGHT
  left_eye_height = ref_eye_height;
  left_eye_width = ref_eye_width;
  right_eye_height = ref_eye_height;
  right_eye_width = ref_eye_width;

  left_eye_x = SCREEN_WIDTH / 2 - ref_eye_width / 2 - ref_space_between_eye / 2;
  left_eye_y = SCREEN_HEIGHT / 2;
  right_eye_x = SCREEN_WIDTH / 2 + ref_eye_width / 2 + ref_space_between_eye / 2;
  right_eye_y = SCREEN_HEIGHT / 2;

  draw_eyes(update);
}

void blink(int speed = 12) {
  draw_eyes();


  for (int i = 0; i < 3; i++) {
    left_eye_height = left_eye_height - speed;
    right_eye_height = right_eye_height - speed;
    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_height = left_eye_height + speed;
    right_eye_height = right_eye_height + speed;

    draw_eyes();
    delay(1);
  }
}

void sleep() {  // DRAWS A LINE TO LOOK LIKE SLEEPING
  left_eye_height = 2;
  right_eye_height = 2;
  draw_eyes(true);
}

void wakeup() {  // WAKE UP THE EYES FROM AN LINE TO ROUND CORNERED SQUARE

  sleep();

  for (int h = 0; h <= ref_eye_height; h += 2) {
    left_eye_height = h;
    right_eye_height = h;
    draw_eyes(true);
  }
}

void happy_eye() {
  center_eyes(false);
  //draw inverted triangle over eye lower part
  int offset = ref_eye_height / 2;
  for (int i = 0; i < 10; i++) {
    display.fillTriangle(left_eye_x - left_eye_width / 2 - 1, left_eye_y + offset, left_eye_x + left_eye_width / 2 + 1, left_eye_y + 5 + offset, left_eye_x - left_eye_width / 2 - 1, left_eye_y + left_eye_height + offset, SSD1306_BLACK);
    // display.fillRect(left_eye_x-left_eye_width/2-1, left_eye_y+5, left_eye_width+1, 20,SSD1306_BLACK);

    display.fillTriangle(right_eye_x + right_eye_width / 2 + 1, right_eye_y + offset, right_eye_x - left_eye_width / 2 - 1, right_eye_y + 5 + offset, right_eye_x + right_eye_width / 2 + 1, right_eye_y + right_eye_height + offset, SSD1306_BLACK);
    // display.fillRect(right_eye_x-right_eye_width/2-1, right_eye_y+5, right_eye_width+1, 20,SSD1306_BLACK);
    offset -= 2;
    display.display();
    delay(1);
  }


  display.display();
  delay(1000);
}

void saccade(int direction_x, int direction_y) {
  //quick movement of the eye, no size change. stay at position after movement, will not move back,  call again with opposite direction
  //direction == -1 :  move left
  //direction == 1 :  move right

  int direction_x_movement_amplitude = 8;
  int direction_y_movement_amplitude = 6;
  int blink_amplitude = 8;

  for (int i = 0; i < 1; i++) {
    left_eye_x += direction_x_movement_amplitude * direction_x;
    right_eye_x += direction_x_movement_amplitude * direction_x;
    left_eye_y += direction_y_movement_amplitude * direction_y;
    right_eye_y += direction_y_movement_amplitude * direction_y;

    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    draw_eyes();
    delay(1);
  }

  for (int i = 0; i < 1; i++) {
    left_eye_x += direction_x_movement_amplitude * direction_x;
    right_eye_x += direction_x_movement_amplitude * direction_x;
    left_eye_y += direction_y_movement_amplitude * direction_y;
    right_eye_y += direction_y_movement_amplitude * direction_y;

    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;

    draw_eyes();
    delay(1);
  }
}

void move_right_big_eye() {
  move_big_eye(1);
}

void move_left_big_eye() {
  move_big_eye(-1);
}

void move_big_eye(int direction) {  // MOVES TO RIGHT OR LEFT DEPENDING ON 1 OR -1 INPUT.
  //direction == -1 :  move left
  //direction == 1 :  move right

  int direction_oversize = 1;
  int direction_movement_amplitude = 2;
  int blink_amplitude = 5;

  for (int i = 0; i < 3; i++) {
    left_eye_x += direction_movement_amplitude * direction;
    right_eye_x += direction_movement_amplitude * direction;
    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    if (direction > 0) {
      right_eye_height += direction_oversize;
      right_eye_width += direction_oversize;
    } else {
      left_eye_height += direction_oversize;
      left_eye_width += direction_oversize;
    }

    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_x += direction_movement_amplitude * direction;
    right_eye_x += direction_movement_amplitude * direction;
    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;
    if (direction > 0) {
      right_eye_height += direction_oversize;
      right_eye_width += direction_oversize;
    } else {
      left_eye_height += direction_oversize;
      left_eye_width += direction_oversize;
    }
    draw_eyes();
    delay(1);
  }

  delay(1000);

  for (int i = 0; i < 3; i++) {
    left_eye_x -= direction_movement_amplitude * direction;
    right_eye_x -= direction_movement_amplitude * direction;
    right_eye_height -= blink_amplitude;
    left_eye_height -= blink_amplitude;
    if (direction > 0) {
      right_eye_height -= direction_oversize;
      right_eye_width -= direction_oversize;
    } else {
      left_eye_height -= direction_oversize;
      left_eye_width -= direction_oversize;
    }
    draw_eyes();
    delay(1);
  }
  for (int i = 0; i < 3; i++) {
    left_eye_x -= direction_movement_amplitude * direction;
    right_eye_x -= direction_movement_amplitude * direction;
    right_eye_height += blink_amplitude;
    left_eye_height += blink_amplitude;
    if (direction > 0) {
      right_eye_height -= direction_oversize;
      right_eye_width -= direction_oversize;
    } else {
      left_eye_height -= direction_oversize;
      left_eye_width -= direction_oversize;
    }
    draw_eyes();
    delay(1);
  }


  center_eyes();
}


void setup() {

  Serial.begin(115200);

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {  // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for (;;)
      ;  // Don't proceed, loop forever
  }


  // Clear the buffer
  display.clearDisplay();

  display.setTextSize(1);               // Normal 1:1 pixel scale
  display.setTextColor(SSD1306_WHITE);  // Draw white text
  display.setCursor(0, 0);              // Start at top-left corner

  display.println(F("GITHUB Link:"));
  display.println(F("  "));
  display.println(F("intellar/oled_eye_display"));
  display.println(F("  "));
  display.println(F("Press \"N\" for          Next Animation"));

  display.display();
  delay(5000);
}


void loop() {
  // delay(timeD);
  // wakeup();
  // Serial.println("Wake UP!");
  // delay(timeD);
  // center_eyes(true);
  // Serial.println("Center Eyes!");
  // delay(timeD);
  // move_right_big_eye();
  // Serial.println("Moving Right!");
  // delay(timeD);
  // move_left_big_eye();
  // Serial.println("Moving Left!");
  // delay(timeD);
  // blink(10);
  // Serial.println("Short Blink!");
  // delay(timeD);
  // happy_eye();
  // Serial.println("Happy Eye!");
  // delay(timeD);
  // blink(20);
  // Serial.println("Long Blink!");
  // delay(timeD);
  // Serial.println("All Motion!");
  // // BOTTOM LEFT
  // dir_x = -1;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // BOTTOM
  // dir_x = 0;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // BOTTOM RIGHT
  // dir_x = 1;
  // dir_y = 1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // RIGHT
  // dir_x = 1;
  // dir_y = 0;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP RIGHT
  // dir_x = 1;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP
  // dir_x = 0;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // TOP LEFT
  // dir_x = -1;
  // dir_y = -1;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);

  // // LEFT
  // dir_x = -1;
  // dir_y = 0;
  // saccade(dir_x, dir_y);
  // delay(300);
  // saccade(-dir_x, -dir_y);
  // delay(300);
  // delay(timeD);
  // sleep();

  //send A for one by one animation
  if (Serial.available()) {
    String data = Serial.readString();
    data.trim();
    char cmd = data[0];

    if (cmd == 'N') {

      switch (count) {
        case 0:
          wakeup();
          Serial.println("Wake UP!");
          break;
        case 1:
          center_eyes(true);
          Serial.println("Center Eyes!");
          break;
        case 2:
          move_right_big_eye();
          Serial.println("Moving Right!");
          break;
        case 3:
          move_left_big_eye();
          Serial.println("Moving Left!");
          break;
        case 4:
          blink(10);
          Serial.println("Short Blink!");
          break;
        case 5:
          happy_eye();
          Serial.println("Happy Eye!");
          break;
        case 6:
          blink(20);
          Serial.println("Long Blink!");
          break;
        case 7:
          Serial.println("All Motion!");
          // BOTTOM LEFT
          dir_x = -1;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // BOTTOM
          dir_x = 0;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // BOTTOM RIGHT
          dir_x = 1;
          dir_y = 1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // RIGHT
          dir_x = 1;
          dir_y = 0;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP RIGHT
          dir_x = 1;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP
          dir_x = 0;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // TOP LEFT
          dir_x = -1;
          dir_y = -1;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          // LEFT
          dir_x = -1;
          dir_y = 0;
          saccade(dir_x, dir_y);
          delay(300);
          saccade(-dir_x, -dir_y);
          delay(300);

          break;
        case 8:
          sleep();
          break;
        default:
          Serial.println("Default!");
          break;
      }

      count += 1;
      if (count == 9) { count = 0; }
    }
  }
}`,

  `#include <Wire.h>    
#include <Adafruit_PWMServoDriver.h>    
#include <SoftwareSerial.h>    
#include <NewPing.h>    
Adafruit_PWMServoDriver PWM = Adafruit_PWMServoDriver();    
const int RIGHT = A2;               // Right IR sensor connected to analog pin A2 of Arduino Uno    
const int LEFT = A3;                // Left IR sensor connected to analog pin A3 of Arduino Uno    
const int TRIGGER_PIN = A1;         // Trigger pin connected to analog pin A1 of Arduino Uno    
const int ECHO_PIN = A0;            // Echo pin connected to analog pin A0 of Arduino Uno    
const int MAX_DISTANCE = 200;       // Maximum ping distance    
unsigned int distance = 0;          // Variable to store ultrasonic sensor distance    
unsigned int Right_Value = 0;       // Variable to store Right IR sensor value    
unsigned int Left_Value = 0;        // Variable to store Left IR sensor value    
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);  // NewPing setup of pins and maximum distance    
const int servo1 = 0;    
const int servo2 = 1;    
const int servo3 = 2;    
const int servo4 = 3;    
int Servo1Degree = 150;    
int Servo2Degree = 150;    
int Servo3Degree = 150;    
int Servo4Degree = 325;    
void setup() {    
	 Serial.begin(9600);    
	 pinMode(RIGHT, INPUT); // Set analog pin RIGHT as an input    
	 pinMode(LEFT, INPUT);  // Set analog pin LEFT as an input    
	 PWM.begin();    
	 PWM.setPWMFreq(60);    
	 PWM.setPWM(servo1, 0, Servo1Degree);    
	 PWM.setPWM(servo2, 0, Servo2Degree);    
	 PWM.setPWM(servo3, 0, Servo3Degree);    
	 PWM.setPWM(servo4, 0, Servo4Degree);    
	 delay(3000);    
}    
void loop() {    
	 delay(50);                                      // Wait 50ms between pings    
	 distance = sonar.ping_cm();                     // Send ping, get distance in cm and store it in 'distance' variable    
	 Serial.print("Distance: ");    
	 Serial.println(distance);                       // Print the distance in the serial monitor    
	 Right_Value = digitalRead(RIGHT);               // Read the value from Right IR sensor    
	 Left_Value = digitalRead(LEFT);                 // Read the value from Left IR sensor    
	 Serial.print("RIGHT: ");    
	 Serial.println(Right_Value);                    // Print the right IR sensor value in the serial monitor    
	 Serial.print("LEFT: ");    
	 Serial.println(Left_Value);                     // Print the left IR sensor value in the serial monitor    
	 if ((distance > 15) && (distance < 25)) {        // Check whether the ultrasonic sensor's value stays between 15 to 25.    
	   // Move Forward:    
	   Serial.println("Move Forward");    
	   PWM.setPWM(servo2, 0, (Servo2Degree += 3));    
	 } else if ((Right_Value == 0) && (Left_Value == 0)) {    
	   // Move Right    
	   Serial.println("Move Right");    
	   PWM.setPWM(servo1, 0, Servo1Degree += 3);    
	 } else if ((Right_Value == 1) && (Left_Value == 1)) {    
	   // Move Left    
	   Serial.println("Move Left");    
	   PWM.setPWM(servo1, 0, Servo1Degree -= 3);    
	 } else if ((distance > 5) && (distance < 15)) {    
	   // Move Backward    
	   Serial.println("Move Backward");    
	   PWM.setPWM(servo2, 0, Servo2Degree -= 3);    
	 } else if ((distance > 25) && (distance < 35)) {    
	   // Move Downward    
	   Serial.println("Move Downward");    
	   PWM.setPWM(servo3, 0, Servo3Degree -= 3);    
	 } else if ((distance > 35) && (distance < 45)) {    
	   // Move Upward    
	   Serial.println("Move Upward");    
	   PWM.setPWM(servo3, 0, Servo3Degree += 3);    
	 } else if ((distance > 1) && (distance <= 5)) {    
	   // Open Finger    
	   PWM.setPWM(servo4, 0, 325);    
	   delay(150);    
	   PWM.setPWM(servo4, 0, 400);    
	   delay(900);    
	   PWM.setPWM(servo4, 0, 325);    
	 } else if ((distance > 40) && (Right_Value == 1) && (Left_Value == 0)) {    
	   // Move Stop    
	   Serial.println("Move Stop");    
	   PWM.setPWM(servo1, 0, Servo1Degree);    
	   PWM.setPWM(servo2, 0, Servo2Degree);    
	   PWM.setPWM(servo3, 0, Servo3Degree);    
	   PWM.setPWM(servo4, 0, 325);    
	 }    
}    
`,

`Github Code Should Appear Here`,

`/* =============
  Copyright (c) 2024, STMicroelectronics

  All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are permitted provided that
  the following conditions are met:

  Redistributions of source code must retain the above copyright notice, this list of conditions and the
  following disclaimer.

  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other materials provided with the distribution.

  Neither the name of the copyright holders nor the names of its contributors may be used to endorse or promote
  products derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
  INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER / OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
  USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*
*/

/* If you want to use NEAI functions please, include NEAI library
   in your Arduino libraries then, uncomment NEAI parts in the following code
*/

/* Libraries part */
#include "ArduinoGraphics.h"
#include "Arduino_LED_Matrix.h"
#include <Wire.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>
#include <NanoEdgeAI.h>
#include "knowledge.h"

/* Macros definitions */
#define SERIAL_BAUD_RATE  115200

/* Default address is 0x18 but, if SDO is powered at 3v3,
    address is set to 0x19, so you need to change it
    depending on your current hardware configuration.
*/
#define SENSOR_I2C_ADDR 0x19

/* Sensor data rates.
   You can choose from:
   LIS3DH_DATARATE_1_HZ
   LIS3DH_DATARATE_10_HZ
   LIS3DH_DATARATE_25_HZ
   LIS3DH_DATARATE_50_HZ
   LIS3DH_DATARATE_100_HZ
   LIS3DH_DATARATE_200_HZ
   LIS3DH_DATARATE_400_HZ
   LIS3DH_DATARATE_LOWPOWER_1K6HZ
   LIS3DH_DATARATE_LOWPOWER_5KHZ
*/
#define SENSOR_DATA_RATE	LIS3DH_DATARATE_LOWPOWER_1K6HZ

/* Sensor ranges.
   You can choose from:
   LIS3DH_RANGE_16_G
   LIS3DH_RANGE_8_G
   LIS3DH_RANGE_4_G
   LIS3DH_RANGE_2_G
*/
#define SENSOR_RANGE	LIS3DH_RANGE_2_G

/* NanoEdgeAI defines part
   NEAI_MODE = 1: NanoEdgeAI functions = AI Mode.
   NEAI_MODE = 0: Datalogging mode.
*/
#define NEAI_MODE 1
#define SENSOR_SAMPLES	512
#define AXIS  3

/* In this example, we use I2C connection */
Adafruit_LIS3DH lis = Adafruit_LIS3DH();

/* Global variables definitions */
static uint16_t neai_ptr = 0; //pointers to fill for sound buffer
static float neai_buffer[SENSOR_SAMPLES * AXIS] = {0.0}; //souhnd buffer

uint8_t neai_code = 0; //initialization code
uint16_t id_class = 0; // Point to id class (see argument of neai_classification fct)
float output_class_buffer[CLASS_NUMBER]; // Buffer of class probabilities
const char *id2class[CLASS_NUMBER + 1] = { // Buffer for mapping class id to class name
  "unknown",
  "bouepas_concat",
  "boue_concat",
};

/* Declare matrix to display */
byte frame[8][12] = {
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
};

char text[30];

ArduinoLEDMatrix matrix;


/* Initialization function: In this function,
    code runs only once at boot / reset.
*/
void setup() {
  /* Init serial at baud rate 115200 */
  Serial.begin(SERIAL_BAUD_RATE);
  delay(10);
  matrix.begin();

  pinMode(A0, OUTPUT);

  /* I2C workaround: Sometimes, on some boards,
     I2C get stuck after software reboot, reset so,
     to avoid this, we toggle I2C clock pin at boot.
  */
  pinMode(SCL, OUTPUT);
  for (uint8_t i = 0; i < 20; i++) {
    digitalWrite(SCL, !digitalRead(SCL));
    delay(1);
  }
  delay(100);

  /* Init I2C connection between board & sensor */
  if (!lis.begin(SENSOR_I2C_ADDR)) {
    Serial.print("Can't initialize I2C comm with LIS3DH sensor...\n");
    while (1);
  }

  /* Init LIS3DH with desired settings: odr & range */
  lis.setRange(SENSOR_RANGE);
  lis.setDataRate(SENSOR_DATA_RATE);

  /* Initialize NanoEdgeAI AI */
  neai_code = neai_classification_init(knowledge);
  if (neai_code != NEAI_OK) {
    Serial.print("Not supported board.\n");
  }
}

/* Main function: Code run indefinitely */
void loop() {
  /* Get data in the neai buffer */
  while (neai_ptr < SENSOR_SAMPLES) {
    /* Check if new data if available */
    if (lis.haveNewData()) {
      /* If new data is available we read it ! */
      lis.read();
      /* Fill neai buffer with new accel data */
      neai_buffer[AXIS * neai_ptr] = (float) lis.x;
      neai_buffer[(AXIS * neai_ptr) + 1] = (float) lis.y;
      neai_buffer[(AXIS * neai_ptr) + 2] = (float) lis.z;
      /* Increment neai pointer */
      neai_ptr++;
    }
  }
  /* Reset pointer */
  neai_ptr = 0;

  /* Depending on NEAI_MODE value, run NanoEdge AI functions
     or print accelerometer data to the serial (datalogging)
  */
  if (NEAI_MODE) {
    neai_classification(neai_buffer, output_class_buffer, &id_class);
    switch (id_class) {
      case 1:
        strcpy (text, " !!! Boiling !!! ");
        digitalWrite(A0, HIGH);
        break;
      case 2:
        strcpy (text, " Not Boiling ");
        digitalWrite(A0, LOW);
        break;
      default:
        strcpy (text, " ERROR ");
        break;
    }
    Serial.print(output_class_buffer[1]);
    Serial.print(' ');
    Serial.print(output_class_buffer[0]);
    Serial.println(' ');

    matrix.beginDraw();
    matrix.stroke(0xFFFFFFFF);
    matrix.textScrollSpeed(50);
    matrix.textFont(Font_5x7);
    matrix.beginText(0, 1, 0xFFFFFF);
    matrix.println(text);
    matrix.endText(SCROLL_LEFT);
    matrix.endDraw();

  }
  else {
    /* Print the whole buffer to the serial */
    for (uint16_t i = 0; i < AXIS * SENSOR_SAMPLES; i++) {
      Serial.print((String)neai_buffer[i] + " ");
    }
    Serial.print("\n");
  }
  /* Clean neai buffer */
  memset(neai_buffer, 0.0, AXIS * SENSOR_SAMPLES * sizeof(float));
}`,

`/* Libraries ----------------------------------------------------------*/
#include "ArduinoGraphics.h"
#include "Arduino_LED_Matrix.h"
#include "NanoEdgeAI.h"
#include "knowledge.h"

/* Defines  ----------------------------------------------------------*/
#define SENSOR_SAMPLES    1024 //buffer size
#define AXIS              1    //microphone is 1 axis
#define DOWNSAMPLE        32   //microphone as a very high data rate, we downsample it


/* Prototypes ----------------------------------------------------------*/
void get_microphone_data(); //function to collect buffer of sound

/* Global variables ----------------------------------------------------------*/
static uint16_t neai_ptr = 0; //pointers to fill for sound buffer
static float neai_buffer[SENSOR_SAMPLES * AXIS] = {0.0}; //souhnd buffer
int const AMP_PIN = A0;       // Preamp output pin connected to A0

/* NEAI PART*/
uint8_t neai_code = 0; //initialization code
uint16_t id_class = 0; // Point to id class (see argument of neai_classification fct)
float output_class_buffer[CLASS_NUMBER]; // Buffer of class probabilities
const char *id2class[CLASS_NUMBER + 1] = { // Buffer for mapping class id to class name
  "unknown",
  "up",
  "down",
};

/* Declare matrix to display */
byte frame[8][12] = {
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 },
  { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
};

char text[30];


/* Objects  ----------------------------------------------------------*/
ArduinoLEDMatrix matrix;


/* Setup function ----------------------------------------------------------*/
void setup() {
  Serial.begin(115200);
  delay(10);
  matrix.begin();

  /* Initialize NanoEdgeAI AI */
  neai_code = neai_classification_init(knowledge);
  if (neai_code != NEAI_OK) {
    Serial.print("Not supported board.\n");
  }
}

/* Infinite loop ----------------------------------------------------------*/
void loop() {
  get_microphone_data();
  neai_classification(neai_buffer, output_class_buffer, &id_class);
  /* DISPLAY THE SONG NAME */
 switch(id_class){
  case 1:
    strcpy (text, " song1 ");
    break;
  case 2:
    strcpy (text, " song2 ");
    break;
  default:
    strcpy (text, " check switch in code ");
    break;
 }

  Serial.println(id_class);
  matrix.beginDraw();
  matrix.stroke(0xFFFFFFFF);
  matrix.textScrollSpeed(50);
  matrix.textFont(Font_5x7);
  matrix.beginText(0, 1, 0xFFFFFF);
  matrix.println(text);
  matrix.endText(SCROLL_LEFT);
  matrix.endDraw();
}


/* Functions declaration ----------------------------------------------------------*/
void get_microphone_data()
{
  static uint16_t temp = 0; //stock values
  int sub = 0; //increment to downsample
  //while the buffer is not full
  while (neai_ptr < SENSOR_SAMPLES) {
    //we only get a value every DOWNSAMPLE (32 in this case)
    if (sub > DOWNSAMPLE) {
      /* Fill neai buffer with new accel data */
      neai_buffer[neai_ptr] = analogRead(AMP_PIN);
      /* Increment neai pointer */
      neai_ptr++;
      sub = 0; //reset increment
    }
    else {
      //we read the sample even if we don't use it
      //else it is instantaneous and we don't downsample
      temp = analogRead(AMP_PIN);
    }
    sub ++;
  }
  neai_ptr = 0; //reset the beginning position
}`,

`#include <U8g2lib.h>
#include <Capacitor.h>

U8G2_ST7565_ERC12864_1_4W_SW_SPI u8g2 ( U8G2_R0, /* scl=*/  13 , /* si=*/  11 , /* cs=*/  10 , /* rs=*/  9 , /* rse=*/  8 ) ;

Capacitor cap1(7,A2);

int X1,C; //resistance value
byte  f_ic, xp;
char R1_str[3];
char R_str[4];
float tau1;   
unsigned long T1, T2, tau;

void setup() {
  Serial.begin(9600);
   u8g2.begin();
   u8g2.setContrast(35);
}

   
    void loop() {
 // Serial.println(cap1.Measure());  // Measure the capacitance (in pF), print to Serial Monitor
 // delay(1000);                     // Wait for 1 second, then repeat
  Pomiar_C();
}  


void Pomiar_C(){
  Cyfry();
  char C_str[4];
  sprintf(C_str,"%d", X1);
  u8g2.firstPage();
  do {

  u8g2.drawFrame(0,0,128,64);  
  u8g2.drawRFrame(2,2,124,60,3);
    
     u8g2.setFont(u8g2_font_10x20_tr);
     u8g2.drawStr(20, 18, "Capacity:");        
     if (f_ic > 6) { 
        u8g2.setFont(u8g2_font_fub25_t_symbol);
        u8g2.drawGlyph(80,52,956);               //symbol u
     }   
     u8g2.setFont(u8g2_font_fub25_tr);
     u8g2.drawStr(xp, 52, C_str);
     if (f_ic < 7) {u8g2.drawStr(76, 52, "n");}
     if (f_ic < 4) {u8g2.drawStr(76, 52, "p");}
     u8g2.drawStr(100, 52, "F"); 
     if (f_ic == 1 or f_ic == 4 or f_ic == 7) {
         u8g2.drawStr(28, 52, "."); 
         u8g2.drawStr(40, 52, R1_str); 
     }    
  } while ( u8g2.nextPage() );
  delay(500);
}

void Cyfry(){
//  if (P1 == LOW) {tau1 = tau/2.329;}    
//  if (P2 == LOW) {tau1 = tau/350;}
 // if (P3 == LOW) {tau1 = cap1.Measure();}

 tau1 = cap1.Measure();
  //obliczenie ilości cyfr wartości
  if (tau1 >= 1 && tau1 <10) {                  
     X1 = tau1;
     int X2 = 10 * (tau1 - X1);
  sprintf(R1_str,"%d", X2);
     f_ic = 1;
     xp = 10;     
  }
  if (tau1 >= 10 && tau1 <100) {            
     X1 = tau1;
     f_ic = 2;
     xp = 32;
  }
  if (tau1 >= 100 && tau1 <1000) {         
     X1 = tau1;
     f_ic = 3;
     xp = 10;
  }
  if (tau1/1000 >= 1 && tau1/1000 <10) {        
     X1 = int(tau1/1000);
     f_ic = 4;
     xp = 10;
     int X2 = 10 * (tau1/1000 - X1);
   sprintf(R1_str,"%d", X2);
  }
  if (tau1/10000 >= 1 && tau1/10000 <10) {      
     X1 = int(tau1/1000);
     f_ic = 5;
     xp = 32;
  }
  if (tau1/100000 >= 1 && tau1/100000 <10) {    
     X1 = int(tau1/1000);
     f_ic = 6;
     xp = 10;
  }
  if (tau1/1000000 >= 1 && tau1/1000000 <10) {  
     X1 = int(tau1/1000000);
     f_ic = 7;
     xp = 10;
     
     int X2 = 10 * (tau1/1000000 - X1);
   sprintf(R1_str,"%d", X2);
  }
   if (tau1/10000000 >= 1 && tau1/10000000 <10) {  
     X1 = int(tau1/1000000);
     f_ic = 8;
     xp = 30;
   }
}`

]


export default code
