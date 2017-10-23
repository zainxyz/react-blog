import PropTypes from 'prop-types';
import React from 'react';
import { Jumbotron } from 'reactstrap';

/**
 * A component for building the page title with an optional subtitle
 *
 * @method PageTitle
 * @param  {string}  title       The required title for the page title
 * @param  {string}  [subtitle]  Optional subtitle
 * @return {JSX}
 */
const PageTitle = ({ title, subtitle }) => (
  <Jumbotron className="page-title">
    <h1 className="display-4">{title}</h1>
    {subtitle && <p className="lead">{subtitle}</p>}
  </Jumbotron>
);

PageTitle.propTypes = {
  subtitle: PropTypes.string,
  title   : PropTypes.string.isRequired
};

PageTitle.defaultProps = {
  subtitle: ''
};

export default PageTitle;
