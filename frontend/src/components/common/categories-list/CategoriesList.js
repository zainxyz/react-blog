import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { CategoryCard, SectionTitle } from 'components/common';
import { generateKey } from 'utils';
import { actions as categoryActions, selectors as categorySelectors } from 'modules/categories';

class CategoriesList extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  renderCategories = () => {
    const { categoriesList } = this.props;
    if (!isEmpty(categoriesList)) {
      return map(categoriesList, category => (
        <Col sm="12" md="6" className="mb-6" key={generateKey()}>
          <CategoryCard {...category} buttonText="View Posts" />
        </Col>
      ));
    }
    return null;
  };

  render() {
    const { className } = this.props;
    const classes = `${className} categories-list`;

    return (
      <Container className={classes}>
        <SectionTitle title="Categories" />
        <Row>{this.renderCategories()}</Row>
      </Container>
    );
  }
}

CategoriesList.propTypes = {
  categoriesList    : PropTypes.object.isRequired,
  className         : PropTypes.string,
  fetchAllCategories: PropTypes.func.isRequired
};

CategoriesList.defaultProps = {
  className: ''
};

export default connect(
  createStructuredSelector({
    categoriesList: categorySelectors.getAllCategories
  }),
  {
    fetchAllCategories: categoryActions.fetchAllCategories
  }
)(CategoriesList);
