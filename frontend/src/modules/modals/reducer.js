import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { createSelector } from 'reselect';

import { MODALS_ACTIONS } from './actions';

/**
 * The main reducer for the Modals module
 *
 * @method modals
 * @param  {Object} [state={}] The passed in current state
 * @param  {Object} action     The passed in action
 * @return {Object}            The final state
 */
const modals = (state = {}, action) => {
  switch (action.type) {
  case MODALS_ACTIONS.ADD_MODAL:
    return {
      ...state,
      [action.payload.modalId]: {
        isOpen: false
      }
    };
  case MODALS_ACTIONS.REMOVE_MODAL:
    return omit(state, action.payload.modalId);
  case MODALS_ACTIONS.TOGGLE_MODAL_BY_ID:
    return {
      ...state,
      [action.payload.modalId]: {
        isOpen: !state[action.payload.modalId].isOpen,
        data  : action.payload.data ? action.payload.data : undefined
      }
    };
  default:
    return state;
  }
};

export default modals;

/**
 * Get a single modal via modalId
 *
 * @method getModalById
 * @param  {Object}     state   The passed in state
 * @param  {string}     modalId The id of the modal to get
 * @return {Object}
 */
export const getModalById = (state, modalId) => state.modals && state.modals[modalId];

/**
 * Get the modal data for the given modalId
 */
export const getModalDataById = createSelector(
  [getModalById],
  modal => (!isEmpty(modal) && !isEmpty(modal.data) ? modal.data : {})
);
