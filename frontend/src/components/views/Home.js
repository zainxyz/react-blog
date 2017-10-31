import PropTypes from 'prop-types';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { CategoriesList, PageTitle, PostsList } from 'components/common';
import { generateTagline } from 'utils';

const Home = ({ title, titlePrefix }) => (
  <div className="home-view">
    <PageTitle
      imgURL="home.jpg"
      subtitle={generateTagline()}
      title={title}
      titlePrefix={titlePrefix}
    />
    <CategoriesList />
    <PostsList />
  </div>
);

Home.propTypes = {
  title      : PropTypes.string,
  titlePrefix: PropTypes.string
};

Home.defaultProps = {
  title      : 'React Blog...',
  titlePrefix: 'This is a'
};

export default Home;
