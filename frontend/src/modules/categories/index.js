import * as actions from './actions';
import reducer, * as selectors from './reducer';

export { actions, reducer, selectors };

/**
 * The authoritative Category entity shape
 * @typedef  {Object}  Category
 * @property {string}  name     - Name of the category
 * @property {string}  path     - Path for the category
 */
