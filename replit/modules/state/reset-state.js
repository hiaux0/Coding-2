
/**
 * @param {Object} args
 * @type {Object} initialState
 * @type {Object} editedState
 * @type {Array<string>} keys
 */
const resetState = ({initialState, editedState, keys}) => {
  editedState = { ...editedState };

  let withKeysReset = keys.reduce((acc, key) => {
    if (!acc.hasOwnProperty(key)) throw `\`editedState\` does not have a property "${key}"`;

    acc[key] = initialState[key];
    return acc;
  }, editedState);

  return withKeysReset;
}

module.exports = {
  resetState
}