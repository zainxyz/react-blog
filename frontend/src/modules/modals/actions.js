import { createActionsFor } from 'utils';

/**
 * Define the different actions for the Modals module
 *
 * @type {Object}
 */
export const MODALS_ACTIONS = createActionsFor('modals', [
  'ADD_MODAL',
  'REMOVE_MODAL',
  'TOGGLE_MODAL_BY_ID'
]);

/**
 * Toggle the modal's state via the given modalId
 *
 * @method toggleModalById
 * @param  {string}        modalId The modal to toggle
 * @return {Action}
 */
export const toggleModalById = (modalId, data) => ({
  type   : MODALS_ACTIONS.TOGGLE_MODAL_BY_ID,
  payload: {
    modalId,
    data
  }
});

/**
 * Add a modal via modalId
 *
 * @method addModalById
 * @param  {string}     modalId The modal to add
 * @return {Action}
 */
export const addModalById = modalId => ({
  type   : MODALS_ACTIONS.ADD_MODAL,
  payload: {
    modalId
  }
});

/**
 * Remove a modal via modalId
 *
 * @method removeModalById
 * @param  {string}        modalId The modal to remove
 * @return {Action}
 */
export const removeModalById = modalId => ({
  type   : MODALS_ACTIONS.REMOVE_MODAL,
  payload: {
    modalId
  }
});
