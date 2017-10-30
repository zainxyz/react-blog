const clone = require('clone');
const posts = require('./posts');
const faker = require('faker');

let db = {};

const defaultData = {
  '559ec2ac-bcfe-495c-8f72-57087f06e0b3': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '559ec2ac-bcfe-495c-8f72-57087f06e0b3',
    parentDeleted: false,
    parentId: '8989d293-fc14-4468-8da2-7d9292e11542',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '51101779-3a84-4288-9082-b286a2ebae8a': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '51101779-3a84-4288-9082-b286a2ebae8a',
    parentDeleted: false,
    parentId: '8989d293-fc14-4468-8da2-7d9292e11542',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '86c442a6-0e5f-4f25-9fb6-90ec24969b78': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '86c442a6-0e5f-4f25-9fb6-90ec24969b78',
    parentDeleted: false,
    parentId: 'cd55683a-4c63-4f3b-9266-ab93d5cae865',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  'f7ba530a-35ae-4b77-98bd-45a224566016': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: 'f7ba530a-35ae-4b77-98bd-45a224566016',
    parentDeleted: false,
    parentId: '2cd09da4-bfe2-4356-8335-87439f4e8c05',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '187be5fa-ca29-4654-9530-c9194b1263a8': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '187be5fa-ca29-4654-9530-c9194b1263a8',
    parentDeleted: false,
    parentId: '2cd09da4-bfe2-4356-8335-87439f4e8c05',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '62b2cde0-1cb0-4222-946d-ef553e8d3d06': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '62b2cde0-1cb0-4222-946d-ef553e8d3d06',
    parentDeleted: false,
    parentId: '2cd09da4-bfe2-4356-8335-87439f4e8c05',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  'fe6b11fd-18bc-4330-8b6b-d4afd6d8880f': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: 'fe6b11fd-18bc-4330-8b6b-d4afd6d8880f',
    parentDeleted: false,
    parentId: '41aa3dae-ef60-4350-9a99-196f9d9dc947',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  'db132e56-02bd-40b2-9368-c1dc49931c7b': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: 'db132e56-02bd-40b2-9368-c1dc49931c7b',
    parentDeleted: false,
    parentId: '98cdac49-bc8a-4a6b-a4db-850e801409f9',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '7dadc9c4-b358-4ce2-b512-a6f580afdf66': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '7dadc9c4-b358-4ce2-b512-a6f580afdf66',
    parentDeleted: false,
    parentId: '98cdac49-bc8a-4a6b-a4db-850e801409f9',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '67cd03f9-1d82-4579-a7a2-f092350f928b': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '67cd03f9-1d82-4579-a7a2-f092350f928b',
    parentDeleted: false,
    parentId: '98cdac49-bc8a-4a6b-a4db-850e801409f9',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '2100c855-56a9-45c4-8dfd-081f618b3bfe': {
    author: faker.fake('{{name.findName}}'),
    body: faker.fake('{{lorem.paragraphs}}'),
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    id: '2100c855-56a9-45c4-8dfd-081f618b3bfe',
    parentDeleted: false,
    parentId: '98cdac49-bc8a-4a6b-a4db-850e801409f9',
    timestamp: faker.date.past(),
    voteScore: faker.random.number({ min: -40, max: 40 })
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
