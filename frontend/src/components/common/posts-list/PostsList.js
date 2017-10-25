import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PostCard, SectionTitle } from 'components/common';
import { generateKey } from 'utils';
import { selectors as postsSelectors } from 'modules/posts';

class PostsList extends Component {
  renderPosts = () => {
    const { posts } = this.props;

    if (!isEmpty(posts)) {
      return map(posts, post => (
        <Col sm="2" key={generateKey()}>
          <PostCard {...post} buttonText="View Post" />
        </Col>
      ));
    }

    return null;
  };

  render() {
    const { className } = this.props;

    return (
      <Container fluid className={className}>
        <SectionTitle title="Listing All Posts" />
        <Row>{this.renderPosts()}</Row>
      </Container>
    );
  }
}

PostsList.propTypes = {
  className: PropTypes.string,
  posts    : PropTypes.object.isRequired
};

PostsList.defaultProps = {
  className: 'bg-light'
};

export default connect(
  createStructuredSelector({
    posts: postsSelectors.getPosts
  })
)(PostsList);
