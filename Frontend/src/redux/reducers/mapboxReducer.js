import * as types from '../actions/actionTypes';

const initialState = {
  longitude: -73.948,
  latitude: 40.705,
  zoom: 8.78
};

const mapboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_COORDINATES: {
      const { longitude, latitude, zoom } = action.payload;

      return {
        ...state,
        longitude,
        latitude,
        zoom
      };
    }

    default:
      return state;
  }
};

export default mapboxReducer;
