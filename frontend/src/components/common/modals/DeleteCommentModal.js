import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as commentsActions } from 'modules/comments';

class DeleteCommentModal extends Component {
  onDelete = () => {
    const { modal: { data } } = this.props;

    const onDelete = isFunction(data.onDelete) ? data.onDelete : this.toggle;

    this.props
      .deleteComment(data.id)
      .then(resp => (!isEmpty(resp.error) ? this.toggle() : onDelete()));
  };

  getAuthor = data => (data && !isEmpty(data.author) ? data.author : 'Unknown');

  getDate = data => (data && !isEmpty(data.date) ? data.date : 'unknown date');

  toggle = () => this.props.toggleModal(MODAL_NAMES.DELETE_COMMENT_MODAL);

  render() {
    const { modal } = this.props;

    const isOpen = modal && modal.isOpen;

    return (
      <Modal
        autoFocus
        backdrop="static"
        isOpen={isOpen}
        modalClassName="delete-comment-modal"
        toggle={this.toggle}
      >
        <ModalHeader toggle={this.toggle}>
          {`Are you sure you would like to delete this comment?`}
        </ModalHeader>
        <ModalBody>
          <p className="lead">
            Comment was written by <span>{this.getAuthor(modal.data)}</span> on{' '}
            {this.getDate(modal.data)}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onDelete}>
            Delete Comment
          </Button>
          <Button color="link" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteCommentModal.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  modal        : PropTypes.object,
  toggleModal  : PropTypes.func.isRequired
};

DeleteCommentModal.defaultProps = {
  modal: {}
};

const mapStateToProps = state => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.DELETE_COMMENT_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal  : modalsActions.toggleModalById,
  deleteComment: commentsActions.deleteComment
})(DeleteCommentModal);
