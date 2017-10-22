import { CATEGORY_URL, createActionsFor } from 'utils';

/**
 * Define the different actions for the Categories module
 *
 * @type {Object}
 */
export const CATEGORIES_ACTIONS = createActionsFor('categories', ['FETCH_CATEGORIES']);

/**
 * Fetch all of the categories from the server
 *
 * @method fetchAllCategories
 * @return {Action}
 */
export const fetchAllCategories = () => ({
  type   : CATEGORIES_ACTIONS.FETCH_CATEGORIES,
  payload: {
    request: {
      method: 'get',
      url   : CATEGORY_URL
    }
  }
});
