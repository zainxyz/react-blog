import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { validatePostForm, warnPostForm } from 'utils';
import { selectors as categorySelectors } from 'modules/categories';

import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import TextAreaField from './fields/TextAreaField';

class AddEditPostForm extends Component {
  getButtonText = () => (!isEmpty(this.props.post) ? 'Save Post' : 'Add Post');

  getCategoriesForSelectList = () =>
    !isEmpty(this.props.categories) ? map(this.props.categories, category => category.id) : [];

  submitFormData = data => {
    const { createRecord, reset } = this.props;
    return createRecord(data).then(() => reset());
  };

  render() {
    const { handleSubmit, onCancel } = this.props;

    return (
      <Container className="add-post-form">
        <form onSubmit={handleSubmit}>
          <Row className="form-title">
            <Col className="input-title">
              <FormGroup>
                <Label for="title">{`My post's title is...`}</Label>
                <Field name="title" component={InputField} type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-category">
            <Col className="input-category">
              <FormGroup>
                <Label for="category">{`My post's category is...`}</Label>
                <Field
                  name="category"
                  data={this.getCategoriesForSelectList()}
                  component={SelectField}
                  defaultValue="Please select a Category"
                />
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
          <Row className="form-body">
            <Col className="input-body">
              <FormGroup>
                <Label for="body">Post Body</Label>
                <Field name="body" component={TextAreaField} type="text" rows="8" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-excerpt">
            <Col className="input-excerpt">
              <FormGroup>
                <Label for="excerpt">Excerpt for Post</Label>
                <Field name="excerpt" component={TextAreaField} type="text" rows="2" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="form-actions">
            <Col className="d-flex justify-content-end">
              <Button color="link" onClick={this.props.onCancel}>
                Cancel
              </Button>
              <Button type="submit" color="info">
                {this.getButtonText()}
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

AddEditPostForm.propTypes = {
  categories  : PropTypes.object.isRequired,
  createRecord: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onCancel    : PropTypes.func,
  post        : PropTypes.object,
  reset       : PropTypes.func.isRequired
};

AddEditPostForm.defaultProps = {
  createRecord: () => {},
  onCancel    : () => {},
  post        : {}
};

export default connect((state, props) => {
  const initialValues = !isEmpty(props.post) ? props.post : {};
  console.log('post form : initialValues :', initialValues);
  return {
    categories: categorySelectors.getCategories(state),
    initialValues
  };
})(
  reduxForm({
    form    : 'add-edit-post-form',
    validate: validatePostForm,
    warn    : warnPostForm
  })(AddEditPostForm)
);