import * as actions from './commentsActions';
import reducer, * as selectors from './commentsReducer';

export {
  actions,
  reducer,
  selectors,
};

/**
 * The authoritative Comment entity shape
 * @typedef  {Object}  Comment
 * @property {string}  id             - Unique Identifier
 * @property {string}  parentId       - ID of the parent post
 * @property {Integer} timestammp     - Time created - default in Unix Time
 * @property {string}  body           - Comment body
 * @property {string}  author         - Comment author
 * @property {Integer} voteScore      - Net votes the post has received (default: 1)
 * @property {boolean} deleted        - Flag is comment has been 'deleted' (inaccessible by the front end), (default: false)
 * @property {boolean} parentDeleted  - Flag for when the parent post was deleted, but the comment itself was not.
 */
