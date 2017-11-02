# React Blog

[https://github.com/zainxyz/react-blog](https://github.com/zainxyz/react-blog)

A small blog built with React and Redux. It gives the user 4 categories in which they can perform CRUD operations on posts as well as the comments for that post. Currently there are 4 available categories:
1. Nature
2. Technology
3. Food
4. Travel

More coming soon...

----

Each post has a set of controls that allow the user to edit and or delete that post. If you would like to add comments and or remove certain comments, that functionality is available towards the bottom of the post details page. In addition a user can up-vote or down-vote a certain post and comment based on their liking.

NOTE: After a successful deletion of a new post, the current browser history will be replaced with the category page of the deleted post.

NOTE: After a successful addition of a new post, the user will be taken to the new post immediately.

---

There is an available `/notfound` route, which handles all unknown routes the user might stagger upon. It helps the user by presenting a nice message, as well as showing the user the set of available categories for a fast redirect to the correct page (in the user's mind).

---

## Installation

````javascript
$ git clone git@github.com:zainxyz/react-blog.git
````

## Running app for development

Since this app requires a backend-server to be running concurrently with the front-end environment, I have bundled the servers via `npm-run-all`.

````javascript
$ npm i && npm start
````

### If `npm i` fails to install all ...

If the `npm i` command fails to install all required modules, please run `npm run postinstall` to install the deps for api-server and frontend respectively.

`npm start` will fire up the backend-server on `localhost:3001` as well as start the front-end development server on `localhost:3000`. **without the backend server the frontend app won't function**

## Bundling it up for Production

````javascript
$ npm run build
````

## Server APIs

To better understand the backend-server, please visit the backend server's documentation at [api-server](./api-server/README.md).

## Technologies Used

* Axios
* Bootstrap
* DOMPurify
* Date-FNS
* Lodash
* Namespace-Constants
* Node-UUID
* Prop-Types
* React
* React-Parallax
* React-Redux
* React-Router
* React-Truncate
* Reactstrap
* Redux
* Redux-Axios-Middleware
* Reselect
* Webfontloader
* Webpack

## Image Credits

* [Travel Image](https://unsplash.com/photos/J1gxTXy-p2U)
* [Technology Image](https://www.pexels.com/photo/action-android-device-electronics-595804/)
* [Food Image](https://unsplash.com/photos/hTR1XPtTo_k)
* [Nature Image](https://www.pexels.com/photo/view-of-elephant-in-water-247431/)
* [Notfound Image](https://www.pexels.com/photo/hacker-screen-193349/)
* [Home Image](https://www.pexels.com/photo/business-computer-connection-contemporary-450035/)

## License and Use

Please read [LICENSE](LICENSE)

## Contributing

For details, check out [CONTRIBUTING](CONTRIBUTING.md)
