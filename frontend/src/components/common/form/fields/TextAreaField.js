import PropTypes from 'prop-types';
import React from 'react';
import { Input, FormFeedback, FormText } from 'reactstrap';

import { sanitizeMarkup } from 'utils';

const TextAreaField = ({ input, meta: { touched, error, warning }, rows }) => (
  <div>
    <Input {...input} type="textarea" rows={rows} />
    {touched &&
      ((error && (
        <FormFeedback
          className="invalid-feedback"
          style={{ display: 'block' }}
          dangerouslySetInnerHTML={sanitizeMarkup(error)}
        />
      )) ||
        (warning && <FormText>{warning}</FormText>))}
  </div>
);

TextAreaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta : PropTypes.object.isRequired,
  rows : PropTypes.string
};

TextAreaField.defaultProps = {
  rows: '4'
};

export default TextAreaField;
