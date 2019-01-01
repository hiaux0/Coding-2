import { HttpClient, json } from 'aurelia-fetch-client';
import { Container } from 'aurelia-dependency-injection';

const injectClient = (factory) => {
  const client = Container.instance.get(HttpClient);
  return factory(client)
}

const baseUrl = 'http://localhost:3131';

// //////////////////////////////
// LIST

export const listSongsFactory = (client) => () => {
  return client.fetch(`${baseUrl}/songs/lyrics`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
}

export const listSongs = injectClient(listSongsFactory);

// //////////////////////////////
// GET

/**
 * @param {Array<string> | string}
 *
  {
    "translations": [
      {
        "translation": "A handsome one."
      }
    ],
    "word_count": 1,
    "character_count": 3
  }
 */
export const translate = (stringArr) => {
  const client = Container.instance.get(HttpClient);

  stringArr = Array.isArray(stringArr) ? stringArr : [stringArr];
  stringArr.join(',');

  return client.fetch(`${baseUrl}/translate/${stringArr}`)
    .then(response => response.json())
    // assume that we always translate one word/phrase.
    .then(data => {
      return data.translations[0].translation;
    });
}

// //////////////////////////////
// GET

export const getTranslatedWordFactory = (client) => (words) => {
  const wordsToArray = words.split(' ');
  const wordsQuery = JSON.stringify(wordsToArray);

  return client.fetch(`${baseUrl}/lyrics/words?words=${wordsQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) throw new Error(data.message);
      return data[0];
    })
    .catch(err => err);
}

// //////////////////////////////
// GET

export const getSongLyricsFactory = (client) => (songId) => {

  return client.fetch(`${baseUrl}/songs/lyrics/${songId}`)
  .then(res => res.json())
  .then(data => {
    return data[0];
  })
}

export const getSongLyrics = injectClient(getSongLyricsFactory);

// //////////////////////////////
// POST

/**
 * @type {Object} translation
 * @prop {string} original
 * @prop {string} translation
 */
export const saveTranslatedWord = (translation) => {
  const client = Container.instance.get(HttpClient);

  return client.fetch(`${baseUrl}/lyrics`, {
    method: 'POST',
    body: json({ translation })
  })
    .then(response => response.json())
    .then(data => {
      if (data === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
      return data;
    })
    .catch(err => err);
}

export const saveSongLyricFactory = (client) => (lyrics) => {
  return client.fetch(`${baseUrl}/songs/lyrics`, {
    method: 'POST',
    body: json({lyrics})
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(err => err);
}

export const saveSongLyric = injectClient(saveSongLyricFactory);

export const getTranslatedWords = () => {
  const client = Container.instance.get(HttpClient);

  return client.fetch(`${baseUrl}/lyrics`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}

/**
 * @param {string} words
 * @returns {Promise<Object | String>}
 */
export const getTranslatedWord = injectClient(getTranslatedWordFactory);


// //////////////////////////////
// UPDATE

export const updateTranslatedWordFactory = (client) => ({words, updates}) => {
  const wordsToArray = words.split(' ');
  const wordsQuery = JSON.stringify(wordsToArray);

  return client.fetch(`${baseUrl}/lyrics/words?words=${wordsQuery}`, {
    method: 'PUT',
    body: json(updates)
  })
  .then(response => response.json())
  .catch(err => err);

}

/**
 * @param {Object} args
 * @prop {string} words
 * @prop {Object} updates
 */
export const updateTranslatedWord = injectClient(updateTranslatedWordFactory);



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

// curl -X POST -u "apikey:{apikey}" --header "Content-Type: application/json" --data "{\"text\": [\"Hello, world!\", \"How are you?\"], \"model_id\":\"en-es\"}" "{baseUrl}/v3/translate?version=2018-05-01"

/**
curl --user apikey:S7DU1G82CyZy2ng6ZKIGWtb3Gm1ZgY0elAhelOG5mUmV --request POST --header "Content-Type: application/json" --data '
{"text":["Hello"],"model_id":"en-es"}' "https://gateway-fra.watsonplatform.net/language-translator/api/v3/translate?version=2018-05-01"
 */
