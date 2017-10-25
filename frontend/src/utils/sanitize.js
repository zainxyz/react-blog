import DOMPurify from 'dompurify';

import { DOM_PURIFY_DEFAULT_CONFIG } from './constants';

/**
 * Sanitize the markup, when converting 'string' to 'JSX', via DOM-Purify
 *
 * @method sanitizeMarkup
 * @param  {string}       html                               The string to sanitize
 * @param  {Object}       [config=DOM_PURIFY_DEFAULT_CONFIG] The config (has default)
 * @return {string}                                          The purified DOM string
 */
export const sanitizeMarkup = (html, config = DOM_PURIFY_DEFAULT_CONFIG) => ({
  __html: DOMPurify.sanitize(html, config)
});
