import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormText } from 'reactstrap';

import { sanitizeMarkup } from 'utils';

const InputField = ({ input, meta: { touched, error, warning } }) => (
  <div>
    <Input {...input} type="text" />
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

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta : PropTypes.object.isRequired
};

export default InputField;
