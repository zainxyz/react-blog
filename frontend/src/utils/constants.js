import constants from 'namespace-constants';

/**
 * A unique Application Namespace generated via node-uuid via command-line
 * Universally Unique IDentifier (UUID)
 *
 * @type {String}
 */
export const APP_NAMESPACE = `8a675a23-087c-4031-ba54-20c56da119a2`;

/**
 * The API base URL for the Application
 *
 * @type {String}
 */
export const API_BASE_URL = 'http://localhost:3001';

/**
 * The 404 or /notfound route for the Application
 *
 * @type {String}
 */
export const APP_ROUTE_NOT_FOUND = '/notfound';

/**
 * The Application Navbar
 *
 * @type {Array}
 */
export const APP_NAVBAR = [
  {
    href: '/',
    name: 'Home'
  },
  {
    href  : 'https://github.com/zainxyz/react-blog',
    name  : 'Github',
    target: '_blank'
  }
];

/**
 * Success Suffix for the Axios Redux Actions
 *
 * @type {string}
 */
export const AXIOS_SUCCESS_SUFFIX = '_SUCCESS';

/**
 * Failure Suffix for the Axios Redux Actions
 *
 * @type {string}
 */
export const AXIOS_ERROR_SUFFIX = '_FAILURE';

/**
 * The API url for the Posts route
 *
 * @type {String}
 */
export const POST_URL = 'posts';

/**
 * The API url for the Categories route
 *
 * @type {String}
 */
export const CATEGORY_URL = 'categories';

/**
 * The API url for the Comments route
 *
 * @type {String}
 */
export const COMMENT_URL = 'comments';

/**
 * List of image names for the home page-title
 *
 * @type {Array}
 */
export const HOME_TITLE_IMAGES_LIST = ['hacker.jpg', 'home.jpg'];

/**
 * Config for the Web Font Loader
 *
 * @type {Object}
 */
export const WEB_FONT_LOADER_CONFIG = {
  google: {
    families: [
      'Roboto:100,300,400,500,700',
      'Raleway:300,400,500,600,700',
      'Nunito:300,400,600,700'
    ]
  }
};

/**
 * Bunch o' taglines...
 *
 * @type {Array}
 */
export const TAGLINES = [
  `8 out of 10 owners who expressed a preference, said their cats preferred React blog.`,
  `Don't mess with react blog.`,
  `I trust React blog.`,
  `Lipsmackin' Thirstquenchin' Acetastin' Motivatin' Goodbuzzin' Cooltalkin' Highwalkin' Fastlivin' Evergivin' Coolfizzin' React Bloggin'`,
  `Obey your React blog.`,
  `Once blogging, forever a React blogger.`,
  `Ooh la la, React blog.`,
  `React blog - Think different.`,
  `React blog ... forget the rest.`,
  `The Gods made React blog.`,
  `The Incredible, Editable React blog.`,
  `With a name like React blog, it has to be good.`,
  `You wish you had a React blog.`
];

/**
 * Bunch o' category title prefixes
 *
 * @type {Array}
 */
export const CATEGORY_TITLE_PREFIXES = [
  `Change one's mind about`,
  `Check this one out:`,
  `Consider again ...`,
  `I'm cuckoo for`,
  `Keep an eagle eye on`,
  `Let's take a look @`,
  `Saved by`,
  `Scaning ...`,
  `See in a new light`,
  `You don't want to miss reading about`
];

/**
 * Min length for submitting a Comment's body
 *
 * @type {Number}
 */
export const COMMENT_BODY_MIN_LENGTH = 50;

/**
 * Min length for submitting a Post's body
 *
 * @type {Number}
 */
export const POST_BODY_MIN_LENGTH = 250;

/**
 * Min length for submitting a Post's title
 *
 * @type {Number}
 */
export const POST_TITLE_MIN_LENGTH = 5;

/**
 * Min length for submitting a Post's excerpt
 *
 * @type {Number}
 */
export const POST_EXCERPT_MIN_LENGTH = 50;

/**
 * Default value for the Categories dropdown select list
 *
 * @type {String}
 */
export const POST_CATEGORIES_DEFAULT_VALUE = 'Please select a Category';

/**
 * Date format... i.e. Monday, October 23, 2017
 *
 * @type {String}
 */
export const DATE_FORMAT = 'dddd, MMMM DD, YYYY';

/**
 * Time format... i.e. 3:32 am
 *
 * @type {String}
 */
export const TIME_FORMAT = 'h:mm a';

/**
 * Deault DOM-Purify Config...
 *
 * @type {Object}
 */
export const DOM_PURIFY_DEFAULT_CONFIG = {};

/**
 * RegEx Patterns
 *
 * @type {Object}
 */
export const REGEX_PATTERNS = {
  // Matches any character that is not one of the 26 alphabets
  LETTERS: /[^a-zA-Z]+/g,
  // Verifies if the string is a valid email
  EMAIL  : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
};

/**
 * Namespaced Constants for different modals
 *
 * @type {[type]}
 */
export const MODAL_NAMES = constants('modal', [
  'DELETE_COMMENT_MODAL',
  'DELETE_POST_MODAL',
  'EDIT_COMMENT_MODAL',
  'EDIT_POST_MODAL',
  'NEW_POST_MODAL'
]);
