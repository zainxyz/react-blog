import { combineReducers } from 'redux';

import { reducer as comments } from 'modules/comments';
import { reducer as posts } from 'modules/posts';

export default combineReducers({
  comments,
  posts,
});
