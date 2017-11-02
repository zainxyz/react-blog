import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Truncate from 'react-truncate';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, CardFooter, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import DeleteIcon from 'react-icons/lib/md/delete';
import EditIcon from 'react-icons/lib/md/edit';
import ViewIcon from 'react-icons/lib/md/open-in-new';

import { VoteScore } from 'components/common';
import { actions as modalsActions } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';

import { formatDate, getCommentsCount, MODAL_NAMES } from 'utils';

class PostCard extends Component {
  deletePost = () =>
    this.props.toggleModal(MODAL_NAMES.DELETE_POST_MODAL, {
      author: this.props.author,
      id    : this.props.id,
      title : this.props.title
    });

  editPost = () => {
    this.props.toggleModal(MODAL_NAMES.EDIT_POST_MODAL, {
      ...this.props
    });
  };

  renderPostExcerpt = excerpt => (
    <Truncate lines={5} ellipsis={<span>...</span>}>
      {excerpt}
    </Truncate>
  );

  render() {
    const {
      author,
      category,
      commentCount,
      excerpt,
      id,
      title,
      timestamp,
      voteOnPost,
      voteScore
    } = this.props;
    return (
      <Card className="post-card">
        <CardHeader>
          <Button size="sm" color="link" tag={NavLink} to={`/category/${category}`}>
            {category}
          </Button>
          <Button size="sm" color="link" tag={NavLink} to={`/category/${category}/${id}`}>
            <ViewIcon size={24} />
          </Button>
          <Button size="sm" color="link" onClick={this.editPost}>
            <EditIcon size={24} />
          </Button>
          <Button size="sm" color="link" onClick={this.deletePost}>
            <DeleteIcon size={24} />
          </Button>
        </CardHeader>
        <NavLink to={`/category/${category}/${id}`} className="card-body">
          <CardTitle>{title}</CardTitle>
          <CardText>{this.renderPostExcerpt(excerpt)}</CardText>
        </NavLink>
        <CardFooter>
          <Row>
            <Col>
              <h6 className="post-author font-weight-bold">{author}</h6>
              <p className="post-date">{formatDate(timestamp)}</p>
              <p className="post-comments">{getCommentsCount(commentCount)}</p>
            </Col>
          </Row>
          <Row>
            <VoteScore id={id} score={voteScore} onClick={voteOnPost} />
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

PostCard.propTypes = {
  author      : PropTypes.string.isRequired,
  category    : PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  excerpt     : PropTypes.string,
  id          : PropTypes.string.isRequired,
  timestamp   : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title       : PropTypes.string.isRequired,
  toggleModal : PropTypes.func.isRequired,
  voteOnPost  : PropTypes.func.isRequired,
  voteScore   : PropTypes.number.isRequired
};

PostCard.defaultProps = {
  excerpt: ''
};

export default connect(null, {
  toggleModal: modalsActions.toggleModalById,
  voteOnPost : postsActions.voteOnPost
})(PostCard);
