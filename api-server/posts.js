const clone = require('clone');

let db = {};

const defaultData = {
  '8xf0y6ziyjabvozdd253nd': {
    author: 'thingtwo',
    body:
      '<h4>Everyone says so after all.</h4><p>Integer ut posuere felis, vitae tincidunt massa. Duis sapien nisi, accumsan finibus tempus et, pulvinar vitae nibh. Aenean eget hendrerit mi, posuere bibendum nibh. Donec vitae elit eget purus convallis dignissim vitae vitae nulla. Quisque sit amet tempor nisl. Praesent cursus facilisis lacus non vehicula. Nulla tincidunt ligula sit amet facilisis aliquam. Donec consequat nulla quis turpis porttitor, eleifend varius ligula dignissim. Vestibulum vehicula fermentum efficitur. Aenean congue consectetur risus, a imperdiet tortor mattis ut. Donec vitae lorem nunc. Nullam quis velit rutrum, lacinia mauris vitae, interdum dui. Morbi pulvinar accumsan rhoncus.</p><p>Integer imperdiet porta pulvinar. Etiam ut luctus nisl, sed luctus felis. Donec pharetra tincidunt velit. Sed id faucibus nisi, viverra condimentum sapien. Integer ac magna dictum, tincidunt sapien eget, maximus dolor. Vivamus aliquam ex lacus, sit amet eleifend sapien imperdiet vel. Nunc pulvinar pharetra gravida. Morbi vel ligula eu mi rutrum blandit. In tempor porta eros, dictum viverra est. Nullam molestie condimentum tristique. Nulla lacinia varius augue a mollis. Vestibulum vehicula porta mattis. Fusce pretium nisl ac justo faucibus pellentesque. Praesent fringilla euismod ex, eget vehicula augue suscipit ut.</p>',
    category: 'nature',
    commentCount: 2,
    deleted: false,
    email: 'thingtwo@react.com',
    excerpt:
      'Pellentesque ac enim et orci elementum porttitor. Duis auctor malesuada diam. Nulla ultrices et ante ut sagittis. Nunc efficitur tincidunt gravida. Sed porta luctus scelerisque. Morbi in nisl vel nisl viverra dignissim.',
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    voteScore: 6
  },
  '6ni6ok3ym7mf1p33lnez': {
    author: 'thingone',
    body:
      '<h4>Just kidding.</h4><p>It takes more than 10 minutes to learn technology.</p><p>Integer egestas risus sit amet urna aliquam, sit amet rutrum odio eleifend. Pellentesque eu nulla vitae ante tincidunt placerat sed non sem. Mauris sagittis tellus quam, sed egestas nunc lacinia et. Aliquam non egestas neque. Ut vel ligula in mauris sollicitudin pellentesque. Suspendisse et eleifend magna, egestas fermentum elit. Ut nec mattis sem, sit amet tristique turpis. Aenean enim erat, laoreet vitae mauris dictum, iaculis feugiat erat. Quisque volutpat sed libero in ornare. Proin eleifend ac risus id pellentesque. Sed eleifend imperdiet mauris at pretium. Aliquam convallis dui risus, sit amet vestibulum purus facilisis a. Aenean vestibulum accumsan risus quis posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur et ligula facilisis, ornare orci sit amet, maximus mi. Vivamus sagittis fermentum leo vitae tristique.</p>',
    category: 'food',
    commentCount: 0,
    deleted: false,
    email: 'thingone@react.com',
    excerpt:
      'Mauris bibendum metus ac hendrerit ullamcorper. Duis efficitur odio ut sem iaculis condimentum. Sed egestas, nisi lobortis porttitor condimentum, arcu lacus convallis felis, rhoncus tincidunt purus quam eu lacus. Donec facilisis est vitae ultrices dictum.',
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
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
