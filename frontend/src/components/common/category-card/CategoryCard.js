import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { importAll } from 'utils';

const categoryImages = importAll(require.context('assets/categories', false, /\.(png|jpe?g|svg)$/));

export const buildCategoryImageURL = imageId => categoryImages[imageId];

const CategoryCard = ({ buttonText, id, thumbURL, subtitle, title }) => (
  <NavLink to={`/category/${id}`} className="category-card">
    <Card>
      <div className="card-image">
        <CardImg alt={title} src={buildCategoryImageURL(thumbURL)} top width="100%" />
      </div>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{subtitle}</CardText>
      </CardBody>
    </Card>
  </NavLink>
);

CategoryCard.propTypes = {
  buttonText: PropTypes.string,
  id        : PropTypes.string.isRequired,
  subtitle  : PropTypes.string.isRequired,
  thumbURL  : PropTypes.string.isRequired,
  title     : PropTypes.string.isRequired
};

CategoryCard.defaultProps = {
  buttonText: 'View Posts'
};

export default CategoryCard;
