import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';

import { validateCommentReplyForm, warnCommentReplyForm } from 'utils';
import InputField from './fields/InputField';
import TextAreaField from './fields/TextAreaField';

class CommentReplyForm extends Component {
  submitFormData = data => {
    const { createRecord, reset } = this.props;
    return createRecord(data).then(() => reset());
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container className="comment-reply-form">
        <form onSubmit={handleSubmit}>
          <Row className="form-body">
            <Col className="input-body">
              <FormGroup>
                <Label for="body">My comment is...</Label>
                <Field name="body" component={TextAreaField} type="text" rows="8" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-author">
            <Col md="6" className="input-author">
              <FormGroup>
                <Label for="author">Name</Label>
                <Field name="author" component={InputField} type="text" />
              </FormGroup>
            </Col>
            <Col md="6" className="input-author-email">
              <FormGroup>
                <Label for="email">Email</Label>
                <Field name="email" component={InputField} type="email" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-actions">
            <Col className="d-flex justify-content-center">
              <Button type="submit" color="info">
                Submit Comment
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

CommentReplyForm.propTypes = {
  createRecord: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  reset       : PropTypes.func.isRequired
};

CommentReplyForm.defaultProps = {
  createRecord: () => {}
};

export default reduxForm({
  form    : 'comment-reply-form',
  validate: validateCommentReplyForm,
  warn    : warnCommentReplyForm
})(CommentReplyForm);
