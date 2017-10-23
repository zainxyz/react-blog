const clone = require('clone');
const config = require('./config');

let db = {};

const defaultData = {
  categories: [
    {
      id: 'nature',
      imgURL: 'nature.jpg',
      subtitle: 'Nature is the art of God',
      thumbURL: 'nature-thumb.jpg',
      title: 'Nature'
    },
    {
      id: 'technology',
      imgURL: 'technology.jpg',
      subtitle: 'It\'s not rocket science',
      thumbURL: 'technology-thumb.jpg',
      title: 'Technology'
    },
    {
      id: 'food',
      imgURL: 'food.jpg',
      subtitle: 'Food is happiness',
      thumbURL: 'food-thumb.jpg',
      title: 'Food'
    },
    {
      id: 'travel',
      imgURL: 'travel.jpg',
      subtitle: 'Paris is always a good idea',
      thumbURL: 'travel-thumb.jpg',
      title: 'Travel'
    }
  ]
};

function getData(token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token];
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getAll(token) {
  return new Promise(res => {
    res(getData(token));
  });
}

module.exports = {
  getAll
};
