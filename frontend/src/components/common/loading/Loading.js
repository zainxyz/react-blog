import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ className, text }) => (
  <div className={`loading-content ${className}`}>
    <div className="pane-spinner" />
    <p className="pane-text display-5 text-white">{text}</p>
  </div>
);

Loading.propTypes = {
  className: PropTypes.string,
  text     : PropTypes.string
};

Loading.defaultProps = {
  className: '',
  text     : 'Loading'
};

export default Loading;
