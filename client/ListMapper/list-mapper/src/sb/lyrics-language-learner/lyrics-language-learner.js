import {bindable} from 'aurelia-framework';

import './lyrics-language-learner.less'
import { tokenizeLyrics } from './modules/tokenize-lyrics';
const lyricsGateway = require('./lyrics-language-learner.gateway');

import { testLyrics, dontWorry } from './modules/test-data';
import hotkeys from 'hotkeys-js';

export class LyricsLanguageLearner {
  @bindable lyrics = testLyrics;

  /**
   * @type {boolean}
   */
  isDuplicatedVocabulary = false;

  /**
   * @type {Map}
   */
  lyricsMap;

  /**
   * @type {string}
   */
  sidebarLyricWord = '[TODO] Word';
  sidebarLyricSentence = '[TODO] Whole sentence goes here';

  /**
   * @type {Array<Object>}
   */
  songs;

  getTranslatedWord = lyricsGateway.getTranslatedWord;

  bind() {
    this.lyricsMap = tokenizeLyrics(this.lyrics);
    console.log("​LyricsLanguageLearner -> bind -> this.lyricsMap", this.lyricsMap)
    this.listSongs();
  }

  attached() {
    hotkeys("c", () => console.clear()); // eslint-disable-line no-console
    hotkeys("h", () => console.log(this));  // eslint-disable-line no-console
    hotkeys("d", () => window.localStorage.clear());  // eslint-disable-line no-console
  }

  listSongs() {
    lyricsGateway.listSongs()
      .then(data => {
        console.log("​LyricsLanguageLearner -> listSongs -> data", data)
        this.songs = data;
      })
  }

  changeSong(songId) {
    this.getSongWithLyrics(songId)
  }

  getSongWithLyrics(songId) {
    lyricsGateway.getSongLyrics(songId)
      .then(data => {
        console.log("​LyricsLanguageLearner -> getSongWithLyrics -> data", data)
        const lyricsMap = new Map(data.lyrics);
        this.lyricsMap = lyricsMap;
      })
  }

  saveSongWithLyrics() {
    lyricsGateway.saveSongLyric(dontWorry)
    .then(data => {
      console.log("​LyricsLanguageLearner -> saveSongWithLyrics -> data", data)
    })
  }



  updateSelection = (ev) => {
    const selection = document.getSelection().toString();
    // onSidebarOpen();
  }

  /**
   * @param {Object<HTMLEvent>} event
   */
  onSidebarOpen = (event) => {
    const target = event.target;
    let parentElement = target.parentElement;
    parentElement = this.removeTooltip(parentElement);

    this.sidebarLyricSentence = parentElement.innerHTML;
    this.sidebarLyricWord = target.innerText.trim();

    if (document.getSelection().toString()) {
      this.sidebarLyricWord = document.getSelection().toString().trim();
    }

    this.updateWithDatabaseTranslation(this.sidebarLyricWord);
  }

  /**
   * This is a workaround because we are using innerHTML to insert the
   *  sentence into the header
   * @type {HTMLElement} element
   */
  removeTooltip(element) {
    const clonedParent = element.cloneNode(true);
    const tooltipClass = '.tooltip';
    const tooltips = clonedParent.querySelectorAll(tooltipClass);
    for (let tooltip of tooltips) {
      clonedParent.removeChild(tooltip);
    }

    return clonedParent;
  }

  /**
   * When sidebar is open, in the header, each word can also be translated.
   */
  translateHeaderWord = (event) => {
    const {target} = event;
    this.sidebarLyricWord = target.innerText.trim();
    if (document.getSelection().toString()) {
      this.sidebarLyricWord = document.getSelection().toString().trim();
    }

    this.updateWithDatabaseTranslation(this.sidebarLyricWord);
  }

  /**
   * @param {string} words
   * @return {Promise} not used atm 2018-12-30 22:19:40
   */
  updateWithDatabaseTranslation(words) {
    return lyricsGateway.getTranslatedWord(words)
    .then(this.udpateView)
    .catch(this.translateAndSave)
  }

  /**
   * @param {Object} translationResponse
   */
  udpateView = (translationResponse) => {
    // I tried throwing an error in `getTranslatedWordFactory` but then cosnole error
    // `a promise was rejected with a non-error:` got thrown...
    if (translationResponse.error) throw new Error(translationResponse.message);

    const { translation, comment } = translationResponse;
    this.sidebarLyricTranslation = translation;
    this.commentRef.value = comment;
  }

  /**
   * 1. Call gateway translate(word),
   * 2. then save translation to db
   * 3. and update the view
   */
  translateAndSave = (err) => {
    const saveTranslation = (translation) => {
      lyricsGateway.saveTranslatedWord({
        translation: translation,
        original: this.sidebarLyricWord
      });
      return translation;
    }

    const updateViewWithNewTranslation = (translation) => {
      this.sidebarLyricTranslation = translation;
    }

    return lyricsGateway.translate(this.sidebarLyricWord)
    .then(saveTranslation)
    .then(updateViewWithNewTranslation);
  }

  saveChanges() {
    // update database
    lyricsGateway.updateTranslatedWord({
      words: this.sidebarLyricWord,
      updates: {
        comment: this.commentRef.value,
        translation: this.sidebarLyricTranslation
      }
    })
    /** Don't need the dup catch I think */
    // .then(data => {
    //   if (data.message === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
    // })
    // .catch(err => {
    //   if (err.message === 'ER_DUP_ENTRY') {
    //     this.isDuplicatedVocabulary = true;
    //   }
    // });
  }

  resetTextarea = () => {
    this.commentRef.value = '';
    this.sidebarLyricTranslation = '';
  }

}
