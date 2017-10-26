import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { AddPostForm } from 'components/common';
import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';
import { selectors as categorySelectors } from 'modules/categories';

class NewPostModal extends Component {
  addPost = ({ title, body, author, category, excerpt }) => {
    this.props
      .addPost({
        title,
        body,
        author,
        category,
        excerpt
      })
      .then(() => this.toggle());
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.NEW_POST_MODAL);

  render() {
    const { categories, modal } = this.props;

    const isOpen = modal && modal.isOpen;

    return (
      <div>
        <Modal autoFocus backdrop="static" isOpen={isOpen} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{`Let's Add A New Post`}</ModalHeader>
          <ModalBody>
            <AddPostForm categories={categories} onSubmit={this.addPost} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

NewPostModal.propTypes = {
  addPost    : PropTypes.func.isRequired,
  categories : PropTypes.object,
  modal      : PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};

NewPostModal.defaultProps = {
  categories: {},
  modal     : {}
};

const mapStateToProps = state => ({
  categories: categorySelectors.getCategories(state),
  modal     : modalSelectors.getModalById(state, MODAL_NAMES.NEW_POST_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  addPost    : postsActions.addPost
})(NewPostModal);
