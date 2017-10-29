import * as actions from './actions';
import reducer, * as selectors from './reducer';

export { actions, reducer, selectors };

/**
 * The authoritative WebFonts entity shape
 * @typedef  {Object} WebFonts
 * @property {string} status - The current status of webfonts (loading, active)
 */
