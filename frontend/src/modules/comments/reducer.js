import mapKeys from 'lodash/mapKeys';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import { createSelector } from 'reselect';

import { COMMENTS_ACTIONS } from './actions';

/**
 * The main reducer for the Comments module
 *
 * @method comments
 * @param  {Object} [state={}] The passed in current state
 * @param  {Object} action     The final axios promise as an action
 * @return {Object}            The final state
 */
const comments = (state = {}, action) => {
  switch (action.type) {
  case COMMENTS_ACTIONS.ADD_COMMENT_SUCCESS:
  case COMMENTS_ACTIONS.EDIT_COMMENT_SUCCESS:
  case COMMENTS_ACTIONS.VOTE_ON_COMMENT_SUCCESS:
    // For all of the three ADD_COMMENT, EDIT_COMMENT, and VOTE_ON_COMMENT actions we're going to
    // return the passed in state, while overwriting the current comment that's being added /
    // edited / voted upon.
    return {
      ...state,
      [action.payload.data.id]: action.payload.data
    };
  case COMMENTS_ACTIONS.FETCH_COMMENTS_BY_POST_SUCCESS:
  case COMMENTS_ACTIONS.FETCH_COMMENT_SUCCESS:
    // Whether we fetch an individual comment or all of the comments for a given post, we're going
    // to return the current state along with the updated comment(s). 'mapKeys' to the rescue
    return {
      ...state,
      ...mapKeys(action.payload.data, 'id')
    };
  case COMMENTS_ACTIONS.DELETE_COMMENT_SUCCESS:
    // Deleting a comment means we remove the key from the current state that matches the 'id' of
    // the comment that's being deleted. 'omit' to the rescue
    return omit(state, action.payload.data.id);
  default:
    return state;
  }
};

// By default we'll be exporting out the reducer
export default comments;

/**
 * Get all of the comments from the given state
 *
 * @method getAllComments
 * @param  {Object}       state The passed in state
 * @return {Object}
 */
export const getAllComments = state => state.comments;

/**
 * Get all of the comments for a single post via post id
 *
 * @method getCommentsForPostId
 * @param  {Object}             state  The passed in state
 * @param  {string}             postId The id of the post to fetch comments for
 * @return {Object}
 */
export const getCommentsForPostId = (state, postId) =>
  pickBy(state.comments, item => item.parentId === postId);

/**
 * Get the comment count for the given post id
 */
export const getCommentCountForPostId = createSelector(
  [getCommentsForPostId],
  comments => Object.keys(comments).length
);
