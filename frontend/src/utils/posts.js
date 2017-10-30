/**
 * Get the count of the total number of posts
 *
 * @method getTotalPostsCount
 * @param  {Object}           posts The list of posts
 * @return {number}
 */
export const getTotalPostsCount = posts => Object.keys(posts).length;
