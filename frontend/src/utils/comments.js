/**
 * Count the number of comments and return a human readable string
 *
 * @method getCommentsCount
 * @param  {string}        commentCount The current comment count
 * @return {string}                     Human readable string version of the comment count
 */
export const getCommentsCount = commentCount => {
  if (commentCount === 1) {
    return 'One Comment';
  } else if (commentCount === 2) {
    return 'Two Comments';
  } else if (commentCount > 2) {
    return `${commentCount} Comments`;
  } else {
    return 'No Comments';
  }
};
