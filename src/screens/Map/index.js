import React, {Component} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Map from './components/MapView';
import Geolocation from 'react-native-geolocation-service';
import { Provider } from 'react-redux'
import fetch from 'cross-fetch';

import {
  geolocationSuccess,
  geolocationFailure,
  fetchLocationsRequest,
  fetchLocationsSuccess,
  fetchLocationsFailure
} from '../../actions';

import { createStore } from 'redux';
import rootReducer from '../../reducers';
const store = createStore(rootReducer);
console.log('initial state', store.getState());

export default class MapScreen extends Component {
  watchId = null;

  state = {
    loading: false,
    updatesEnabled: false,
    location: {}
  };

  _hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  _getCurrentPosition = async () => {
    const hasLocationPermission = await this._hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          store.dispatch(geolocationSuccess(position));
          this.setState({ location: position, loading: false });
          console.log(position);
        },
        (error) => {
          store.dispatch(geolocationFailure(error));
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
      );
    });
  }

  _getAllLocations() {
    store.dispatch(fetchLocationsRequest());
    return fetch('http://192.168.1.15:4000/api/locations', {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }).then( response => {
        return response.json();
    }).then( data => {
      store.dispatch(fetchLocationsSuccess(data.data));
    }).catch( error => {
      store.dispatch(fetchLocationsFailure(error));
    })
  }

  componentDidMount() {
    this._getCurrentPosition()
      .catch((err) => {
        console.log('Error getting current position');
      });

    this._getAllLocations()
    .catch((err) => {
      console.log('Error getting locations');
    });;
  }

  render() {
    return (
      <Provider store={store}>
        <Map
          loading={this.state.loading}
          error={this.state.error}
        />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});