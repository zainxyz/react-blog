import React from 'react';
import { FormField } from 'react-form';
import { FormFeedback } from 'reactstrap';

import { sanitizeMarkup } from 'utils';

const CustomSelectInput = props => {
  const { fieldApi, options, onChange, onBlur, placeholder, ...rest } = props;

  const { getError, getSuccess, getTouched, getValue, getWarning, setTouched, setValue } = fieldApi;

  const error = getError();
  const warning = getWarning();
  const success = getSuccess();
  const touched = getTouched();

  const resolvedOptions = options.find(d => d.value === '')
    ? options
    : [
      {
        label   : placeholder || 'Select One...',
        value   : '',
        disabled: true
      },
      ...options
    ];

  const nullIndex = resolvedOptions.findIndex(d => d.value === '');
  const selectedIndex = resolvedOptions.findIndex(d => d.value === getValue());

  return (
    <div>
      <select
        {...rest}
        value={selectedIndex > -1 ? selectedIndex : nullIndex}
        onChange={e => {
          const val = resolvedOptions[e.target.value].value;
          setValue(val);
          if (onChange) {
            onChange(val, e);
          }
        }}
        onBlur={e => {
          setTouched();
          if (onBlur) {
            onBlur(e);
          }
        }}
      >
        {resolvedOptions.map((option, i) => (
          <option key={option.value} value={i} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
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

export default FormField(CustomSelectInput);
