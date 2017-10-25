import PropTypes from 'prop-types';
import React from 'react';
import { Input, FormFeedback, FormText } from 'reactstrap';

const TextAreaField = ({ input, meta: { touched, error, warning } }) => (
  <div>
    <Input {...input} type="textarea" />
    {touched &&
      ((error && (
        <FormFeedback className="invalid-feedback" style={{ display: 'block' }}>
          {error}
        </FormFeedback>
      )) ||
        (warning && <FormText>{warning}</FormText>))}
  </div>
);

TextAreaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta : PropTypes.object.isRequired
};

export default TextAreaField;
