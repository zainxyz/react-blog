import { REGEX_PATTERNS } from './constants';

/**
 * Validate a given 'Reply' form
 *
 * @method validateReplyForm
 * @param  {Object}          values The current form field values
 * @return {Object}                 The object of all of the errors.
 */
export const validateReplyForm = values => {
  const errors = {};

  if (!values.author) {
    errors.author = 'You forgot to enter your name...';
  } else if (values.author.length < 4) {
    errors.author = `Hmm...I think you need more characters in your name...`;
  }

  if (!values.email) {
    errors.email = 'Without your email how else can we connect?';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = `Uhoh...this doesn't seem to go through my validation...try again`;
  }

  if (!values.body) {
    errors.body = `Now I can't show an empty block of whitespace to my viewers can I?`;
  } else if (values.body.length < 10) {
    errors.body = `I know you can say more than 10 characters about this post...`;
  }

  return errors;
};

/**
 * Warn the user about their current form inputs for the 'Reply' form
 *
 * @method warnReplyForm
 * @param  {Object}      values The current form field values
 * @return {Object}             The object of al of the warnings.
 */
export const warnReplyForm = values => {
  const warnings = {};

  if (values.author && REGEX_PATTERNS.LETTERS.test(values.author)) {
    warnings.author = `I don't know why your name includes numbers...but alright.`;
  }

  return warnings;
};

export const validatePostForm = () => {};

export const warnPostForm = () => {};
