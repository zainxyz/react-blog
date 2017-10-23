import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PageTitle } from 'components/common';
import { selectors } from 'modules/posts';

class Posts extends Component {
  isPostIDAvailable = () =>
    this.props.match && this.props.match.params && this.props.match.params.postId;

  renderSubtitle = () => {
    if (this.isPostIDAvailable() && this.props.posts) {
      console.log('this.props', this.props);
      const subtitle = this.props.posts[this.props.match.params.postId]
        ? this.props.posts[this.props.match.params.postId].subtitle
        : '';
      return subtitle;
    }
    return null;
  };

  renderTitle = () => {
    if (this.isPostIDAvailable() && this.props.posts) {
      const title = this.props.posts[this.props.match.params.postId]
        ? this.props.posts[this.props.match.params.postId].title
        : '';
      return `${title}...`;
    }
    return 'Post...';
  };

  renderBody = () => {
    if (this.isPostIDAvailable() && this.props.posts) {
      const body = this.props.posts[this.props.match.params.postId]
        ? this.props.posts[this.props.match.params.postId].body
        : '';
      return body;
    }
    return null;
  };

  render() {
    return (
      <div>
        <PageTitle subtitle={this.renderSubtitle()} title={this.renderTitle()} />
        <Container>
          <Col>
            <p>{this.renderBody()}</p>
          </Col>
        </Container>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

Posts.defaultProps = {};

export default connect(
  createStructuredSelector({
    posts: selectors.getPosts
  })
)(Posts);
