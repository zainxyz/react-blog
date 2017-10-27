import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

import { MODAL_NAMES } from 'utils';
import { actions as modalsActions, selectors as modalSelectors } from 'modules/modals';
import { actions as postsActions } from 'modules/posts';

class DeletePostModal extends Component {
  deletePost = ({ title, body, author, category, excerpt }) => {
    this.props
      .deletePost({
        title,
        body,
        author,
        category,
        excerpt
      })
      .then(resp => (!isEmpty(resp.error) ? this.toggle() : this.props.onDelete()));
  };

  toggle = () => this.props.toggleModal(MODAL_NAMES.DELETE_POST_MODAL);

  render() {
    const { author, modal, title } = this.props;

    const isOpen = modal && modal.isOpen;

    return (
      <div>
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
              <span>{title}</span> by {author}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deletePost}>
              Delete Post
            </Button>
            <Button color="link" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

DeletePostModal.propTypes = {
  author     : PropTypes.string,
  deletePost : PropTypes.func.isRequired,
  modal      : PropTypes.object,
  onDelete   : PropTypes.func.isRequired,
  title      : PropTypes.string,
  toggleModal: PropTypes.func.isRequired
};

DeletePostModal.defaultProps = {
  author: 'unknown',
  modal : {},
  title : 'Unknown Post Name'
};

const mapStateToProps = state => ({
  modal: modalSelectors.getModalById(state, MODAL_NAMES.DELETE_POST_MODAL)
});

export default connect(mapStateToProps, {
  toggleModal: modalsActions.toggleModalById,
  deletePost : postsActions.deletePost
})(DeletePostModal);
