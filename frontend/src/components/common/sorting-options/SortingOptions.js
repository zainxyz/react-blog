import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input } from 'reactstrap';

const SortingOptions = ({ onChange, values: { sortBy, orderBy } }) => (
  <Form inline className="sorting-options">
    <FormGroup>
      <Input
        type="select"
        name="select"
        id="sortBy"
        value={sortBy}
        onChange={e => onChange({ sortBy: e.target.value, orderBy })}
      >
        <option value="voteScore">Top Score</option>
        <option value="timestamp">Most Recent</option>
      </Input>
      <Input
        type="select"
        name="select"
        id="orderBy"
        value={orderBy}
        onChange={e => onChange({ sortBy, orderBy: e.target.value })}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Input>
    </FormGroup>
  </Form>
);

SortingOptions.propTypes = {
  onChange: PropTypes.func.isRequired,
  values  : PropTypes.object.isRequired
};

export default SortingOptions;
