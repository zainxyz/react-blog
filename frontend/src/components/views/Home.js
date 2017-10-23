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
import { actions as postsActions, selectors as postsSelectors } from 'modules/posts';
import { generateKey, generateTagline } from 'utils';

// import './Home.css';

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

  renderPosts = () => {
    const { posts } = this.props;

    if (!isEmpty(posts)) {
      console.log('renderPosts : ', posts);
      return map(posts, post => (
        <Col key={generateKey()}>
          <h3>
            {post.title} ({post.voteScore})
          </h3>
          <Row>
            <Col md="6" className="text-left">
              <small>written by: {post.author}</small>
            </Col>
            <Col md="6" className="text-right">
              <small>({post.commentCount}) comments</small>
            </Col>
          </Row>
          <p>{post.body}</p>
        </Col>
      ));
    }

    return null;
  };

  render() {
    const { title, titlePrefix } = this.props;

    return (
      <div>
        <PageTitle titlePrefix={titlePrefix} title={title} subtitle={generateTagline()} />
        <Container fluid className="bg-light">
          <SectionTitle title="Available Categories" />
          <Row>{this.renderCategories()}</Row>
        </Container>
        <Container fluid className="bg-dark">
          <SectionTitle title="Listing All Posts" />
          <Row>{this.renderPosts()}</Row>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  categories        : PropTypes.object.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
  fetchAllPosts     : PropTypes.func.isRequired,
  posts             : PropTypes.object.isRequired,
  title             : PropTypes.string,
  titlePrefix       : PropTypes.string
};

Home.defaultProps = {
  title      : 'React Blog...',
  titlePrefix: 'This is'
};

export default connect(
  createStructuredSelector({
    categories: categorySelectors.getCategories,
    posts     : postsSelectors.getPosts
  }),
  {
    fetchAllCategories: categoryActions.fetchAllCategories,
    fetchAllPosts     : postsActions.fetchAllPosts
  }
)(Home);
