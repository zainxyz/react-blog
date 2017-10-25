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
    href: '/categories',
    name: 'Categories'
  },
  {
    href: '/posts',
    name: 'Posts'
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
export const POST_URL = '/posts';

/**
 * The API url for the Categories route
 *
 * @type {String}
 */
export const CATEGORY_URL = '/categories';

/**
 * The API url for the Comments route
 *
 * @type {String}
 */
export const COMMENT_URL = '/comments';

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
  LETTERS: /[^a-zA-Z]+/g
};
