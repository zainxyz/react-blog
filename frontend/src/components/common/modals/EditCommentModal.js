import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import { EditCommentForm } from 'components/common';
import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as commentActions } from 'modules/comments';

class EditCommentModal extends Component {
  editComment = comment => {
    this.props
      .editComment({
        id: this.props.modal.data.id,
        ...comment
      })
      .then(() => this.toggle());
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.EDIT_COMMENT_MODAL);

  render() {
    const { modal } = this.props;

    const isOpen = modal && modal.isOpen;

    return (
      <Modal autoFocus backdrop="static" isOpen={isOpen} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>{`Edit A Comment`}</ModalHeader>
        <ModalBody>
          <EditCommentForm onCancel={this.toggle} onSubmit={this.editComment} />
        </ModalBody>
      </Modal>
    );
  }
}

EditCommentModal.propTypes = {
  editComment: PropTypes.func.isRequired,
  modal      : PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};

EditCommentModal.defaultProps = {
  comment: {},
  modal  : {}
};

const mapStateToProps = (state, props) => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.EDIT_COMMENT_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  editComment: commentActions.editComment
})(EditCommentModal);
