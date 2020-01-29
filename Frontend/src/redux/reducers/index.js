import { combineReducers } from 'redux';

import mapboxReducer from './mapboxReducer';

const reducers = combineReducers({
  mapbox: mapboxReducer
});

export default reducers;
