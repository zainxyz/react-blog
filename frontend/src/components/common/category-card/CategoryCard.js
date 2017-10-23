import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { importAll } from 'utils';

const categoryImages = importAll(require.context('assets/categories', false, /\.(png|jpe?g|svg)$/));

export const buildCategoryImageURL = imageId => categoryImages[imageId];

const CategoryCard = ({ buttonText, id, thumbURL, subtitle, title }) => (
  <div>
    <Card>
      <CardImg top width="100%" src={buildCategoryImageURL(thumbURL)} alt="Card image cap" />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{subtitle}</CardText>
        <Button color="info" tag={NavLink} to={`/${id}`}>
          {buttonText}
        </Button>
      </CardBody>
    </Card>
  </div>
);

CategoryCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  id        : PropTypes.string.isRequired,
  subtitle  : PropTypes.string.isRequired,
  thumbURL  : PropTypes.string.isRequired,
  title     : PropTypes.string.isRequired
};

export default CategoryCard;
