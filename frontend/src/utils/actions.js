import constants from 'namespace-constants';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

/**
 * Create actions for a specific entity
 *
 * NOTE: Due to the inclusion of axios and redux-axios-middleware, we're not going to watch the
 * original actions, instead we'll watch ${ACTION}_SUCCESS and ${ACTION}_FAILURE. This tells us
 * that either the axios promise was successful or it failed. Rather than adding and renaming the
 * action type each time in the reducer or elsewhere, we're going to utilize this helper which will
 * automatically add the two suffixes to our action types. In the end prefixing our action types
 * with a given entity name. This is helpful when using a logger or in general to differentiate our
 * action types.
 *
 * Final Type: 'posts:POSTS_ADD_POST' 'posts:POSTS_ADD_POST_SUCCESS' 'posts:POSTS_ADD_POST_FAILURE'
 *
 * @method createActionsFor
 * @param  {string}         name The name of the entity to create actions for
 * @param  {Array}          list The list of names for the to-be created actions
 * @return {Object}         A dictionary of actions
 */
export const createActionsFor = (name, list) => {
  const listCopy = isArray(list) ? [...list] : [];

  forEach(listCopy, item => {
    listCopy.push(`${item}_SUCCESS`);
    listCopy.push(`${item}_FAILURE`);
  });

  return constants(name, listCopy);
};
