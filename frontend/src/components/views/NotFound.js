import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PageTitle } from 'components/common';
import { generateCategoryTitlePrefixes } from 'utils';

class NotFound extends Component {
  getPageTitleProps = () => ({
    title      : '404',
    subtitle   : `Sorry but the page you're in search of, doesn't seem to exist.`,
    titlePrefix: generateCategoryTitlePrefixes()
  });

  render() {
    return (
      <div className="categories-view">
        <PageTitle {...this.getPageTitleProps()} />
      </div>
    );
  }
}

NotFound.propTypes = {
  category: PropTypes.object
};

NotFound.defaultProps = {
  category: {}
};

const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps)(NotFound);
