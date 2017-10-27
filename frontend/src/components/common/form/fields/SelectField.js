import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormText } from 'reactstrap';

import { generateKey } from 'utils';

const SelectField = ({ data, defaultValue, input, meta: { touched, error, warning } }) => (
  <div className="select-field">
    <Input {...input} type="select" value={input.value ? input.value : defaultValue}>
      <option disabled>{defaultValue}</option>
      {map(data, item => (
        <option key={generateKey()} style={{ textDecoration: 'capitalize' }}>
          {item}
        </option>
      ))}
    </Input>
    {touched &&
      ((error && (
        <FormFeedback className="invalid-feedback" style={{ display: 'block' }}>
          {error}
        </FormFeedback>
      )) ||
        (warning && <FormText>{warning}</FormText>))}
  </div>
);

SelectField.propTypes = {
  data        : PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  input       : PropTypes.object.isRequired,
  meta        : PropTypes.object.isRequired
};

SelectField.defaultProps = {
  defaultValue: 'Please select an option'
};

export default SelectField;
