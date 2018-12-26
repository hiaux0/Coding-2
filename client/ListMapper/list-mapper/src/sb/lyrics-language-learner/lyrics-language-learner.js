import {bindable} from 'aurelia-framework';

import './lyrics-language-learner.less'
import { tokenizeLyrics } from './modules/tokenize-lyrics';
import {translate, getTranslatedWords, saveTranslatedWord} from './lyrics-language-learner.gateway';
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
  sidebarLyricWord = 'change';

  bind() {
    window.localStorage.clear();
    this.lyricsMap = tokenizeLyrics(this.lyrics);
    console.log(this.lyricsMap);

                                                                saveTranslatedWord();
                                                                // getTranslatedWords();
  }

  attached() {
    hotkeys("c", () => console.clear()); // eslint-disable-line no-console
    hotkeys("h", () => console.log(this));  // eslint-disable-line no-console
    hotkeys("d", () => window.localStorage.clear());  // eslint-disable-line no-console
  }

  /**
   * @param {Object<HTMLEvent>} event
   */
  passDataToSidebar = (event) => {
    const target = event.target;
    this.sidebarLyricWord = target.innerText.trim();

    if (document.getSelection().toString()) {
      this.sidebarLyricWord = document.getSelection().toString().trim();
    }

    if (window.localStorage.getItem(this.sidebarLyricWord)) {
      console.log('Got from local storage');
      const rawFromStorage = window.localStorage.getItem(this.sidebarLyricWord);
      const storageData = JSON.parse(rawFromStorage);
      this.sidebarLyricTranslation = storageData;
    } else {
      console.log('New request');
      // translate(this.sidebarLyricWord).then(response => {
      //   this.sidebarLyricTranslation = response;
      // });

      const response = [
        { translation: this.sidebarLyricWord + ' test' }
      ]

      // save database
      saveTranslatedWord({
        original: this.sidebarLyricWord,
        translated: 'test of ' + this.sidebarLyricWord,
        comment: 'test comment for ' + this.sidebarLyricWord
      })
      .then(data => {
        if (data.message === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
        console.log(data)
      })
      .catch(err => {
        if (err.message === 'ER_DUP_ENTRY') {
          console.log('dupdudpudp')
          this.isDuplicatedVocabulary = true;
        }
      });


      // Local Storage
      // window.localStorage.setItem(this.sidebarLyricWord, JSON.stringify(response));
      this.sidebarLyricTranslation = response;
    }
  }

}
