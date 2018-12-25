const fs = require('fs');

/**
 * Use JSON.stringify to write into a file
 * @param {string} fileName
 * @param {object} obj - the js obj you want ot save into a file.
 */
const writeJsonToFile = (fileName, obj) => {
  let json = JSON.stringify(obj);
  fs.writeFile(fileName, json, 'utf8', (err) => {
    if (err) throw err;
    console.log('Success')
  });
}

module.exports = writeJsonToFile;