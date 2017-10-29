import {
  COMMENT_BODY_MIN_LENGTH,
  POST_BODY_MIN_LENGTH,
  POST_CATEGORIES_DEFAULT_VALUE,
  POST_EXCERPT_MIN_LENGTH,
  POST_TITLE_MIN_LENGTH,
  REGEX_PATTERNS
} from './constants';

/**
 * Validate a given author string
 *
 * @method _validateAuthor
 * @param  {string}        author The author to validate
 * @return {string}
 */
const _validateAuthor = author => (!author ? 'I think you forgot to enter your name...' : '');

/**
 * Validate a given body text string
 *
 * @method _validateBody
 * @param  {string}      body       The body string to validate
 * @param  {number}      bodyLength The max length for the given body string
 * @return {string}
 */
const _validateBody = (body, bodyLength) => {
  let error = '';

  if (!body) {
    error = `It's not great to showcase an empty block of whitepace. Please add some text.`;
  } else if (body.length < bodyLength) {
    error = `It would be great if you could enter <strong>${bodyLength -
      body.length}</strong> more characters.`;
  }

  return error;
};

/**
 * Validate a given category string
 *
 * @method _validateCategory
 * @param  {string}          category     The category string to validate
 * @param  {string}          defaultValue The default value to valdiate against
 * @return {string}
 */
const _validateCategory = (category, defaultValue) =>
  !category || category === defaultValue ? 'Please select a category.' : '';

/**
   * Validate a given email string
   *
   * @method _validateEmail
   * @param  {string}       email The email to validate
   * @return {string}
   */
const _validateEmail = email => {
  let error = '';

  if (!email) {
    error = 'Please enter a valid email.';
  } else if (!REGEX_PATTERNS.EMAIL.test(email)) {
    error = 'Please double-check the email address that you entered.';
  }

  return error;
};

/**
 * Validate a given title string
 *
 * @method _validateTitle
 * @param  {string}       title       The title string to validate
 * @param  {number}       titleLength The max length for the given title string
 * @return {string}
 */
const _validateTitle = (title, titleLength) => {
  let error = '';

  if (!title) {
    error = 'Please enter a valid title.';
  } else if (title.length < titleLength) {
    error = `Please enter a more meaningful title, try adding <strong>${titleLength -
      title.length}</strong> more characters.`;
  }

  return error;
};

/**
 * Validate a given 'Reply' form for Posts
 *
 * @method validateCommentForm
 * @param  {Object}            values The current form field values
 * @return {Object}                   The object of all of the errors.
 */
export const validatePostForm = values => {
  const errors = {};

  errors.author = _validateAuthor(values.author);
  errors.body = _validateBody(values.body, POST_BODY_MIN_LENGTH);
  errors.category = _validateCategory(values.category, POST_CATEGORIES_DEFAULT_VALUE);
  errors.email = _validateEmail(values.email);
  errors.excerpt = _validateBody(values.excerpt, POST_EXCERPT_MIN_LENGTH);
  errors.title = _validateTitle(values.title, POST_TITLE_MIN_LENGTH);

  return errors;
};

/**
 * Warn the user about their current form inputs for the 'Reply' form
 *
 * @method warnPostForm
 * @param  {Object}        values The current form field values
 * @return {Object}               The object of al of the warnings.
 */
export const warnPostForm = values => {
  const warnings = {};

  return warnings;
};

/**
 * Validate a given 'Reply' form for Comments
 *
 * @method validateCommentForm
 * @param  {Object}            values The current form field values
 * @return {Object}                   The object of all of the errors.
 */
export const validateCommentForm = values => {
  const errors = {};

  errors.author = _validateAuthor(values.author);
  errors.body = _validateBody(values.body, COMMENT_BODY_MIN_LENGTH);
  errors.email = _validateEmail(values.email);

  return errors;
};

/**
 * Warn the user about their current form inputs for the 'Reply' form
 *
 * @method warnCommentForm
 * @param  {Object}        values The current form field values
 * @return {Object}               The object of al of the warnings.
 */
export const warnCommentForm = values => {
  const warnings = {};

  return warnings;
};
