import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as commentsActions } from 'modules/comments';

class DeleteCommentModal extends Component {
  deleteComment = () => {
    this.props
      .deleteComment({
        id: this.props.modal.data.id
      })
      .then(resp => (!isEmpty(resp.error) ? this.toggle() : this.props.onDelete()));
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.DELETE_COMMENT_MODAL);

  render() {
    const { author, modal, title } = this.props;

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
            <span>{title}</span> by {author}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.deleteComment}>
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
  author       : PropTypes.string,
  deleteComment: PropTypes.func.isRequired,
  modal        : PropTypes.object,
  onDelete     : PropTypes.func.isRequired,
  title        : PropTypes.string,
  toggleModal  : PropTypes.func.isRequired
};

DeleteCommentModal.defaultProps = {
  author: 'unknown',
  modal : {},
  title : 'Unknown Comment Name'
};

const mapStateToProps = state => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.DELETE_COMMENT_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal  : modalsActions.toggleModalById,
  deleteComment: commentsActions.deleteComment
})(DeleteCommentModal);
