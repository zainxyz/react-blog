import * as actions from './actions';
import reducer, * as selectors from './reducer';

export { actions, reducer, selectors };

/**
 * The authoritative Sorting entity shape
 * @typedef  {Object} Sorting
 * @property {Object} posts    - The sorting order of the posts module
 * @property {Object} comments - The sorting order of the comments module
 */
