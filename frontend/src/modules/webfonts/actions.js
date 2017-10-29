import { createActionsFor } from 'utils';

/**
 * Define the different actions for the WebFonts module
 *
 * @type {[type]}
 */
export const WEB_FONTS_ACTIONS = createActionsFor('webfonts', ['SET_WEB_FONT_STATUS']);

/**
 * Set the webfonts status
 *
 * @method setWebFontStatus
 * @param  {string}         status The current status
 * @return {Action}
 */
export const setWebFontStatus = status => ({
  type   : WEB_FONTS_ACTIONS.SET_WEB_FONT_STATUS,
  payload: {
    status
  }
});
