const comment = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_COMMENT':
    break;
  default:
    return state;
  }
};

const comments = (state = [], action) => {
  switch (action.types) {
  case 'ADD_COMMENT':
    return [...state, comment(undefined, action)];
  case 'EDIT_COMMENT':
    return state.map(c => comment(c, action));
  default:
    return state;
  }
};

export default comments;

export const getComment = (state, commentId) => state.find(c => c.id === commentId);
