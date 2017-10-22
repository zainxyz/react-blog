const post = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_POST':
    break;
  default:
    return state;
  }
};

const posts = (state = [], action) => {
  switch (action.types) {
  case 'ADD_POST':
    return [...state, post(undefined, action)];
  case 'EDIT_POST':
    return state.map(p => post(p, action));
  default:
    return state;
  }
};

export default posts;

export const getPost = (state, postId) => state.find(p => p.id === postId);
