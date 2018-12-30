import {bindable} from 'aurelia-framework';

import './lyrics-language-learner.less'
import { tokenizeLyrics } from './modules/tokenize-lyrics';
import { translate, getTranslatedWord, saveTranslatedWord, updateTranslatedWord } from './lyrics-language-learner.gateway';
window.saveTranslatedWord = saveTranslatedWord;
import { testLyrics } from './modules/test-data';
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

  bind() {
    this.lyricsMap = tokenizeLyrics(this.lyrics);
  }

  attached() {
    hotkeys("c", () => console.clear()); // eslint-disable-line no-console
    hotkeys("h", () => console.log(this));  // eslint-disable-line no-console
    hotkeys("d", () => window.localStorage.clear());  // eslint-disable-line no-console
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

    this.loadTranslationFromDatabase();
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

  translateHeaderWord(event) {
    const {target} = event;
    this.sidebarLyricWord = target.innerText.trim();
    if (document.getSelection().toString()) {
      this.sidebarLyricWord = document.getSelection().toString().trim();
    }

    this.loadTranslationFromDatabase();
  }

  loadTranslationFromDatabase() {
    // request db
    getTranslatedWord(this.sidebarLyricWord)
      .then(res => {
        if (res.error) throw new Error(res.message);

        const { translation, comment } = res;
        this.sidebarLyricTranslation = translation;
        this.commentRef.value = comment;
      })
      .catch(err => {
        console.log('catch')
        // translate now
        translate(this.sidebarLyricWord)
          .then(translation => {
            this.sidebarLyricTranslation = translation;
            saveTranslatedWord({
              translation: translation,
              original: this.sidebarLyricWord
            });
          });
      });
  }

  loadForTooltip(text) {
    return getTranslatedWord(text)
      .then(res => {
        if (res.error) throw new Error(res.message);

        return res
      })
      .catch(err => {
        console.log('catch')
        // translate now
        translate(this.sidebarLyricWord)
          .then(translation => {
            this.sidebarLyricTranslation = translation;
            saveTranslatedWord({
              translation: translation,
              original: this.sidebarLyricWord
            });
            return translation;
          });
      });
  }

  saveChanges() {
  this.sidebarLyricTranslation;
    this.commentRef.value;

    // update database
    updateTranslatedWord({
      words: this.sidebarLyricWord,
      updates: {
        comment: this.commentRef.value,
        translation: this.sidebarLyricTranslation
      }
    })
    .then(data => {
      if (data.message === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
    })
    .catch(err => {
      if (err.message === 'ER_DUP_ENTRY') {
        console.log('dupdudpudp')
        this.isDuplicatedVocabulary = true;
      }
    });
  }

  resetTextarea = () => {
    this.commentRef.value = '';
    this.sidebarLyricTranslation = '';
  }

}
