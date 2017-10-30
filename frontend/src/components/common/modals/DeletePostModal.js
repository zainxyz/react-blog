import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';

class DeletePostModal extends Component {
  onDelete = () => {
    const { modal: { data } } = this.props;

    const onDelete = isFunction(data.onDelete) ? data.onDelete : () => {};

    this.props.deletePost(data.id).then(resp => {
      if (resp.payload && resp.payload.status >= 200) {
        onDelete();
      }
      this.toggle();
    });
  };

  getAuthor = data => (data && !isEmpty(data.author) ? data.author : 'Unknown');

  getTitle = data => (data && !isEmpty(data.title) ? data.title : 'Unknown post name');

  toggle = () => this.props.toggleModal(MODAL_NAMES.DELETE_POST_MODAL);

  render() {
    const { modal } = this.props;

    const isOpen = !isEmpty(modal) && modal.isOpen;

    return (
      <Modal
        autoFocus
        backdrop="static"
        isOpen={isOpen}
        modalClassName="delete-post-modal"
        toggle={this.toggle}
      >
        <ModalHeader toggle={this.toggle}>
          {`Are you sure you would like to delete this post?`}
        </ModalHeader>
        <ModalBody>
          <p className="lead">
            <span>{this.getTitle(modal.data)}</span> by {this.getAuthor(modal.data)}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.onDelete}>
            Delete Post
          </Button>
          <Button color="link" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeletePostModal.propTypes = {
  deletePost : PropTypes.func.isRequired,
  modal      : PropTypes.object,
  toggleModal: PropTypes.func.isRequired
};

DeletePostModal.defaultProps = {
  modal: {}
};

const mapStateToProps = state => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.DELETE_POST_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  deletePost : postsActions.deletePost
})(DeletePostModal);
