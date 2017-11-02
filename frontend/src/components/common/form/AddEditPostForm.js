import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { Form } from 'react-form';
import { connect } from 'react-redux';

import { selectors as categorySelectors } from 'modules/categories';
import { selectors as modalSelectors } from 'modules/modals';
import { validatePostForm, warnPostForm } from 'utils';

import CustomTextField from './fields/CustomTextField';
import CustomTextArea from './fields/CustomTextArea';
import CustomSelectInput from './fields/CustomSelectInput';

class AddEditPostForm extends Component {
  getButtonText = () =>
    this.props.initialValues && !_isEmpty(this.props.initialValues.id) ? 'Save Post' : 'Add Post';

  getCategoriesForSelectList = () =>
    !_isEmpty(this.props.categories)
      ? _map(this.props.categories, category => ({ label: category.title, value: category.id }))
      : [];

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
      <Container className="add-edit-post-form">
        <Form
          defaultValues={this.getDefaultValues()}
          dontValidateOnMount
          onSubmit={onSubmit}
          validateError={validatePostForm}
          validateWarning={warnPostForm}
        >
          {formAPI => (
            <form onSubmit={formAPI.submitForm} id="addEditPostForm">
              <Row className="form-title">
                <Col className="input-title">
                  <FormGroup>
                    <Label for="title">{`My post's title is...`}</Label>
                    <CustomTextField
                      field="title"
                      id="title"
                      placeholder="An Awesome Blog Post..."
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="form-category">
                <Col className="input-category">
                  <FormGroup>
                    <Label for="category">{`My post's category is...`}</Label>
                    <CustomSelectInput
                      className="form-control"
                      field="category"
                      id="category"
                      options={this.getCategoriesForSelectList()}
                      placeholder="Please select a category"
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
              <Row className="form-body">
                <Col className="input-body">
                  <FormGroup>
                    <Label for="body">Post Body (valid HTML is allowed)</Label>
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
              <Row className="form-excerpt">
                <Col className="input-excerpt">
                  <FormGroup>
                    <Label for="excerpt">Excerpt for Post</Label>
                    <CustomTextArea
                      className="form-control"
                      field="excerpt"
                      id="excerpt"
                      placeholder="Excerpt Ipsum ..."
                      rows="2"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="form-actions">
                <Col className="d-flex justify-content-end">
                  <Button color="link" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {this.getButtonText()}
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

AddEditPostForm.propTypes = {
  categories   : PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onCancel     : PropTypes.func,
  onSubmit     : PropTypes.func
};

AddEditPostForm.defaultProps = {
  createRecord : () => {},
  initialValues: {},
  onCancel     : () => {},
  onSubmit     : () => {}
};

const mapStateToProps = (state, props) => ({
  categories   : categorySelectors.getAllCategories(state),
  initialValues: modalSelectors.getModalDataById(state, props.modalName)
});

export default connect(mapStateToProps)(AddEditPostForm);
