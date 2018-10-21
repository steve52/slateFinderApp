export const SET_USER_LATLNG = 'SET_USER_LATLNG';
export const GEOLOCATION_SUCCESS = 'GEOLOCATION_SUCCESS';
export const GEOLOCATION_FAILURE = 'GEOLOCATION_FAILURE';
export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';

export function geolocationSuccess(position) {
  return {
    type: GEOLOCATION_SUCCESS,
    position
  }
}

export function geolocationFailure(error) {
  return {
    type: GEOLOCATION_FAILURE,
    error
  }
}

export function fetchLocationsRequest() {
  return {
    type: FETCH_LOCATIONS_REQUEST
  }
}
export function fetchLocationsSuccess(locations) {
  return {
    type: FETCH_LOCATIONS_SUCCESS,
    locations,
    receivedAt: Date.now()
  }
}
export function fetchLocationsFailure(error) {
  return {
    type: FETCH_LOCATIONS_FAILURE,
    error
  }
}