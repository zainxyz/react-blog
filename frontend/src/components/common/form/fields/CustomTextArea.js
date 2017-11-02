import PropTypes from 'prop-types';
import React from 'react';
import { FormField } from 'react-form';
import { FormFeedback } from 'reactstrap';

import { sanitizeMarkup } from 'utils';

const CustomTextAreaField = props => {
  const { onChange, onBlur, fieldApi, ...rest } = props;

  const { getError, getSuccess, getTouched, getValue, getWarning, setTouched, setValue } = fieldApi;

  const error = getError();
  const warning = getWarning();
  const success = getSuccess();
  const touched = getTouched();

  return (
    <div>
      <textarea
        {...rest}
        value={getValue() || ''}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e.target.value, e);
          }
        }}
        onBlur={e => {
          setTouched();
          if (onBlur) {
            onBlur(e);
          }
        }}
      />
      {error && touched ? (
        <FormFeedback
          className="px-3"
          dangerouslySetInnerHTML={sanitizeMarkup(error)}
          style={{ display: 'block' }}
        />
      ) : null}
      {!error && warning && touched ? (
        <FormFeedback
          className="px-3"
          dangerouslySetInnerHTML={sanitizeMarkup(warning)}
          style={{ display: 'block' }}
        />
      ) : null}
      {!error && !warning && success && touched ? (
        <FormFeedback
          className="px-3"
          dangerouslySetInnerHTML={sanitizeMarkup(success)}
          style={{ display: 'block' }}
        />
      ) : null}
    </div>
  );
};

CustomTextAreaField.propTypes = {
  fieldApi: PropTypes.object,
  onBlur  : PropTypes.func,
  onChange: PropTypes.func
};

CustomTextAreaField.defaultProps = {
  fieldApi: {},
  onBlur  : null,
  onChange: null
};

export default FormField(CustomTextAreaField);
