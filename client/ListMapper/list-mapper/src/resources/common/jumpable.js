// add class to jumpables
// add map between jumpables html elements and jump codes
// allow jump in context
const JUMP_INDICATOR = 'jumpable';

/**
 * @param {CSSSelector:<String>} context - In order to restrict jumpy, defaults to body, ie. hio-body
 */
export const initJumpable = (context = 'hio-body') => {
console.log('​exportinitJumpable -> context', context);

  let jumpContext = document.getElementById(context);
  console.log('​exportinitJumpable -> jumpContext', jumpContext);
  let jumpLocations = jumpContext.getElementsByClassName(JUMP_INDICATOR);

  makeTagsJumpable();

  // add jump code to elements
}

/**
 * 
 * @param {HTMLTag:<String>} tagNames 
 */
const makeTagsJumpable = (tagNames = ['a', 'button']) => {
  tagNames.forEach((tag) => {
    let taggels = document.getElementsByTagName(tag);
    for (let taggel of taggels) {
      taggel.classList.add(JUMP_INDICATOR);
      taggel.setAttribute("data-jump-mark-value", 'asdasd')
    }
  });
}