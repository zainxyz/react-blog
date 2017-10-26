import * as actions from './actions';
import reducer, * as selectors from './reducer';

export { actions, reducer, selectors };

/**
 * The authoritative Modal entity shape
 * @typedef  {Object}  Modal
 * @property {boolean} isOpen - Flag if the modal is open or not.
 */
