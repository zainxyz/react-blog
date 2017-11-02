import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _isFunction from 'lodash/isFunction';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { Form } from 'react-form';
import { connect } from 'react-redux';

import { selectors as modalSelectors } from 'modules/modals';
import { validateCommentForm, MODAL_NAMES, warnCommentForm } from 'utils';

import CustomTextField from './fields/CustomTextField';
import CustomTextArea from './fields/CustomTextArea';

class AddEditCommentForm extends Component {
  getCancelButtonText = () =>
    this.props.onCancel && _isFunction(this.props.onCancel) ? 'Cancel' : null;

  getSubmitButtonText = () =>
    this.props.initialValues && !_isEmpty(this.props.initialValues.id)
      ? 'Save Comment'
      : 'Add Comment';

  getDefaultValues = () => {
    const { initialValues } = this.props;

    if (!_isEmpty(initialValues)) {
      return initialValues;
    }

    return {};
  };

  render() {
    const { onCancel, onSubmit } = this.props;

    return (
      <Container className="comment-reply-form">
        <Form
          defaultValues={this.getDefaultValues()}
          dontValidateOnMount
          onSubmit={onSubmit}
          validateError={validateCommentForm}
          validateWarning={warnCommentForm}
        >
          {formAPI => (
            <form onSubmit={formAPI.submitForm}>
              <Row className="form-body">
                <Col className="input-body">
                  <FormGroup>
                    <Label for="body">My comment is...</Label>
                    <CustomTextArea
                      className="form-control"
                      field="body"
                      id="body"
                      placeholder="Lorem Ipsum ..."
                      rows="8"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="form-author">
                <Col md="6" className="input-author">
                  <FormGroup>
                    <Label for="author">Name</Label>
                    <CustomTextField
                      className="form-control"
                      field="author"
                      id="author"
                      placeholder="John Doe"
                    />
                  </FormGroup>
                </Col>
                <Col md="6" className="input-author-email">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <CustomTextField
                      className="form-control"
                      field="email"
                      id="email"
                      placeholder="johndoe@thedoe.com"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="form-actions">
                <Col className="d-flex justify-content-end">
                  <Button color="link" onClick={onCancel}>
                    {this.getCancelButtonText()}
                  </Button>
                  <Button type="submit" color="primary">
                    {this.getSubmitButtonText()}
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Form>
      </Container>
    );
  }
}

AddEditCommentForm.propTypes = {
  initialValues: PropTypes.object,
  onCancel     : PropTypes.func,
  onSubmit     : PropTypes.func
};

AddEditCommentForm.defaultProps = {
  initialValues: {},
  onCancel     : null,
  onSubmit     : () => {}
};

export default connect(state => ({
  initialValues: modalSelectors.getModalDataById(state, MODAL_NAMES.EDIT_COMMENT_MODAL)
}))(AddEditCommentForm);
