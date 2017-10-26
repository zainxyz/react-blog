import getTime from 'date-fns/get_time';

import { POST_URL, createActionsFor, generateID } from 'utils';

/**
 * Define the different actions for the Posts module
 *
 * @type {Object}
 */
export const POSTS_ACTIONS = createActionsFor('posts', [
  'ADD_POST',
  'DELETE_POST',
  'EDIT_POST',
  'FETCH_POST',
  'FETCH_POSTS',
  'FETCH_POSTS_BY_CATEGORY',
  'VOTE_ON_POST'
]);

/**
 * Fetch all of the posts for the given category via 'categoryId'
 *
 * @method fetchPostsByCategory
 * @param  {string}            categoryId The id of the requested category
 * @return {Action}
 */
export const fetchPostsByCategory = categoryId => ({
  type   : POSTS_ACTIONS.FETCH_POSTS_BY_CATEGORY,
  payload: {
    request: {
      method: 'get',
      url   : `${categoryId}/${POST_URL}`
    }
  }
});

/**
 * Fetch all of the posts from the server
 *
 * @method fetchAllPosts
 * @return {Action}
 */
export const fetchAllPosts = () => ({
  type   : POSTS_ACTIONS.FETCH_POSTS,
  payload: {
    request: {
      method: 'get',
      url   : POST_URL
    }
  }
});

/**
 * Add a new post to the server
 *
 * @method addPost
 * @param  {string} title    The title of the post
 * @param  {string} body     The body of the post
 * @param  {string} author   The author of the post
 * @param  {string} category The category of the post
 * @param  {string} excerpt  The excerpt of the post
 * @return {Action}
 */
export const addPost = ({ title, body, author, category, excerpt }) => ({
  type   : POSTS_ACTIONS.ADD_POST,
  payload: {
    request: {
      method: 'post',
      url   : POST_URL,
      data  : {
        id       : generateID(),
        timestamp: getTime(new Date()),
        title,
        body,
        author,
        category : category.toLowerCase(),
        excerpt
      }
    }
  }
});

/**
 * Fetch a single post from the server by a given 'id'
 *
 * @method fetchPostById
 * @param  {string}      postId The id of the post to fetch
 * @return {Action}
 */
export const fetchPostById = postId => ({
  type   : POSTS_ACTIONS.FETCH_POST,
  payload: {
    request: {
      method: 'get',
      url   : `${POST_URL}/${postId}`
    }
  }
});

/**
 * Vote on a selected post
 *
 * @method voteOnPost
 * @param  {string} id     The id of the post that's being voted upon
 * @param  {string} option The option of the vote, either 'upVote' or 'downVote'
 * @return {Action}
 */
export const voteOnPost = ({ id, option }) => ({
  type   : POSTS_ACTIONS.VOTE_ON_POST,
  payload: {
    request: {
      method: 'post',
      url   : `${POST_URL}/${id}`,
      data  : {
        option
      }
    }
  }
});

/**
 * Edit a post on the server
 *
 * @method editPost
 * @param  {string} id       The unique id of the post
 * @param  {string} title    The title of the post
 * @param  {string} body     The body of the post
 * @param  {string} author   The author of the post
 * @param  {string} category The category of the post
 * @return {Action}
 */
export const editPost = ({ id, title, body, author, category }) => ({
  type   : POSTS_ACTIONS.EDIT_POST,
  payload: {
    request: {
      method: 'put',
      url   : `${POST_URL}/${id}`,
      data  : {
        title,
        body,
        author,
        category
      }
    }
  }
});

/**
 * Delete a post from the server
 *
 * @method deletePost
 * @param  {string}   postId The id of the post to delete
 * @return {Action}
 */
export const deletePost = postId => ({
  type   : POSTS_ACTIONS.DELETE_POST,
  payload: {
    request: {
      method: 'delete',
      url   : `${POST_URL}/${postId}`
    }
  }
});
