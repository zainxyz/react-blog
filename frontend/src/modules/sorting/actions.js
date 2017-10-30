import { createActionsFor } from 'utils';

/**
 * Define the different actions for the sorting module
 *
 * @type {Object}
 */
export const SORTING_ACTIONS = createActionsFor('sorting', [
  'SET_SORTING_ORDER_FOR_POSTS',
  'SET_SORTING_ORDER_FOR_COMMENTS'
]);

/**
 * Set the sorting options for the posts module
 *
 * @method setSortingOptionsForPosts
 * @param  {string}                  sortBy  Sort the posts by...
 * @param  {string}                  orderBy Order the posts by...
 * @return {Action}
 */
export const setSortingOptionsForPosts = ({ sortBy, orderBy }) => ({
  type   : SORTING_ACTIONS.SET_SORTING_ORDER_FOR_POSTS,
  payload: {
    sortBy,
    orderBy
  }
});

/**
 * Set the sorting options for the comments module
 *
 * @method setSortingOptionsForComments
 * @param  {string}                     sortBy  Sort the comments by...
 * @param  {string}                     orderBy Order the comments by...
 * @return {Action}
 */
export const setSortingOptionsForComments = ({ sortBy, orderBy }) => ({
  type   : SORTING_ACTIONS.SET_SORTING_ORDER_FOR_COMMENTS,
  payload: {
    sortBy,
    orderBy
  }
});
