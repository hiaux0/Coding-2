const nlp = require('compromise');

let dataString0 = "In a sterile microfuge, add RT reaction mix. Heat for 5 min at 80 °C."
let dataString1 = "80 °C"
let dataString2 = "Spin and place on ice. Add  2 µL RT buffer, 1 µL RNAse inhibitor and 1 µL M-MLV Reverse Transcriptase. Incubate at 42 °C for 1 h. Incubate at 90 °C for 10 min"
let dataString3 = "Heat for 5 min at 80 °C."
let dataString31 = "Heat for 5 min at 80 °c."
let dataString32 = "80 °C"
let dataString33 = "°C."
let dataString4 = "Heat for 5 min at 80°C."

// let tags = nlp(dataString1).out('tags') /*?*/
// let tags1 = nlp(dataString1).debug().list[0].terms /*?*/
// console.log('​tags', tags);
// let matchTemperature = nlp(dataString3).out('tags') /*?*/
let matchTemperature1 = nlp(dataString33).out('tags') /*?*/
// let matchTemperature = nlp(dataString3).match('#NumericValue #Unit').out('tags') /*?*/
// Step: Add, Heat
// Temperature: 80 °C
// Time: 5 min 

// Create a custom tag for temperature
nlp().match('#NumericValue #Unit')
// --> Problem: "°C." will be interpreted as an `Acronym` due to "."
    // Change the source code?

