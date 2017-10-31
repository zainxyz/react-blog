import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ color, className }) => (
  <div className={`loading-content ${className}`}>
    <div className="pane-spinner" style={{ backgroundColor: color }} />
  </div>
);

Loading.propTypes = {
  className: PropTypes.string,
  color    : PropTypes.string.isRequired
};

Loading.defaultProps = {
  className: ''
};

export default Loading;
