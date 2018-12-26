const LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');
const login = require('../../../some.json');

const url = login.watson.url;
const apiKey = login.watson.key;
const version = '2018-05-01';
const model_id = 'ko-en';
// const source = 'ko';
// const target = 'en';
// const method = 'translate';

const languageTranslator = new LanguageTranslatorV3({
  version: version,
  iam_apikey: apiKey,
  url: url
});



// languageTranslator.listIdentifiableLanguages(
//   {},
//   function (err, response) {
//     if (err)
//       console.log(err)
//     else
//       console.log(JSON.stringify(response, null, 2));
//   }
// );

const translate = (string) => {
  const parameters = {
    text: string,
    model_id
  };

  return new Promise((resolve, reject) => {
    languageTranslator.translate(
      parameters,
      function (error, response) {
        if (error) reject(error);
        else resolve(response);
      }
    );
  })

}

module.exports = {
  translate
}