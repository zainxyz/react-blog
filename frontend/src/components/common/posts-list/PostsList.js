import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import { Button, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { PostCard, SectionTitle } from 'components/common';
import { generateKey, MODAL_NAMES } from 'utils';
import { actions as postsActions, selectors as postsSelectors } from 'modules/posts';
import { actions as modalsActions } from 'modules/modals';

class PostsList extends Component {
  componentDidMount() {
    const { showPostsForCategory } = this.props;

    if (isEmpty(showPostsForCategory)) {
      this.props.fetchAllPosts();
    } else {
      this.props.fetchPostsByCategory(showPostsForCategory.toLowerCase());
    }
  }

  getSectionTitle = () =>
    !isEmpty(this.props.showPostsForCategory)
      ? `Listing all posts for ${this.props.showPostsForCategory}`
      : 'Listing All Posts';

  addNewPost = () =>
    this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL, {
      category: this.props.showPostsForCategory.toLowerCase()
    });

  renderPosts = () => {
    const { posts, postsByCategory, showPostsForCategory } = this.props;

    const postsList = !isEmpty(showPostsForCategory) ? postsByCategory : posts;

    const sortedPostsList = orderBy(postsList, ['voteScore'], ['desc']);

    if (!isEmpty(sortedPostsList)) {
      return map(sortedPostsList, post => (
        <Col sm="12" md="3" className="mb-5" key={generateKey()}>
          <PostCard {...post} buttonText="View Post" />
        </Col>
      ));
    }

    return (
      <Col>
        <p className="lead">
          Sorry, <span className="font-weight-bold">{showPostsForCategory}</span> does not have any
          posts associated with it.
        </p>
        <Button color="primary" onClick={this.addNewPost}>
          {`Add a New Post for the '${showPostsForCategory}' category`}
        </Button>
      </Col>
    );
  };

  render() {
    const { className } = this.props;

    return (
      <Container fluid className={className}>
        <SectionTitle title={this.getSectionTitle()} />
        <Row>{this.renderPosts()}</Row>
      </Container>
    );
  }
}

PostsList.propTypes = {
  className           : PropTypes.string,
  fetchAllPosts       : PropTypes.func.isRequired,
  fetchPostsByCategory: PropTypes.func.isRequired,
  posts               : PropTypes.object.isRequired,
  postsByCategory     : PropTypes.object,
  showPostsForCategory: PropTypes.string,
  toggleModal         : PropTypes.func.isRequired
};

PostsList.defaultProps = {
  className           : 'bg-light',
  postsByCategory     : {},
  showPostsForCategory: ''
};

const mapStateToProps = (state, props) => ({
  posts          : postsSelectors.getPosts(state),
  postsByCategory: postsSelectors.getPostsByCategoryId(state, props.showPostsForCategory)
});

export default connect(mapStateToProps, {
  fetchAllPosts       : postsActions.fetchAllPosts,
  fetchPostsByCategory: postsActions.fetchPostsByCategory,
  toggleModal         : modalsActions.toggleModalById
})(PostsList);
