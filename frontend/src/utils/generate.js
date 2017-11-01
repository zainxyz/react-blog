import uuidV4 from 'uuid/v4';
import sample from 'lodash/sample';

import { TAGLINES, CATEGORY_TITLE_PREFIXES, LOADING_TEXTS } from './constants';

/**
 * Generate a unique ID
 *
 * @method generateID
 * @return {string}   The uniquely generated ID
 */
export const generateID = () => uuidV4();

/**
 * Generate a unique Key (which is not as long as a UUID)
 *
 * @method generateKey
 * @return {string}    The uniquely generated Key
 */
export const generateKey = () => {
  const id = uuidV4();

  return id.substring(id.length - 12);
};

/**
 * Generate a random tagline...
 *
 * @method generateTagline
 * @return {string}        The randomly generated tagline
 */
export const generateTagline = () => sample(TAGLINES);

/**
 * Generate a random category title prefix...
 *
 * @method generateCategoryTitlePrefixes
 * @return {string}                      The randomly generated prefix for a category title
 */
export const generateCategoryTitlePrefixes = () => sample(CATEGORY_TITLE_PREFIXES);

/**
 * Generate a random loading page title
 *
 * @method generateLoadingPageTitle
 * @return {string}                 The randomly generated loading page title
 */
export const generateLoadingPageTitle = () => sample(LOADING_TEXTS);
