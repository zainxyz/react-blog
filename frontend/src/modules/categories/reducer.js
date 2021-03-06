import mapKeys from 'lodash/mapKeys';

import { CATEGORIES_ACTIONS } from './actions';

/**
 * The main reducer for the Categories module
 *
 * @method categories
 * @param  {Object}   [state={}] The passed in current state
 * @param  {Object}   action     The final axios promise as an action
 * @return {Object}              The final state
 */
const categories = (state = {}, action) => {
  switch (action.type) {
  case CATEGORIES_ACTIONS.FETCH_CATEGORIES_SUCCESS:
    // Since FETCH_CATEGORIES will only run one time (hopefully), we're going to take the response
    // data and convert it to an object by assigning the 'id' of the category as the object key
    // in the newly created state. 'mapKeys' to the rescue
    return mapKeys(action.payload.data.categories, 'id');
  default:
    return state;
  }
};

// By default we'll be exporting out the reducer
export default categories;

/**
 * Get all of the categories
 *
 * @method getAllCategories
 * @param  {Object}         state The passed in state
 * @return {Object}
 */
export const getAllCategories = state => state.categories;

/**
 * Get a single category via categoryId
 *
 * @method getCategoryById
 * @param  {Object}        state      The passed in state
 * @param  {string}        categoryId The id of the category to fetch
 * @return {Object}
 */
export const getCategoryById = (state, categoryId) =>
  state.categories && state.categories[categoryId];
