window.DEBUG_MODE = {
  persistJumpable: true,
}

import hotkeys from 'hotkeys-js';
let keyBinding = hotkeys.noConflict();
hotkeys.filter = function () { return true }; // 2018-08-09 23:30:46 what does this do?

let isPERSISTENT = window.DEBUG_MODE.persistJumpable;
let isJumpable = false;

const JUMP_CLASS = 'jumpable';
const DATA_JUMP_MARK_VALUE = 'data-jump-mark-value';
const ABC = [
  "f", "j", "d", "k", "s", "l", "a", "g", "h", // home row
  "e", "i", "o", "w", "n", // upper
  "v", "c", "m", "q", "p", // lower
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" // numbers
  // "ff", "fj", "fd", "fk", "fs", "fl", "fa", "fg", "fh", // f + home row
]

const ABC_JOINED = ABC.join(", ");

/**
 * @param {CSSSelector:<String>} context - In order to restrict jumpy, defaults to body, ie. #hio-body
 */
export const toggleJumpable = (context = '#hio-body') => {
  isJumpable = !isJumpable;

  // let jumpContext = document.querySelectorAll(context);
  // for (let iterator of jumpContext) {
  //   let jumpLocations = iterator.getElementsByClassName(JUMP_CLASS);
  // }

  const destroy = makeTagsJumpable();
  isJumpable ?
    jumpableKeyCodesListener(destroy)
    : destroyKeybinding(destroy);
}

/**
 * Iterate through list of tags and add `JUMP_CLASS` to these tags.
 * @param {[HTMLTag:<String>]} tagNames
 * @returns {Function} destroy - Function to deactivate jumpable ability.
 */
const makeTagsJumpable = (tagNames = ['a', 'button']) => {
  let uniqueJumpMark = getUniqueJumpMarkGenerator();
  let destroyCollector = [];

  const destroy = (taggels) => {
    return () => {
      for (let taggel of taggels) {
        taggel.classList.remove(JUMP_CLASS);
        taggel.setAttribute(DATA_JUMP_MARK_VALUE, null);
      }
    }
  }

  tagNames.forEach((tag) => {
    let taggels = document.getElementsByTagName(tag);
    for (let taggel of taggels) {
      taggel.classList.add(JUMP_CLASS);
      let value = uniqueJumpMark.next().value;
      taggel.setAttribute(DATA_JUMP_MARK_VALUE, value)
    }

    destroyCollector.push(destroy(taggels))
  });

  return destroyCollector;
}

/**
 * Return unique jump mark value to be displayed.
 */
function* getUniqueJumpMarkGenerator() {
  yield* ABC;
}

/**
 * When jumpable is activated, listen to key presses to actually jump.
 */
const jumpableKeyCodesListener = (destroy) => {
  keyBinding(ABC_JOINED, JUMP_CLASS, (ev) => {
    let pressedKey = ev.key;
    let jumppelIterable = document.getElementsByClassName(JUMP_CLASS);
    const activate = activateElement(destroy);
    activate(jumppelIterable, pressedKey);
  });

  keyBinding('enter', JUMP_CLASS,() => { // Why ENTER here?
    hotkeys.deleteScope(JUMP_CLASS);
    hotkeys.unbind(ABC_JOINED);
    hotkeys.unbind('enter');
  })

  hotkeys.setScope(JUMP_CLASS);
}

    /**
     * When pressed key is equal to jump mark, perform a click on that element
     * @param {Function} cb - If given, perform after jumped
     * @param {String} activation - Specify how the jumppel should be activated
     * @returns {Function} action
     *  * @param {HTML.Collection} jumppelIterable
     *  * @param {String} pressedKey
     */
    const activateElement = (cb, activation='click') => {
      const action = (jumppelIterable, pressedKey) => {
        for (let jumppel of jumppelIterable) {
          let attr = jumppel.getAttribute(DATA_JUMP_MARK_VALUE);
          if (attr === pressedKey) {
            switch(activation) {
              default:
                jumppel.click();
                isJumpable = false;
            }
            if (isPERSISTENT) return;
            destroyKeybinding(cb);
          }
        }
      }
      return action;
    }

        /**
         *
         * @param {Function} cb - Callback to deactivate jump ability
         */
        function destroyKeybinding(cb) {
          if (typeof cb === 'function') {
            cb();
            hotkeys.deleteScope(JUMP_CLASS);
          }
          else if (Array.isArray(cb)) {
            cb.forEach((callback) => {
              callback();
              hotkeys.deleteScope(JUMP_CLASS);
            });
          }
        }

export function togglePersistJumpable() {
  isPERSISTENT = !isPERSISTENT; // This is bugged for turning off toggel EyeRR_b8B
  // isPERSISTENT ? hotkeys.setScope(JUMP_CLASS) : '';
  hotkeys.setScope(JUMP_CLASS);
}
