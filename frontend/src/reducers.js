import { combineReducers } from 'redux';

import { reducer as categories } from 'modules/categories';
import { reducer as comments } from 'modules/comments';
import { reducer as modals } from 'modules/modals';
import { reducer as posts } from 'modules/posts';
import { reducer as sorting } from 'modules/sorting';
import { reducer as webfonts } from 'modules/webfonts';

export default combineReducers({
  categories,
  comments,
  modals,
  posts,
  sorting,
  webfonts
});
