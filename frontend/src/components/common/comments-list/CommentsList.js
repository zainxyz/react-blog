import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _map from 'lodash/map';
import _orderBy from 'lodash/orderBy';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import { CommentCard, SortingOptions } from 'components/common';
import { actions as sortingActions, selectors as sortingSelectors } from 'modules/sorting';
import { selectors as commentsSelectors } from 'modules/comments';
import { generateKey, getCommentCount } from 'utils';

class CommentsList extends Component {
  renderSortingOptions = () => {
    const { sortingOptions } = this.props;
    const { sortBy, orderBy } = sortingOptions;

    return <SortingOptions onChange={this.props.setSortingOptions} values={{ sortBy, orderBy }} />;
  };

  renderComments = () => {
    const { comments, sortingOptions } = this.props;
    const { sortBy, orderBy } = sortingOptions;

    const sortedCommentsList = _orderBy(comments, [sortBy], [orderBy]);

    return _map(sortedCommentsList, comment => <CommentCard key={generateKey()} {...comment} />);
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h5 className="text-center font-italic font-weight-light">Join the discussion</h5>
            <h2 className="display-4 text-center font-weight-bold">
              {getCommentCount(this.props.commentCount)}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className="sorting-options-container">{this.renderSortingOptions()}</Col>
        </Row>
        <Row>
          <Col>{this.renderComments()}</Col>
        </Row>
      </div>
    );
  }
}

CommentsList.propTypes = {
  commentCount     : PropTypes.number.isRequired,
  comments         : PropTypes.object.isRequired,
  setSortingOptions: PropTypes.func.isRequired,
  sortingOptions   : PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
  commentCount  : commentsSelectors.getCommentCountForPostId(state, props.postId),
  sortingOptions: sortingSelectors.getSortingOptionsForComments(state)
});

export default connect(mapStateToProps, {
  setSortingOptions: sortingActions.setSortingOptionsForComments
})(CommentsList);
