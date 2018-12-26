import { HttpClient, json } from 'aurelia-fetch-client';
import { Container } from 'aurelia-dependency-injection';

export const translate = (stringArr) => {
  const client = Container.instance.get(HttpClient);

  stringArr = Array.isArray(stringArr) ? stringArr : [stringArr];
  stringArr.join(',');

  return client.fetch(`http://localhost:3030/translate/${stringArr}`)
    .then(response => response.json())
    .then(data => {
      return data.translations;
    });
}

/**
 * @type {Object} translation
 * @prop {string} original
 * @prop {string} translated
 */
export const saveTranslatedWord = (translation) => {
   const client = Container.instance.get(HttpClient);

  return client.fetch(`http://localhost:3131/lyrics`, {
    method: 'POST',
    body: json(translation)
  })
    .then(response => response.json())
    .then(data => {
      if (data === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
      return data;
    })
    .catch(err => err);
}

export const getTranslatedWords = () => {
  const client = Container.instance.get(HttpClient);

  return client.fetch('http://localhost:3131/lyrics')
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}

// {
//   "translations": [
//     {
//       "translation": "A handsome one."
//     }
//   ],
//   "word_count": 1,
//   "character_count": 3
// }

/**
 * text string[]
Input text in UTF-8 encoding. Multiple entries will result in multiple translations in the response.

model_id string
A globally unique string that identifies the underlying model that is used for translation.

source string
Translation source language code.

target string
Translation target language code.
 */

// curl -X POST -u "apikey:{apikey}" --header "Content-Type: application/json" --data "{\"text\": [\"Hello, world!\", \"How are you?\"], \"model_id\":\"en-es\"}" "{url}/v3/translate?version=2018-05-01"

/**
curl --user apikey:S7DU1G82CyZy2ng6ZKIGWtb3Gm1ZgY0elAhelOG5mUmV --request POST --header "Content-Type: application/json" --data '
{"text":["Hello"],"model_id":"en-es"}' "https://gateway-fra.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01"
 */
