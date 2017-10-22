# API Server

To install and start the API server, run the following commands in this directory:

```js
npm i && npm start
```

## Using The Server

### Include An Authorization Header

All requests should use an **Authorization header** to work with your own data:

```js
fetch(
    url,
    {
        headers: {
          'Authorization': 'whatever-you-want'
        }
    }
)
```

### Comment Counts
Posts retrieved in a list or individually now contain comment counts in the format `post: { commentCount: 0 }`.  This should make it easier to display the number of comments a post has without having to call the comments endpoint for each post.   This count is updated whenever a comment is added or deleted via the `POST /comments` or `DELETE /comments/:id` endpoints.

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         | Action         |
|-----------------|----------------|----------------|----------------|
| `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  | `FETCH_CATEGORIES` (categories) |
| `GET /:category/posts` | Get all of the posts for a particular category. |  | `FETCH_POSTS_BY_CATEGORY` (posts) |
| `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  | `FETCH_POSTS` (posts) |
| `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. | `ADD_POST` (posts) |
| `GET /posts/:id` | Get the details of a single post. | | `FETCH_POST` (posts) |
| `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. | `VOTE_ON_POST` (posts) |
| `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] | `EDIT_POST` (posts) |
| `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | | `DELETE_POST` (posts) |
| `GET /posts/:id/comments` | Get all the comments for a single post. | | `FETCH_COMMENTS_BY_POST` (comments) |
| `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. <br> **timestamp** - [Timestamp] Get this however you want. <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. | `ADD_COMMENT` (comments) |
| `GET /comments/:id` | Get the details for a single comment. | | `FETCH_COMMENT` (comments) |
| `POST /comments/:id` | Used for voting on a comment. | **option** - [String]: Either `"upVote"` or `"downVote"`.  | `VOTE_ON_COMMENT` (comments) |
| `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] | `EDIT_COMMENT` (comments) |
| `DELETE /comments/:id` | Sets a comment's deleted flag to `true`. | &nbsp; | `DELETE_COMMENT` (comments) |
