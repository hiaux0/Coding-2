import hotkeys from 'hotkeys-js';

/**
 * If a new scope gets toggled on, set scope to newScope.
 * If new scope gets toggled off, set scope to oldScope and delete the temporaly toggle scope
 * 
 * @param {Boolean} toggle - Bool of active state of hotkey context.
 * @param {String} contextScope
 * @param {String} previousScope
 */
export function toggleHotkeyScope(toggle, contextScope, previousScope) {
  let scope = toggle ? contextScope : previousScope;
  hotkeys.setScope(scope);
  // Clean up scope. Note that since we are only _toggling_, we don't delete the previous scope.
  if (scope === previousScope) hotkeys.deleteScope(contextScope);
}