import { combineReducers } from 'redux';

import { reducer as categories } from 'modules/categories';
import { reducer as comments, actions as commentsActions } from 'modules/comments';
import { reducer as formReducer } from 'redux-form';
import { reducer as posts } from 'modules/posts';

export default combineReducers({
  categories,
  comments,
  form: formReducer.plugin({
    'comment-reply-form': (state, action) => {
      switch (action.type) {
      case commentsActions.COMMENTS_ACTIONS.ADD_COMMENT:
        return undefined;
      default:
        return state;
      }
    }
  }),
  posts
});
