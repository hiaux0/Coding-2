import hotkeys from 'hotkeys-js';

let hotkey = hotkeys.noConflict();
hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?

// add class to jumpables
// add map between jumpables html elements and jump codes
// allow jump in context
const JUMP_CLASS = 'jumpable';
const DATA_JUMP_MARK_VALUE = 'data-jump-mark-value';
const ABC = [
  "f", "j", "d", "k", "s", "l", "a", "g", "h", // home row
  "e", "i", "o", "w", "n", // upper
  "v", "c", "m", "q", "p" // lower
]

const ABC_JOINED = ABC.join(", ");

/**
 * @param {CSSSelector:<String>} context - In order to restrict jumpy, defaults to body, ie. #hio-body
 */
export const initJumpable = (context = '#hio-body') => {
  let jumpContext = document.querySelectorAll(context);
  for (let iterator of jumpContext) {
    let jumpLocations = iterator.getElementsByClassName(JUMP_CLASS);
  }

  makeTagsJumpable();
  jumpableKeyCodesListener(context);
}

/**
 * When jumpable is activated, listen to key presses to actually jump.
 */
const jumpableKeyCodesListener = () => {
  hotkey(ABC_JOINED, JUMP_CLASS, (ev) => {
    console.log('​jumpableKeyCodesListener -> ev', ev);
    let pressedKey = ev.key;
    let allJumppel = document.getElementsByClassName(JUMP_CLASS);
    for (let jumppel of allJumppel) {
      let attr = jumppel.getAttribute(DATA_JUMP_MARK_VALUE)
      if (attr === pressedKey) {
        console.log(jumppel)
      }
    }
  });

  hotkey('enter', JUMP_CLASS,() => {
    hotkeys.deleteScope(JUMP_CLASS);
    hotkeys.unbind(ABC_JOINED);
    hotkeys.unbind('enter');
  })

  hotkeys.setScope(JUMP_CLASS);
}

/**
 * Iterate through list of tags and add `JUMP_CLASS` to these tags.
 * @param {[HTMLTag:<String>]} tagNames
 */
const makeTagsJumpable = (tagNames = ['a', 'button']) => {
  let uniqueJumpMark = getUniqueJumpMarkGenerator();

  tagNames.forEach((tag) => {
    let taggels = document.getElementsByTagName(tag);
    for (let taggel of taggels) {
      taggel.classList.add(JUMP_CLASS);
      let value = uniqueJumpMark.next().value;
      taggel.setAttribute(DATA_JUMP_MARK_VALUE, value)
    }
  });
}

/**
 * Return unique jump mark value to be displayed.
 */
function* getUniqueJumpMarkGenerator() {
  yield* ABC;
}



