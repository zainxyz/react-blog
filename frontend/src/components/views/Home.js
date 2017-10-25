import PropTypes from 'prop-types';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { CategoriesList, PageTitle, PostsList } from 'components/common';
import { generateTagline } from 'utils';

// import './Home.css';

const Home = ({ title, titlePrefix }) => (
  <div>
    <PageTitle titlePrefix={titlePrefix} title={title} subtitle={generateTagline()} />
    <CategoriesList />
    <PostsList className="bg-dark" />
  </div>
);

Home.propTypes = {
  title      : PropTypes.string,
  titlePrefix: PropTypes.string
};

Home.defaultProps = {
  title      : 'React Blog...',
  titlePrefix: 'This is'
};

export default Home;
