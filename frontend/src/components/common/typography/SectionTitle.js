import PropTypes from 'prop-types';
import React from 'react';

/**
 * A component for building the section title
 *
 * @method SectionTitle
 * @param  {string}  title       The required title for the section title
 * @return {JSX}
 */
const SectionTitle = ({ title }) => (
  <h2 className="section-title lead border-secondary">{title}</h2>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default SectionTitle;
