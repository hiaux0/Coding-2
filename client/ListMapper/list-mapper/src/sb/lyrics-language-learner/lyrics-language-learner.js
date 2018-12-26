import {bindable} from 'aurelia-framework';

import './lyrics-language-learner.less'
import { tokenizeLyrics } from './modules/tokenize-lyrics';
import {translate} from './lyrics-language-learner.gateway';
import { testLyrics } from './modules/test-data';
import hotkeys from 'hotkeys-js';

export class LyricsLanguageLearner {
  @bindable lyrics = testLyrics;

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
    this.sidebarLyricWord = target.innerText;

    if (document.getSelection().toString()) {
      this.sidebarLyricWord = document.getSelection().toString();
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
      window.localStorage.setItem(this.sidebarLyricWord, JSON.stringify(response));
      this.sidebarLyricTranslation = response;
    }
  }

}
