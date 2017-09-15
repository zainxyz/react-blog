// Action types related to the Comments module
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/**
 * Add a new comment to the application state
 *
 * @method addComment
 * @param  {Object} comment The comment to be added
 * @return {Object}         The action
*/
export const addComment = comment => ({ type: ADD_COMMENT, comment, });

/*
* Edit an existing comment in the application state
*
* @method editComment
* @param  {string} commentId The ID of the comment to be edited
* @return {Object}           The action
*/
export const editComment = commentId => ({ type: EDIT_COMMENT, commentId, });

/**
* Delete an existing comment from the application state
*
* @method deleteComment
* @param  {string} commentId The ID of the comment to be deleted
* @return {Object}           The action
*/
export const deleteComment = commentId => ({ type: DELETE_COMMENT, commentId, });
