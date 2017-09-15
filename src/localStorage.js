/**
 * Load the redux state from the localStorage
 *
 * @method loadState
 * @return {Object|undefined}  The currently persisted redux state from localStorage
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Save the given state to the localStorage
 *
 * @method saveState
 * @param  {Object}  state The state to be saved
 */
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // catch the error
  }
};
