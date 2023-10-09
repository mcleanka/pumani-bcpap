#include <ESP32Servo.h>
#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>

#define DHTPIN 4      // Digital pin where the DHT sensor is connected on the ESP32
#define DHTTYPE DHT22 // Change to DHT22 if you are using a DHT22 sensor

Servo servo;
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address may vary, default is 0x27

// Device parameters
int patientId = 2;
int doctorId = 1;
int breathingRate = 180; // Initial value for breathing rate
char flowRate = 10;

int servoPin = 2; // 2,4,5,12-19,21-23,25-27,32-33

// Network settings
const char *ssid = "Zonse Inv.";
const char *password = "Ccera-2017";
const char *apiEndpoint = "http://192.168.14.9/pumani/api/save-data.php";

const byte ROWS = 4; // Four rows
const byte COLS = 4; // Four columns

char keys[ROWS][COLS] = {
    {'1', '2', '3', 'A'},
    {'4', '5', '6', 'B'},
    {'7', '8', '9', 'C'},
    {'*', '0', '#', 'D'}};

byte rowPins[ROWS] = {15, 2, 4, 16};  // Adjust these pins to match your ESP32's GPIO pins
byte colPins[COLS] = {17, 5, 18, 19}; // Adjust these pins to match your ESP32's GPIO pins

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

void setup()
{
  Serial.begin(9600);
  dht.begin();
  //  lcd.begin(9600);

  // Set up the number of columns and rows on the LCD
  //  lcd.init();
  //  lcd.backlight();
  WiFi.begin(ssid, password);

  Serial.println("Hi, Welcome to Pumani bCPAP!");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  // put your setup code here, to run once:
  servo.attach(servoPin);
}

void loop()
{
  delay(1000);
  flowRate = keypad.getKey();
  float humidity = dht.readHumidity();       // Read humidity
  float temperature = dht.readTemperature(); // Read temperature as Celsius

  float humidity = 24;      // Read humidity
  float temperature = 32.7; // Read temperature as Celsius

  if (isnan(temperature) || isnan(humidity))
  {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if (flowRate)
  {
    breathingRate = flowRate - '0'; // Convert character to integer
  }

  for (int i = 0; i <= breathingRate; i += 2)
  {
    servo.write(i);
    delay(flowRate);
  }

  delay(3);

  for (int i = breathingRate; i >= 0; i -= 2)
  {
    servo.write(i);
    delay(flowRate);
  }

  // Create JSON payload with sensor data
  String payload = "patient_id=" + String(patientId) +
                   "&temperature=" + String(temperature) +
                   "&humidity=" + String(humidity) +
                   "&breathing_rate=" + String(breathingRate) +
                   "&flow_rate=" + String(flowRate) +
                   "&doctor_id=" + String(doctorId);

  // Create an HTTPClient object
  HTTPClient http;

  // Send POST request to API endpoint
  http.begin(apiEndpoint);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpResponseCode = http.POST(payload);

  // Check the response code
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error sending request: ");
    Serial.println(httpResponseCode);
  }

  // Close the connection
  http.end();

  delay(1000); // Delay between readings
}