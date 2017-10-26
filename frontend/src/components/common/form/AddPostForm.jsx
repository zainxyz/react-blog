import PropTypes from 'prop-types';
import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';

import { generateKey, validatePostForm, warnPostForm } from 'utils';
import InputField from './fields/InputField';
import SelectField from './fields/SelectField';
import TextAreaField from './fields/TextAreaField';

class AddPostForm extends Component {
  submitFormData = data => {
    const { createRecord, reset } = this.props;
    return createRecord(data).then(() => reset());
  };

  renderCategoriesSelectOptions = () =>
    map(this.props.categories, category => <option key={generateKey()}>{category.title}</option>);

  render() {
    const { categories, handleSubmit } = this.props;
    return (
      <Container className="add-post-form">
        <form onSubmit={handleSubmit}>
          <Row className="row-title">
            <Col className="input-title">
              <FormGroup>
                <Label for="title">{`My post's title is...`}</Label>
                <Field name="title" component={InputField} type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="row-category">
            <Col className="input-category">
              <FormGroup>
                <Label for="category">{`My post's category is...`}</Label>
                <Field name="category" data={categories} component={SelectField}>
                  {/* <option disabled>Select a Category</option>
                  {this.renderCategoriesSelectOptions()} */}
                </Field>
              </FormGroup>
            </Col>
          </Row>
          <Row className="row-author">
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
          <Row className="row-body">
            <Col className="input-body">
              <FormGroup>
                <Label for="body">Post Body</Label>
                <Field name="body" component={TextAreaField} type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="row-excerpt">
            <Col className="input-excerpt">
              <FormGroup>
                <Label for="excerpt">Excerpt for Post</Label>
                <Field name="excerpt" component={TextAreaField} type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" color="info">
            Add Post
          </Button>
        </form>
      </Container>
    );
  }
}

AddPostForm.propTypes = {
  categories  : PropTypes.object.isRequired,
  createRecord: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  reset       : PropTypes.func.isRequired
};

AddPostForm.defaultProps = {
  createRecord: () => {}
};

export default reduxForm({
  form    : 'add-post-form',
  validate: validatePostForm,
  warn    : warnPostForm
})(AddPostForm);
