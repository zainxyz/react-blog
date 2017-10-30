import PropTypes from 'prop-types';
import React from 'react';

/**
 * A component for building the section title
 *
 * @method SectionTitle
 * @param  {string}  title       The required title for the section title
 * @return {JSX}
 */
const SectionTitle = ({ title, children }) => (
  <div className="section-title border-secondary">
    <h2 className=" lead">{title}</h2>
    {children}
  </div>
);

SectionTitle.propTypes = {
  title   : PropTypes.string.isRequired,
  children: PropTypes.node
};

SectionTitle.defaultProps = {
  children: []
};

export default SectionTitle;
