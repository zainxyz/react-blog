import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import { AddEditPostForm } from 'components/common';
import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';

class EditPostModal extends Component {
  editPost = ({ title, body, author, category, excerpt }) => {
    this.props
      .editPost({
        id: this.props.post.id,
        title,
        body,
        author,
        category,
        excerpt
      })
      .then(() => this.toggle());
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.EDIT_POST_MODAL);

  render() {
    const { modal, post } = this.props;

    const isOpen = modal && modal.isOpen;

    return (
      <Modal autoFocus backdrop="static" isOpen={isOpen} toggle={this.toggle} size="lg">
        <ModalHeader toggle={this.toggle}>{`Edit A Post`}</ModalHeader>
        <ModalBody>
          <AddEditPostForm post={post} onCancel={this.toggle} onSubmit={this.editPost} />
        </ModalBody>
      </Modal>
    );
  }
}

EditPostModal.propTypes = {
  editPost   : PropTypes.func.isRequired,
  modal      : PropTypes.object,
  post       : PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
};

EditPostModal.defaultProps = {
  modal: {}
};

const mapStateToProps = (state, props) => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.EDIT_POST_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  editPost   : postsActions.editPost
})(EditPostModal);
