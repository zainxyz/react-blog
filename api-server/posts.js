const clone = require('clone');
const faker = require('faker');

const categoriesList = ['nature', 'technology', 'food', 'travel'];
let db = {};

const defaultData = {
  '8989d293-fc14-4468-8da2-7d9292e11542': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 2,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: '8989d293-fc14-4468-8da2-7d9292e11542',
    timestamp: faker.date.past(),
    title: 'Udacity is the best place to learn React',
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '2cd09da4-bfe2-4356-8335-87439f4e8c05': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 3,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: '2cd09da4-bfe2-4356-8335-87439f4e8c05',
    timestamp: faker.date.past(),
    title: 'Learn Redux in 10 minutes!',
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  'cd55683a-4c63-4f3b-9266-ab93d5cae865': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 1,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: 'cd55683a-4c63-4f3b-9266-ab93d5cae865',
    timestamp: faker.date.past(),
    title: faker.fake('{{lorem.sentence}}'),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '02180cb8-19fd-4e3b-aaf7-36360c451edd': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 0,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: '02180cb8-19fd-4e3b-aaf7-36360c451edd',
    timestamp: faker.date.past(),
    title: faker.fake('{{lorem.sentence}}'),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '41aa3dae-ef60-4350-9a99-196f9d9dc947': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 1,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: '41aa3dae-ef60-4350-9a99-196f9d9dc947',
    timestamp: faker.date.past(),
    title: faker.fake('{{lorem.sentence}}'),
    voteScore: faker.random.number({ min: -40, max: 40 })
  },
  '98cdac49-bc8a-4a6b-a4db-850e801409f9': {
    author: faker.fake('{{name.findName}}'),
    body: `<h4>${faker.fake('{{lorem.words}}')}</h4><p>${faker.fake(
      '{{lorem.paragraphs}}'
    )}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p><p>${faker.fake('{{lorem.paragraphs}}')}</p>`,
    category: faker.random.arrayElement(categoriesList),
    commentCount: 4,
    deleted: false,
    email: faker.fake('{{internet.email}}'),
    excerpt: faker.fake('{{lorem.paragraph}}'),
    id: '98cdac49-bc8a-4a6b-a4db-850e801409f9',
    timestamp: faker.date.past(),
    title: faker.fake('{{lorem.sentence}}'),
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

function getByCategory(token, category) {
  return new Promise(res => {
    let posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function get(token, id) {
  return new Promise(res => {
    const posts = getData(token);
    res(posts[id].deleted ? {} : posts[id]);
  });
}

function getAll(token) {
  return new Promise(res => {
    const posts = getData(token);
    let keys = Object.keys(posts);
    let filtered_keys = keys.filter(key => !posts[key].deleted);
    res(filtered_keys.map(key => posts[key]));
  });
}

function add(token, post) {
  return new Promise(res => {
    let posts = getData(token);

    posts[post.id] = {
      author: post.author,
      body: post.body,
      category: post.category,
      commentCount: 0,
      deleted: false,
      email: post.email,
      excerpt: post.excerpt,
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      voteScore: 1
    };

    res(posts[post.id]);
  });
}

function vote(token, id, option) {
  return new Promise(res => {
    let posts = getData(token);
    post = posts[id];
    switch (option) {
      case 'upVote':
        post.voteScore = post.voteScore + 1;
        break;
      case 'downVote':
        post.voteScore = post.voteScore - 1;
        break;
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`);
    }
    res(post);
  });
}

function disable(token, id) {
  return new Promise(res => {
    let posts = getData(token);
    posts[id].deleted = true;
    res(posts[id]);
  });
}

function edit(token, id, post) {
  return new Promise(res => {
    let posts = getData(token);
    for (prop in post) {
      posts[id][prop] = post[prop];
    }
    res(posts[id]);
  });
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token);
  if (data[id]) {
    data[id].commentCount += count;
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
};
