import { WEB_FONTS_ACTIONS } from './actions';

/**
 * Initial State for the webfonts
 *
 * @type {Object}
 */
const INITIAL_STATE = {
  status: 'loading'
};

/**
 * The main reducer for the WebFonts module
 *
 * @method webfonts
 * @param  {Object} [state=INITIAL_STATE] The passed in current state
 * @param  {Object} action                The redux action
 * @return {Object}                       The final state
 */
const webfonts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WEB_FONTS_ACTIONS.SET_WEB_FONT_STATUS:
    return { status: action.payload.status ? action.payload.status : 'loading' };
  default:
    return state;
  }
};

export default webfonts;

/**
 * Get the current webfont status from redux
 *
 * @method getWebFontStatus
 * @param  {Object}         state The passed in redux state
 * @return {string}               The status from the redux state
 */
export const getWebFontStatus = state => state.webfonts.status;
