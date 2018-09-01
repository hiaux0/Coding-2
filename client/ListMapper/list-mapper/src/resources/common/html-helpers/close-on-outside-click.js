/**
 * @param {HTMLElement} context - Close on outside click of context.
 * @param {Function} cb - Callback to perform on outside click.
 * @return {Function} 
 *    @param {Object} ev - Html event object.
 */
export default close = (context, cb) => (ev) => {
  let target = ev.target;
  if (target === context) {
    return;
  }

  let parent = target.parentElement;
  do {
    parent = parent.parentElement
    if (parent === context) {
      return;
    }
    else if (parent.id === 'hio-body') {
      break;
    }

  } while (parent !== context);

  if (typeof cb === 'function') cb();
}