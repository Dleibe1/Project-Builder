const code = [
  `/********** Big Brother **********/
/******** is watching you ********/

/* Adjust these two values to reflect the
   position of the X ultrasonic sensor. */
const int A=20; // cm
const int B=15; // cm

/* Hardware connections */

const int trigPinX=2, echoPinX=3;
const int trigPinY=5, echoPinY=6;
const int servoPinL=8;
const int servoPinR=10;

float measureDist(int trigPin, int echoPin)
{
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(20);
  digitalWrite(trigPin, LOW);
  return pulseIn(echoPin, HIGH)/2*.0343;  
}

void servoControl(int servoPin, int angle)
{
  unsigned int duration;

  duration=map(angle, 0, 180, 544, 2400);
  digitalWrite(servoPin, HIGH);
  delayMicroseconds(duration);
  digitalWrite(servoPin, LOW);
}

void setup()
{
  pinMode(trigPinX, OUTPUT);
  pinMode(trigPinY, OUTPUT);
  pinMode(servoPinL, OUTPUT);
  pinMode(servoPinR, OUTPUT);
}

void loop()
{
  float distX, distY;
  int pos, diff;
  int limDistX, limDistY;

  distX=measureDist(trigPinX, echoPinX);
  limDistX=(int)constrain(distX, 4, 2*A);
  pos=map(limDistX, 4, 2*A, 45, 135);

  distY=measureDist(trigPinY, echoPinY);
  limDistY=(int)constrain(distY, 4, B);
  diff=map(limDistY, 4, B, 40, 0);

  if(pos==135)
  {
    pos=90;
    diff=0;
  }

  servoControl(servoPinL, pos-diff);
  servoControl(servoPinR, pos+diff);
  delay(60);
}`,
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
  ` #include Arduino.h
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

`#include <Servo.h> 
#include <SPI.h>
#include "Ucglib.h"           


#define  trigPin   6       
#define  echoPin   5        
#define  ServoPin  3         
int Ymax = 240;              
int Xmax = 320;              

int Xcent = Xmax / 2;       
int base = 210;              
int scanline = 185;         

Servo baseServo; 
//Ucglib_ILI9341_18x240x320_SWSPI ucg(/*sclk=*/ 13, /*data=*/ 11, /*cd=*/ 9, /*cs=*/ 10, /*reset=*/ 8);
Ucglib_ILI9341_18x240x320_HWSPI ucg(/*cd=*/ 9, /*cs=*/ 10, /*reset=*/ 8);

void setup(void)
{
 
      ucg.begin(UCG_FONT_MODE_SOLID); 
      ucg.setRotate90();             
      
      pinMode(trigPin, OUTPUT);      
      pinMode(echoPin, INPUT);       
      Serial.begin(115200);            
      baseServo.attach(ServoPin);   
    
      
      ucg.setFontMode(UCG_FONT_MODE_TRANSPARENT);
      ucg.setColor(0, 0, 100, 0);
      ucg.setColor(1, 0, 100, 0);
      ucg.setColor(2, 20, 20,20);
      ucg.setColor(3, 20, 20, 20);
      ucg.drawGradientBox(0, 0, 320, 240);
      ucg.setPrintDir(0);
      ucg.setColor(0, 5, 0);
      ucg.setPrintPos(70,120);
      ucg.setFont(ucg_font_logisoso32_tf);  
      ucg.print("Mini Radar");
      ucg.setColor(0, 255, 0);
      ucg.setPrintPos(70,120);
      ucg.print("Mini Radar");
      ucg.setFont(ucg_font_courB14_tf);
      ucg.setColor(20, 255, 20);
      ucg.setPrintPos(90,200);
      ucg.print("Testing...");
      baseServo.write(90);
    
    
      for(int x=0;x<180;x+=5)
          { baseServo.write(x);
            delay(50);
           }
      ucg.print("OK!");
      delay(500);
      ucg.setColor(0,0, 0, 0);
      ucg.setColor(1,0, 0, 0);
      ucg.setColor(2,0, 0, 0);
      ucg.setColor(3,0, 0, 0);
      ucg.drawGradientBox(0, 0, 320, 240);
      delay(10);
    
    
      //ucg.clearScreen();
      cls();
      ucg.setFontMode(UCG_FONT_MODE_SOLID);
      ucg.setFont(ucg_font_helvR08_hr);   // or freedoomr10_tr
  
}


void cls()
{
 
  ucg.setColor(0, 0, 0, 0);
  for(int s=0;s<240;s++)
  {
    ucg.drawHLine(0,s,320);
    delay(1);
  }
    
  //ucg.drawBox(0, 0, 160, 60);

}


int calculateDistance()
{ 
      long duration;
    
      digitalWrite(trigPin, LOW); 
      delayMicroseconds(2);
      
      digitalWrite(trigPin, HIGH); 
      delayMicroseconds(10);
      digitalWrite(trigPin, LOW);
      
      duration = pulseIn(echoPin, HIGH);
     
      return duration*0.034/2;
}

void fix_font() 
{
      ucg.setColor(0, 180, 0);
      ucg.setPrintPos(144,44);
      ucg.print("1.00");
      ucg.setPrintPos(144,100);
      ucg.print("0.60");
      ucg.setPrintPos(144,165);
      ucg.print("0.30");
}

void fix()
{

      ucg.setColor(0, 180, 0);
    
      ucg.drawDisc(Xcent, base+1, 3, UCG_DRAW_ALL); 
      ucg.drawCircle(Xcent, base+1, 210, UCG_DRAW_UPPER_LEFT);
      ucg.drawCircle(Xcent, base+1, 210, UCG_DRAW_UPPER_RIGHT);
      ucg.drawCircle(Xcent, base+1, 135, UCG_DRAW_UPPER_LEFT);
      ucg.drawCircle(Xcent, base+1, 135, UCG_DRAW_UPPER_RIGHT);
      ucg.drawCircle(Xcent, base+1, 70, UCG_DRAW_UPPER_LEFT);
      ucg.drawCircle(Xcent, base+1, 70, UCG_DRAW_UPPER_RIGHT);
      ucg.drawLine(0, base+1, Xmax,base+1);
     
      ucg.setColor(0, 180, 0);
     
       for(int i= 40;i < 300; i+=2)
       {

        if (i % 10 == 0) 
          ucg.drawLine(185*cos(radians(i))+Xcent,base - 185*sin(radians(i)) , 205*cos(radians(i))+Xcent,base - 205*sin(radians(i)));
        
        else
        
         ucg.drawLine(195*cos(radians(i))+Xcent,base - 195*sin(radians(i)) , 205*cos(radians(i))+Xcent,base - 205*sin(radians(i)));
         
       }
          
     
       ucg.setColor(0,200,0);
       ucg.drawLine(0,0,0,36);
       for(int i= 0;i < 5; i++)
       {
          ucg.setColor(0,random(200)+50,0);
          ucg.drawBox(2,i*8,random(28)+3,6);
       }

       ucg.setColor(0,180,0);
       ucg.drawFrame(292,0,28,28);
       ucg.setColor(0,60,0);
       ucg.drawHLine(296,0,20);
       ucg.drawVLine(292,4,20);
       ucg.drawHLine(296,52,20);
       ucg.drawVLine(318,4,20);
        
       ucg.setColor(0,220,0);
       ucg.drawBox(296,4,8,8);
       ucg.drawBox(296,16,8,8);
       ucg.drawBox(308,16,8,8);
       ucg.setColor(0,100,0);
       ucg.drawBox(308,4,8,8);

       ucg.setColor(0,90,0);
       ucg.drawTetragon(124,220,116,230,196,230,204,220);
       ucg.setColor(0,160,0);
       ucg.drawTetragon(134,220,126,230,186,230,194,220);
       ucg.setColor(0,210,0);
       ucg.drawTetragon(144,220,136,230,176,230,184,220);
}



void loop(void)
{
  
  int distance;
  
  fix(); 
  fix_font(); 

  for (int x=180; x > 4; x-=2){      
     
      baseServo.write(x);             
      
     
      int f = x - 4; 
      ucg.setColor(0, 255, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      f+=2;
      ucg.setColor(0, 128, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      f+=2;
      ucg.setColor(0, 0, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      ucg.setColor(0,200, 0);
     
      distance = calculateDistance();
     
     
      if (distance < 100)
      {
        ucg.setColor(255,0,0);
        ucg.drawDisc(2.2*distance*cos(radians(x))+ Xcent,-2.2*distance*sin(radians(x))+base, 1, UCG_DRAW_ALL);
      }
      else
      { 
        ucg.setColor(255,255,0);
        ucg.drawDisc(208*cos(radians(x))+Xcent,-208*sin(radians(x))+base, 1, UCG_DRAW_ALL);
      }
    
           
     
      Serial.print(x); 
      Serial.print("    ,   ");
      Serial.println(distance); 
     

      if (x > 70 and x < 110)  fix_font(); 


      ucg.setColor(255,255,  0);
      ucg.setPrintPos(20,230);
      ucg.print("DEG: "); 
      ucg.setPrintPos(54,230);
      ucg.print(x);
      ucg.print("  ");
      ucg.setPrintPos(240,230);
      ucg.print("     ");
      ucg.print(distance);
      ucg.print(" cm    "); 
      
  }
  //ucg.clearScreen();  
  delay(50);
  cls();   
 
  fix(); 
  fix_font();         
  
  for (int  x=1; x < 176; x+=2){     
      baseServo.write(x);             
      
     
      int f = x + 4;
      ucg.setColor(0, 255, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      f-=2;
      ucg.setColor(0, 128, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      f-=2;
      ucg.setColor(0, 0, 0);
      ucg.drawLine(Xcent, base, scanline*cos(radians(f))+Xcent,base - scanline*sin(radians(f)));
      ucg.setColor(0, 200, 0);
      
      distance = calculateDistance();

      
      if (distance < 100)
      {
        ucg.setColor(255,0,0);
        ucg.drawDisc(2.2*distance*cos(radians(x))+Xcent,-2.2*distance*sin(radians(x))+base, 1, UCG_DRAW_ALL);
      }
      else
      { 
        ucg.setColor(255,255,0);
        ucg.drawDisc(208*cos(radians(x))+Xcent,-208*sin(radians(x))+base, 1, UCG_DRAW_ALL);
      }
           
      
      Serial.print(x); 
      Serial.print("    ,   ");
      Serial.println(distance); 
     
      if (x > 70 and x < 110)  fix_font(); 
      
      ucg.setColor(255,255,  0);
      ucg.setPrintPos(20,230);
      ucg.print("DEG: "); 
      ucg.setPrintPos(54,230);
      ucg.print(x);
      ucg.print("  ");
      ucg.setPrintPos(240,230);
      ucg.print("     ");
      ucg.print(distance);
      ucg.print(" cm    "); 
  
  }
 //ucg.clearScreen(); //
 delay(50);
 cls();


}`,

`#include <IRremote.h>

int RECV_PIN = 11;

IRrecv irrecv(RECV_PIN);

decode_results  results;

void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn();  // Start the receiver
}

void loop() {
  if (irrecv.decode(&results))  {
   
    Serial.println(results.value, HEX);
    irrecv.resume(); // Receive  the next value
  }
}

//`,

`int motor1pin1 = 2;
int motor1pin2 = 3;

int motor2pin1 = 4;
int   motor2pin2 = 5;

void setup() {
  // put your setup code here, to run once:
   pinMode(motor1pin1, OUTPUT);
  pinMode(motor1pin2, OUTPUT);
  pinMode(motor2pin1,   OUTPUT);
  pinMode(motor2pin2, OUTPUT);

  //(Optional)
  pinMode(9,   OUTPUT); 
  pinMode(10, OUTPUT);
  //(Optional)
}

void loop() {
   // put your main code here, to run repeatedly:

  //Controlling speed (0   = off and 255 = max speed):     
  //(Optional)
  analogWrite(9, 100); //ENA   pin
  analogWrite(10, 200); //ENB pin
  //(Optional)
  
  digitalWrite(motor1pin1,   HIGH);
  digitalWrite(motor1pin2, LOW);

  digitalWrite(motor2pin1, HIGH);
   digitalWrite(motor2pin2, LOW);
  delay(3000);

  digitalWrite(motor1pin1,   LOW);
  digitalWrite(motor1pin2, HIGH);

  digitalWrite(motor2pin1, LOW);
   digitalWrite(motor2pin2, HIGH);
  delay(3000);
}
`,

`/* 
  Sketch generated by the Arduino IoT Cloud Thing "MKR WiFi 1010 and DHT22"
  https://create.arduino.cc/cloud/things/e75efe13-eb5e-432a-86d3-0bf1cd34aaac 
  
Arduino IoT Cloud Variables description

  The following variables are automatically generated and updated when changes are made to the Thing

  CloudTemperatureSensor temperature;
  CloudRelativeHumidity humidity;

  Variables which are marked as READ/WRITE in the Cloud Thing will also have functions
  which are called when their values are changed from the Dashboard.
  These functions are generated with the Thing and added at the end of this sketch.
*/

#include "thingProperties.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 7    // Digital pin connected to the DHT sensor 
#define DHTTYPE    DHT22     // Write DHT11 or DHT22 According to your Sensor

DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;
unsigned long previousMillis = 0;
const long interval = 20000; //milliseconds  total time for 20 Seconds



void setup() {
  // Initialize serial and wait for port to open:
  Serial.begin(9600);
  // This delay gives the chance to wait for a Serial Monitor without blocking if none is found
  delay(1500); 

  // Defined in thingProperties.h
  initProperties();

  // Connect to Arduino IoT Cloud
  ArduinoCloud.begin(ArduinoIoTPreferredConnection);
  
  /*
     The following function allows you to obtain more information
     related to the state of network and IoT Cloud connection and errors
     the higher number the more granular information you’ll get.
     The default is 0 (only errors).
     Maximum is 4
 */
  setDebugMessageLevel(2);
  ArduinoCloud.printDebugInfo();

  dht.begin(); //Init DHT

  Serial.println(F("DHTxx Unified Sensor Example"));
  // Print temperature sensor details.
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));
  // Print humidity sensor details.
  dht.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
  Serial.println(F("------------------------------------"));
  // Set delay between sensor readings based on sensor details.
  delayMS = sensor.min_delay / 1000;
  STHAM();
  
}

void loop() {
  ArduinoCloud.update();
  // Your code here 
  
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    STHAM();
    previousMillis = currentMillis;
  }
}


void STHAM(){
  // Get temperature event and print its value.
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
    //Assign temperature value 0 to Cloud Variable
    temperature=0;
  }
  else {
    Serial.print(F("Temperature: "));
    Serial.print(event.temperature);
    Serial.println(F("°C"));
    //Assign temperature value to Cloud Variable
    temperature=event.temperature;
  }
  
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
    //Assign humidity value 0 to Cloud Variable
    humidity=0;
  }
  else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
    //Assign humidity value to Cloud Variable
    humidity=event.relative_humidity;
  }
}

/*
  Since Temperature is READ_WRITE variable, onTemperatureChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onTemperatureChange()  {
  // Add your code here to act upon Temperature change
}

/*
  Since Humidity is READ_WRITE variable, onHumidityChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onHumidityChange()  {
  // Add your code here to act upon Humidity change
}`,
`/* If you want to use NEAI functions please, include NEAI library
 * in your Arduino libraries then, uncomment NEAI parts in the following code
 */

/* Libraries part */
#include <Wire.h>
#include <Adafruit_LIS3DH.h>
#include <Adafruit_Sensor.h>
#include <Keyboard.h>
#include <NanoEdgeAI.h>
#include "knowledge.h"
float input_user_buffer[DATA_INPUT_USER * AXIS_NUMBER]; // Buffer of input values
float output_class_buffer[CLASS_NUMBER]; // Buffer of class probabilities
uint16_t id_class = 0;
  
/* Macros definitions */
#define SERIAL_BAUD_RATE  115200

/* Default address is 0x18 but, if SDO is powered at 3v3,
 *  address is set to 0x19, so you need to change it
 *  depending on your current hardware configuration.
 */
#define SENSOR_I2C_ADDR 0x18

/* Sensor data rates.
 * You can choose from:
 * LIS3DH_DATARATE_1_HZ
 * LIS3DH_DATARATE_10_HZ
 * LIS3DH_DATARATE_25_HZ
 * LIS3DH_DATARATE_50_HZ
 * LIS3DH_DATARATE_100_HZ
 * LIS3DH_DATARATE_200_HZ
 * LIS3DH_DATARATE_400_HZ
 * LIS3DH_DATARATE_LOWPOWER_1K6HZ
 * LIS3DH_DATARATE_LOWPOWER_5KHZ
 */
#define SENSOR_DATA_RATE	LIS3DH_DATARATE_400_HZ

/* Sensor ranges.
 * You can choose from:
 * LIS3DH_RANGE_16_G
 * LIS3DH_RANGE_8_G
 * LIS3DH_RANGE_4_G
 * LIS3DH_RANGE_2_G
 */
#define SENSOR_RANGE	LIS3DH_RANGE_2_G

/* NanoEdgeAI defines part
 * NEAI_MODE = 1: NanoEdgeAI functions = AI Mode.
 * NEAI_MODE = 0: Datalogging mode.
 */
#define NEAI_MODE 1
#define SENSOR_SAMPLES	256
#define AXIS  3

Adafruit_LIS3DH lis = Adafruit_LIS3DH();

/* Global variables definitions */
static uint16_t neai_ptr = 0;
static float neai_buffer[SENSOR_SAMPLES * AXIS] = {0.0};


/* Initialization function: In this function,
 *  code runs only once at boot / reset.
 */
void setup() {
  /* Init serial at baud rate 115200 */
  Serial.begin(SERIAL_BAUD_RATE);

  /* Init I2C connection between board & sensor */
  if (!lis.begin(SENSOR_I2C_ADDR)) {
    Serial.println("Can't initialize I2C comm with LIS3DH sensor...\n");
    while(1);
  }
  Serial.println("OK");
  /* Init LIS3DH with desired settings: odr & range */
  lis.setRange(SENSOR_RANGE);
  lis.setDataRate(SENSOR_DATA_RATE);

  /* Initialize NanoEdgeAI AI */
  enum neai_state error_code = neai_classification_init(knowledge);
  if (error_code != NEAI_OK) {
    Serial.println("Error starting NanoEdge AI lib");
    /* This happens if the knowledge does not correspond to the library or if the library works into a not supported board. */
  }

  Keyboard.begin();
  delay(1000);
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
   * or print accelerometer data to the serial (datalogging)
   */
  
  if (NEAI_MODE) {
    neai_classification(neai_buffer, output_class_buffer, &id_class);

    if (id_class == 1) {
      Keyboard.write(KEY_PAGE_DOWN);
      delay(100);  
    } else if (id_class == 2) {
      Keyboard.write(KEY_PAGE_UP);
      delay(100); 
    }
  } else {
    /* Print the whole buffer to the serial */
    for (uint16_t i = 0; i < AXIS * SENSOR_SAMPLES; i++) {
      Serial.print((String)neai_buffer[i] + " ");
    }
    Serial.print("\n");
  }

  /* Clean neai buffer */
  memset(neai_buffer, 0.0, AXIS * SENSOR_SAMPLES * sizeof(float));
}`,
`#include <LiquidCrystal.h> // Include the LiquidCrystal library for LCD display
LiquidCrystal lcd(12, 11, 6, 7, 8, 9); // Initialize the LCD object with pin numbers

int sensorInput = 2;   // PIR sensor input pin
int sensorReturn = 0;  // Variable to store PIR sensor output

void setup() {
  pinMode(sensorInput, INPUT); // Set sensor pin as input
  // Set up the LCD's number of columns and rows
  lcd.begin(16, 2);
  // Print initial message on the LCD
  lcd.setCursor(0, 0);
  lcd.print("PIR Sensor Says:");
  lcd.setCursor(0, 1);
}

void loop() {
  sensorReturn = digitalRead(sensorInput); // Read input value from PIR sensor
  
  // Check if motion is detected
  if (sensorReturn == HIGH) {
    // Set cursor to the second row and print motion detection message
    lcd.setCursor(0, 1);
    lcd.print("Motion Occurs   ");
  } else {
    // Set cursor to the second row and print motion stopped message
    lcd.setCursor(0, 1);
    lcd.print("Motion Stops    ");
  }
}`,
`//Interfacing RGB LED with Arduino 
//Author: Osama Ahmed Modified by lukeTheMan
//Defining  variable and the GPIO pin on Arduino
int redPin= 11;
int greenPin = 10;
int bluePin = 9;

void setup() {
  //Defining the LED pins as OUTPUT
  pinMode(redPin,  OUTPUT);              
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}
void  loop() {
  setColor(255, 0, 0); // Red Color
  delay(1000);
  setColor(0,  255, 0); // Green Color
  delay(1000);
  setColor(0, 0, 255); // Blue Color
  delay(1000);
  setColor(255, 255, 255); // White Color
  delay(1000);
  setColor(170, 0, 255); // Purple Color
  delay(1000);
  setColor(127, 127,  127); // Light Blue
  delay(1000);
}
void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
}
`,
`#include <dht11.h>
#define DHT11PIN 4

dht11 DHT11;

void setup(){
  Serial.begin(9600);
}

void loop(){
  Serial.println();
  int chk = DHT11.read(DHT11PIN);
  float humidity = DHT11.humidity;
  float temperature = DHT11.temperature;
  Serial.print("Humidity (%): ");
  Serial.println(humidity);
  Serial.print("Temperature (C): ");
  Serial.println(temperature);
  delay(2000);
}`,
`const int buzzer = 8;
const int trig_pin = 9;
const int echo_pin = 10;
float timing = 0.0;
float distance = 0.0;

void setup()
{
  pinMode(echo_pin, INPUT);
  pinMode(trig_pin, OUTPUT);
  pinMode(buzzer, OUTPUT);
  
  digitalWrite(trig_pin, LOW);
  digitalWrite(buzzer, LOW);
    
  Serial.begin(9600);
}

void loop()
{
  digitalWrite(trig_pin, LOW);
  delay(2);
  
  digitalWrite(trig_pin, HIGH);
  delay(10);
  digitalWrite(trig_pin, LOW);
  
  timing = pulseIn(echo_pin, HIGH);
  distance = (timing * 0.034) / 2;
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print("cm | ");
  Serial.print(distance / 2.54);
  Serial.println("in");
  
    
  if (distance <= 50) {
  	tone(buzzer, 500);
  } else {
  	noTone(buzzer);
  }
  
  delay(100);
}`,
`int greenLight = 0; //Defining pins
int yellowLight = 1;
int redLight   = 2;
int piezoBuzzer = 3;
int maximumMoistureLevel; //The max moisture level   and current moisture levels will be needed for percentage calculations
int currentMoistureLevel;//Like   so: current/max*100 = Moisture level as a percentage

void moistureDetection(){   //Create a function for all the long code, to keep the loop free
  if(currentMoistureLevel/maximumMoistureLevel   <= 0.1){ //If the moisture is below 10%
    digitalWrite(greenLight, LOW);
     digitalWrite(yellowLight, LOW);
    digitalWrite(redLight, HIGH); //Switch   on red light, and sound the buzzer
    tone(piezoBuzzer, 5000, 500);
    delay(2000);
   }else if (currentMoistureLevel/maximumMoistureLevel <= 0.3 && currentMoistureLevel/maximumMoistureLevel   > 0.1)
  {//if the moisture level is in between 10 and 30%
    digitalWrite(greenLight,   LOW);
    digitalWrite(yellowLight, LOW);
    digitalWrite(redLight, HIGH);   //Switch red light on, but don't sound the buzzer
  }else if (currentMoistureLevel/maximumMoistureLevel   <= 0.6 && currentMoistureLevel/maximumMoistureLevel > 0.3)
  {//if the moisture   level is in between 30 and 60%
    digitalWrite(greenLight, LOW);
    digitalWrite(yellowLight,   HIGH);//Just switch yellow light on
    digitalWrite(redLight, LOW);
  } else   //Otherwise the moisture level is above 60%, and therefore it's good enough
   {
    digitalWrite(greenLight, HIGH);//Switch green light on
    digitalWrite(yellowLight,   LOW);
    digitalWrite(redLight, LOW);
  }
}

void setup() {
   for (int i = 0; i < 4; i++)//Use a for loop, to not have to initiate all the pins   by hand
  {
    pinMode(i, OUTPUT);
  }
  pinMode (A0, INPUT); //A0   is the pin used for the Soil Moisture Sensor
  maximumMoistureLevel = analogRead(A0);
   tone(piezoBuzzer, 5000, 500);
  delay(200);
  tone(piezoBuzzer, 6000, 500);//Make   a sound to show that the program has been initiated.
  delay(600);
}

void   loop() {
  currentMoistureLevel = analogRead(A0); //Keep renewing the readings   for the current moisture level
  moistureDetection();
  delay(100); //Short   delay to not overload the program
  Serial.println(currentMoistureLevel);//Just   so you can see the moisture level as a reading between 0-1023
  
  
}`,
`#include "thingProperties.h"
#include <Button2.h>
#include <DaikinHeatpumpIR.h>


constexpr int IR_PIN = 12;
constexpr int BTN_PIN = 39;

IRSenderESP32 irSender(IR_PIN, 0);
DaikinHeatpumpIR irHeatpump;
Button2 button;

void setup() {
  // Connect to Arduino IoT Cloud
  initProperties();
  ArduinoCloud.begin(ArduinoIoTPreferredConnection);
  
  // Initialize variables and pins
  pinMode(39, INPUT_PULLUP);
  //pinMode(IR_PIN, OUTPUT);

  button.begin(BTN_PIN);
  button.setTapHandler([](Button2& btn) {
    mode = (mode == "OFF") ? "COOL" : "OFF";
    send();
  });  
}

void loop() {
  ArduinoCloud.update();
  button.loop();
}

// Handle incoming messages
void onOnOffChange()  {
  send();
}

void send() {
  if (mode == "HEAT") {
    irHeatpump.send(irSender, POWER_ON, MODE_HEAT, FAN_AUTO, temperature, VDIR_UP, HDIR_AUTO);
  } else if (mode == "COOL") {
    irHeatpump.send(irSender, POWER_ON, MODE_COOL, FAN_AUTO, temperature, VDIR_UP, HDIR_AUTO);
  } else if (mode == "DRY") {
    irHeatpump.send(irSender, POWER_ON, MODE_DRY, FAN_AUTO, temperature, VDIR_UP, HDIR_AUTO);
  } else {
    irHeatpump.send(irSender, POWER_OFF, MODE_HEAT, FAN_AUTO, 30, VDIR_UP, HDIR_AUTO);
  }
}

/*
  Since Mode is READ_WRITE variable, onModeChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onModeChange()  {
  // Add your code here to act upon Mode change
  send();
}
/*
  Since Temperature is READ_WRITE variable, onTemperatureChange() is
  executed every time a new value is received from IoT Cloud.
*/
void onTemperatureChange()  {
  // Add your code here to act upon Temperature change
  send();
}`,

//Below is a fork of projectId: 1
`//Interfacing RGB LED with Arduino and Push Button
//Author: Osama Ahmed

//Defining  variable and the GPIO pin on Arduino
int redPin= 11;
int greenPin = 10;
int bluePin = 9;
int buttonPin = 3; //Button pin
int buttonState = 0; //Variable to store the state of the button
int colorIndex = 0; // Variable to cycle through colors

void setup() {
  //Defining the LED pins as OUTPUT
  pinMode(redPin,  OUTPUT);              
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(buttonPin, INPUT); // Set button pin as input
}
void  loop() {
  buttonState = digitalRead(buttonPin);
   if (buttonState == LOW) { // Check if the button is pressed
    colorIndex++;
    if (colorIndex > 5) {
      colorIndex = 0;
    }
    changeColor(colorIndex);
    delay(300); // Debounce delay to avoid multiple triggers
  }
}

void changeColor(int index) {
  switch (index) {
    case 0:
      setColor(255, 0, 0); // Red Color
      break;
    case 1:
      setColor(0, 255, 0); // Green Color
      break;
    case 2:
      setColor(0, 0, 255); // Blue Color
      break;
    case 3:
      setColor(255, 255, 255); // White Color
      break;
    case 4:
      setColor(170, 0, 255); // Purple Color
      break;
    case 5:
      setColor(127, 127, 127); // Light Blue
      break;
  }
}

void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, redValue);
  analogWrite(greenPin, greenValue);
  analogWrite(bluePin, blueValue);
}
`,
`#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <dht11.h>

#define DHT11PIN 4
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET    -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

dht11 DHT11;

void setup(){
  Serial.begin(9600);

  // Initialize the OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }
  
  display.display();
  delay(2000);
  display.clearDisplay();
}

void loop(){
  display.clearDisplay();

  int chk = DHT11.read(DHT11PIN);
  
  float humidity = DHT11.humidity;
  float temperature = DHT11.temperature;

  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.print("Humidity: ");
  display.print(humidity);
  display.println(" %");

  display.print("Temperature: ");
  display.print(temperature);
  display.println(" C");

  display.display();
  delay(2000);
}`
]


export default code
