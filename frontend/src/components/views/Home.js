import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col, Row, Container } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import { CategoryCard, PageTitle, SectionTitle } from 'components/common';
import { actions as categoryActions, selectors as categorySelectors } from 'modules/categories';
import { actions as postsActions } from 'modules/posts';
import { generateKey, generateTagline } from 'utils';

import './Home.css';

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
    this.props.fetchAllCategories();
  }

  renderCategories = () => {
    const { categories } = this.props;
    if (!isEmpty(categories)) {
      return map(categories, category => (
        <Col sm="3" key={generateKey()}>
          <CategoryCard {...category} buttonText="View Posts" />
        </Col>
      ));
    }
    return null;
  };

  render() {
    const { title } = this.props;

    return (
      <div>
        <PageTitle title={title} subtitle={generateTagline()} />
        <Container fluid>
          <SectionTitle title="Available Categories" />
          <Row>{this.renderCategories()}</Row>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  categories        : PropTypes.object.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  fetchAllPosts     : PropTypes.func.isRequired,
  title             : PropTypes.string
};

Home.defaultProps = {
  title: 'Welcome Home...'
};

export default connect(
  createStructuredSelector({
    categories: categorySelectors.getCategories
  }),
  {
    fetchAllCategories: categoryActions.fetchAllCategories,
    fetchAllPosts     : postsActions.fetchAllPosts
  }
)(Home);
