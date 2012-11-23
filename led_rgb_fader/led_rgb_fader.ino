int leds[] = { 11, 9, 10 };
int potentiometer = 0;
byte rgb[3];

void setup() {
  Serial.begin(9600);
  pinMode(potentiometer, INPUT);
  for (int i = 0; i < 3; i++) {
    pinMode(leds[i], OUTPUT);
  }
}

void loop() {
  int value = analogRead(potentiometer);
  value = map(value, 0, 1024, 0, 360);
  setColor(leds, hsvToRgb(value, 1, 1));
}

void setColor(int* led, const byte* color) {
  for (int i = 0; i < 3; i++) {
    analogWrite(led[i], 255 - color[i]);
  }
}

byte* hsvToRgb(int h, double s, double v) {
  double hs = h / 60.0;
  int i = floor(hs);
  double f = hs - i;
  double p = v * (1 - s);
  double q = v * (1 - s * f);
  double t = v * (1 - s * (1 - f));
  double r, g, b;
  switch(i) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    default: r = v; g = p; b = q;
  }
  rgb[0] = round(r * 255.0);
  rgb[1] = round(g * 255.0);
  rgb[2] = round(b * 255.0);
  return rgb;
}
