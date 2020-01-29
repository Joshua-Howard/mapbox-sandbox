import * as types from '../actions/actionTypes';

const initialState = {
  longitude: 5,
  latitude: 34,
  zoom: 2
};

const mapboxReducer = (state = initialState, action) => {
  // let placeholder;

  switch (action.type) {
    // case types.INCREMENT_PLACEHOLDER:
    //   placeholder = state.placeholder + 1;
    //   console.log(placeholder, 'Placeholder State', action.payload, 'Payload');

    //   return {
    //     ...state,
    //     placeholder
    //   };

    default:
      return state;
  }
};

export default mapboxReducer;
