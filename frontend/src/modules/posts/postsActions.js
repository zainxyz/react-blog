// Action types related to the Posts module
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

/**
 * Add a new post to the application state
 *
 * @method addPost
 * @param  {Object} post The post to be added
 * @return {Object}      The action
*/
export const addPost = post => ({ type: ADD_POST, post, });

/*
* Edit an existing post in the application state
*
* @method editPost
* @param  {string} postId The ID of the post to be edited
* @return {Object}        The action
*/
export const editPost = postId => ({ type: EDIT_POST, postId, });

/**
* Delete an existing post from the application state
*
* @method deletePost
* @param  {string} postId The ID of the post to be deleted
* @return {Object}        The action
*/
export const deletePost = postId => ({ type: DELETE_POST, postId, });
