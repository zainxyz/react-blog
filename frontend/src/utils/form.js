import { COMMENT_BODY_MIN_LENGTH, REGEX_PATTERNS } from './constants';

/**
 * Validate a given 'Reply' form
 *
 * @method validateCommentReplyForm
 * @param  {Object}                 values The current form field values
 * @return {Object}                        The object of all of the errors.
 */
export const validateCommentReplyForm = values => {
  const errors = {};

  if (!values.author) {
    errors.author = 'I think you forgot to enter your name...';
  } else if (values.author.length < 4) {
    errors.author = `Hmm...<br />I think you need more characters in your name...`;
  }

  if (!values.email) {
    errors.email = `How can we connect if you don't share your email :(`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = `Uhoh... '<strong>${values.email}</strong>' doesn't seem to go through my validation.<br />Please try again.`;
  }

  if (!values.body) {
    errors.body = `I'm unable to showcase an empty block of whitespace on my blog. Please try again.`;
  } else if (values.body.length < COMMENT_BODY_MIN_LENGTH) {
    errors.body = `It would be great if you could enter <strong>${COMMENT_BODY_MIN_LENGTH -
      values.body
        .length}</strong> more characters.<br />Two words won't look good with this beautiful layout. :)`;
  }

  return errors;
};

/**
 * Warn the user about their current form inputs for the 'Reply' form
 *
 * @method warnCommentReplyForm
 * @param  {Object}             values The current form field values
 * @return {Object}                    The object of al of the warnings.
 */
export const warnCommentReplyForm = values => {
  const warnings = {};

  return warnings;
};

export const validatePostForm = () => {};

export const warnPostForm = () => {};
