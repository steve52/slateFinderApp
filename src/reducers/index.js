import { combineReducers } from 'redux';
import {
  GEOLOCATION_SUCCESS,
  GEOLOCATION_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE
} from '../actions';

function currentPosition(state = {}, action) {
  switch (action.type) {
    case GEOLOCATION_SUCCESS:
      console.log('GEOLOCATION_SUCCESS');
      return { ...action.position }
    case GEOLOCATION_FAILURE:
      console.log('GEOLOCATION FAILURE');
      return { error: action.error }
    default:
      return state;
  }
}

function locationsById(state = {}, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_REQUEST:
      return Object.assign({}, state, { isFetching: true, error: action.error });
    case FETCH_LOCATIONS_SUCCESS:
      return action.locations.reduce((acc, curr) => {
        return Object.assign({}, acc, { [curr.id] : curr })
      }, { isFetching: false });
    case FETCH_LOCATIONS_FAILURE:
      return Object.assign({}, { isFetching: false, error: action.error });
    default:
      return state;
  }
}

function locations(state = {}, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_REQUEST:
      return Object.assign({}, state, { isFetching: true, error: action.error });
    case FETCH_LOCATIONS_SUCCESS:
      const items = action.locations.map((location) => {
        return location.id;
      });
      return Object.assign({}, {items, isFetching: false});
    case FETCH_LOCATIONS_FAILURE:
      return Object.assign({}, { isFetching: false, error: action.error });
    default:
      return state;
  }
}

export default combineReducers({
  currentPosition,
  locationsById,
  locations
});