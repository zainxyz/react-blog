import { combineReducers } from 'redux';

import { reducer as categories } from 'modules/categories';
import { reducer as comments, actions as commentsActions } from 'modules/comments';
import { reducer as formReducer } from 'redux-form';
import { reducer as modals } from 'modules/modals';
import { reducer as posts } from 'modules/posts';
import { reducer as webfonts } from 'modules/webfonts';

export default combineReducers({
  categories,
  comments,
  form: formReducer.plugin({
    'add-comment-form': (state, action) => {
      if (action.type === commentsActions.COMMENTS_ACTIONS.ADD_COMMENT) {
        return undefined;
      }
      return state;
    }
  }),
  modals,
  posts,
  webfonts
});
