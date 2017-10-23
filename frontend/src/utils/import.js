import forEach from 'lodash/forEach';

/**
 * Import multiple files with the same context
 *
 * usage:
 * const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
 *
 * <img src={images['nature.jpg']} />
 *
 * Answer: https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 *
 * @method importAll
 * @param  {Arguments}  r The passed in arguments
 * @return {Array}        The list of imports
 */
export const importAll = r => {
  let images = {};
  forEach(r.keys(), item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};
