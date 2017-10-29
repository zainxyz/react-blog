import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import { POSTS_ACTIONS } from './actions';

/**
 * The main reducer for the Posts module
 *
 * @method posts
 * @param  {Object} [state={}] The passed in current state
 * @param  {Object} action     The final axios promise as an action
 * @return {Object}            The final state
 */
const posts = (state = {}, action) => {
  switch (action.type) {
  case POSTS_ACTIONS.ADD_POST_SUCCESS:
  case POSTS_ACTIONS.EDIT_POST_SUCCESS:
  case POSTS_ACTIONS.VOTE_ON_POST_SUCCESS:
    // For all of the three ADD_POST, EDIT_POST, and VOTE_ON_POST actions we're going to return the
    // passed in state, while overwriting the current post that's being added / edited / voted upon.
    return {
      ...state,
      [action.payload.data.id]: action.payload.data
    };
  case POSTS_ACTIONS.FETCH_POSTS_SUCCESS:
    // Since FETCH_POSTS will only run one time, we're going to take the response data from the
    // axios promise and convert it by assiging the 'id's of the posts as their object keys in
    // our newly created state. 'mapKeys' to the rescue
    return mapKeys(action.payload.data, 'id');
  case POSTS_ACTIONS.FETCH_POSTS_BY_CATEGORY_SUCCESS:
  case POSTS_ACTIONS.FETCH_POST:
    return {
      ...state,
      ...mapKeys(action.payload.data, 'id')
    };
  case POSTS_ACTIONS.DELETE_POST_SUCCESS:
    // Deleting a post means we remove the key from the current state that matches the 'id' of the
    // post that's being deleted. 'omit' to the rescue
    return omit(state, action.payload.data.id);
  default:
    return state;
  }
};

// By default we'll be exporting out the reducer
export default posts;

/**
 * Get all of the posts from the state
 *
 * @method getPosts
 * @param  {Object} state The passed in state
 * @return {Object}       All of the posts from the state
 */
export const getPosts = state => state.posts;

/**
 * Get a single post via postId
 *
 * @method getPostById
 * @param  {Object}    state  The passed in state
 * @param  {string}    postId The id of the post to get
 * @return {Object}
 */
export const getPostById = (state, postId) => state.posts && state.posts[postId];

/**
 * Get all of the posts via a given categoryId
 *
 * @method getPostsByCategoryId
 * @param  {Object}             state      The passed in state
 * @param  {string}             categoryId The id of the category to fetch posts for
 * @return {Object}
 */
export const getPostsByCategoryId = (state, categoryId) =>
  state.posts &&
  pickBy(
    state.posts,
    post => (!isEmpty(categoryId) ? post.category === categoryId.toLowerCase() : {})
  );
