import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';

import { AddEditPostForm } from 'components/common';
import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';

class NewPostModal extends Component {
  addPost = post => {
    this.props
      .addPost({
        ...post
      })
      .then(() => this.toggle());
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL);

  render() {
    const { modal } = this.props;

    const isOpen = !isEmpty(modal) && modal.isOpen;

    return (
      <div className="new-post-modal-thingy">
        <Modal autoFocus backdrop="static" isOpen={isOpen} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{`Let's Add A New Post`}</ModalHeader>
          <ModalBody>
            <AddEditPostForm
              modalName={MODAL_NAMES.NEW_POST_MODAL}
              onCancel={this.toggle}
              onSubmit={this.addPost}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

NewPostModal.propTypes = {
  addPost    : PropTypes.func.isRequired,
  modal      : PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};

NewPostModal.defaultProps = {
  categories: {},
  modal     : {}
};

const mapStateToProps = state => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.NEW_POST_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  addPost    : postsActions.addPost
})(NewPostModal);
