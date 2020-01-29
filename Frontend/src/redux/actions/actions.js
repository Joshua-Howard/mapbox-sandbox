/* eslint-disable import/prefer-default-export */
import * as types from './actionTypes';

export const storeCoordinates = coordinates => ({
  type: types.STORE_COORDINATES,
  payload: coordinates
});
