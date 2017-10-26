import getTime from 'date-fns/get_time';

import { POST_URL, COMMENT_URL, createActionsFor, generateID } from 'utils';

/**
 * Define the different actions for the Categories module
 *
 * @type {Object}
 */
export const COMMENTS_ACTIONS = createActionsFor('comments', [
  'ADD_COMMENT',
  'EDIT_COMMENT',
  'DELETE_COMMENT',
  'FETCH_COMMENTS_BY_POST',
  'FETCH_COMMENT',
  'VOTE_ON_COMMENT'
]);

/**
 * Fetch all of the comments for the given post via the 'postId'
 *
 * @method fetchCommentsByPost
 * @param  {string}            postId The id of the post whom to fetch all comments for
 * @return {Action}
 */
export const fetchCommentsByPost = postId => ({
  type   : COMMENTS_ACTIONS.FETCH_COMMENTS_BY_POST,
  payload: {
    request: {
      method: 'get',
      url   : `${POST_URL}/${postId}/${COMMENT_URL}`
    }
  }
});

/**
 * Add a new comment to the server
 *
 * @method addComment
 * @param  {string} body     The body of the comment
 * @param  {string} author   The author of the comment
 * @param  {string} parentId The parent (postId) of the comment
 * @return {Action}
 */
export const addComment = ({ body, author, parentId }) => ({
  type   : COMMENTS_ACTIONS.ADD_COMMENT,
  payload: {
    request: {
      method: 'post',
      url   : COMMENT_URL,
      data  : {
        id       : generateID(),
        timestamp: getTime(new Date()),
        body,
        author,
        parentId
      }
    }
  }
});

/**
 * Fetch a single comment from the server by a given 'id'
 *
 * @method fetchCommentById
 * @param  {string}      commentId The id of the comment to fetch
 * @return {Action}
 */
export const fetchCommentById = commentId => ({
  type   : COMMENTS_ACTIONS.FETCH_COMMENT,
  payload: {
    request: {
      method: 'get',
      url   : `${COMMENT_URL}/${commentId}`
    }
  }
});

/**
 * Vote on a selected comment
 *
 * @method voteOnComment
 * @param  {string} id     The id of the comment that's being voted upon
 * @param  {string} option The option of the vote, either 'upVote' or 'downVote'
 * @return {Action}
 */
export const voteOnComment = ({ id, option }) => ({
  type   : COMMENTS_ACTIONS.VOTE_ON_COMMENT,
  payload: {
    request: {
      method: 'post',
      url   : `${COMMENT_URL}/${id}`,
      data  : {
        option
      }
    }
  }
});

/**
 * Edit a comment on the server
 *
 * @method editComment
 * @param  {string} id       The unique id of the comment
 * @param  {string} body     The body of the comment
 * @return {Action}
 */
export const editComment = ({ id, body }) => ({
  type   : COMMENTS_ACTIONS.EDIT_COMMENT,
  payload: {
    request: {
      method: 'put',
      url   : `${COMMENT_URL}/${id}`,
      data  : {
        body,
        timestamp: getTime(new Date())
      }
    }
  }
});

/**
 * Delete a comment from the server
 *
 * @method deleteComment
 * @param  {string}   commentId The id of the comment to delete
 * @return {Action}
 */
export const deleteComment = commentId => ({
  type   : COMMENTS_ACTIONS.DELETE_COMMENT,
  payload: {
    request: {
      method: 'delete',
      url   : `${COMMENT_URL}/${commentId}`
    }
  }
});
