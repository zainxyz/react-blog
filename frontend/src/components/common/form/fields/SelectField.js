import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormText } from 'reactstrap';

import { generateKey } from 'utils';

const SelectField = props => {
  console.log('...select :', props);
  const { data, input, meta: { touched, error, warning } } = props;
  return (
    <div>
      <Input {...input} type="select">
        <option disabled>Select a Category</option>
        {map(data, category => <option key={generateKey()}>{category.title}</option>)}
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
};

SelectField.propTypes = {
  data : PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  meta : PropTypes.object.isRequired
};

export default SelectField;
