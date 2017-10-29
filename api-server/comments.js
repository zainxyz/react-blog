const clone = require('clone');
const posts = require('./posts');

let db = {};

const defaultData = {
  '894tuq4ut84ut8v4t8wun89g': {
    author: 'thingtwo',
    body: 'Hi there! I am a COMMENT.',
    deleted: false,
    email: 'thingtwo@comment.com',
    id: '894tuq4ut84ut8v4t8wun89g',
    parentDeleted: false,
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    voteScore: 6
  },
  '8tu4bsun805n8un48ve89': {
    author: 'thingone',
    body: 'Comments. Are. Cool.',
    deleted: false,
    email: 'thingone@comment.com',
    id: '8tu4bsun805n8un48ve89',
    parentDeleted: false,
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    voteScore: -5
  }
};

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getByParent(token, parentId) {
  return new Promise(res => {
    let comments = getData(token);
    let keys = Object.keys(comments);
    filtered_keys = keys.filter(
      key => comments[key].parentId === parentId && !comments[key].deleted
    );
    res(filtered_keys.map(key => comments[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const comments = getData(token);
    res(comments[id].deleted || comments[id].parentDeleted ? {} : comments[id]);
  });
}

function add(token, comment) {
  return new Promise(res => {
    let comments = getData(token);

    comments[comment.id] = {
      author: comment.author,
      body: comment.body,
      deleted: false,
      email: comment.email,
      id: comment.id,
      parentDeleted: false,
      parentId: comment.parentId,
      timestamp: comment.timestamp,
      voteScore: 1
    };

    posts.incrementCommentCounter(token, comment.parentId, 1);
    res(comments[comment.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let comments = getData(token);
    comment = comments[id];
    switch (option) {
      case 'upVote':
        comment.voteScore = comment.voteScore + 1;
        break;
      case 'downVote':
        comment.voteScore = comment.voteScore - 1;
        break;
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`);
    }
    res(comment);
  });
}

function disableByParent(token, post) {
  return new Promise(res => {
    let comments = getData(token);
    keys = Object.keys(comments);
    filtered_keys = keys.filter(key => comments[key].parentId === post.id);
    filtered_keys.forEach(key => (comments[key].parentDeleted = true));
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let comments = getData(token);
    comments[id].deleted = true;
    posts.incrementCommentCounter(token, comments[id].parentId, -1);
    res(comments[id]);
  });
}

function edit(token, id, comment) {
  return new Promise(res => {
    let comments = getData(token);
    for (prop in comment) {
      if (comment[prop]) {
        comments[id][prop] = comment[prop];
      }
    }
    res(comments[id]);
  });
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
};
