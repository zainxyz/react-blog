import { SORTING_ACTIONS } from './actions';

/**
 * Initial State for the sorting
 *
 * @type {Object}
 */
const INITIAL_STATE = {
  posts: {
    // 'voteScore' or 'timestamp'
    sortBy : 'voteScore',
    // 'asc' or 'desc'
    orderBy: 'desc'
  },
  comments: {
    // 'voteScore' or 'timestamp'
    sortBy : 'voteScore',
    // 'asc' or 'desc'
    orderBy: 'desc'
  }
};

/**
 * The main reducer for the sorting module
 *
 * @method sorting
 * @param  {Object} [state=INITIAL_STATE] The passed in current state
 * @param  {Object} action                The redux action
 * @return {Object}                       The final state
 */
const sorting = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SORTING_ACTIONS.SET_SORTING_ORDER_FOR_COMMENTS:
    return {
      ...state,
      comments: {
        ...action.payload
      }
    };
  case SORTING_ACTIONS.SET_SORTING_ORDER_FOR_POSTS:
    return {
      ...state,
      posts: {
        ...action.payload
      }
    };
  default:
    return state;
  }
};

export default sorting;

/**
 * Get the current sorting options for posts from redux
 *
 * @method getSortingOptionsForPosts
 * @param  {Object}                state The pased in redux state
 * @return {Object}
 */
export const getSortingOptionsForPosts = state => state.sorting && state.sorting.posts;

/**
 * Get the current sorting options for comments from redux
 *
 * @method getSortingOptionsForComments
 * @param  {Object}                state The pased in redux state
 * @return {Object}
 */
export const getSortingOptionsForComments = state => state.sorting && state.sorting.comments;
