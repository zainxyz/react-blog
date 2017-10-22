import { combineReducers } from 'redux';

import { reducer as categories } from 'modules/categories';
import { reducer as comments } from 'modules/comments';
import { reducer as posts } from 'modules/posts';

export default combineReducers({
  categories,
  comments,
  posts
});
