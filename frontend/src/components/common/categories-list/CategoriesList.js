import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CategoryCard, SectionTitle } from 'components/common';
import { generateKey } from 'utils';
import { selectors as categorySelectors } from 'modules/categories';

class CategoriesList extends Component {
  renderCategories = () => {
    const { categoriesList } = this.props;
    if (!isEmpty(categoriesList)) {
      return map(categoriesList, category => (
        <Col sm="3" key={generateKey()}>
          <CategoryCard {...category} buttonText="View Posts" />
        </Col>
      ));
    }
    return null;
  };

  render() {
    const { className } = this.props;

    return (
      <Container fluid className={className}>
        <SectionTitle title="Available Categories" />
        <Row>{this.renderCategories()}</Row>
      </Container>
    );
  }
}

CategoriesList.propTypes = {
  className     : PropTypes.string,
  categoriesList: PropTypes.object.isRequired
};

CategoriesList.defaultProps = {
  className: 'bg-light'
};

export default connect(
  createStructuredSelector({
    categoriesList: categorySelectors.getCategories
  })
)(CategoriesList);
