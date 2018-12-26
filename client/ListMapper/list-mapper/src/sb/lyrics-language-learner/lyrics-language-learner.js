import {bindable} from 'aurelia-framework';

import './lyrics-language-learner.less'
import { tokenizeLyrics } from './modules/tokenize-lyrics';
import {translate} from './lyrics-language-learner.gateway';
import { testLyrics } from './modules/test-data';

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
    this.lyricsMap = tokenizeLyrics(this.lyrics);
    console.log(this.lyricsMap);
  }

  /**
   * @param {Object<HTMLEvent>} event
   */
  passDataToSidebar = (event) => {
    const target = event.target;
    this.sidebarLyricWord = target.innerText;
    translate(this.sidebarLyricWord).then(response => {
      this.sidebarLyricTranslation = response;
    });
  }

}
