const nlp = require('compromise');
console.log('​nlp', nlp);

// Implement temperature method for compromise
let dataString1 = "Heat for 5 min at 80 °C";

const customTemperature = () => {
  console.log('hello');

}

// Add custom temperature method to nlp
nlp.temperature = customTemperature;

nlp.temperature();





