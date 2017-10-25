import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormText } from 'reactstrap';

const InputField = ({ input, meta: { touched, error, warning } }) => (
  <div>
    <Input {...input} type="text" />
    {touched &&
      ((error && (
        <FormFeedback className="invalid-feedback" style={{ display: 'block' }}>
          {error}
        </FormFeedback>
      )) ||
        (warning && <FormText>{warning}</FormText>))}
  </div>
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta : PropTypes.object.isRequired
};

export default InputField;
