import * as actions from './postsActions';
import reducer, * as selectors from './postsReducer';

export {
  actions,
  reducer,
  selectors,
};

/**
 * The authoritative Post entity shape
 * @typedef  {Object}  Post
 * @property {string}  id           - Unique Identifier
 * @property {Integer} timestammp   - Time created - default in Unix Time
 * @property {string}  title        - Post title
 * @property {string}  body         - Post body
 * @property {string}  author       - Post author
 * @property {string}  category     - Should be one of the categories provided by the server
 * @property {Integer} voteScore    - Net votes the post has received (default: 1)
 * @property {boolean} deleted      - Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
 */
