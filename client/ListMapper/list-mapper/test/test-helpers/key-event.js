// Taken from https://stackoverflow.com/questions/26966044/simulate-fake-keypress-in-jasmine

export const keyPress = (key) => {
  var event = document.createEvent('Event');
  event.keyCode = key; // Deprecated, prefer .key instead.
  event.key = key;
  event.initEvent('keydown');
  document.dispatchEvent(event);
}

export const keyCodeMap = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "pauseBreak": 19,
  "capsLock": 20,
  "escape": 27,
  "space": 32,
  "pageUp": 33,
  "pageDown": 34,
  "end": 35,
  "home": 36,
  "leftArrow": 37,
  "upArrow": 38,
  "rightArrow": 39,
  "downArrow": 40,
  "insert": 45,
  "delete": 46,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  "a": 65,
  "b": 66,
  "c": 67,
  "d": 68,
  "e": 69,
  "f": 70,
  "g": 71,
  "h": 72,
  "i": 73,
  "j": 74,
  "k": 75,
  "l": 76,
  "m": 77,
  "n": 78,
  "o": 79,
  "p": 80,
  "q": 81,
  "r": 82,
  "s": 83,
  "t": 84,
  "u": 85,
  "v": 86,
  "w": 87,
  "x": 88,
  "y": 89,
  "z": 90,
  "leftWindowKey": 91,
  "rightWindowKey": 92,
  "selectKey": 93,
  "numpad_0": 96,
  "numpad_1": 97,
  "numpad_2": 98,
  "numpad_3": 99,
  "numpad_4": 100,
  "numpad_5": 101,
  "numpad_6": 102,
  "numpad_7": 103,
  "numpad_8": 104,
  "numpad_9": 105,
  "multiply": 106,
  "add": 107,
  "subtract": 109,
  "decimalPoint": 110,
  "divide": 111,
  "f1": 112,
  "f2": 113,
  "f3": 114,
  "f4": 115,
  "f5": 116,
  "f6": 117,
  "f7": 118,
  "f8": 119,
  "f9": 120,
  "f10": 121,
  "f11": 122,
  "f12": 123,
  "numLock": 144,
  "scrollLock": 145,
  "semiColon": 186,
  "equalSign": 187,
  "comma": 188,
  "dash": 189,
  "period": 190,
  "forwardSlash": 191,
  "graveAccent": 192,
  "openBracket": 219,
  "backSlash": 220,
  "closeBraket": 221,
  "singleQuote": 222,
}